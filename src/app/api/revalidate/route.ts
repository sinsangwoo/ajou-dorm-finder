/**
 * src/app/api/revalidate/route.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * On-demand ISR revalidation webhook.
 *
 * [TS Fix] revalidateTag 시그니쳐 — Next.js 16 canary 확정 방법:
 *
 *   공식 타입 정의 (next.js/packages/next/src/server/web/spec-extension/revalidate.ts):
 *     revalidateTag(
 *       tag:     string,
 *       profile?: string | { expire?: number }
 *     ): void
 *
 *   - profile은 문서에는 optional이라 표시되어 있으나,
 *     일부 canary 빌드에서는 두 번째 인자를 요구함.
 *   - 웹훅/외부 호출에서는 { expire: 0 } 패턴 권장
 *     (Next.js 공식 도표 인용: “For webhooks or third-party services that need
 *     immediate expiration, you can pass { expire: 0 }”)
 *
 *   - body에서 expire 값을 받아 유연하게 전달; 미입력 시 expire: 0 (webhook 기본값)
 *
 * Security: Bearer token check against REVALIDATION_SECRET env var.
 */

import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

// Next.js 16 canary revalidateTag 두 번째 인자의 정확한 타입
type TagProfile = string | { expire?: number };

export async function POST(req: NextRequest) {
  // ── Auth check ─────────────────────────────────────────────────────────
  const secret = process.env.REVALIDATION_SECRET;
  const auth   = req.headers.get('authorization') ?? '';

  if (!secret || auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // ── Parse body ───────────────────────────────────────────────────────
  let body: {
    path?:    string;
    tag?:     string;
    type?:    'page' | 'layout';  // revalidatePath 두 번째 인자
    expire?:  number;             // revalidateTag profile.expire (0 = 즉시 만료)
  };

  try {
    body = (await req.json()) as typeof body;
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
    /**
     * [TS Fix] Next.js 16 canary revalidateTag 시그니쳐:
     *   revalidateTag(tag: string, profile?: string | { expire?: number }): void
     *
     * 웹훅 컨텍스트(Route Handler)에서는 점진적 만료를 위해
     * { expire: 0 } 패턴이 권장됨.
     * body.expire가 입력되지 않으면 0을 기본값으로 사용.
     */
    const profile: TagProfile = { expire: body.expire ?? 0 };
    revalidateTag(body.tag, profile);
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
