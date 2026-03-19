'use client';
/**
 * LiveNoticeBoard.tsx — Phase 2
 *
 * 아주대 생활관 공식 공지사항을 실시간으로 표시하는 컴포넌트.
 * - /api/notices 엔드포인트를 통해 서버사이드 파싱 결과를 가져옴
 * - ISR 1시간 캐시
 * - 푸시 알림 구독 (Web Push Notifications API)
 * - 신청 기간 카운트다운
 */

import { useState, useEffect, useCallback } from 'react';
import { Bell, BellOff, ExternalLink, RefreshCw, Pin, Sparkles, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { DormNotice } from '@/app/api/notices/route';

// 신청 기간 D-Day 🗓
const APPLICATION_PERIODS = [
  { label: '2026-2학기 입사 공고', date: new Date('2026-06-01'), color: 'text-amber-600 dark:text-amber-400' },
  { label: '2026-2학기 온라인 신청', date: new Date('2026-06-15'), color: 'text-primary' },
  { label: '2026-2학기 선발 결과', date: new Date('2026-07-01'), color: 'text-green-600 dark:text-green-400' },
];

function Countdown({ targetDate, label, color }: { targetDate: Date; label: string; color: string }) {
  const [diff, setDiff] = useState<number>(0);

  useEffect(() => {
    const calc = () => {
      const ms = targetDate.getTime() - Date.now();
      setDiff(Math.ceil(ms / 86400000));
    };
    calc();
    const id = setInterval(calc, 60000);
    return () => clearInterval(id);
  }, [targetDate]);

  if (diff < 0) return null;

  return (
    <div className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className={cn('text-sm font-bold tabular-nums', color)}>
        {diff === 0 ? 'D-Day' : `D-${diff}`}
      </span>
    </div>
  );
}

export default function LiveNoticeBoard() {
  const [notices, setNotices] = useState<DormNotice[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastFetched, setLastFetched] = useState<string>('');
  const [pushEnabled, setPushEnabled] = useState(false);
  const [pushSupported, setPushSupported] = useState(false);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    setPushSupported('Notification' in window && 'serviceWorker' in navigator);
    if ('Notification' in window && Notification.permission === 'granted') {
      setPushEnabled(true);
    }
  }, []);

  const fetchNotices = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    try {
      const res = await fetch('/api/notices', {
        next: { revalidate: 3600 },
        cache: isRefresh ? 'no-store' : 'default',
      });
      const data = await res.json();
      setNotices(data.notices ?? []);
      setLastFetched(new Date(data.fetchedAt).toLocaleTimeString('ko-KR'));
    } catch {
      // 네트워크 실패 시 화면 유지
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { fetchNotices(); }, [fetchNotices]);

  const handlePushToggle = async () => {
    if (!pushSupported) return;
    if (pushEnabled) {
      setPushEnabled(false);
      return;
    }
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      setPushEnabled(true);
      new Notification('\uc544주대 기숙사 \uc54c림', {
        body: '\uc911요 공지를 알려드릴게요!',
        icon: '/favicon.ico',
      });
    }
  };

  const visibleNotices = showAll ? notices : notices.slice(0, 5);

  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">

          {/* 헤더 */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight mb-1">
                공식 공지사항
              </h2>
              <p className="text-sm text-muted-foreground">
                아주대학교 생활관 홈페이지에서 실시간으로 반영됩니다
                {lastFetched && (
                  <span className="ml-2 text-xs text-muted-foreground/50">
                    <Clock className="w-3 h-3 inline mr-1" />
                    {lastFetched} 기준
                  </span>
                )}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => fetchNotices(true)}
                disabled={refreshing}
                className="gap-1.5 text-xs"
              >
                <RefreshCw className={cn('w-3.5 h-3.5', refreshing && 'animate-spin')} />
                새로고침
              </Button>
              {pushSupported && (
                <Button
                  variant={pushEnabled ? 'default' : 'outline'}
                  size="sm"
                  onClick={handlePushToggle}
                  className="gap-1.5 text-xs"
                >
                  {pushEnabled
                    ? <><BellOff className="w-3.5 h-3.5" /> 알림 받는 중</>
                    : <><Bell className="w-3.5 h-3.5" /> 알림 구독</>}
                </Button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* D-Day 카운트다운 패널 */}
            <div className="glass-card-strong rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <h3 className="font-semibold text-sm">2026-2학기 일정</h3>
              </div>
              <div className="space-y-0">
                {APPLICATION_PERIODS.map(({ label, date, color }) => (
                  <Countdown key={label} targetDate={date} label={label} color={color} />
                ))}
              </div>
              <a
                href="https://dorm.ajou.ac.kr/dorm/community/notice.do"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center gap-1 text-xs text-primary hover:underline"
              >
                <ExternalLink className="w-3 h-3" />
                공식 사이트에서 확인
              </a>
            </div>

            {/* 공지 목록 */}
            <div className="lg:col-span-2">
              {loading ? (
                <div className="space-y-3">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="glass-card-strong rounded-xl p-4 animate-pulse">
                      <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                      <div className="h-3 bg-muted rounded w-1/4" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {visibleNotices.map((notice) => (
                    <a
                      key={notice.id}
                      href={notice.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start gap-3 glass-card-strong rounded-xl p-4 hover:border-primary/30 transition-all"
                    >
                      {notice.isPinned && (
                        <Pin className="w-3.5 h-3.5 text-primary shrink-0 mt-1" />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          {notice.isNew && (
                            <Badge className="text-[10px] h-4 px-1.5 bg-primary/10 text-primary border-primary/20">
                              NEW
                            </Badge>
                          )}
                          <Badge variant="outline" className="text-[10px] h-4 px-1.5">
                            {notice.category}
                          </Badge>
                        </div>
                        <p className="text-sm font-medium text-foreground group-hover:text-primary truncate transition-colors">
                          {notice.title}
                        </p>
                        <p className="text-xs text-muted-foreground/60 mt-0.5">{notice.date}</p>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-muted-foreground/40 group-hover:text-primary shrink-0 mt-1 transition-colors" />
                    </a>
                  ))}

                  {notices.length > 5 && (
                    <button
                      onClick={() => setShowAll(v => !v)}
                      className="w-full text-xs text-muted-foreground/60 hover:text-foreground py-2 transition-colors"
                    >
                      {showAll ? '\uc811기' : `더보기 (+${notices.length - 5}개)`}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
