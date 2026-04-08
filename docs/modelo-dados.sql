-- Modelo PostgreSQL (MVP)

CREATE TYPE sentiment_label AS ENUM ('positivo', 'neutro', 'negativo');
CREATE TYPE office_type AS ENUM ('PRESIDENTE');

CREATE TABLE candidates (
  id BIGSERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  display_name TEXT NOT NULL,
  party TEXT,
  office office_type NOT NULL DEFAULT 'PRESIDENTE',
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE news_sources (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  base_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE news (
  id BIGSERIAL PRIMARY KEY,
  source_id BIGINT NOT NULL REFERENCES news_sources(id),
  external_id TEXT,
  title TEXT NOT NULL,
  url TEXT NOT NULL UNIQUE,
  category TEXT,
  content TEXT,
  published_at TIMESTAMPTZ NOT NULL,
  ingested_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  processed_at TIMESTAMPTZ
);

CREATE TABLE themes (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE news_candidate_sentiment (
  id BIGSERIAL PRIMARY KEY,
  news_id BIGINT NOT NULL REFERENCES news(id) ON DELETE CASCADE,
  candidate_id BIGINT NOT NULL REFERENCES candidates(id),
  theme_id BIGINT REFERENCES themes(id),
  sentiment sentiment_label NOT NULL,
  confidence NUMERIC(5,4),
  model_version TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (news_id, candidate_id, theme_id)
);

CREATE INDEX idx_news_published_at ON news (published_at DESC);
CREATE INDEX idx_news_category ON news (category);
CREATE INDEX idx_news_source_published ON news (source_id, published_at DESC);
CREATE INDEX idx_ncs_candidate ON news_candidate_sentiment (candidate_id);
CREATE INDEX idx_ncs_theme ON news_candidate_sentiment (theme_id);
CREATE INDEX idx_ncs_sentiment ON news_candidate_sentiment (sentiment);

-- Visão analítica diária por candidato
CREATE VIEW candidate_daily_sentiment AS
SELECT
  date_trunc('day', n.published_at) AS day,
  ncs.candidate_id,
  COUNT(*) FILTER (WHERE ncs.sentiment = 'positivo') AS positive_count,
  COUNT(*) FILTER (WHERE ncs.sentiment = 'neutro') AS neutral_count,
  COUNT(*) FILTER (WHERE ncs.sentiment = 'negativo') AS negative_count,
  COUNT(*) AS total_count
FROM news_candidate_sentiment ncs
JOIN news n ON n.id = ncs.news_id
GROUP BY 1, 2;
