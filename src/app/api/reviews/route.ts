/**
 * GET  /api/reviews?dormId=ilsin
 * POST /api/reviews
 *
 * 재학생 익명 후기 시스템
 * - 실제 서비스에서는 Supabase DB를 사용하지만
 *   현재는 인메모리 fallback로 동작 (전체 설계 확정 후 DB 연결 예정)
 */

import { NextRequest, NextResponse } from 'next/server';

export interface DormReview {
  id: string;
  dormId: string;
  noise: number;      // 1-5 (소음)
  cleanliness: number; // 1-5 (청결)
  wifi: number;       // 1-5 (Wi-Fi)
  facility: number;   // 1-5 (시설)
  community: number;  // 1-5 (커뮤니티)
  overall: number;    // 1-5 (종합)
  comment: string;
  semester: string;   // e.g. '2025-2'
  createdAt: string;
  helpful: number;    // 도움되었어요 카운트
}

// 시드 데이터 (DB 연결 전 표시될 샘플 후기)
const SEED_REVIEWS: DormReview[] = [
  {
    id: 'seed-1',
    dormId: 'ilsin',
    noise: 4, cleanliness: 5, wifi: 4, facility: 5, community: 3, overall: 4,
    comment: '신축 건물이라 시설이 매우 쿨합니다. Wi-Fi도 빠르고 청결하게 유지됩니다. 1인실은 혼자 집중하기 정말 좋아요.',
    semester: '2025-2',
    createdAt: '2025-12-01',
    helpful: 24,
  },
  {
    id: 'seed-2',
    dormId: 'ilsin',
    noise: 3, cleanliness: 4, wifi: 5, facility: 5, community: 4, overall: 4,
    comment: '다른 층 소음이 간혁 신경 쓰이는데 전반적으로 만족합니다. 헬스장이 있어서 진짜 좋습니다.',
    semester: '2025-2',
    createdAt: '2025-11-20',
    helpful: 18,
  },
  {
    id: 'seed-3',
    dormId: 'international',
    noise: 3, cleanliness: 4, wifi: 4, facility: 4, community: 5, overall: 4,
    comment: '외국인 친구들과 교류할 수 있어서 좋습니다. 경쟁률이 높지만 입주하면 만족.',
    semester: '2025-1',
    createdAt: '2025-07-01',
    helpful: 15,
  },
  {
    id: 'seed-4',
    dormId: 'gwanggyo',
    noise: 4, cleanliness: 5, wifi: 4, facility: 4, community: 3, overall: 4,
    comment: '신축이라 매우 만족합니다. 여성 전용이라 안전하고 청결함이 유지되어요.',
    semester: '2025-2',
    createdAt: '2025-10-15',
    helpful: 31,
  },
  {
    id: 'seed-5',
    dormId: 'namje',
    noise: 2, cleanliness: 3, wifi: 3, facility: 2, community: 3, overall: 3,
    comment: '구축 건물이라 시설이 로거운 면이 있지만 가격 대비 가성비는 있습니다. 남학로에만 해당.',
    semester: '2025-1',
    createdAt: '2025-06-20',
    helpful: 9,
  },
];

export async function GET(req: NextRequest) {
  const dormId = req.nextUrl.searchParams.get('dormId');
  const reviews = dormId
    ? SEED_REVIEWS.filter((r) => r.dormId === dormId)
    : SEED_REVIEWS;

  // 평규 계산
  const avg = (key: keyof Pick<DormReview, 'noise' | 'cleanliness' | 'wifi' | 'facility' | 'community' | 'overall'>) =>
    reviews.length > 0
      ? Math.round((reviews.reduce((s, r) => s + r[key], 0) / reviews.length) * 10) / 10
      : 0;

  return NextResponse.json({
    reviews,
    stats: {
      count: reviews.length,
      avgNoise: avg('noise'),
      avgCleanliness: avg('cleanliness'),
      avgWifi: avg('wifi'),
      avgFacility: avg('facility'),
      avgCommunity: avg('community'),
      avgOverall: avg('overall'),
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { dormId, noise, cleanliness, wifi, facility, community, overall, comment, semester } = body;

    // 간단한 유효성 검사
    if (!dormId || !comment || comment.trim().length < 10) {
      return NextResponse.json({ error: '후기 내용이 너무 짧습니다 (10자 이상)' }, { status: 400 });
    }
    const scores = [noise, cleanliness, wifi, facility, community, overall];
    if (scores.some((s) => typeof s !== 'number' || s < 1 || s > 5)) {
      return NextResponse.json({ error: '별점은 1~5점이어야 합니다' }, { status: 400 });
    }

    // TODO: Supabase 연결 시 실제 DB에 저장
    // 현재는 in-memory mock
    const newReview: DormReview = {
      id: `review-${Date.now()}`,
      dormId,
      noise, cleanliness, wifi, facility, community, overall,
      comment: comment.trim().slice(0, 500),
      semester: semester ?? '2026-1',
      createdAt: new Date().toISOString().split('T')[0],
      helpful: 0,
    };

    return NextResponse.json({ review: newReview, success: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: '서버 오류' }, { status: 500 });
  }
}
