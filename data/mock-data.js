const candidates = [
  { id: 1, full_name: 'Ana Souza', display_name: 'Ana Souza', party: 'PA', is_active: true },
  { id: 2, full_name: 'Bruno Lima', display_name: 'Bruno Lima', party: 'PB', is_active: true },
  { id: 3, full_name: 'Carla Mendes', display_name: 'Carla Mendes', party: 'PC', is_active: false }
];

const records = [
  { date: '2026-04-01', source: 'Jornal A', category: 'Economia', candidate_id: 1, candidate: 'Ana Souza', theme: 'inflação', sentiment: 'positivo', title: 'Queda da inflação impulsiona aprovação de Ana' },
  { date: '2026-04-01', source: 'Jornal B', category: 'Saúde', candidate_id: 2, candidate: 'Bruno Lima', theme: 'SUS', sentiment: 'negativo', title: 'Críticas ao plano de saúde de Bruno' },
  { date: '2026-04-02', source: 'Jornal A', category: 'Economia', candidate_id: 2, candidate: 'Bruno Lima', theme: 'emprego', sentiment: 'positivo', title: 'Bruno propõe incentivo ao emprego' },
  { date: '2026-04-02', source: 'Portal C', category: 'Educação', candidate_id: 1, candidate: 'Ana Souza', theme: 'ensino técnico', sentiment: 'neutro', title: 'Debate técnico sobre ensino' },
  { date: '2026-04-03', source: 'Portal C', category: 'Segurança', candidate_id: 1, candidate: 'Ana Souza', theme: 'policiamento', sentiment: 'negativo', title: 'Questionamentos sobre plano de segurança' },
  { date: '2026-04-03', source: 'Jornal B', category: 'Saúde', candidate_id: 2, candidate: 'Bruno Lima', theme: 'atendimento básico', sentiment: 'neutro', title: 'Especialistas avaliam propostas de Bruno' },
  { date: '2026-04-04', source: 'Jornal A', category: 'Economia', candidate_id: 1, candidate: 'Ana Souza', theme: 'reforma tributária', sentiment: 'positivo', title: 'Mercado reage bem à proposta de Ana' },
  { date: '2026-04-04', source: 'Portal C', category: 'Educação', candidate_id: 2, candidate: 'Bruno Lima', theme: 'universidades', sentiment: 'negativo', title: 'Corte de verbas gera reação' }
];

module.exports = { candidates, records };
