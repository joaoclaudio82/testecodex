# Arquitetura proposta (MVP)

## Visão de alto nível

O sistema é dividido em quatro blocos:

1. **Ingestão de notícias salvas**
   - Carrega notícias de uma fonte pré-existente (arquivo, fila ou tabela staging).

2. **Processamento e enriquecimento**
   - Identifica candidatos citados.
   - Identifica temas.
   - Executa análise de sentimento por candidato/tema no contexto da notícia.

3. **Persistência relacional**
   - PostgreSQL como base principal.
   - Estrutura normalizada para consultas analíticas.

4. **Camada de visualização**
   - Dashboards com filtros por candidato, categoria, fonte e período.

## Fluxo de dados

1. Notícia entra em `news`.
2. Processo de NLP classifica sentimento e temas.
3. Resultado é gravado em `news_candidate_sentiment`.
4. Dashboards consultam visões agregadas por janela de tempo.

## Métricas principais

- `aprovacao_pct`: % de menções positivas
- `rejeicao_pct`: % de menções negativas
- `indiferenca_pct`: % de menções neutras
- volume de menções por candidato
- distribuição por tema e fonte

## Regras de negócio (MVP)

- Escopo exclusivo para cargo `PRESIDENTE`.
- Uma notícia pode citar múltiplos candidatos.
- A mesma notícia pode ter sentimentos diferentes por candidato e por tema.
- Candidatos inativos não aparecem por padrão nos painéis.

## Rotas de interface

- `/`:
  - cards resumo
  - gráfico agregado da semana/mês
  - ranking por volume de menções

- `/analises`:
  - drill-down por candidato/tema
  - tabela com notícias e classificação

- `/candidatos`:
  - CRUD de candidatos
  - controle de ativo/inativo

- `/historico`:
  - séries temporais de aprovação/rejeição/indiferença
  - comparação entre candidatos

## Considerações técnicas

- Índices por data, candidato e fonte para desempenho.
- Possibilidade de materialized views para agregações frequentes.
- Auditoria de reprocessamentos via `processed_at` e versionamento de modelo.
