# Monitor de Tendência Eleitoral (MVP testável)

MVP funcional para acompanhar tendências eleitorais de candidatos à Presidência do Brasil com base em notícias salvas.

## O que já está implementado

- Rotas de páginas:
  - `/` (visão geral)
  - `/analises` (análises detalhadas)
  - `/candidatos` (gestão básica)
  - `/historico` (série temporal)
- API local para alimentar os dashboards:
  - `GET /api/overview`
  - `GET /api/analises`
  - `GET /api/historico`
  - `GET/POST/PATCH /api/candidatos`
- Dados de demonstração em memória para facilitar testes imediatos.

> Nota: o schema PostgreSQL está em `docs/modelo-dados.sql` e pode ser conectado na próxima etapa.

## Como testar agora

### 1) Instalar dependências

```bash
npm install
```

### 2) Subir o servidor

```bash
npm run dev
```

ou

```bash
npm start
```

### 3) Acessar no navegador

- http://localhost:3000/
- http://localhost:3000/analises
- http://localhost:3000/candidatos
- http://localhost:3000/historico

## Estrutura

- `src/server.js`: servidor Node.js (HTTP nativo) + rotas de página e API
- `public/*`: frontend estático (dashboards e tabelas)
- `data/mock-data.js`: base de notícias/candidatos para teste rápido
- `docs/modelo-dados.sql`: modelo PostgreSQL do domínio

## Próximo passo recomendado

Conectar os endpoints à base PostgreSQL e trocar `data/mock-data.js` por consultas SQL usando o schema do projeto.
