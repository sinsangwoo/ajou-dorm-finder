'use client';
/**
 * DormRoomChart.tsx  —  Client Component
 * ─────────────────────────────────────────────────────────────────────────────
 * Isolated client island for the recharts PieChart on the dorm detail page.
 * recharts requires browser DOM APIs (ResizeObserver) so it must be 'use client'.
 *
 * Receives chartData as serialised props from the RSC parent.
 * Zero data fetching; pure presentation.
 */

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = [
  '#002855',  // Ajou Navy
  '#0057B7',  // Ajou Blue
  '#C5A028',  // Ajou Gold
  '#6B7280',  // Neutral
];

interface ChartItem { name: string; value: number; }

export default function DormRoomChart({ chartData }: { chartData: ChartItem[] }) {
  return (
    <div className="glass-card-strong rounded-2xl p-6">
      <h2 className="font-bold text-lg mb-4 tracking-tight">방 유형 구성</h2>
      <div className="flex items-center gap-8">
        <ResponsiveContainer width={200} height={200}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label={(entry: ChartItem) => `${entry.value}%`}
            >
              {chartData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(v: number) => `${v}%`} />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex-1 space-y-2">
          {chartData.map((item, i) => (
            <div key={item.name} className="flex items-center gap-3">
              <div className="w-4 h-4 rounded shrink-0" style={{ background: COLORS[i % COLORS.length] }} />
              <span className="text-sm font-medium text-foreground">{item.name}</span>
              <span className="text-sm text-muted-foreground ml-auto">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
