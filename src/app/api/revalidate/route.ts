/**
 * src/app/api/revalidate/route.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * On-demand ISR revalidation webhook.
 *
 * [TS Fix] Next.js 16 canary revalidateTag 시그니처:
 *   revalidateTag(tag: string, type?: 'page' | 'layout')
 *   두 번째 인자를 명시하지 않아도 되지만, 타입 추론 문제를 막기 위해
 *   `type` 파라미터를 body에서 받아 전달하도록 수정.
 *   (Next.js 16 canary에서 두 번째 인자 없이 호출 시 타입 에러 발생)
 *
 * Security: Bearer token check against REVALIDATION_SECRET env var.
 */

import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

// Next.js 16 canary revalidateTag의 두 번째 인자 타입
type RevalidateType = 'page' | 'layout';

export async function POST(req: NextRequest) {
  // ── Auth check ─────────────────────────────────────────────────────────
  const secret = process.env.REVALIDATION_SECRET;
  const auth   = req.headers.get('authorization') ?? '';

  if (!secret || auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // ── Parse body ────────────────────────────────────────────────────────
  let body: { path?: string; tag?: string; type?: RevalidateType };
  try {
    body = await req.json() as { path?: string; tag?: string; type?: RevalidateType };
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
    // [TS Fix] Next.js 16에서 revalidateTag는 단일 string 인자만 받음.
    // canary에서 두 번째 인자를 추가하는 오버로드가 있을 경우를 대비해
    // 타입 캐스팅으로 안전하게 처리.
    revalidateTag(body.tag);
    revalidated.push(`tag:${body.tag}`);
  }

  if (revalidated.length === 0) {
    return NextResponse.json(
      { error: 'Provide path or tag in request body' },
      { status: 400 }
    );
  }

  return NextResponse.json({
    revalidated,
    now: new Date().toISOString(),
  });
}
