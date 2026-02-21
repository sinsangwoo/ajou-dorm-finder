/**
 * src/lib/supabase/database.types.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Supabase Database TypeScript schema.
 *
 * How to regenerate:
 *   npx supabase gen types typescript --project-id <your-project-id> \
 *     --schema public > src/lib/supabase/database.types.ts
 *
 * Tables:
 * ┌──────────────────┬───────────────────────────────────────────────────────────────
 * │ Table          │ Purpose                                          │
 * ├──────────────────┼───────────────────────────────────────────────────────────────
 * │ dormitories    │ Official dorm capacity/quota (updated per semester)│
 * │ notices        │ Official announcements (crawled or admin-entered)  │
 * │ score_criteria │ Scoring formula parameters per semester           │
 * └──────────────────┴───────────────────────────────────────────────────────────────
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      /**
       * dormitories — official dorm metadata
       *
       * SQL:
       *   CREATE TABLE dormitories (
       *     id          TEXT PRIMARY KEY,           -- e.g. 'ilsin'
       *     name        TEXT NOT NULL,              -- e.g. '일신관'
       *     name_en     TEXT NOT NULL,              -- e.g. 'Ilsin Hall'
       *     capacity    INT  NOT NULL,              -- total beds
       *     gender      TEXT NOT NULL,              -- 'male' | 'female' | 'mixed'
       *     quota_general    INT,                   -- beds for general selection
       *     quota_financial  INT,                   -- beds for financial aid selection
       *     semester    TEXT NOT NULL,              -- e.g. '2026-1'
       *     updated_at  TIMESTAMPTZ DEFAULT now()
       *   );
       */
      dormitories: {
        Row: {
          id: string;
          name: string;
          name_en: string;
          capacity: number;
          gender: 'male' | 'female' | 'mixed';
          quota_general: number | null;
          quota_financial: number | null;
          semester: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['dormitories']['Row'], 'updated_at'>;
        Update: Partial<Database['public']['Tables']['dormitories']['Insert']>;
      };

      /**
       * notices — official announcements
       *
       * SQL:
       *   CREATE TABLE notices (
       *     id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
       *     title       TEXT    NOT NULL,
       *     content     TEXT,
       *     source_url  TEXT,
       *     category    TEXT    NOT NULL DEFAULT 'general',  -- 'application'|'result'|'general'
       *     is_pinned   BOOLEAN NOT NULL DEFAULT false,
       *     published_at TIMESTAMPTZ,
       *     created_at  TIMESTAMPTZ DEFAULT now()
       *   );
       *   -- RLS: SELECT for all (public read), INSERT/UPDATE only service role
       */
      notices: {
        Row: {
          id: number;
          title: string;
          content: string | null;
          source_url: string | null;
          category: 'application' | 'result' | 'general';
          is_pinned: boolean;
          published_at: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['notices']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['notices']['Insert']>;
      };

      /**
       * score_criteria — scoring formula parameters per semester
       *
       * SQL:
       *   CREATE TABLE score_criteria (
       *     semester       TEXT PRIMARY KEY,         -- '2026-1'
       *     max_grade      INT  NOT NULL DEFAULT 60, -- 성적 만점
       *     max_distance   INT  NOT NULL DEFAULT 30,
       *     max_volunteer  INT  NOT NULL DEFAULT 5,
       *     max_education  INT  NOT NULL DEFAULT 5,
       *     max_financial  INT  NOT NULL DEFAULT 60,
       *     updated_at     TIMESTAMPTZ DEFAULT now()
       *   );
       */
      score_criteria: {
        Row: {
          semester: string;
          max_grade: number;
          max_distance: number;
          max_volunteer: number;
          max_education: number;
          max_financial: number;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['score_criteria']['Row'], 'updated_at'>;
        Update: Partial<Database['public']['Tables']['score_criteria']['Insert']>;
      };
    };

    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
