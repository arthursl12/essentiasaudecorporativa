import { ServiceDetails, Testimonial } from './types';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  specialties: string[];
  borderColor: string;
  photo?: string;
  initials?: string;
}

export const HERO_METRICS = [
  {
    value: '↓ 35%',
    label: 'Redução do Absenteísmo',
    description: 'em programas recorrentes',
  },
  {
    value: '3×',
    label: 'ROI médio',
    description: 'em bem-estar corporativo',
  },
  {
    value: '+40%',
    label: 'eNPS',
    description: 'aumento satisfação interna',
  }
];

export interface PainCard {
  id: string;
  title: string;
  description: string;
  statistic: string;
  statSource: string;
}

export const PAIN_CARDS: PainCard[] = [
  {
    id: 'dor-1',
    title: 'Absenteísmo por Postura e Dores',
    description: 'Afastamentos por dores posturais, LER, DORT e estresse físico encarecem o plano de saúde corporativo e travam a produção operacional do dia a dia.',
    statistic: 'Até 60% dos afastamentos em escritórios estão associados a distúrbios osteomusculares preveníveis.',
    statSource: 'Relatório Nacional de Saúde Ocupacional'
  },
  {
    id: 'dor-2',
    title: 'Estresse e Risco de Burnout',
    description: 'Equipes no limite emocional produzem menos, cometem mais erros críticos e adoecem de forma silenciosa. Sem canais de suporte acessíveis, a crise com o colaborador é inevitável.',
    statistic: 'O esgotamento mental e o burnout reduzem em até 40% o engajamento e a produtividade global.',
    statSource: 'Fórum Econômico Mundial'
  },
  {
    id: 'dor-3',
    title: 'Desmotivação e Turnover de Talentos',
    description: 'Sem benefícios diferenciados que gerem acolhimento e pertinência, os melhores talentos partem. E o custo de reposição pesa gravemente no fluxo de caixa.',
    statistic: '74% dos colaboradores priorizam empresas com benefícios estruturados de saúde física e mental.',
    statSource: 'Pesquisa Global de Clima Organizacional'
  },
  {
    id: 'dor-4',
    title: 'SIPAT sem Estrutura e sem Engajamento',
    description: 'A SIPAT é obrigatória, mas organizar palestras relevantes, equipes de massagem qualificadas e garantir a adesão é um pesadelo logístico exaustivo para o RH.',
    statistic: '82% dos gestores de RH relatam sobrecarga operacional ao coordenar múltiplos fornecedores para a SIPAT.',
    statSource: 'Índice de Sobrecarga Operacional de RH'
  }
];

export const COMPARATIVE_ITEMS = {
  problemTitle: 'O que normalmente caberia ao seu RH resolver:',
  solutionTitle: 'Com a Essentia, tudo isso já está 100% incluso:',
  troubles: [
    'Locar e transportar cadeiras ergonômicas especiais',
    'Contratar, homologar e avaliar terapeutas e psicólogos',
    'Reservar, preparar e limpar o espaço físico corporativo',
    'Organizar listas de agendamento e gerenciar horários',
    'Monitorar pontualidade, fardamento e postura técnica',
    // 'Coletar feedbacks individuais e formatar relatórios'
  ],
  solutions: [
    'Cadeiras ergonômicas levadas, montadas e higienizadas por nós',
    'Equipe homologada, própria e altamente treinada',
    'Espaço configurado discretamente nos seus corredores ou salas',
    'Agendamento digital prático operado pelo nosso time',
    'Profissionais uniformizados, pontuais e extremamente discretos',
    // 'Relatório executivo de engajamento e métrica de adesão entregue'
  ]
};

export const SERVICES_AVULSO: ServiceDetails[] = [
  {
    pilar: 'PILAR 1',
    pilarNum: 1,
    title: 'Quick Massage Empresarial',
    description: 'Massoterapeutas altamente capacitados realizam sessões dinâmicas de massagem rápida para liberação física focando em nuca, ombros, costas e braços.',
    idealFor: [
      'SIPAT e Campanhas de Segurança do Trabalho',
      'Datas Comemorativas (Dia das Mães, dos Pais, Mulher)',
      'Ações pontuais de Endomarketing e Integração'
    ],
    duration: 'Ações de 4h a 8h no dia do evento (15 a 20 min por colaborador)'
  },
  {
    pilar: 'PILAR 2',
    pilarNum: 2,
    title: 'Psicologia Corporativa',
    description: 'Ações pontuais de conscientização emocional, palestras práticas de triagem psicológica preventiva e rodas de conversa guiadas.',
    idealFor: [
      'Palestras de Quebra de Tabu de Saúde Mental',
      'Eventos de Setembro Amarelo ou Janeiro Branco',
      'Workshop de Inteligência Emocional B2B'
    ],
    duration: 'Sessões e workshops agendados sob demanda do evento'
  },
  {
    pilar: 'PILAR 3',
    pilarNum: 3,
    title: 'Palestras de Saúde Corporativa',
    description: 'Conteúdo educativo, dinâmico e focado em engajamento real da equipe, instruindo boas práticas no próprio ambiente de trabalho.',
    idealFor: [
      'SIPATs com temas obrigatórios relevantes',
      'Capacitação rápida de líderes sobre saúde corporativa',
      'Programas sazonais de Ergonomia no Posto'
    ],
    duration: 'Sessões interativas de 60–90 minutos (Presencial ou Híbrido)'
  }
];

export const SERVICES_PERIODICO: ServiceDetails[] = [
  {
    pilar: 'PILAR 1',
    pilarNum: 1,
    title: 'Programa de Quick Massage Contínuo',
    description: 'Implantação de programa preventivo recorrente semanal, quinzenal ou mensal perfeitamente adaptado aos turnos e à rotina da operação.',
    idealFor: [
      'Geração de cultura de bem-estar corporativo ativo',
      'Diminuição progressiva de atestados médicos',
      'Enriquecimento do plano de benefícios atrativo'
    ],
    duration: 'Sessões recorrentes periódicas (15 a 20 min por colaborador)'
  },
  {
    pilar: 'PILAR 2',
    pilarNum: 2,
    title: 'Suporte & Plantão Psicológico',
    description: 'Desenvolvimento de canais discretos de plantão clínico emocional (in company e online) para prevenção ativa, alinhado às diretrizes da NR-1.',
    idealFor: [
      'Apoio à gestão de Riscos Psicossociais da NR-1',
      'Acompanhamento e suporte precoce anti-Burnout',
      'Escuta qualificada focando em mitigação de estresse'
    ],
    duration: 'Apoio mensal recorrente com relatórios gerais do RH'
  },
  {
    pilar: 'PILAR 3',
    pilarNum: 3,
    title: 'Ciclo de Palestras & QVP Continuado',
    description: 'Trilha educacional com campanhas coordenadas ao longo do ano inteiro para educar colaboradores e consolidar hábitos integrados de qualidade de vida.',
    idealFor: [
      'Consolidação de bem-estar como cultura empresarial',
      'Trilha de conteúdos mensais ou bimestrais sazonais',
      'Educação sistemática em ergonomia e autocuidado'
    ],
    duration: 'Programas de trilhas integradas ao ano operacional'
  }
];

export const PARTNERS_LOGOS = [
  { name: 'Stellantis', location: 'Betim', logoText: 'STELLANTIS' },
  { name: 'Localiza Co-working', location: 'Belo Horizonte', logoText: 'LOCALIZA' },
  { name: 'MRV Engenharia', location: 'Belo Horizonte', logoText: 'MRV' },
  { name: 'Banco Inter', location: 'Belo Horizonte', logoText: 'INTER' },
  { name: 'Unimed BH', location: 'Belo Horizonte', logoText: 'UNIMED BH' }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    quote: 'A parceria com a Essentia superou todas as expectativas. Implantamos o programa quinzenal de Quick Massage e em menos de 90 dias reduzimos queixas de dores musculares no RH em 35% e nosso eNPS de bem-estar disparou. O diferencial é a logística impecável deles: o RH não perde um minuto agendando ou montando espaço.',
    authorName: 'Amanda Silveira',
    authorRole: 'Gerente de DHO',
    authorCompany: 'Localiza',
    authorLocation: 'Belo Horizonte'
  },
  {
    id: 'test-2',
    quote: 'O Plantão Psicológico Corporativo da Essentia virou um marco de segurança para nossa empresa em Betim. Em tempos de extrema cobrança fabril, ter profissionais qualificados in company acolhendo nossa equipe atende com maestria as diretrizes de estresse psicossocial da NR-1 e melhora a retenção de talentos.',
    authorName: 'Carlos Eduardo',
    authorRole: 'Diretor de Recursos Humanos',
    authorCompany: 'Stellantis Brasil',
    authorLocation: 'Betim'
  },
  {
    id: 'test-3',
    quote: 'Foi a melhor SIPAT do nosso histórico. Organizamos em BH, Betim e Contagem. A Essentia trouxe toda a estrutura com rapidez, massoterapeutas altamente educados e uma palestra cativante de postura, ergonomia e saúde mental que engajou mais de 90% da nossa equipe. Recomendo fortemente.',
    authorName: 'Mariana Rocha',
    authorRole: 'Coordenadora de Qualidade de Vida',
    authorCompany: 'MRV Engenharia',
    authorLocation: 'Belo Horizonte - RMBH'
  }
];

export const STEPS = [
  {
    num: 1,
    title: 'Diagnóstico de Demanda',
    description: 'Nossa equipe conversa com seu RH para mapear tamanho do time, perfil de agendamentos e metas de bem-estar.',
    sub: 'Foco inicial',
    time: '~10 min',
    timeTagColor: 'grey'
  },
  {
    num: 2,
    title: 'Proposta Sob Medida',
    description: 'Enviamos um plano personalizado com escopo, orçamentos claros e propostas sem qualquer compromisso inicial.',
    sub: 'Orçamento ágil',
    time: 'Até 24h',
    timeTagColor: 'grey'
  },
  {
    num: 3,
    title: 'Agendamento & Briefing',
    description: 'Definimos a logística, o espaço ideal e disponibilizamos o nosso sistema para os agendamentos online individuais.',
    sub: 'Ajuste final',
    time: '15 min de RH',
    timeTagColor: 'grey'
  },
  {
    num: 4,
    title: 'Execução In Company',
    description: 'Profissionais chegam fardados com cadeiras ergonômicas especiais certificadas. Sucesso e relaxamento garantidos.',
    sub: 'Logística integrada',
    time: 'Estrutura Inclusa',
    timeTagColor: 'positive'
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'bhruna',
    name: 'Bhruna Azevedo',
    role: 'Técnica em Enfermagem do Trabalho & Massoterapeuta',
    bio: 'Na linha de frente do cuidado com o colaborador. Previne LER/DORT, reduz afastamentos e coloca a saúde do colaborador no centro da operação.',
    specialties: ['Saúde do Trabalho', 'Massoterapia Corporativa'],
    borderColor: '#5aaa5a',
    photo: '/images/team-bhruna.jpg',
    initials: 'BA'
  },
  {
    id: 'roseli',
    name: 'Roseli Santos',
    role: 'Psicóloga & Neuropsicóloga',
    bio: 'Especialista em saúde emocional e neuropsicologia. Atua na prevenção do Burnout com escuta clínica qualificada e intervenções práticas para equipes e líderes.',
    specialties: ['Psicologia Corporativa', 'Neuropsicologia', 'Prevenção de Burnout'],
    borderColor: '#63918b',
    photo: '/images/team-roseli.jpg',
    initials: 'RS'
  },
  {
    id: 'arthur',
    name: 'Arthur Lima',
    role: 'Engenheiro de Controle e Automação · Especialista em Saúde e Segurança do Trabalho',
    bio: 'Especialista em SST e inteligência analítica. Converte dados de afastamento e clima organizacional em estratégias de prevenção com ROI claro',
    specialties: ['Segurança do Trabalho', 'Inteligência de Dados', 'SST'],
    borderColor: '#1d5e6e',
    photo: '/images/team-arthur.jpg',
    initials: 'AL'
  }
];
