/**
 * src/lib/supabase/client.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Dual Supabase client export pattern for Next.js App Router:
 *
 *  1. `supabaseBrowser`  — Client-side singleton ("anon" key, safe to expose)
 *     Used in React Client Components / hooks for real-time subscriptions,
 *     user-facing queries, etc.
 *
 *  2. `createServerClient` (lazy) — Called inside RSC / Route Handlers /
 *     Server Actions. Uses the same anon key but runs in Node.js edge runtime.
 *     For admin mutations use SUPABASE_SERVICE_ROLE_KEY instead.
 *
 * SECURITY:
 *  - NEXT_PUBLIC_* vars are bundled into client JS (by design, safe for anon key)
 *  - SUPABASE_SERVICE_ROLE_KEY is NEVER exported from this file
 *  - Row Level Security (RLS) must be enabled on all tables
 *
 * GRACEFUL DEGRADATION:
 *  - If env vars are missing (local dev / CI without .env.local), the helper
 *    functions in dormitories.ts fall back to the static data file.
 *  - This means the app works fully without a Supabase project.
 */

import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL  ?? '';
const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

/**
 * Returns true if Supabase env vars are configured.
 * Used for graceful degradation in data fetchers.
 */
export const isSupabaseConfigured = (): boolean =>
  supabaseUrl.length > 0 && supabaseAnon.length > 0;

/**
 * Browser singleton — safe to import in Client Components.
 * createClient memoises internally when called repeatedly.
 */
export const supabaseBrowser = isSupabaseConfigured()
  ? createClient<Database>(supabaseUrl, supabaseAnon)
  : null;

/**
 * Server client factory — call once per request in RSC / Route Handlers.
 * Returns null when Supabase is not configured (triggers static fallback).
 */
export function createServerSupabaseClient() {
  if (!isSupabaseConfigured()) return null;
  return createClient<Database>(supabaseUrl, supabaseAnon, {
    auth: { persistSession: false },
  });
}
