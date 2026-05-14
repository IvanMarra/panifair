import { useMemo, useState } from 'react';
import {
  CalendarDays,
  ChevronRight,
  Clock,
  Globe,
  MapPin,
  Mic2,
  Sparkles,
  UserRound,
  X,
} from 'lucide-react';

type DayId = 'sexta' | 'sabado' | 'domingo';
type StageId = 'todos' | 'principal' | 'feminino' | 'fermento';

type EventItem = {
  id: string;
  day: DayId;
  stage: Exclude<StageId, 'todos'>;
  time: string;
  speaker: string;
  title: string;
  initials: string;
  location?: string;
  organization?: string;
  format?: string;
  status?: string;
  tag: string;
  bio?: string;
  /** Segundo currículo (ex.: convidado no mesmo card) */
  bioGuest?: string;
  bioGuestHeading?: string;
  image?: string;
  /** `contain` evita cortar logos/arte institucional na lateral */
  imageFit?: 'contain' | 'cover';
  /** Card com flyer/arte em destaque (sem coluna de retrato lateral) */
  cardLayout?: 'flyer';
  /** Várias fotos na lateral, empilhadas (ex.: dupla de palestrantes) */
  images?: string[];
  /** Destaque editorial (ex.: presença internacional) */
  highlight?: 'international';
};

const days: Array<{
  id: DayId;
  label: string;
  date: string;
  title: string;
  description: string;
  fairHours: string;
}> = [
  {
    id: 'sexta',
    label: 'Sexta',
    date: '15/05',
    title: 'Sexta-feira, 15 de maio',
    description:
      'Abertura da programação com conteúdo estratégico, gestão, posicionamento, liderança, inovação e tendências aplicadas à panificação.',
    fairHours: '13h às 21h',
  },
  {
    id: 'sabado',
    label: 'Sábado',
    date: '16/05',
    title: 'Sábado, 16 de maio',
    description:
      'Dia de programação intensa com conteúdo institucional, cases, comunicação, liderança feminina, empresa familiar, gestão e futuro do setor.',
    fairHours: '13h às 21h',
  },
  {
    id: 'domingo',
    label: 'Domingo',
    date: '17/05',
    title: 'Domingo, 17 de maio',
    description:
      'Fechamento com temas tributários, posicionamento, histórias do setor, segurança de alimentos, café, investimentos e crescimento inteligente.',
    fairHours: '10h às 18h',
  },
];

const stages: Array<{
  id: StageId;
  label: string;
  shortLabel: string;
  description: string;
  className: string;
}> = [
  {
    id: 'todos',
    label: 'Todos os palcos',
    shortLabel: 'Todos',
    description: 'Visão completa do dia',
    className: 'border-primary/30 bg-primary/10 text-brown-dark',
  },
  {
    id: 'principal',
    label: 'Palco Principal',
    shortLabel: 'Principal',
    description: 'Conteúdo central, nomes fortes e talks de maior visibilidade',
    className: 'border-amber-300/60 bg-amber-100/70 text-amber-900',
  },
  {
    id: 'feminino',
    label: 'Empreendedorismo Feminino',
    shortLabel: 'Feminino',
    description: 'Posicionamento, liderança, legado e força de marca',
    className: 'border-rose-200 bg-rose-50 text-rose-800',
  },
  {
    id: 'fermento',
    label: 'Palco Fermento',
    shortLabel: 'Fermento',
    description: 'Conteúdo técnico, digital e de gestão aplicado ao setor',
    className: 'border-emerald-200 bg-emerald-50 text-emerald-800',
  },
];

const events: EventItem[] = [
  {
    id: 'bia-fraga',
    day: 'sexta',
    stage: 'principal',
    time: '14:00 às 14:50',
    speaker: 'Bia Fraga',
    title: 'Do Pedido ao Lucro: dominando o Delivery',
    initials: 'BF',
    organization: 'Sebrae',
    status: 'Confirmado',
    tag: 'Delivery',
    image: '/assets/palestrantes/bia_Fraga_no_background_min.png',
    bio:
      'Bianca Fraga é CEO do Grupo Mindhub, um ecossistema de gestão que tem em seu guarda-chuva restaurantes próprios e uma escola para formar administradores que pensam de forma estratégica em seus negócios. Mentora de mais de 5000 alunos, Bianca é especialista em gestão financeira e eficiência no foodservice, além de fazer parte do grupo seleto de empresários do Conexão iFood, que tem relação direta com a organização, para melhorar o aplicativo e, principalmente, o desempenho dos restaurantes.',
  },
  {
    id: 'guilherme-contador',
    day: 'sexta',
    stage: 'principal',
    time: '15:00 às 15:50',
    speaker: 'Guilherme',
    title: 'O erro financeiro que toda padaria comete',
    initials: 'GC',
    location: 'Belo Horizonte',
    format: 'Contabilidade',
    tag: 'Gestão financeira',
  },
  {
    id: 'gustavo-vannutti',
    day: 'sexta',
    stage: 'principal',
    time: '16:00 às 17:00',
    speaker: 'Gustavo Vannucci',
    title: 'As Tendências Globais do Varejo Aplicadas na Panificação',
    initials: 'GV',
    organization: 'Sebrae',
    status: 'Confirmado',
    tag: 'Tendências',
    image: '/assets/palestrantes/Gustavo_Vanutti.png',
    bio:
      'Conselheiro de administração, mestre em inovação e comportamento do consumidor e especialista em inteligência de mercado, tendências e inovação. Com mais de 35 anos de experiência, leva ao varejo insights práticos sobre estratégias comerciais, canais de venda e decisão orientada por dados.',
  },
  {
    id: 'martin-puricelli',
    day: 'sexta',
    stage: 'principal',
    time: '17:00 às 17:50',
    speaker: 'Martin Puricelli',
    title: 'Sua próxima filial não é física: está no Mercado Livre',
    initials: 'MP',
    organization: 'Grupo Brick Consultoria',
    format: 'Palestra',
    status: 'Presença internacional',
    tag: 'Mercado Livre',
    image: '/assets/palestrantes/Martin_Puricelli_Editado.png',
    highlight: 'international',
    bio:
      'Especialista em estratégias de crescimento dentro do Mercado Livre, com atuação consolidada em toda a América Latina. À frente de uma consultoria certificada nível Silver pelo próprio marketplace, Martin acumula experiência real em desenvolvimento, otimização e escala de operações digitais — sempre com foco em resultados concretos e visão estratégica de longo prazo.',
  },
  {
    id: 'junior-mafille',
    day: 'sexta',
    stage: 'principal',
    time: '18:00 às 18:50',
    speaker: 'Junior Maffille',
    title: 'Inovação na Panificação: transformação de ideias em resultados',
    initials: 'JM',
    location: 'Belo Horizonte',
    format: 'Palestra',
    tag: 'Inovação',
    image: '/assets/palestrantes/Junior_Maffille.png',
    bio:
      'Criado na zona rural de Viçosa, Júnior Mafille iniciou sua trajetória empresarial ainda jovem e construiu uma carreira de destaque no setor de panificação. Com mais de 25 anos de experiência, lidera uma rede de padarias, restaurantes e negócios correlatos.',
  },
  {
    id: 'junior-convidados-sexta',
    day: 'sexta',
    stage: 'principal',
    time: '19:00 às 20:30',
    speaker: 'Júnior Mafille',
    title: 'Júnior Mafille e Gustavo Tubarão. Talk Show',
    initials: 'JC',
    location: 'Belo Horizonte',
    organization: 'Mafille',
    format: 'Talk show',
    tag: 'Talk show',
    image: '/assets/palestrantes/Gustavo_Tubarao.png',
    bio:
      'Gustavo Tubarão, cujo nome verdadeiro é Gustavo Almeida Freire, é um influenciador digital e humorista mineiro nascido em 28 de julho de 2000 em Cana Verde (MG). Ele conquistou milhões de seguidores ao retratar com humor o cotidiano da roça e se tornou referência nacional, recebendo prêmios como "Criador do Ano" no TikTok Awards 2023.',
  },
  {
    id: 'margareth-lopes',
    day: 'sexta',
    stage: 'feminino',
    time: '15:00 às 16:00',
    speaker: 'Margareth Lopes',
    title: 'Quem tem medo do Batom Vermelho?',
    initials: 'ML',
    location: 'Belo Horizonte',
    tag: 'Posicionamento',
    image: '/assets/palestrantes/Margarete_Lopes.png',
    bio:
      'Especialista em desenvolvimento de equipes comerciais de alta performance, atua há mais de 25 anos com atacarejo e distribuição. É pós-graduada em Marketing e Vendas, sócia da Evoluir e referência em processos comerciais, negociação estratégica e culturas orientadas a resultado.',
  },
  {
    id: 'andrea-japiassu',
    day: 'sexta',
    stage: 'feminino',
    time: '14:00 às 15:30',
    speaker: 'Andrea Japiassu',
    title: 'Uma vivência sensorial e disruptiva para mulheres empreendedoras: sinta seu corpo, se divirta e saia com confiança.',
    initials: 'AJ',
    location: 'Brasília',
    organization: 'Escola de Soberanas',
    tag: 'Autoliderança',
    image: '/assets/palestrantes/Andrea_Japiassu.png',
    bio:
      'Estrategista de NR1 e terapeuta integrativa, especialista em reorganização sistêmica de pessoas e empresas. Lidera o Movimento das Soberanas, com foco em autoliderança, presença e poder pessoal para mulheres 40+.',
  },
  {
    id: 'babi-duraes',
    day: 'sexta',
    stage: 'feminino',
    time: '17:00 às 18:00',
    speaker: 'Babi Durães',
    title: 'O foco não é aparência, é a coerência',
    initials: 'BD',
    location: 'Belo Horizonte',
    format: 'Influencer',
    tag: 'Imagem e autoridade',
    image: '/assets/palestrantes/Babi_Duraes.png',
    bio:
      'Estrategista de imagem e posicionamento, especialista em comportamento humano e temperamento. Atua no desenvolvimento de líderes e empresários, conectando essência, percepção de valor e coerência entre o que se comunica e o que se sustenta.',
  },
  {
    id: 'daniela-migliori',
    day: 'sexta',
    stage: 'feminino',
    time: '18:00 às 19:00',
    speaker: 'Daniela Migliori',
    title: 'Empreendedorismo Feminino: força da marca pessoal',
    initials: 'DM',
    location: 'Valinhos/SP',
    organization: 'Amo Pani',
    tag: 'Marca pessoal',
    image: '/assets/palestrantes/Daniela_Miglori.png',
    bio:
      'Fundadora da Amo Pani com formação na Itália e mentora de negócios, já orientou mais de mil alunos. Com mais de 15 anos de experiência, ajuda pessoas e empresas a transformar a panificação em negócios estruturados, lucrativos e bem posicionados.',
  },
  {
    id: 'sueli-igor-vidotte',
    day: 'sexta',
    stage: 'fermento',
    time: '14:30 às 16:00',
    speaker: 'Sueli, Igor Martins e Vidotte',
    title: 'Tráfego pago, gestão do marketing digital e IA na panificação',
    initials: 'SI',
    location: 'Belo Horizonte',
    format: 'Talk show',
    tag: 'Marketing digital',
    image: '/assets/palestrantes/Sueli_Braga.png',
  },
  {
    id: 'igor-martins',
    day: 'sexta',
    stage: 'fermento',
    time: '14:30 às 16:00',
    speaker: 'Igor Martins',
    title: 'Tráfego pago, gestão do marketing digital e IA na panificação',
    initials: 'IM',
    location: 'Belo Horizonte',
    organization: 'Maffile Digital',
    format: 'Talk show com Sueli Braga e Felipe Vidotte',
    tag: 'Marketing digital',
    image: '/assets/palestrantes/igor_editado.png',
    bio:
      'É gestor de Marketing da Maffile Digital, empresa criada com o propósito de impulsionar negócios do setor de alimentação por meio de estratégias digitais eficientes. Com 8 anos de experiência, hoje coordena uma equipe de 12 profissionais entre videomaker, design, social media, story maker e editores. Destaca-se pela habilidade em gravação, fotografia e, principalmente, direção de conteúdo — área em que conduz grandes marcas a se posicionarem com clareza e autoridade no mundo digital. Sob sua liderança, a empresa expandiu sua atuação, atendendo hoje padarias, indústrias, fábricas e eventos, consolidando-se como uma parceira estratégica de crescimento. Também atua como mentor de posicionamento digital, ajudando empresários a desenvolverem comunicação estratégica e presença diante das câmeras, transformando conhecimento e experiência em influência e resultados concretos. Casado há cinco anos, tem na fé cristã um dos pilares que orientam sua vida pessoal e profissional.',
  },
  {
    id: 'marco-toledo',
    day: 'sexta',
    stage: 'fermento',
    time: '16:00 às 16:50',
    speaker: 'Marco Toledo',
    title: 'Tecnologia na panificação',
    initials: 'MT',
    location: 'RS',
    tag: 'Tecnologia',
    image: '/assets/palestrantes/Marco_Toledo.png',
    bio:
      'Técnico em telecomunicações e projetista, com mais de 30 anos de atuação no desenvolvimento de equipamentos e soluções tecnológicas para a gastronomia profissional. Seu trabalho conecta engenharia, prática de mercado e inovação aplicada à panificação.',
  },
  {
    id: 'fernando-silveira',
    day: 'sexta',
    stage: 'fermento',
    time: '17:00 às 17:50',
    speaker: 'Fernando Silveira',
    title: ' Fornadas de estratégias para melhorar as Vendas!',
    initials: 'FS',
    location: 'Belo Horizonte',
    organization: 'Sebrae',
    status: 'Confirmado',
    tag: 'Vendas',
    bio:
      'Administrador e contador pela PUC Minas, com MBA em Finanças pelo IBMEC, atua há mais de 15 anos com desenvolvimento e gestão, integrando finanças, marketing, vendas e distribuição. Já realizou centenas de palestras e consultorias.',
  },
  {
    id: 'felipe-vidotte',
    day: 'sexta',
    stage: 'fermento',
    time: '18:00 às 19:50',
    speaker: 'Felipe Vidotte',
    title: 'Inovação na Gestão: IA como receita de sucesso',
    initials: 'FV',
    location: 'Belo Horizonte',
    format: 'Inovação e tecnologia',
    tag: 'IA e performance',
    image: '/assets/palestrantes/Filipe%20Vidotti.png',
    bio:
      'Profissional com mais de 15 anos de experiência no mercado digital, formado em Sistemas de Informação e atuante na transformação de negócios por meio de tecnologia e inteligência artificial. Hoje lidera a área de consultoria da 3M Consultoria.',
  },
  {
    id: 'abip',
    day: 'sabado',
    stage: 'principal',
    time: '09:00 às 13:00',
    speaker: 'ABIP',
    title: 'Inteligência de Mercado',
    initials: 'AB',
    organization: 'ABIP',
    tag: 'Institucional',
    image: '/assets/palestrantes/abip-brasil-size-min.png',
    cardLayout: 'flyer',
  },
  {
    id: 'patricia-marques',
    day: 'sabado',
    stage: 'principal',
    time: '14:40 às 15:30',
    speaker: 'Patrícia Marques',
    title: 'Comunicação que posiciona. Como Construir Autoridade e Influenciar Pessoas. Em um mercado onde falta gente e sobra concorrente',
    initials: 'PM',
    location: 'Belo Horizonte',
    tag: 'Curadoria',
    image: '/assets/palestrantes/Patricia.png',
    bio:
      'Consultora em estruturação de processos, marketing e atendimento ao cliente, graduada em Publicidade e Propaganda, com pós em Psicologia Organizacional. Atua em todo o Brasil com treinamentos, palestras e curadoria de eventos corporativos.',
  },
  {
    id: 'weverton-sabado',
    day: 'sabado',
    stage: 'principal',
    time: '15:30 às 16:20',
    speaker: 'Dr. Weverton Vilas Boas de Castro',
    title: 'Os impactos da reforma tributária na panificação',
    initials: 'WV',
    location: 'Belo Horizonte',
    format: 'Tributação',
    tag: 'Reforma tributária',
    image: '/assets/palestrantes/Weverton_Vilas_Boas.png',
    bio:
      'Advogado, gestor e especialista em governança e desenvolvimento institucional. Graduado em Direito e Relações Internacionais, possui mestrado em Direito Público e pós-graduação em Direito Internacional e Tributário.',
  },
  {
    id: 'ze-felipe',
    day: 'sabado',
    stage: 'principal',
    time: '16:30 às 17:20',
    speaker: 'Zé Felipe',
    title: 'Sede de Vencer',
    initials: 'ZF',
    location: 'Belo Horizonte',
    organization: 'Sebrae',
    format: 'Case de sucesso',
    tag: 'Case inspirador',
    image: '/assets/palestrantes/Ze_Felipe.png',
    bio:
      'Líder conhecido por revolucionar o mercado com marcas como Wäls e K-Happy, José Felipe Carneiro construiu uma carreira ligada à inovação, estratégia e transformação de negócios.',
  },
  {
    id: 'fernando-sardinha',
    day: 'sabado',
    stage: 'principal',
    time: '17:30 às 18:20',
    speaker: 'Fernando Sardinha',
    title: 'A Receita do Crescimento: Comunicação, Influência e Autoridade',
    initials: 'FS',
    location: 'São Paulo',
    tag: 'Comunicação',
    image: '/assets/palestrantes/Fernando_Sardinha.png',
    bio:
      'Palestrante internacional, comediante e especialista em comunicação há 14 anos, desenvolveu um método voltado a empresários e CEOs que desejam ganhar palco, presença em vídeo e autoridade com leveza e impacto.',
  },
  {
    id: 'fernando-bebber',
    day: 'sabado',
    stage: 'principal',
    time: '18:30 às 19:20',
    speaker: 'Fernando Bebber',
    title: 'PAM: Padaria Artesanal Mineira. Todos juntos pelo pão.',
    initials: 'FB',
    location: 'Belo Horizonte',
    format: 'Fermentação natural',
    tag: 'Pão artesanal',
    image: '/assets/palestrantes/Fernando_Bber.png',
  },
  {
    id: 'patrick-catapano',
    day: 'sabado',
    stage: 'principal',
    time: 'A confirmar',
    speaker: 'Patrick Catapano',
    title: 'Tema a definir',
    initials: 'PC',
    format: 'Convidado',
    tag: 'Convidado especial',
  },
  {
    id: 'carol-vilaca',
    day: 'sabado',
    stage: 'feminino',
    time: '15:30 às 16:20',
    speaker: 'Carol Vilaça',
    title: 'Mindset de Liderança Feminina: a intuição como ingrediente na era da I.A.',
    initials: 'CV',
    location: 'Belo Horizonte',
    format: 'Especialista em vendas',
    tag: 'Liderança',
    image: '/assets/palestrantes/Carol_Vilaca.png',
    bio:
      'Autora do livro Vendedora Raiz, é palestrante, mentora, treinadora e professora. Com 24 anos de experiência em vendas, gestão comercial e liderança, tem como propósito inspirar profissionais e equipes.',
  },
  {
    id: 'rose-mafille',
    day: 'sabado',
    stage: 'feminino',
    time: '16:30 às 17:20',
    speaker: 'Rose Mafille',
    title: 'A Virada de Chave da Mulher na Empresa Familiar',
    initials: 'RM',
    location: 'Belo Horizonte',
    format: 'Talk show',
    tag: 'Empresa familiar',
    image: '/assets/palestrantes/rose_maffille_no_background_min.png',
    bio:
      'É proprietária da Padaria Maffille, vencedora do prêmio de Melhor Padaria pela Revista Panificação Brasileira. Com mais de 10 anos de experiência no setor, é curadora da Padaria Modelo e se destaca pela sua atuação estratégica na gestão de produção. \n Nascida em Barbacena e residente em Belo Horizonte há mais de 12 anos, encontrou na panificação sua verdadeira vocação. À frente da Maffille, consolidou a marca como referência no segmento, conquistando, em apenas 3 anos, um dos prêmios mais conceituados da panificação brasileira. É administradora e gestora de expansão da Rede Mafille, reconhecida como uma das padarias de maior destaque em Belo Horizonte. Com mais de 10 anos de experiência no setor da panificação, construiu uma trajetória marcada pela liderança estratégica, visão de crescimento e forte atuação feminina no mercado. Sua carreira se destaca pela capacidade de unir gestão, inovação e desenvolvimento de equipes em um segmento cada vez mais competitivo.',
  },
  {
    id: 'karla-rocha',
    day: 'sabado',
    stage: 'feminino',
    time: '17:30 às 18:20',
    speaker: 'Karla Rocha',
    title: 'Empreendedorismo Feminino: O Legado',
    initials: 'KR',
    location: 'Belo Horizonte',
    organization: 'Abrasel',
    tag: 'Legado',
    image: '/assets/palestrantes/Karla_Rocha.png',
    bio:
      'Presidente da Abrasel em Minas Gerais e primeira mulher a ocupar o cargo no estado, é sócia-proprietária e terceira geração do tradicional Bolão Santa Tereza. Sua atuação une tradição, gastronomia e liderança institucional.',
  },
  {
    id: 'renata-albertina',
    day: 'sabado',
    stage: 'feminino',
    time: '18:30 às 19:00',
    speaker: 'Renata, Albertina Pães',
    title: 'Painel Inspiração. Projeto Levain-te',
    initials: 'RA',
    location: 'Belo Horizonte',
    organization: 'Albertina Pães',
    tag: 'Novo negócio',
    image: '/assets/palestrantes/Renata_Rocha.png',
    bio:
      'Arquiteta por quase vinte anos, migrou para a panificação após uma jornada de estudo sobre fermentação natural. Com formação internacional e olhar metodológico herdado da arquitetura, transformou o hobby em ofício e negócio.',
  },
  {
    id: 'william-mattos',
    day: 'sabado',
    stage: 'fermento',
    time: '14:00 às 15:00',
    speaker: 'William Mattos',
    title: 'Painel Liderança na panificação',
    initials: 'WM',
    location: 'Belo Horizonte',
    format: 'Painel',
    tag: 'Liderança',
    image: '/assets/palestrantes/William_Matos.png',
    bio:
      'Publicitário com mais de R$ 20 milhões em faturamento gerado em vendas e marketing, é fundador da Forno Criativo, consultor comercial da Abrasel Minas e mentor focado em resultados para gastronomia e food service.',
  },
  {
    id: 'juliana-goncalves',
    day: 'sabado',
    stage: 'fermento',
    time: '15:00 às 15:50',
    speaker: 'Juliana Gonçalves',
    title: 'A sua Empresa Familiar tem Futuro?',
    initials: 'JG',
    location: 'São Paulo',
    tag: 'Sucessão',
    image: '/assets/palestrantes/Juliana_Goncalves_no_background_min.png',
    bio:
      'Atua na profissionalização de famílias empresárias há 20 anos, com a estruturação da governança corporativa e familiar, Conselhos de Administração, de Família e de Herdeiros, de Sócios, Acordos de Acionistas, Protocolos de Família, planejamento sucessório, projeto de desenvolvimento da família e Mediação de Conflitos.',
  },
  {
    id: 'claudete-bunge',
    day: 'sabado',
    stage: 'fermento',
    time: '16:00 às 16:50',
    speaker: 'Claudete Bunge',
    title: 'De Grão em Pão: formando profissionais para o mercado da Panificação',
    initials: 'CB',
    organization: 'Sebrae',
    tag: 'Formação',
    image: '/assets/palestrantes/Claudete.png',
    bio:
      'Coordenadora de programas sociais da Fundação Bunge. Formada em Comunicação Social, com pós-graduação em Comunicação Organizacional e especialização em Marketing Digital, atua na coordenação de projetos sociais voltados à formação.',
  },
  {
    id: 'ph',
    day: 'sabado',
    stage: 'fermento',
    time: '17:00 às 18:50',
    speaker: 'PH',
    title: 'Gestão',
    initials: 'PH',
    location: 'Belo Horizonte',
    tag: 'Mão de obra não é desfio é solução',
    image: '/assets/palestrantes/Pedro_Henrique.png',
    bio:
      'Pedro Henrique Oliveira é empresário, marketólogo e especialista em marketing e gestão. Professor da pós-graduação do Senac Minas, consultor do Sebrae Nacional e criador da metodologia GASTROLOGIA.',
  },
  {
    id: 'marilda',
    day: 'sabado',
    stage: 'fermento',
    time: '19:00 às 20:00',
    speaker: 'Marilda',
    title: 'Padaria do Futuro',
    initials: 'MA',
    location: 'Belo Horizonte',
    format: 'Fermentação natural',
    tag: 'Futuro',
  },
  {
    id: 'fernando-quadros',
    day: 'domingo',
    stage: 'principal',
    time: '13:00 às 13:50',
    speaker: 'Dr. Fernando Quadros',
    title: 'O Direito do Trabalho e Futuro das relações trabalhistas.',
    initials: 'FQ',
    location: 'Belo Horizonte',
    format: 'Direito do trabalho',
    tag: 'Trabalho e gestão',
    image: '/assets/palestrantes/fernando_quadros_no_background_min.png',
    bio:
      'Fernando Quadros, natural de Belo Horizonte, Graduado em Direito pela FUMEC, Mestre em Direito pela Universidade Gama Filho/RJ, Advogado na área empresarial com experiência de atuação para redes de panificação, Professor Universitário desde 2001, foi Conselheiro e Diretor da OAB/MG, ex-Presidente da Associação dos Advogados de Minas Gerais.',
  },
  {
    id: 'paulo-padaria-sem-segredo',
    day: 'domingo',
    stage: 'principal',
    time: '14:00 às 14:50',
    speaker: 'Paulo Dourado',
    title: 'Padaria sem segredo.',
    initials: 'PS',
    location: 'São Paulo',
    tag: 'Em atualização',
    image: '/assets/palestrantes/Paulo_Dourado_no_background_min.png',
    bio:
      'Paulo Dourado é um padeiro e empresário com mais de 15 anos de experiência no ramo da panificação. Ele é o fundador do Padaria Sem Segredos, o maior canal de panificação do Brasil, que impacta milhões de pessoas diariamente através das redes sociais. Sua trajetória começou de forma simples, com poucos recursos, e hoje ele lidera um negócio com múltiplas unidades. Ao longo dos anos, Paulo se tornou uma referência nacional ao ensinar, de forma prática e acessível, receitas, técnicas de produção e gestão para padarias.',
  },
  {
    id: 'junior-sardinha',
    day: 'domingo',
    stage: 'principal',
    time: '15:00 às 16:00',
    speaker: 'Júnior Mafille e Fernando Sardinha',
    title: 'O Posicionamento que vende',
    initials: 'JF',
    location: 'Belo Horizonte',
    format: 'Talk show',
    tag: 'Posicionamento',
    images: [
      '/assets/palestrantes/Junior_Maffille.png',
      '/assets/palestrantes/Fernando_Sardinha.png',
    ],
    bio:
      'Criado na zona rural de Viçosa, Júnior Mafille iniciou sua trajetória empresarial ainda jovem e construiu uma carreira de destaque no setor de panificação. Com mais de 25 anos de experiência, lidera uma rede de padarias, restaurantes e negócios correlatos.',
  },
  {
    id: 'junior-convidados-domingo',
    day: 'domingo',
    stage: 'principal',
    time: '16:00 às 17:00',
    speaker: 'Júnior Mafille recebe: Tarcísio Andrade e Vinícius Dantas',
    title: 'A história atrás da panificação',
    initials: 'JC',
    location: 'Belo Horizonte',
    format: 'Talk show',
    tag: 'Histórias',
    images: [
      '/assets/palestrantes/Junior_Maffille.png',
      '/assets/palestrantes/Tarcisio_Andrade_No_Background_min.png',
      '/assets/palestrantes/Vinicius_Dantas_no_background_min.png',
    ],
    bio:
      'Criado na zona rural de Viçosa, Júnior Mafille iniciou sua trajetória empresarial ainda jovem e construiu uma carreira de destaque no setor de panificação. Com mais de 25 anos de experiência, lidera uma rede de padarias, restaurantes e negócios correlatos.',
  },
  {
    id: 'tiao',
    day: 'domingo',
    stage: 'principal',
    time: 'A confirmar',
    speaker: 'Tião',
    title: 'Circular nos stands',
    initials: 'TI',
    format: 'Ativação especial',
    tag: 'Atração especial',
    image: '/assets/palestrantes/Tiao_Bruto.png',
  },
  {
    id: 'sueli-braga',
    day: 'domingo',
    stage: 'feminino',
    time: '11:00 às 12:00',
    speaker: 'Sueli Braga',
    title: 'Padaria lotada todos os dias',
    initials: 'SB',
    location: 'Belo Horizonte',
    tag: 'Marketing',
    image: '/assets/palestrantes/Sueli_Braga.png',
    bio:
      'Especialista em tráfego pago desde 2019, ajuda empresários a atrair mais clientes pela internet. É fundadora do projeto Insta Padaria, dedicado a posicionamento digital, presença online e anúncios pagos para panificadores.',
  },
  {
    id: 'feminino-domingo-confirmar',
    day: 'domingo',
    stage: 'feminino',
    time: '15:00 às 16:00',
    speaker: 'Nome a definir',
    title: 'Tema a definir',
    initials: '--',
    status: 'Programação em atualização',
    tag: 'Em breve',
  },
  {
    id: 'rose-avila',
    day: 'domingo',
    stage: 'feminino',
    time: '16:00 às 17:00',
    speaker: 'Rose Ávila',
    title: 'O poder feminino que transforma segurança em lucro!',
    initials: 'RA',
    location: 'Belo Horizonte',
    tag: 'Segurança de alimentos',
    image: '/assets/palestrantes/Rose_Avila.png',
    bio:
      'Bióloga, auditora líder em FSSC 22000 e especialista em Vigilância Sanitária e epidemiologia, atua com gestão da segurança de alimentos, assuntos regulatórios, controle de qualidade e consultoria para entidades do setor alimentício.',
  },
  {
    id: 'marcos-resende',
    day: 'domingo',
    stage: 'fermento',
    time: '14:00 às 14:50',
    speaker: 'Marcos Resende',
    title: 'Como agregar valor com o cafezinho na padaria',
    initials: 'MR',
    location: 'Belo Horizonte',
    tag: 'Café',
    image: '/assets/palestrantes/Marcos_Rezende.png',
    bio:
      'Diretor da Agro Cegê Participações, construiu trajetória ligada a negócios, tecnologia, educação a distância e sucessão no mercado de cafés especiais. Une visão empresarial, inovação e experiência em formação de mercado.',
  },
  {
    id: 'felipe-perna',
    day: 'domingo',
    stage: 'fermento',
    time: '16:00 às 16:50',
    speaker: 'Felipe Perna',
    title: 'Crescimento inteligente para padarias: faça seu dinheiro trabalhar para você',
    initials: 'FP',
    location: 'Belo Horizonte',
    tag: 'Investimentos',
    image: '/assets/palestrantes/Felipe_Perna.png',
    bio:
      'Empresário, palestrante e investidor, atua como diretor executivo da Way Capital. Passou por empresas como RD Station e Sympla, e hoje ajuda empresários em estratégias de alavancagem, aquisição de ativos e investimentos.',
  },
];

const stageMeta = stages.reduce(
  (acc, stage) => ({ ...acc, [stage.id]: stage }),
  {} as Record<StageId, (typeof stages)[number]>,
);

const stageOrder: Array<Exclude<StageId, 'todos'>> = ['principal', 'feminino', 'fermento'];

const ProgramacaoEventos = () => {
  const [selectedDay, setSelectedDay] = useState<DayId>('sexta');
  const [selectedStage, setSelectedStage] = useState<StageId>('todos');
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  const activeDay = days.find((day) => day.id === selectedDay) ?? days[0];

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesDay = event.day === selectedDay;
      const matchesStage = selectedStage === 'todos' || event.stage === selectedStage;
      return matchesDay && matchesStage;
    });
  }, [selectedDay, selectedStage]);

  const visibleStages = stageOrder.filter((stage) =>
    filteredEvents.some((event) => event.stage === stage),
  );

  return (
    <section id="programacao" className="py-20 bg-gradient-elegant">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-stretch mb-10">
            <div className="bg-brown-dark text-white rounded-lg p-7 md:p-9 shadow-elegant">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-wide">
                <Sparkles className="h-4 w-4 text-primary" />
                Panifair 2026
              </span>
              <h2 className="font-playfair text-4xl md:text-5xl font-bold leading-tight mt-6 mb-5">
                Programação oficial de eventos e palestras
              </h2>
              <p className="text-white/82 text-lg leading-8 max-w-3xl">
                Três dias de conteúdo para panificação, confeitaria, gestão, varejo,
                inovação, liderança e negócios, organizados por dia e por palco.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 lg:grid-cols-1 gap-4">
              {days.map((day) => (
                <button
                  key={day.id}
                  type="button"
                  onClick={() => {
                    setSelectedDay(day.id);
                    setSelectedStage('todos');
                  }}
                  className={`text-left bg-card border rounded-lg p-5 shadow-card transition-all duration-300 ${
                    selectedDay === day.id
                      ? 'border-primary shadow-elegant ring-2 ring-primary/20'
                      : 'border-border/60 hover:border-primary/50 hover:shadow-elegant'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <span className="text-sm font-semibold text-muted-foreground">
                        {day.date}
                      </span>
                      <h3 className="font-playfair text-2xl font-bold text-foreground">
                        {day.label}
                      </h3>
                    </div>
                    <CalendarDays className="h-6 w-6 text-primary" />
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 text-primary" />
                    Feira: {day.fairHours}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border/60 rounded-lg shadow-elegant p-5 md:p-7">
            <div className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-6 mb-7">
              <div>
                <span className="text-sm font-bold uppercase tracking-wide text-primary">
                  {activeDay.date}
                </span>
                <h3 className="font-playfair text-3xl md:text-4xl font-bold text-foreground mt-2">
                  {activeDay.title}
                </h3>
                <p className="text-muted-foreground leading-7 mt-3 max-w-3xl">
                  {activeDay.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {stages.map((stage) => (
                  <button
                    key={stage.id}
                    type="button"
                    onClick={() => setSelectedStage(stage.id)}
                    className={`rounded-full border px-4 py-2 text-sm font-bold transition-all duration-300 ${
                      selectedStage === stage.id
                        ? stage.className
                        : 'border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground'
                    }`}
                  >
                    {stage.shortLabel}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 mb-9">
              <SummaryCard label="Palestras e talks" value={filteredEvents.length.toString()} />
              <SummaryCard
                label="Palcos ativos"
                value={visibleStages.length.toString()}
              />
              <SummaryCard label="Horário da feira" value={activeDay.fairHours} />
            </div>

            <div className="space-y-10">
              {visibleStages.map((stageId) => {
                const stage = stageMeta[stageId];
                const stageEvents = filteredEvents.filter((event) => event.stage === stageId);

                return (
                  <div key={stageId}>
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-4">
                      <div>
                        <span
                          className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wide ${stage.className}`}
                        >
                          {stage.label}
                        </span>
                        <h4 className="font-playfair text-2xl font-bold text-foreground mt-3">
                          {stage.description}
                        </h4>
                      </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-5">
                      {stageEvents.map((event) => (
                        <div
                          key={event.id}
                          className={
                            event.highlight === 'international' || event.cardLayout === 'flyer'
                              ? 'lg:col-span-2'
                              : undefined
                          }
                        >
                          <EventCard
                            event={event}
                            stage={stage}
                            onOpen={() => setSelectedEvent(event)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {selectedEvent && (
        <EventDetailsModal
          event={selectedEvent}
          stage={stageMeta[selectedEvent.stage]}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </section>
  );
};

const SummaryCard = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-lg border border-border/60 bg-background p-4">
    <span className="text-sm text-muted-foreground">{label}</span>
    <strong className="block text-2xl font-bold text-foreground mt-1">{value}</strong>
  </div>
);

const speakerPhotoUrls = (event: Pick<EventItem, 'image' | 'images'>): string[] | null => {
  const fromList = event.images?.filter(Boolean);
  if (fromList?.length) return fromList;
  if (event.image) return [event.image];
  return null;
};

const SpeakerPhotoStack = ({
  event,
  isInternational,
  variant,
}: {
  event: EventItem;
  isInternational: boolean;
  variant: 'card' | 'modal';
}) => {
  const urls = speakerPhotoUrls(event);
  const frameBorder = isInternational
    ? 'border-amber-400/50 shadow-inner ring-1 ring-white/60'
    : 'border-border/70';
  const initialsClass =
    variant === 'modal'
      ? 'text-4xl font-playfair font-bold text-brown-dark'
      : 'text-2xl font-playfair font-bold text-brown-dark';

  if (!urls?.length) {
    return (
      <div
        className={`flex aspect-[4/5] items-center justify-center overflow-hidden rounded-lg border bg-gradient-to-br from-primary/25 to-brown-light/25 ${frameBorder}`}
      >
        <span className={initialsClass}>{event.initials}</span>
      </div>
    );
  }

  if (urls.length === 1) {
    const fitContain = event.imageFit === 'contain';
    return (
      <div
        className={`flex aspect-[4/5] items-center justify-center overflow-hidden rounded-lg border ${frameBorder} ${
          fitContain
            ? 'bg-card p-3'
            : 'bg-gradient-to-br from-primary/25 to-brown-light/25'
        }`}
      >
        <img
          src={urls[0]}
          alt={event.speaker}
          className={fitContain ? 'h-full w-full object-contain' : 'h-full w-full object-cover'}
        />
      </div>
    );
  }

  return (
    <div className="flex min-h-0 flex-col gap-3">
      {urls.map((src, idx) => {
        const slotHeight =
          variant === 'modal' ? 'h-[200px] sm:h-[220px]' : 'h-[184px] sm:h-[200px]';
        return (
          <div
            key={`${src}-${idx}`}
            className={`relative flex w-full shrink-0 flex-col overflow-hidden rounded-lg border bg-gradient-to-br from-primary/25 to-brown-light/25 ${slotHeight} ${frameBorder}`}
          >
            <div className="flex min-h-0 flex-1 flex-col justify-end px-2 pb-0 pt-0 leading-none sm:px-2.5">
              <img
                src={src}
                alt={`${event.speaker} — ${idx + 1}`}
                className="block max-h-full w-full object-contain object-bottom"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

const FlyerEventCard = ({
  event,
  stage,
  onOpen,
}: {
  event: EventItem;
  stage: (typeof stages)[number];
  onOpen: () => void;
}) => {
  const flyerSrc = event.image;
  if (!flyerSrc) return null;

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-amber-200/55 bg-gradient-to-b from-amber-50/50 via-card to-background shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-elegant">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-500 via-primary to-amber-700"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 top-24 h-72 w-72 rounded-full bg-primary/12 blur-3xl"
        aria-hidden
      />

      <div className="relative z-[1] flex flex-col gap-4 border-b border-border/60 bg-gradient-to-r from-card via-card to-amber-50/40 px-5 py-5 sm:px-7 sm:py-6 md:flex-row md:items-end md:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1 text-xs font-bold text-brown-dark">
              <Clock className="h-3.5 w-3.5 shrink-0 text-primary" />
              {event.time}
            </span>
            <span
              className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${stage.className}`}
            >
              {stage.shortLabel}
            </span>
            <span className="inline-flex items-center rounded-full border border-amber-500/35 bg-amber-100/90 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.12em] text-amber-950">
              Flyer oficial
            </span>
          </div>
          <h3 className="font-playfair mt-3 text-[clamp(1.35rem,3.5vw,2rem)] font-extrabold leading-tight tracking-tight text-foreground md:text-[2.125rem]">
            {event.speaker}
          </h3>
          <p className="mt-2 text-base font-medium leading-relaxed text-muted-foreground md:text-lg">
            {event.title}
          </p>
        </div>
        {event.organization && (
          <p className="shrink-0 text-sm font-semibold text-muted-foreground md:max-w-[12rem] md:text-right">
            {event.organization}
          </p>
        )}
      </div>

      <div className="relative z-[1] p-4 sm:p-6 md:p-8">
        <div className="relative overflow-hidden rounded-xl border border-amber-900/12 bg-gradient-to-b from-white to-amber-50/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] ring-1 ring-black/[0.06]">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-10%,rgba(251,191,36,0.18),transparent_55%)]"
            aria-hidden
          />
          <img
            src={flyerSrc}
            alt={`${event.speaker} — ${event.title}`}
            className="relative z-[1] mx-auto block w-full max-h-[min(78vh,820px)] object-contain px-2 py-3 sm:px-4 sm:py-5"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="mt-5 flex flex-col gap-4 border-t border-border/50 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Arte de divulgação da ABIP para este bloco da programação — material visual, sem currículo de
            palestrante.
          </p>
          <div className="flex shrink-0 flex-wrap items-center gap-3">
            <span className="rounded-full bg-primary/12 px-3 py-1.5 text-xs font-bold text-brown-dark">
              {event.tag}
            </span>
            <button
              type="button"
              onClick={onOpen}
              className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/5 px-4 py-2 text-sm font-bold text-primary transition-colors hover:bg-primary/15"
            >
              Ampliar flyer
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

const EventCard = ({
  event,
  stage,
  onOpen,
}: {
  event: EventItem;
  stage: (typeof stages)[number];
  onOpen: () => void;
}) => {
  if (event.cardLayout === 'flyer' && event.image) {
    return <FlyerEventCard event={event} stage={stage} onOpen={onOpen} />;
  }

  const isInternational = event.highlight === 'international';
  const stackedPhotos = speakerPhotoUrls(event);
  const isDualStack = (stackedPhotos?.length ?? 0) >= 2;

  const details = [
    event.location && { icon: MapPin, label: event.location },
    event.organization && { icon: Mic2, label: event.organization },
    event.format && { icon: UserRound, label: event.format },
    event.status &&
      !(isInternational && event.status === 'Presença internacional') && {
        icon: Sparkles,
        label: event.status,
      },
  ].filter(Boolean) as Array<{ icon: typeof Clock; label: string }>;

  return (
    <article
      className={`relative h-full overflow-hidden rounded-2xl border shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-elegant ${
        isInternational
          ? 'border-amber-400/55 bg-gradient-to-br from-amber-50/90 via-card to-sky-50/40 ring-1 ring-amber-300/40 hover:ring-amber-400/55'
          : 'rounded-lg border-border/60 bg-background'
      }`}
    >
      {isInternational && (
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-amber-400 via-primary to-sky-500"
          aria-hidden
        />
      )}
      {isInternational && (
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-amber-400/15 blur-3xl"
          aria-hidden
        />
      )}
      <div
        className={`grid h-full ${
          isInternational
            ? 'sm:grid-cols-[minmax(140px,200px)_1fr] lg:grid-cols-[220px_1fr]'
            : isDualStack
              ? 'sm:grid-cols-[158px_1fr]'
              : 'sm:grid-cols-[132px_1fr]'
        }`}
      >
        <div
          className={`flex flex-col p-4 ${isInternational ? 'bg-gradient-to-b from-amber-100/50 to-muted/60' : 'bg-muted/60'}`}
        >
          <SpeakerPhotoStack event={event} isInternational={isInternational} variant="card" />
        </div>

        <div className="relative z-[1] flex min-h-full flex-col p-5">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            {isInternational && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-gradient-to-r from-amber-100 to-amber-50 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide text-amber-950 shadow-sm">
                <Globe className="h-3.5 w-3.5 text-sky-700" aria-hidden />
                Presença internacional
              </span>
            )}
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/12 px-3 py-1 text-xs font-bold text-brown-dark">
              <Clock className="h-3.5 w-3.5 text-primary" />
              {event.time}
            </span>
            <span
              className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${stage.className}`}
            >
              {stage.shortLabel}
            </span>
          </div>

          <h5
            className={`font-bold leading-tight text-foreground ${isInternational ? 'font-playfair text-2xl md:text-[1.65rem]' : 'text-xl'}`}
          >
            {event.speaker}
          </h5>
          <p
            className={`mt-2 font-medium leading-7 text-muted-foreground ${isInternational ? 'text-base md:text-lg' : ''}`}
          >
            {event.title}
          </p>

          {details.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-4 text-sm text-muted-foreground">
              {details.map(({ icon: Icon, label }) => (
                <span key={label} className="inline-flex items-center gap-1.5">
                  <Icon className="h-4 w-4 text-primary" />
                  {label}
                </span>
              ))}
            </div>
          )}

          <div className="mt-5 rounded-lg border border-border/60 bg-card/70 p-4">
            <span className="text-xs font-bold uppercase tracking-wide text-primary">
              Mini currículo
            </span>
            <p className="mt-2 text-sm leading-6 text-muted-foreground [display:-webkit-box] [-webkit-line-clamp:4] [-webkit-box-orient:vertical] overflow-hidden">
              {event.bio ?? 'Currículo em breve.'}
            </p>
            {event.bioGuest && (
              <>
                <span className="mt-3 block text-xs font-bold uppercase tracking-wide text-primary">
                  {event.bioGuestHeading ?? 'Convidado'}
                </span>
                <p className="mt-2 text-sm leading-6 text-muted-foreground [display:-webkit-box] [-webkit-line-clamp:4] [-webkit-box-orient:vertical] overflow-hidden">
                  {event.bioGuest}
                </p>
              </>
            )}
          </div>

          <div className="mt-auto pt-5 flex items-center justify-between gap-4">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-brown-dark">
              {event.tag}
            </span>
            <button
              type="button"
              onClick={onOpen}
              className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-sm font-bold text-primary transition-colors hover:bg-primary/10"
            >
              Detalhes
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

const EventDetailsModal = ({
  event,
  stage,
  onClose,
}: {
  event: EventItem;
  stage: (typeof stages)[number];
  onClose: () => void;
}) => {
  const isInternational = event.highlight === 'international';
  const isFlyer = event.cardLayout === 'flyer' && Boolean(event.image);
  const isDualModal = !isFlyer && (speakerPhotoUrls(event)?.length ?? 0) >= 2;

  if (isFlyer && event.image) {
    return (
      <div className="fixed inset-0 z-[70] flex items-center justify-center bg-brown-dark/75 px-3 py-6 backdrop-blur-sm sm:px-6">
        <div className="relative max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-2xl border border-amber-200/55 bg-gradient-to-b from-amber-50/40 via-card to-background shadow-premium ring-1 ring-black/[0.06]">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-500 via-primary to-amber-700"
            aria-hidden
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="absolute right-3 top-3 z-10 rounded-full bg-background/95 p-2 text-foreground shadow-card transition-colors hover:bg-primary hover:text-primary-foreground sm:right-4 sm:top-4"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="border-b border-border/60 bg-gradient-to-r from-card to-amber-50/35 px-5 pb-5 pt-6 pr-14 sm:px-8 sm:pb-6 sm:pt-8 sm:pr-16">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1 text-xs font-bold text-brown-dark">
                <Clock className="h-3.5 w-3.5 shrink-0 text-primary" />
                {event.time}
              </span>
              <span
                className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${stage.className}`}
              >
                {stage.label}
              </span>
              <span className="inline-flex items-center rounded-full border border-amber-500/35 bg-amber-100/90 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.12em] text-amber-950">
                Flyer oficial
              </span>
            </div>
            <h2 className="font-playfair mt-4 text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-4xl">
              {event.speaker}
            </h2>
            <p className="mt-2 text-lg font-medium text-muted-foreground">{event.title}</p>
          </div>

          <div className="p-4 sm:p-6 md:p-8">
            <div className="overflow-hidden rounded-xl border border-amber-900/10 bg-gradient-to-b from-white to-amber-50/40 shadow-inner ring-1 ring-black/[0.05]">
              <img
                src={event.image}
                alt={`${event.speaker} — ${event.title}`}
                className="mx-auto block w-full max-h-[min(80vh,880px)] object-contain px-2 py-4 sm:px-4 sm:py-6"
                loading="eager"
                decoding="async"
              />
            </div>
            <p className="mt-5 text-center text-sm text-muted-foreground">
              Material visual de divulgação — sem mini currículo de palestrante.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const details = [
    event.location && { icon: MapPin, label: event.location },
    event.organization && { icon: Mic2, label: event.organization },
    event.format && { icon: UserRound, label: event.format },
    event.status &&
      !(isInternational && event.status === 'Presença internacional') && {
        icon: Sparkles,
        label: event.status,
      },
  ].filter(Boolean) as Array<{ icon: typeof Clock; label: string }>;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-brown-dark/70 px-4 py-6 backdrop-blur-sm">
      <div
        className={`relative max-h-[90vh] w-full max-w-4xl overflow-y-auto shadow-premium ${
          isInternational
            ? 'rounded-2xl border border-amber-400/40 bg-gradient-to-br from-amber-50/30 via-card to-sky-50/25 ring-1 ring-amber-300/35'
            : 'rounded-lg bg-card'
        }`}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar detalhes"
          className="absolute right-4 top-4 z-10 rounded-full bg-background/90 p-2 text-foreground shadow-card transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          <X className="h-5 w-5" />
        </button>

        <div
          className={`grid ${isDualModal ? 'md:grid-cols-[minmax(280px,300px)_1fr]' : 'md:grid-cols-[260px_1fr]'}`}
        >
          <div className="flex flex-col bg-muted/60 p-5">
            <SpeakerPhotoStack event={event} isInternational={isInternational} variant="modal" />
          </div>

          <div className="p-6 md:p-8">
            <div className="mb-5 flex flex-wrap items-center gap-2">
              {isInternational && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/45 bg-gradient-to-r from-amber-100 to-amber-50 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-wide text-amber-950">
                  <Globe className="h-4 w-4 text-sky-700" aria-hidden />
                  Presença internacional
                </span>
              )}
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/12 px-3 py-1 text-xs font-bold text-brown-dark">
                <Clock className="h-3.5 w-3.5 text-primary" />
                {event.time}
              </span>
              <span
                className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${stage.className}`}
              >
                {stage.label}
              </span>
            </div>

            <h3
              className={`font-playfair font-bold leading-tight text-foreground ${isInternational ? 'text-3xl md:text-[2.35rem]' : 'text-3xl md:text-4xl'}`}
            >
              {event.speaker}
            </h3>
            <p className="text-lg text-muted-foreground font-medium leading-8 mt-3">
              {event.title}
            </p>

            {details.length > 0 && (
              <div className="flex flex-wrap gap-4 mt-5 text-sm text-muted-foreground">
                {details.map(({ icon: Icon, label }) => (
                  <span key={label} className="inline-flex items-center gap-1.5">
                    <Icon className="h-4 w-4 text-primary" />
                    {label}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-7 border-t border-border/70 pt-6">
              <span className="text-xs font-bold uppercase tracking-wide text-primary">
                Mini currículo
              </span>
              <p className="mt-3 text-muted-foreground leading-8">
                {event.bio ?? 'Currículo em breve.'}
              </p>
              {event.bioGuest && (
                <>
                  <span className="mt-5 block text-xs font-bold uppercase tracking-wide text-primary">
                    {event.bioGuestHeading ?? 'Convidado'}
                  </span>
                  <p className="mt-3 text-muted-foreground leading-8">{event.bioGuest}</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramacaoEventos;
