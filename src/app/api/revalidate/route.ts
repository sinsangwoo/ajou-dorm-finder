/**
 * src/app/api/revalidate/route.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * On-demand ISR revalidation webhook.
 *
 * [TS Fix] revalidateTag / revalidatePath 시그니처 정리:
 *   Next.js 16 canary 기준:
 *     revalidateTag(tag: string): void           — 1개 인자
 *     revalidatePath(path: string, type?: 'page' | 'layout'): void
 *
 *   이전 커밋에서 body에 type?: RevalidateType 을 추가했는데
 *   revalidateTag는 두 번째 인자를 받지 않으므로 제거.
 *   revalidatePath의 두 번째 인자는 정상 유지.
 *
 * Security: Bearer token check against REVALIDATION_SECRET env var.
 */

import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function POST(req: NextRequest) {
  // ── Auth check ─────────────────────────────────────────────────────────
  const secret = process.env.REVALIDATION_SECRET;
  const auth   = req.headers.get('authorization') ?? '';

  if (!secret || auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // ── Parse body ───────────────────────────────────────────────────────
  // [TS Fix] body 타입을 명시적으로 정의해 타입 추론 오류 방지
  let body: { path?: string; tag?: string; type?: 'page' | 'layout' };
  try {
    body = (await req.json()) as { path?: string; tag?: string; type?: 'page' | 'layout' };
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const revalidated: string[] = [];

  if (body.path) {
    // revalidatePath(path, type?) — type 기본값 'page'
    revalidatePath(body.path, body.type ?? 'page');
    revalidated.push(`path:${body.path}`);
  }

  if (body.tag) {
    // [TS Fix] revalidateTag은 단일 string 인자만 받음 (Next.js 16 canary 포함)
    revalidateTag(body.tag);
    revalidated.push(`tag:${body.tag}`);
  }

  if (revalidated.length === 0) {
    return NextResponse.json(
      { error: 'Provide path or tag in request body' },
      { status: 400 },
    );
  }

  return NextResponse.json({
    revalidated,
    now: new Date().toISOString(),
  });
}
