/**
 * src/app/api/revalidate/route.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * On-demand ISR revalidation webhook.
 *
 * Called by:
 *  - Supabase DB trigger (pg_net) after a notice INSERT/UPDATE
 *  - Manual admin script when new official data is published
 *
 * Security: Bearer token check against REVALIDATION_SECRET env var.
 * (Generate with `openssl rand -hex 32` and set in Vercel env vars.)
 *
 * Usage:
 *   POST /api/revalidate
 *   Authorization: Bearer <REVALIDATION_SECRET>
 *   Body: { "path": "/" }          // revalidate home page
 *          { "path": "/dorms" }    // revalidate dorms list
 *          { "tag": "notices" }    // revalidate by cache tag
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
  let body: { path?: string; tag?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const revalidated: string[] = [];

  if (body.path) {
    revalidatePath(body.path);
    revalidated.push(`path:${body.path}`);
  }

  if (body.tag) {
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
