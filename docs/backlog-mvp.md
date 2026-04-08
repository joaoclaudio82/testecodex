# Backlog MVP

## Épico 1 — Base de dados e ingestão

- [ ] Criar migrations do schema PostgreSQL.
- [ ] Implementar importação de notícias salvas para tabela `news`.
- [ ] Implementar vínculo com `news_sources`.

**Critério de aceite**
- Dado um lote de notícias salvas, quando o import roda, então registros são persistidos sem duplicar URLs.

## Épico 2 — Processamento de sentimento

- [ ] Detectar candidatos mencionados por notícia.
- [ ] Classificar sentimento por candidato e tema.
- [ ] Salvar em `news_candidate_sentiment` com `model_version`.

**Critério de aceite**
- Para uma notícia com 2 candidatos, o sistema gera pelo menos 2 registros de sentimento.

## Épico 3 — Dashboards

- [ ] Página `/` com resumo geral.
- [ ] Página `/analises` com filtros por categoria/candidato/fonte.
- [ ] Página `/historico` com série temporal.

**Critério de aceite**
- Alterar filtros atualiza gráficos e métricas sem recarregar a página.

## Épico 4 — Gestão de candidatos

- [ ] CRUD em `/candidatos`.
- [ ] Marcação ativo/inativo.

**Critério de aceite**
- Candidato inativo não aparece no filtro padrão dos dashboards.
