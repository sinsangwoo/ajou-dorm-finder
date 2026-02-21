/**
 * src/lib/supabase/dormitories.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Server-side data fetchers for dormitory & notice data.
 *
 * Single Point of Truth principle:
 *  - All data originates from either:
 *    a) The static source files in src/data/ (official, version-controlled)
 *    b) Supabase DB (officially updated by admin for per-semester quota changes)
 *  - NO speculative/calculated data is returned from this layer.
 *  - NO cutline estimates or probability figures are generated here.
 *
 * Graceful Degradation:
 *  - If Supabase env vars are missing → fall back to static data.
 *  - If Supabase query fails    → fall back to static data + log error.
 *  - The app is fully functional WITHOUT a Supabase project.
 */

import { cache }           from 'react';
import { dormitories as staticDormitories } from '@/data/dormitoryData';
import type { Dormitory }  from '@/data/dormitoryData';
import { createServerSupabaseClient, isSupabaseConfigured } from './client';
import type { Database }   from './database.types';

type DbNotice = Database['public']['Tables']['notices']['Row'];

/**
 * getDormitories
 *
 * Returns the list of dormitories for the current semester.
 * Result is cached per React render tree via React.cache() so multiple RSC
 * imports don’t cause duplicate DB round-trips in the same request.
 *
 * Data source priority:
 *   1. Supabase `dormitories` table (contains per-semester quota overrides)
 *   2. Static dormitoryData.ts (fallback, always correct for structural data)
 *
 * Note: structural data (description, tags, features, eligibility) is
 * ALWAYS sourced from dormitoryData.ts. Supabase only overrides quota figures.
 */
export const getDormitories = cache(async (): Promise<Dormitory[]> => {
  if (!isSupabaseConfigured()) {
    return staticDormitories;
  }

  try {
    const supabase = createServerSupabaseClient();
    if (!supabase) return staticDormitories;

    // Fetch quota overrides for current semester
    const { data, error } = await supabase
      .from('dormitories')
      .select('id, capacity, quota_general, quota_financial, semester')
      .eq('semester', '2026-1')
      .order('id');

    if (error || !data || data.length === 0) {
      console.warn('[getDormitories] Supabase query failed, using static data:', error?.message);
      return staticDormitories;
    }

    // Merge quota data from DB into static dorm objects
    return staticDormitories.map((dorm) => {
      const dbRow = data.find((r) => r.id === dorm.id);
      if (!dbRow) return dorm;
      return {
        ...dorm,
        // Override capacity string if DB has updated figure
        capacity: `점 ${dbRow.capacity}명`,
        capacityNote: `(2026-1학기 공식 공고 기준)`,
      };
    });
  } catch (err) {
    console.error('[getDormitories] Unexpected error:', err);
    return staticDormitories;
  }
});

/**
 * getNotices
 *
 * Returns recent official notices, pinned first.
 * Cached per request (React.cache).
 *
 * Falls back to empty array so the UI renders without notices
 * rather than crashing.
 */
export const getNotices = cache(async (
  limit = 10,
  category?: DbNotice['category']
): Promise<DbNotice[]> => {
  if (!isSupabaseConfigured()) return [];

  try {
    const supabase = createServerSupabaseClient();
    if (!supabase) return [];

    let query = supabase
      .from('notices')
      .select('*')
      .order('is_pinned', { ascending: false })
      .order('published_at', { ascending: false })
      .limit(limit);

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query;
    if (error) {
      console.warn('[getNotices] Supabase query failed:', error.message);
      return [];
    }
    return data ?? [];
  } catch (err) {
    console.error('[getNotices] Unexpected error:', err);
    return [];
  }
});
