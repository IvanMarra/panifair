import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import LegalPageLayout from '@/components/LegalPageLayout';
import { trackPageView } from '@/lib/analytics';

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="space-y-3">
    <h2 className="font-playfair text-xl md:text-2xl font-bold text-foreground pt-2">{title}</h2>
    <div className="space-y-3 text-muted-foreground">{children}</div>
  </section>
);

const PoliticaPrivacidade = () => {
  useEffect(() => {
    trackPageView('/politica-de-privacidade');
  }, []);

  return (
    <LegalPageLayout title="Política de Privacidade">
      <p>
        Esta Política de Privacidade descreve como o site da <strong className="text-foreground">PANIFAIR 2026</strong>{' '}
        (Feira Internacional da Panificação) trata dados pessoais em conformidade com a Lei nº 13.709/2018 (Lei Geral de
        Proteção de Dados Pessoais — LGPD). Ao utilizar o site, você declara que leu e compreendeu esta política.
      </p>

      <Section title="1. Controlador e contato">
        <p>
          O controlador dos dados pessoais tratados por meio deste site é a organização responsável pela PANIFAIR 2026,
          em articulação com seus parceiros institucionais quando aplicável. Para exercer seus direitos ou esclarecer
          dúvidas sobre privacidade, entre em contato pelo e-mail{' '}
          <a href="mailto:panifair@panifair.com" className="text-primary font-medium hover:underline">
            panifair@panifair.com
          </a>
          .
        </p>
      </Section>

      <Section title="2. Quais dados podemos coletar">
        <p>Dependendo da sua interação com o site, poderemos tratar, entre outros:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong className="text-foreground">Dados de navegação:</strong> endereço IP, tipo de navegador, páginas
            visitadas, data e hora de acesso, origem de referência (referrer) e identificadores de sessão gerados
            automaticamente.
          </li>
          <li>
            <strong className="text-foreground">Dados fornecidos por você:</strong> nome, e-mail, telefone, empresa,
            cidade ou outras informações enviadas por formulários, WhatsApp, redes sociais ou canais de inscrição
            indicados no site.
          </li>
          <li>
            <strong className="text-foreground">Dados de eventos e analytics:</strong> registros de cliques,
            visualizações de página e eventos similares utilizados para melhorar o site e entender o uso da plataforma,
            quando essa funcionalidade estiver ativa.
          </li>
        </ul>
      </Section>

      <Section title="3. Finalidades e bases legais">
        <p>Tratamos dados pessoais para finalidades como:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Viabilizar sua participação e interesse no evento, inscrições e comunicações relacionadas (execução de medidas pré-contratuais ou contratuais; legítimo interesse).</li>
          <li>Responder a solicitações, dúvidas e suporte (legítimo interesse ou consentimento, conforme o caso).</li>
          <li>Manter a segurança do site, prevenir fraudes e cumprir obrigações legais (cumprimento de obrigação legal ou regulatória).</li>
          <li>Melhorar conteúdo, usabilidade e estatísticas agregadas de acesso (legítimo interesse, observados seus direitos).</li>
        </ul>
      </Section>

      <Section title="4. Cookies e tecnologias similares">
        <p>
          Podemos utilizar cookies ou armazenamento local (por exemplo, <em>session storage</em>) para manter sessões
          técnicas, preferências ou métricas de uso. Você pode gerenciar cookies nas configurações do seu navegador. A
          desativação de cookies essenciais pode afetar parte da funcionalidade do site.
        </p>
      </Section>

      <Section title="5. Compartilhamento de dados">
        <p>
          Seus dados podem ser compartilhados com prestadores de serviço que nos auxiliam na hospedagem do site,
          envio de comunicações, analytics, pagamentos ou inscrições, sempre observados os requisitos da LGPD e contratos
          que impõem confidencialidade e segurança. Não vendemos seus dados pessoais.
        </p>
      </Section>

      <Section title="6. Retenção">
        <p>
          Mantemos os dados pelo tempo necessário para cumprir as finalidades descritas, resguardar direitos em
          processos administrativos ou judiciais e atender a prazos legais. Após isso, os dados poderão ser
          anonimizados ou eliminados de forma segura, salvo hipóteses de guarda obrigatória.
        </p>
      </Section>

      <Section title="7. Segurança">
        <p>
          Adotamos medidas técnicas e organizacionais razoáveis para proteger os dados contra acessos não autorizados,
          perda ou alteração indevida. Nenhum sistema é totalmente isento de riscos; recomendamos o uso de senhas
          fortes e ambientes seguros ao enviar informações pela internet.
        </p>
      </Section>

      <Section title="8. Seus direitos (LGPD)">
        <p>Você pode solicitar, conforme a lei:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Confirmação da existência de tratamento e acesso aos dados;</li>
          <li>Correção de dados incompletos, inexatos ou desatualizados;</li>
          <li>Anonimização, bloqueio ou eliminação de dados desnecessários ou tratados em desconformidade;</li>
          <li>Portabilidade, quando aplicável;</li>
          <li>Informação sobre compartilhamentos e possibilidade de revogação de consentimento;</li>
          <li>Oposição a tratamentos baseados em legítimo interesse, observados os limites legais.</li>
        </ul>
        <p>
          Pedidos podem ser enviados para{' '}
          <a href="mailto:panifair@panifair.com" className="text-primary font-medium hover:underline">
            panifair@panifair.com
          </a>
          . Você também pode contatar a Autoridade Nacional de Proteção de Dados (ANPD).
        </p>
      </Section>

      <Section title="9. Links de terceiros">
        <p>
          O site pode conter links para sites de terceiros (por exemplo, plataformas de inscrição, redes sociais ou
          mapas). Não nos responsabilizamos pelas práticas de privacidade desses sites; recomendamos a leitura das
          respectivas políticas.
        </p>
      </Section>

      <Section title="10. Alterações">
        <p>
          Esta política pode ser atualizada a qualquer momento. A data da última revisão será indicada no topo desta
          página. O uso continuado do site após alterações constitui ciência das novas condições, na medida permitida
          pela legislação aplicável. Consulte também os{' '}
          <Link to="/termos-de-uso" className="text-primary font-medium hover:underline">
            Termos de Uso
          </Link>
          .
        </p>
      </Section>
    </LegalPageLayout>
  );
};

export default PoliticaPrivacidade;
