'use client';
/**
 * src/app/global-error.tsx — Global Error Boundary
 * ─────────────────────────────────────────────────────────────────────────────
 * Catches errors that occur in the root layout.tsx itself.
 * Unlike error.tsx this component MUST render its own <html> + <body>
 * because the layout is unavailable.
 *
 * This should almost never fire in production; it's the last safety net.
 */

import { useEffect } from 'react';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error('[GlobalError boundary]', error);
  }, [error]);

  return (
    <html lang="ko">
      <body
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
          background: '#fafafa',
          color: '#111',
          textAlign: 'center',
          padding: '2rem',
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 16,
            background: '#fee2e2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 24,
            fontSize: 28,
          }}
        >
          ⚠️
        </div>

        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: 8 }}>
          서비스를 불러올 수 없습니다
        </h1>
        <p
          style={{
            color: '#6b7280',
            fontSize: '0.875rem',
            maxWidth: 360,
            lineHeight: 1.6,
            marginBottom: 32,
          }}
        >
          예기치 않은 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.
          {error.digest && (
            <span style={{ display: 'block', fontSize: '0.75rem', marginTop: 4, opacity: 0.4 }}>
              코드: {error.digest}
            </span>
          )}
        </p>

        <button
          onClick={reset}
          style={{
            background: '#002855',
            color: '#fff',
            border: 'none',
            borderRadius: 9999,
            padding: '0.625rem 1.5rem',
            fontSize: '0.875rem',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          다시 시도하기
        </button>
      </body>
    </html>
  );
}
