import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.76.1";
import { Resend } from "npm:resend@2.0.0";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface RegistrationRequest {
  name: string;
  email: string;
  phone: string;
  company?: string;
  type: 'participante' | 'expositor' | 'imprensa';
  message?: string;
  deviceInfo?: string;
  locationInfo?: string;
}

// Comprehensive input validation schema
const registrationSchema = z.object({
  name: z.string().trim().min(2, 'Nome muito curto').max(100, 'Nome muito longo'),
  email: z.string().trim().email('Email inválido').max(255, 'Email muito longo'),
  phone: z.string().trim().min(10, 'Telefone inválido').max(20, 'Telefone muito longo')
    .regex(/^[\d\s()+-]+$/, 'Telefone contém caracteres inválidos'),
  company: z.string().trim().max(200, 'Nome de empresa muito longo').optional().or(z.literal('')),
  type: z.enum(['participante', 'expositor', 'imprensa'], { 
    errorMap: () => ({ message: 'Tipo inválido' }) 
  }),
  message: z.string().trim().max(2000, 'Mensagem muito longa').optional().or(z.literal('')),
  deviceInfo: z.string().max(500).optional().or(z.literal('')),
  locationInfo: z.string().max(200).optional().or(z.literal(''))
});

// Simple rate limiting in-memory store (will reset on function restart)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const limit = rateLimitStore.get(identifier);
  
  if (!limit || now > limit.resetTime) {
    rateLimitStore.set(identifier, { count: 1, resetTime: now + 3600000 }); // 1 hour
    return true;
  }
  
  if (limit.count >= 3) { // Max 3 submissions per hour
    return false;
  }
  
  limit.count++;
  return true;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const rawData = await req.json();
    
    // Comprehensive input validation with zod
    const validation = registrationSchema.safeParse(rawData);
    if (!validation.success) {
      return new Response(
        JSON.stringify({ 
          error: 'Dados inválidos', 
          details: validation.error.errors.map(e => `${e.path.join('.')}: ${e.message}`)
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = validation.data;

    // Get IP address
    const ipAddress = req.headers.get('x-forwarded-for') || 
                     req.headers.get('x-real-ip') || 
                     'unknown';

    // Rate limiting by email and IP
    const emailLimit = checkRateLimit(`email:${data.email}`);
    const ipLimit = checkRateLimit(`ip:${ipAddress}`);
    
    if (!emailLimit || !ipLimit) {
      return new Response(
        JSON.stringify({ error: 'Muitas tentativas. Tente novamente mais tarde.' }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check for duplicate submissions in last 24 hours
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const { data: existingRegistrations } = await supabase
      .from('registrations')
      .select('id')
      .eq('email', data.email)
      .gte('created_at', oneDayAgo);

    if (existingRegistrations && existingRegistrations.length > 0) {
      return new Response(
        JSON.stringify({ error: 'Você já realizou uma inscrição recentemente.' }),
        { status: 409, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Insert into database
    const { data: newRegistration, error: dbError } = await supabase
      .from('registrations')
      .insert({
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        type: data.type,
        message: data.message,
        device_info: data.deviceInfo,
        location_info: data.locationInfo,
        ip_address: ipAddress
      })
      .select()
      .single();

    if (dbError) {
      throw dbError;
    }

    // Send email via Resend
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    
    if (resendApiKey) {
      const resend = new Resend(resendApiKey);

      const typeLabels = {
        participante: 'Participante',
        expositor: 'Expositor',
        imprensa: 'Imprensa'
      };

      const timestamp = new Date().toLocaleString('pt-BR', { 
        timeZone: 'America/Sao_Paulo',
        dateStyle: 'full',
        timeStyle: 'long'
      });

      const emailBody = `
Nova inscrição recebida na PANIFAIR!

TIPO DE INSCRIÇÃO: ${typeLabels[data.type]}

=== DADOS DO INSCRITO ===
Nome: ${data.name}
Email: ${data.email}
Telefone: ${data.phone}
Empresa: ${data.company || 'Não informada'}

=== MENSAGEM ===
${data.message || 'Sem mensagem'}

=== INFORMAÇÕES TÉCNICAS ===
Data e Hora: ${timestamp}
Dispositivo: ${data.deviceInfo || 'Não identificado'}
Localização: ${data.locationInfo || 'Não identificada'}
IP: ${ipAddress}

---
Este email foi enviado automaticamente pelo sistema de inscrições da PANIFAIR.
      `.trim();

      try {
        const { error: emailError } = await resend.emails.send({
          from: 'PANIFAIR <onboarding@resend.dev>',
          to: ['comercial@panifair.com'],
          subject: `Nova Inscrição PANIFAIR - ${typeLabels[data.type]}`,
          text: emailBody
        });

        if (emailError) {
          // Email error - don't fail registration
        }
      } catch (emailError) {
        // Don't fail the registration if email fails
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Inscrição realizada com sucesso!',
        id: newRegistration.id
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message || 'Erro ao processar inscrição' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
};

serve(handler);
