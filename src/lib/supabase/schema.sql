-- =============================================================================
-- Ajou Dorm Finder — Supabase Schema
-- =============================================================================
-- Run this in Supabase SQL Editor to initialise the database.
-- Tables are designed for READ-HEAVY workloads (ISR + server components).
-- RLS is ENABLED on all tables; only service role can write.
-- =============================================================================

-- ──────────────────────────────────────────────────────────────────────────────
-- Table: dormitories
-- Purpose: Per-semester official quota / capacity figures.
-- Updated once per semester by admin when the official announcement is released.
-- ──────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.dormitories (
  id               TEXT PRIMARY KEY,
  name             TEXT NOT NULL,
  name_en          TEXT NOT NULL,
  capacity         INT  NOT NULL,
  gender           TEXT NOT NULL CHECK (gender IN ('male','female','mixed')),
  quota_general    INT,
  quota_financial  INT,
  semester         TEXT NOT NULL,
  updated_at       TIMESTAMPTZ DEFAULT now()
);

-- Composite index for semester lookups
CREATE INDEX IF NOT EXISTS idx_dormitories_semester ON public.dormitories (semester);

-- RLS
ALTER TABLE public.dormitories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read" ON public.dormitories FOR SELECT USING (true);

-- Seed data (2026-1학기)
INSERT INTO public.dormitories (id, name, name_en, capacity, gender, quota_general, quota_financial, semester)
VALUES
  ('namje',         '남제관', 'Namje Hall',           688, 'male',   680, 8,    '2026-1'),
  ('yongji',        '용지관', 'Yongji Hall',          490, 'male',   482, 8,    '2026-1'),
  ('hwahong',       '화홍관', 'Hwahong Hall',         390, 'mixed',  382, 8,    '2026-1'),
  ('gwanggyo',      '광교관', 'Gwanggyo Hall',        552, 'female', 544, 8,    '2026-1'),
  ('international', '국제학사', 'International House', 408, 'mixed',  400, 8,    '2026-1'),
  ('ilsin',         '일신관', 'Ilsin Hall',           751, 'mixed',  740, 11,   '2026-1')
ON CONFLICT (id) DO NOTHING;


-- ──────────────────────────────────────────────────────────────────────────────
-- Table: notices
-- Purpose: Official announcements from the dormitory office.
-- Updated by admin or nightly crawler script.
-- ──────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.notices (
  id           BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title        TEXT    NOT NULL,
  content      TEXT,
  source_url   TEXT,
  category     TEXT    NOT NULL DEFAULT 'general'
               CHECK (category IN ('application','result','general')),
  is_pinned    BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at   TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_notices_category   ON public.notices (category);
CREATE INDEX IF NOT EXISTS idx_notices_pinned_pub ON public.notices (is_pinned DESC, published_at DESC);

ALTER TABLE public.notices ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read" ON public.notices FOR SELECT USING (true);


-- ──────────────────────────────────────────────────────────────────────────────
-- Table: score_criteria
-- Purpose: Scoring parameters per semester.
-- Enables future updates without code changes.
-- ──────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.score_criteria (
  semester      TEXT PRIMARY KEY,
  max_grade     INT NOT NULL DEFAULT 60,
  max_distance  INT NOT NULL DEFAULT 30,
  max_volunteer INT NOT NULL DEFAULT 5,
  max_education INT NOT NULL DEFAULT 5,
  max_financial INT NOT NULL DEFAULT 60,
  updated_at    TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.score_criteria ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read" ON public.score_criteria FOR SELECT USING (true);

INSERT INTO public.score_criteria
  (semester, max_grade, max_distance, max_volunteer, max_education, max_financial)
VALUES
  ('2026-1', 60, 30, 5, 5, 60)
ON CONFLICT (semester) DO NOTHING;


-- =============================================================================
-- Revalidation webhook helper function
-- Trigger: after INSERT/UPDATE on notices → calls Next.js revalidation endpoint
-- =============================================================================
CREATE OR REPLACE FUNCTION notify_revalidate()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  -- This is a placeholder; replace with an HTTP call to your revalidation endpoint
  -- using pg_net extension: SELECT net.http_post(url, headers, body)
  RAISE NOTICE 'notices table updated — trigger Next.js revalidation';
  RETURN NEW;
END;
$$;

CREATE TRIGGER after_notice_upsert
  AFTER INSERT OR UPDATE ON public.notices
  FOR EACH ROW EXECUTE FUNCTION notify_revalidate();
