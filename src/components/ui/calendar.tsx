/**
 * src/components/ui/calendar.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * [TS Fix] react-day-picker v9 breaking change — IconLeft / IconRight 제거됨
 *
 * react-day-picker v8 (이전):
 *   components={{ IconLeft: () => <ChevronLeft />, IconRight: () => <ChevronRight /> }}
 *
 * react-day-picker v9 (현재 설치된 버전 ^9.7.0):
 *   - IconLeft / IconRight 컴포넌트 슬롯이 제거됨
 *   - 대신 단일 `Chevron` 컴포넌트 슬롯을 사용함
 *   - Chevron은 orientation prop('left' | 'right')을 받아 방향을 결정
 *
 * 공식 마이그레이션 가이드:
 *   https://daypicker.dev/upgrading
 */
import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DayPicker } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        months:   'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month:    'space-y-4',
        caption:  'flex justify-center pt-1 relative items-center',
        caption_label: 'text-sm font-medium',
        nav:      'space-x-1 flex items-center',
        nav_button: cn(
          buttonVariants({ variant: 'outline' }),
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
        ),
        nav_button_previous: 'absolute left-1',
        nav_button_next:     'absolute right-1',
        table:     'w-full border-collapse space-y-1',
        head_row:  'flex',
        head_cell: 'text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]',
        row:  'flex w-full mt-2',
        cell: 'h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-9 w-9 p-0 font-normal aria-selected:opacity-100',
        ),
        day_range_end:    'day-range-end',
        day_selected:     'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
        day_today:        'bg-accent text-accent-foreground',
        day_outside:      'day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
        day_disabled:     'text-muted-foreground opacity-50',
        day_range_middle: 'aria-selected:bg-accent aria-selected:text-accent-foreground',
        day_hidden:       'invisible',
        ...classNames,
      }}
      components={{
        // [TS Fix] v9 API: 단일 Chevron 슬롯, orientation('left'|'right') prop으로 방향 결정
        // v8의 IconLeft / IconRight 슬롯은 v9에서 삭제됨 — 이 패턴이 공식 마이그레이션
        Chevron: ({ orientation, ...chevronProps }) =>
          orientation === 'left'
            ? <ChevronLeft  className="h-4 w-4" {...chevronProps} />
            : <ChevronRight className="h-4 w-4" {...chevronProps} />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
