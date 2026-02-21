'use client';
/**
 * Providers.tsx  —  Single 'use client' boundary for all context providers
 * ──────────────────────────────────────────────────────────────────────────────
 * Pattern rationale:
 *   By isolating all context providers into this single component we keep the
 *   Root Layout (RootLayout) as a pure RSC. The layout shell itself has zero
 *   hydration overhead; only Providers (and the subtree that needs context)
 *   is shipped as client JS.
 *
 * Providers included:
 *   1. ThemeProvider  (next-themes)  – dark/light/system mode
 *   2. QueryClientProvider  (‘@tanstack/react-query’)  – data fetching cache
 *   3. TooltipProvider  (Radix)  – global tooltip portal
 *   4. Sonner <Toaster>  – toast notifications
 */

import { useState }             from 'react';
import { ThemeProvider }        from 'next-themes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider }      from '@/components/ui/tooltip';
import { Toaster }              from 'sonner';

export function Providers({ children }: { children: React.ReactNode }) {
  // Instantiate QueryClient inside component so each server render gets its
  // own instance (required for Next.js App Router SSR correctness).
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Data is pre-fetched in RSC; client only refetches on stale
            staleTime: 60 * 1000,       // 1 min
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <QueryClientProvider client={queryClient}>
        <TooltipProvider delayDuration={300}>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              classNames: {
                toast:
                  'bg-card text-card-foreground border border-border shadow-card rounded-xl font-sans',
                description: 'text-muted-foreground',
                actionButton: 'bg-primary text-primary-foreground',
              },
            }}
          />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
