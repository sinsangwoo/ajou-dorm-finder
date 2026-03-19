/**
 * POST /api/reviews  —  리뷰 저장
 * GET  /api/reviews?dormId=xxx  —  각 기숙사 리뷰 조회
 *
 * 실제 DB 연동: Supabase reviews 테이블
 * DB 미연동 시: 메모리 기반 목업 저장 (fallback)
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export interface DormReview {
  id:          string;
  dormId:      string;
  nickname:    string;
  year:        number;
  semester:    1 | 2;
  ratings: {
    noise:     number; // 1–5
    cleanliness: number;
    wifi:      number;
    facilities: number;
    security:  number;
    overall:   number;
  };
  comment:     string;
  tags:        string[];
  helpful:     number;
  createdAt:   string;
}

// 시드 데이터 (실제 리뷰가 없을 때 표시)
const SEED_REVIEWS: DormReview[] = [
  {
    id: 'seed-1', dormId: 'ilsin', nickname: '익명',
    year: 2025, semester: 2,
    ratings: { noise: 4, cleanliness: 5, wifi: 4, facilities: 5, security: 5, overall: 5 },
    comment: '신축이라 시설이 정말 쿨해요. Wi-Fi도 빠르고 먹는 것도 신경 쓰여서 신청하면 난이도 낮아지는 편이었어요.',
    tags: ['신축', '시설좋음', 'Wi-Fi제대'],
    helpful: 12, createdAt: '2025-09-15',
  },
  {
    id: 'seed-2', dormId: 'ilsin', nickname: '익명',
    year: 2025, semester: 1,
    ratings: { noise: 3, cleanliness: 4, wifi: 5, facilities: 5, security: 4, overall: 4 },
    comment: '1인실은 비싸지만 공부에 집중하기 좋아요. 헬스장 존재가 매력적.',
    tags: ['1인실', '조용', '헬스장'],
    helpful: 8, createdAt: '2025-06-20',
  },
  {
    id: 'seed-3', dormId: 'international', nickname: '익명',
    year: 2025, semester: 1,
    ratings: { noise: 3, cleanliness: 4, wifi: 4, facilities: 4, security: 4, overall: 4 },
    comment: '다양한 국적 친구들과 지낼 수 있어 좋았어요. 경쟁률이 높아 신청이 어려운 편.',
    tags: ['외국인친화', '2인실', '경쟁높음'],
    helpful: 6, createdAt: '2025-06-10',
  },
  {
    id: 'seed-4', dormId: 'gwanggyo', nickname: '익명',
    year: 2025, semester: 1,
    ratings: { noise: 4, cleanliness: 5, wifi: 4, facilities: 4, security: 5, overall: 4 },
    comment: '신축이라 쫘고 쫘라요. 여성전용이라 보안 면에서도 마음편했어요.',
    tags: ['신축', '여성전용', '청결'],
    helpful: 9, createdAt: '2025-06-05',
  },
];

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
           || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function GET(req: NextRequest) {
  const dormId = req.nextUrl.searchParams.get('dormId');
  const supabase = getSupabase();

  if (supabase) {
    const query = supabase
      .from('dorm_reviews')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);

    if (dormId) query.eq('dorm_id', dormId);

    const { data, error } = await query;
    if (!error && data) {
      return NextResponse.json({ reviews: data, source: 'db' });
    }
  }

  // fallback: seed 데이터
  const reviews = dormId
    ? SEED_REVIEWS.filter(r => r.dormId === dormId)
    : SEED_REVIEWS;

  return NextResponse.json({ reviews, source: 'seed' });
}

export async function POST(req: NextRequest) {
  const body = await req.json() as Partial<DormReview>;

  // 간단한 유효성 검사
  if (!body.dormId || !body.ratings || !body.comment) {
    return NextResponse.json({ error: '\ud544수 필드가 누락되었습니다' }, { status: 400 });
  }

  const review: DormReview = {
    id:        `review-${Date.now()}`,
    dormId:    body.dormId,
    nickname:  '익명',
    year:      new Date().getFullYear(),
    semester:  new Date().getMonth() < 7 ? 1 : 2,
    ratings:   body.ratings as DormReview['ratings'],
    comment:   body.comment.slice(0, 500),
    tags:      body.tags ?? [],
    helpful:   0,
    createdAt: new Date().toISOString().split('T')[0],
  };

  const supabase = getSupabase();
  if (supabase) {
    const { error } = await supabase.from('dorm_reviews').insert({
      dorm_id:    review.dormId,
      nickname:   review.nickname,
      year:       review.year,
      semester:   review.semester,
      ratings:    review.ratings,
      comment:    review.comment,
      tags:       review.tags,
      helpful:    0,
    });
    if (error) console.error('[reviews] insert error:', error);
  }

  return NextResponse.json({ review, saved: !!supabase }, { status: 201 });
}
