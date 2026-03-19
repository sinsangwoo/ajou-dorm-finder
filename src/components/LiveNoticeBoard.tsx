'use client';
/**
 * LiveNoticeBoard.tsx — Phase 2
 * 아주대 생활관 공지사항 실시간 표시 + 신청 기간 카운트다운 + 푸시 구독
 */

import { useEffect, useState, useCallback } from 'react';
import { Bell, BellRing, ExternalLink, RefreshCw, AlertCircle, Clock, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { NoticeItem } from '@/app/api/notices/route';

// 신청 일정 (dormInfo.ts의 dormSchedule와 동기화 근거)
const APPLICATION_DEADLINE = new Date('2026-02-05T23:59:59+09:00');
const APPLICATION_OPEN     = new Date('2026-01-03T09:00:00+09:00');

function useCountdown(target: Date) {
  const calc = () => {
    const diff = target.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
    const days    = Math.floor(diff / 86400000);
    const hours   = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    return { days, hours, minutes, seconds, expired: false };
  };

  const [tick, setTick] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTick(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return tick;
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span className="text-2xl md:text-3xl font-extrabold text-primary tabular-nums tracking-tighter">
        {String(value).padStart(2, '0')}
      </span>
      <span className="text-[10px] text-muted-foreground/60 font-medium uppercase tracking-wider">{label}</span>
    </div>
  );
}

function CountdownSeparator() {
  return <span className="text-2xl font-bold text-muted-foreground/40 mb-3">:</span>;
}

const CATEGORY_STYLES: Record<string, string> = {
  '신청': 'bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300',
  '긴급': 'bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-300',
  '일반': 'bg-muted text-muted-foreground',
};

export default function LiveNoticeBoard() {
  const [notices, setNotices] = useState<NoticeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [source, setSource]   = useState<'live' | 'fallback'>('fallback');
  const [lastFetch, setLastFetch] = useState<string>('');
  const [subscribed, setSubscribed] = useState(false);
  const [subEmail, setSubEmail] = useState('');
  const [subStatus, setSubStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const deadline = useCountdown(APPLICATION_DEADLINE);
  const isOpen   = Date.now() >= APPLICATION_OPEN.getTime();

  const loadNotices = useCallback(async () => {
    setLoading(true);
    try {
      const res  = await fetch('/api/notices', { next: { revalidate: 3600 } } as RequestInit);
      const data = await res.json();
      setNotices(data.notices ?? []);
      setSource(data.source ?? 'fallback');
      setLastFetch(data.fetchedAt ?? '');
    } catch {
      setNotices([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadNotices(); }, [loadNotices]);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subEmail.includes('@')) { setSubStatus('error'); return; }
    // TODO: 실제 구독 로직 연동 (Supabase / 외부 서비스)
    setSubscribed(true);
    setSubStatus('success');
  };

  return (
    <section className="section-padding bg-background" id="notices">
      <div className="container mx-auto px-4 max-w-4xl">

        {/* 신청 기간 카운트다운 */}
        <div className="glass-card-strong rounded-2xl p-6 md:p-8 mb-8 border border-primary/10">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-lg tracking-tight">
              {isOpen ? '2026-1학기 기숙사비 납부 마감까지' : '기숙사 신청 기간까지'}
            </h3>
          </div>

          {deadline.expired ? (
            <p className="text-sm text-muted-foreground">마감일이 지났습니다. 다음 학기 일정을 확인하세요.</p>
          ) : (
            <div className="flex items-center gap-3">
              <CountdownUnit value={deadline.days} label="일" />
              <CountdownSeparator />
              <CountdownUnit value={deadline.hours} label="시간" />
              <CountdownSeparator />
              <CountdownUnit value={deadline.minutes} label="분" />
              <CountdownSeparator />
              <CountdownUnit value={deadline.seconds} label="초" />
            </div>
          )}

          <p className="text-xs text-muted-foreground/60 mt-3">
            마감 일시: {APPLICATION_DEADLINE.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>

        {/* 공지사항 목록 */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-extrabold text-foreground tracking-tight">생활관 공지사항</h2>
              {source === 'live' && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400 font-semibold">실시간</span>
              )}
            </div>
            <button
              onClick={loadNotices}
              disabled={loading}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
              aria-label="공지 새로고침"
            >
              <RefreshCw className={cn('w-3.5 h-3.5', loading && 'animate-spin')} />
              {lastFetch ? new Date(lastFetch).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }) : '방금 갱신'}
            </button>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-16 rounded-xl bg-muted/40 animate-pulse" />
              ))}
            </div>
          ) : notices.length === 0 ? (
            <div className="flex items-center gap-2 p-4 rounded-xl bg-muted/30 text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 shrink-0" />
              공지사항을 불러올 수 없습니다.
            </div>
          ) : (
            <ul className="space-y-2">
              {notices.map((n) => (
                <li key={n.id}>
                  <a
                    href={n.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      'flex items-start gap-3 p-4 rounded-xl border transition-all hover:border-primary/40 hover:bg-primary/[0.03]',
                      n.isImportant ? 'border-primary/20 bg-primary/[0.02]' : 'border-border/50 bg-background'
                    )}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={cn('text-[10px] px-1.5 py-0.5 rounded-full font-semibold', CATEGORY_STYLES[n.category])}>
                          {n.category}
                        </span>
                        {n.isImportant && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 font-semibold">⚠️ 중요</span>
                        )}
                      </div>
                      <p className="text-sm font-medium text-foreground truncate">{n.title}</p>
                      <p className="text-xs text-muted-foreground/60 mt-0.5">{n.date}</p>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-muted-foreground/40 shrink-0 mt-1" />
                  </a>
                </li>
              ))}
            </ul>
          )}

          <a
            href="https://dorm.ajou.ac.kr/dorm/community/notice.do"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors py-2"
          >
            전체 공지 보기
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* 푸시 구독 */}
        {!subscribed ? (
          <div className="glass-card-strong rounded-2xl p-6 border border-primary/10">
            <div className="flex items-center gap-2 mb-3">
              <BellRing className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-base tracking-tight">중요 공지 이메일 알림</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">신청 기간, 납부 마감 등 중요 공지를 이메일로 받아보세요.</p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                value={subEmail}
                onChange={(e) => setSubEmail(e.target.value)}
                placeholder="ajou@ajou.ac.kr"
                className="flex-1 px-3 py-2 text-sm rounded-lg border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 text-sm font-semibold bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                구독
              </button>
            </form>
            {subStatus === 'error' && (
              <p className="text-xs text-destructive mt-2">유효한 이메일 주소를 입력해주세요.</p>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2 p-4 rounded-xl bg-green-50 dark:bg-green-950/20 border border-green-200/60 dark:border-green-800/40 text-sm text-green-700 dark:text-green-400">
            <BellRing className="w-4 h-4 shrink-0" />
            <span>{subEmail}으로 알림을 신청했습니다. ✅</span>
          </div>
        )}
      </div>
    </section>
  );
}
