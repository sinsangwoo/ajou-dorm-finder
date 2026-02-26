/**
 * src/lib/supabase/dormitories.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Server-side data fetchers for dormitory & notice data.
 *
 * [TS Fix] id / capacity 관련 never 타입 에러:
 *   supabase.from('dormitories').select('id, capacity, quota_general, quota_financial, semester')
 *   에서 TypeScript가 select() 컬럼 목록을 기반으로 반환 타입을 자동으로 좁히는데,
 *   이때 Supabase 제네릭 타입 추론이 실패하면 r.id, r.capacity 등이 never로 추론됨.
 *
 *   해결:
 *   1. select() 결과에 명시적 타입 Pick<DbRow, ...> 을 지정.
 *   2. 비교 연산 r.id === dorm.id: r.id(string) vs dorm.id(string) — 동일 타입 보장.
 *   3. capacity: DB는 number, Dormitory.capacity는 string → 템플릿 리터럴로 변환.
 *
 * Graceful Degradation:
 *  - Supabase 미설정 → 정적 데이터 fallback.
 *  - Supabase 쿼리 실패 → 정적 데이터 fallback.
 */

import { cache }          from 'react';
import { dormitories as staticDormitories } from '@/data/dormitoryData';
import type { Dormitory } from '@/data/dormitoryData';
import { createServerSupabaseClient, isSupabaseConfigured } from './client';
import type { Database }  from './database.types';

type DbDormRow = Database['public']['Tables']['dormitories']['Row'];
type DbNotice  = Database['public']['Tables']['notices']['Row'];

// select() 컬럼 목록과 정확히 일치하는 Pick 타입 — never 방지
type DormQueryRow = Pick<DbDormRow, 'id' | 'capacity' | 'quota_general' | 'quota_financial' | 'semester'>;

/**
 * getDormitories
 *
 * Data source priority:
 *   1. Supabase `dormitories` table (quota overrides)
 *   2. Static dormitoryData.ts (structural data, always authoritative)
 */
export const getDormitories = cache(async (): Promise<Dormitory[]> => {
  if (!isSupabaseConfigured()) {
    return staticDormitories;
  }

  try {
    const supabase = createServerSupabaseClient();
    if (!supabase) return staticDormitories;

    const { data, error } = await supabase
      .from('dormitories')
      .select('id, capacity, quota_general, quota_financial, semester')
      .eq('semester', '2026-1')
      .order('id')
      // [TS Fix] 명시적 타입 캐스팅으로 never 타입 추론 방지
      .returns<DormQueryRow[]>();

    if (error || !data || data.length === 0) {
      console.warn('[getDormitories] Supabase query failed, using static data:', error?.message);
      return staticDormitories;
    }

    return staticDormitories.map((dorm): Dormitory => {
      // [TS Fix] r.id: string, dorm.id: string — 타입 일치 확인
      const dbRow = data.find((r: DormQueryRow) => r.id === dorm.id);
      if (!dbRow) return dorm;
      return {
        ...dorm,
        // [TS Fix] dbRow.capacity: number → string 명시 변환
        capacity: `총 ${dbRow.capacity}명`,
        capacityNote: '(2026-1학기 공식 공고 기준)',
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
 * Falls back to [] on any error.
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
