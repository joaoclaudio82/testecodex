# Monitor de Tendência Eleitoral (Presidência do Brasil)

Aplicação para monitorar tendências eleitorais de candidatos à Presidência do Brasil a partir de notícias já coletadas/salvas.

## Objetivo

Consolidar notícias em um banco PostgreSQL, relacionar conteúdos com candidatos presidenciais e gerar indicadores de sentimento ao longo do tempo.

## Escopo atual

Somente candidatos ao cargo de **Presidente**.

## Páginas

- `/` — Visão geral
- `/analises` — Análises detalhadas
- `/candidatos` — Gestão de candidatos presidenciais
- `/historico` — Evolução temporal dos indicadores

## Principais funcionalidades

1. **Ingestão e persistência de notícias**
   - Uso de notícias previamente salvas.
   - Armazenamento em PostgreSQL.
   - Relacionamento notícia ↔ candidato(s).

2. **Análise de sentimento**
   - Classificação por notícia, candidato e tema: `positivo`, `neutro`, `negativo`.

3. **Dashboards e filtros**
   - Gráficos e métricas por:
     - categoria
     - candidato
     - fonte
     - período

4. **Histórico temporal**
   - Série temporal para acompanhar evolução de:
     - aprovação
     - rejeição
     - indiferença

5. **Gestão de candidatos**
   - Cadastro/edição/ativação de candidatos presidenciais.

## Documentação complementar

- Arquitetura e fluxo de dados: `docs/arquitetura.md`
- Modelo de dados PostgreSQL (MVP): `docs/modelo-dados.sql`
- Backlog inicial e critérios de aceite: `docs/backlog-mvp.md`
