/**
 * GET /api/notices
 *
 * 아주대 생활관 공식 공지사항을 파싱하여 JSON으로 반환합니다.
 *
 * - 생활관 홈페이지 공지 보드를 fetch 후 HTML을 청닥
 * - ISR revalidate 1시간 설정으로 불필요한 크롤 최소화
 * - 네트워크 실패 시 fallback 데이터 반환
 */

import { NextResponse } from 'next/server';

export const revalidate = 3600; // 1시간 ISR

export interface DormNotice {
  id:      string;
  title:   string;
  date:    string;
  url:     string;
  isNew:   boolean;
  isPinned: boolean;
  category: string;
}

// fallback 데이터 (네트워크 실패 시 표시)
const FALLBACK_NOTICES: DormNotice[] = [
  {
    id: 'fallback-1',
    title: '[2026-1학기] 기숙사 입사 안내',
    date: '2026-01-15',
    url: 'https://dorm.ajou.ac.kr/dorm/community/notice.do',
    isNew: true,
    isPinned: true,
    category: '입사 안내',
  },
  {
    id: 'fallback-2',
    title: '[2026-1학기] 기숙사 배정 결과 발표',
    date: '2026-01-28',
    url: 'https://dorm.ajou.ac.kr/dorm/community/notice.do',
    isNew: true,
    isPinned: true,
    category: '선발 결과',
  },
  {
    id: 'fallback-3',
    title: '기숙사비 납부 안내',
    date: '2026-02-03',
    url: 'https://dorm.ajou.ac.kr/dorm/community/notice.do',
    isNew: false,
    isPinned: false,
    category: '비용',
  },
  {
    id: 'fallback-4',
    title: '2026년 1학기 입사일 안내',
    date: '2026-02-10',
    url: 'https://dorm.ajou.ac.kr/dorm/community/notice.do',
    isNew: false,
    isPinned: false,
    category: '일정',
  },
  {
    id: 'fallback-5',
    title: '공용시설 이용 규정 안내',
    date: '2026-02-15',
    url: 'https://dorm.ajou.ac.kr/dorm/community/notice.do',
    isNew: false,
    isPinned: false,
    category: '규정',
  },
];

/**
 * 아주대 생활관 공지법 파싱
 * CORS 제약으로 서버사이드에서 fetch
 */
async function fetchDormNotices(): Promise<DormNotice[]> {
  const NOTICE_URL = 'https://dorm.ajou.ac.kr/dorm/community/notice.do';

  const res = await fetch(NOTICE_URL, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; AjouDormFinder/2.0)',
      'Accept': 'text/html,application/xhtml+xml',
    },
    next: { revalidate: 3600 },
    signal: AbortSignal.timeout(8000),
  });

  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const html = await res.text();
  const notices: DormNotice[] = [];

  // 공지보드 tr 파싱 (아주대 생활관 테이블 구조 기반)
  const trRegex = /<tr[^>]*>([sS]*?)<\/tr>/gi;
  const tdRegex = /<td[^>]*>([sS]*?)<\/td>/gi;
  const aRegex = /<a[^>]+href=["']([^"']+)["'][^>]*>([sS]*?)<\/a>/i;
  const tagStripRegex = /<[^>]+>/g;

  let trMatch;
  let index = 0;
  while ((trMatch = trRegex.exec(html)) !== null && index < 20) {
    const row = trMatch[1];
    const cells: string[] = [];
    let tdMatch;
    const tdRegexLocal = /<td[^>]*>([sS]*?)<\/td>/gi;
    while ((tdMatch = tdRegexLocal.exec(row)) !== null) {
      cells.push(tdMatch[1].replace(tagStripRegex, '').trim());
    }

    // 제목 셀에서 링크 추출
    const linkMatch = aRegex.exec(row);
    if (linkMatch && cells.length >= 2) {
      const href = linkMatch[1];
      const title = cells.find(c => c.length > 5) ?? '';
      const dateCell = cells.find(c => /\d{4}[-.]\d{2}[-.]\d{2}/.test(c)) ?? '';
      const dateStr = dateCell.match(/(\d{4}[-.]\d{2}[-.]\d{2})/)?.[1] ?? '';

      if (title && !title.match(/^\d+$/)) {
        const fullUrl = href.startsWith('http')
          ? href
          : `https://dorm.ajou.ac.kr${href}`;

        const today = new Date();
        const noticeDate = dateStr ? new Date(dateStr.replace(/\./g, '-')) : null;
        const isNew = noticeDate
          ? (today.getTime() - noticeDate.getTime()) / 86400000 <= 14
          : false;

        notices.push({
          id:        `notice-${index}`,
          title:     title.slice(0, 100),
          date:      dateStr,
          url:       fullUrl,
          isNew,
          isPinned:  index < 2,
          category:  title.includes('입사') ? '입사'
                   : title.includes('선발') ? '선발'
                   : title.includes('생활') ? '규정'
                   : '공지',
        });
        index++;
      }
    }
  }

  return notices.length >= 3 ? notices : FALLBACK_NOTICES;
}

export async function GET() {
  try {
    const notices = await fetchDormNotices();
    return NextResponse.json(
      { notices, fetchedAt: new Date().toISOString(), source: 'live' },
      { headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200' } }
    );
  } catch (err) {
    console.error('[notices] fetch failed:', err);
    return NextResponse.json(
      { notices: FALLBACK_NOTICES, fetchedAt: new Date().toISOString(), source: 'fallback' },
      { headers: { 'Cache-Control': 'public, s-maxage=300' } }
    );
  }
}
