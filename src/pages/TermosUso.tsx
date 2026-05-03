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

const TermosUso = () => {
  useEffect(() => {
    trackPageView('/termos-de-uso');
  }, []);

  return (
    <LegalPageLayout title="Termos de Uso">
      <p>
        Estes Termos de Uso regulam o acesso e a utilização do site da{' '}
        <strong className="text-foreground">PANIFAIR 2026</strong> (Feira Internacional da Panificação). Ao navegar ou
        utilizar qualquer recurso deste site, você concorda com estes termos. Se não concordar, recomendamos que não
        utilize o site.
      </p>

      <Section title="1. Objeto">
        <p>
          O site tem caráter informativo e promocional sobre o evento, programação, local, patrocinadores,
          oportunidades comerciais e canais de contato e inscrição. Informações podem ser atualizadas sem aviso prévio,
          em especial datas, horários e palestrantes sujeitos a confirmação.
        </p>
      </Section>

      <Section title="2. Uso permitido">
        <p>Você compromete-se a utilizar o site de forma lícita, respeitando:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>A legislação brasileira e direitos de terceiros;</li>
          <li>A integridade técnica do site (sem tentativas de invasão, sobrecarga, mineração não autorizada de dados ou disseminação de malware);</li>
          <li>A veracidade das informações que eventualmente enviar por formulários ou canais de contato.</li>
        </ul>
      </Section>

      <Section title="3. Propriedade intelectual">
        <p>
          Marcas, logotipos, textos, imagens, vídeos, layout e demais conteúdos exibidos no site são protegidos por
          direitos de propriedade intelectual da PANIFAIR, de seus idealizadores ou de terceiros que autorizaram o uso.
          É vedada a reprodução, distribuição ou modificação sem autorização prévia e por escrito, salvo usos permitidos
          em lei (como citação com indicação da fonte, quando aplicável).
        </p>
      </Section>

      <Section title="4. Serviços de terceiros">
        <p>
          O site pode integrar ou apontar para serviços de terceiros (hospedagem de inscrições, mapas, redes sociais,
          WhatsApp, entre outros). Esses serviços possuem termos e políticas próprios; a relação jurídica correspondente
          é estabelecida diretamente entre você e o fornecedor do serviço.
        </p>
      </Section>

      <Section title="5. Isenção de garantias">
        <p>
          O site e seus conteúdos são disponibilizados &quot;no estado em que se encontram&quot;, no limite do razoavelmente
          possível. Não garantimos disponibilidade ininterrupta, ausência total de erros ou que o site atenda a todos os
          requisitos específicos do usuário. Corrigiremos falhas relevantes quando identificadas.
        </p>
      </Section>

      <Section title="6. Limitação de responsabilidade">
        <p>
          Na máxima extensão permitida pela lei aplicável, a organização da PANIFAIR não se responsabiliza por danos
          indiretos, lucros cessantes ou perda de oportunidade decorrentes do uso ou da impossibilidade de uso do site,
          salvo dolo ou culpa grave, ou conforme disposições legais imperativas.
        </p>
      </Section>

      <Section title="7. Privacidade">
        <p>
          O tratamento de dados pessoais segue a{' '}
          <Link to="/politica-de-privacidade" className="text-primary font-medium hover:underline">
            Política de Privacidade
          </Link>
          , parte integrante da relação com o usuário neste ambiente digital.
        </p>
      </Section>

      <Section title="8. Lei e foro">
        <p>
          Estes termos são regidos pelas leis da República Federativa do Brasil. Fica eleito o foro da comarca de Belo
          Horizonte, Estado de Minas Gerais, para dirimir controvérsias, salvo prerrogativa legal diversa do consumidor.
        </p>
      </Section>

      <Section title="9. Alterações">
        <p>
          Podemos alterar estes Termos de Uso a qualquer momento. A data da última atualização constará no topo da
          página. O uso continuado do site após a publicação das alterações poderá importar aceitação dos novos termos,
          na medida permitida pela lei.
        </p>
      </Section>

      <Section title="10. Contato">
        <p>
          Dúvidas sobre estes termos:{' '}
          <a href="mailto:panifair@panifair.com" className="text-primary font-medium hover:underline">
            panifair@panifair.com
          </a>
          .
        </p>
      </Section>
    </LegalPageLayout>
  );
};

export default TermosUso;
