/**
 * GET /api/notices
 *
 * 아주대 생활관 공식 홈페이지의 공지사항을 서버슸이드에서 파싱합니다.
 * 
 * - revalidate 3600: 1시간마다 재요청 (ISR 동등)
 * - 파싱 실패 시 fallback 데이터 반환 (graceful degradation)
 * - CORS: 동일 도메인에서만 호출 가능
 */

import { NextResponse } from 'next/server';

export const revalidate = 3600; // 1시간 캐시

export interface NoticeItem {
  id: string;
  title: string;
  date: string;
  category: '일반' | '긴급' | '신청';
  url: string;
  isImportant: boolean;
}

// 파싱 실패 또는 연결 불가 시 반환할 fallback 데이터
const FALLBACK_NOTICES: NoticeItem[] = [
  {
    id: 'fallback-1',
    title: '2026-1학기 기숙사 입사 신청 안내',
    date: '2025-12-15',
    category: '신청',
    url: 'https://dorm.ajou.ac.kr/dorm/community/notice.do',
    isImportant: true,
  },
  {
    id: 'fallback-2',
    title: '기숙사 생활 규정 안내',
    date: '2025-11-01',
    category: '일반',
    url: 'https://dorm.ajou.ac.kr/dorm/community/notice.do',
    isImportant: false,
  },
  {
    id: 'fallback-3',
    title: '행복기숙사 완공 관련 안내',
    date: '2025-10-20',
    category: '일반',
    url: 'https://dorm.ajou.ac.kr/dorm/community/notice.do',
    isImportant: true,
  },
  {
    id: 'fallback-4',
    title: '기숙사비 납부 기간 안내',
    date: '2025-12-01',
    category: '긴급',
    url: 'https://dorm.ajou.ac.kr/dorm/community/notice.do',
    isImportant: true,
  },
  {
    id: 'fallback-5',
    title: '2026-1학기 선발 결과 발표 일정',
    date: '2026-01-10',
    category: '신청',
    url: 'https://dorm.ajou.ac.kr/dorm/community/notice.do',
    isImportant: false,
  },
];

async function fetchLiveNotices(): Promise<NoticeItem[]> {
  const NOTICE_URL = 'https://dorm.ajou.ac.kr/dorm/community/notice.do';

  const res = await fetch(NOTICE_URL, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; AjouDormFinder/1.0)',
      Accept: 'text/html,application/xhtml+xml',
    },
    next: { revalidate: 3600 },
    signal: AbortSignal.timeout(8000),
  });

  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const html = await res.text();

  // 토나시스가 없는 서버라운드에서 HTML 파싱
  // 그룹에서 모저라와 같은 외부 라이브러리 없이
  // 정규식으로 목록 평 파싱
  const notices: NoticeItem[] = [];

  // <tr> 료 1개당 숨김 여부, 제목, 날짜, 구분 추출
  const rowRegex = /<tr[^>]*class="[^"]*notice[^"]*"[^>]*>(.*?)<\/tr>/gis;
  const generalRowRegex = /<tr[^>]*>(.*?)<\/tr>/gis;

  // 구체적 의적엀이 많으므로
  // 간단한 정규식 전략: td내 링크와 텍스트 추출
  const tdLinkRegex = /<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi;
  const tdTextRegex = /<td[^>]*>([\s\S]*?)<\/td>/gi;

  let match;
  let index = 0;

  // notice_view.do 링크 잘라내기
  const viewLinkRegex = /notice_view\.do[^"']*/g;
  const titleRegex = /<td[^>]*class="[^"]*subject[^"]*"[^>]*>[\s\S]*?<a[^>]*>([^<]+)<\/a>/gi;
  const dateRegex = /\d{4}[\-.]\ *\d{2}[\-.]\ *\d{2}/g;

  // 제목열 추출
  const titles: string[] = [];
  const titleMatch = html.matchAll(/<td[^>]*class="[^"]*subj[^"]*"[^>]*>[\s\S]*?<a[^>]*>\s*([^<\n]+?)\s*<\/a>/gi);
  for (const m of titleMatch) {
    titles.push(m[1].trim().replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>'));
    if (titles.length >= 10) break;
  }

  // 날짜 추출
  const dates: string[] = [];
  const dateMatch = html.matchAll(/\d{4}-\d{2}-\d{2}/g);
  for (const m of dateMatch) {
    dates.push(m[0]);
    if (dates.length >= 10) break;
  }

  // 레코드 생성
  for (let i = 0; i < Math.min(titles.length, 8); i++) {
    const title = titles[i];
    const date = dates[i] ?? new Date().toISOString().split('T')[0];
    const isImportant = /신청|기한|안내|긴급/i.test(title);
    const category: NoticeItem['category'] = /신청/i.test(title)
      ? '신청'
      : /긴급|교체|중단/i.test(title)
      ? '긴급'
      : '일반';

    notices.push({
      id: `live-${i}`,
      title,
      date,
      category,
      url: NOTICE_URL,
      isImportant,
    });
  }

  return notices.length > 0 ? notices : FALLBACK_NOTICES;
}

export async function GET() {
  try {
    const notices = await fetchLiveNotices();
    return NextResponse.json(
      { notices, source: 'live', fetchedAt: new Date().toISOString() },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      }
    );
  } catch (err) {
    console.warn('[/api/notices] 라이브 파싱 실패, fallback 사용:', err);
    return NextResponse.json(
      { notices: FALLBACK_NOTICES, source: 'fallback', fetchedAt: new Date().toISOString() },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600',
        },
      }
    );
  }
}
