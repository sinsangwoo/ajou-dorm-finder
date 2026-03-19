'use client';
/**
 * ComparisonRadarChart.tsx — Phase 2
 *
 * ComparisonPanel에 연결되는 레이더 차트.
 * recharts RadarChart를 사용하여 3개 기숙사를 동시에 비교.
 *
 * 지표: 수용\uc778\uc6d0(\uc815\uaddc\ud654), \ub2e4\uc591\uc131(\ud0dc\uadf8\uc218), \ud3b8\uc758\uc2dc\uc124, \ube44\uc6a9, \ud615\ud3c9
 */

import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis,
  ResponsiveContainer, Legend, Tooltip,
} from 'recharts';
import { dormitories } from '@/data/dormitoryData';
import { dormCapacities, dormCosts, dormFacilities } from '@/data/dormInfo';

const COLORS = ['#0057B7', '#C5A028', '#16A34A'];

function normalizeCost(semester: string): number {
  const n = parseInt(semester.replace(/[^0-9]/g, ''), 10) || 800000;
  // 600k~1200k 스\ucf00\uc77c 대\uc0c1 → 5\uc810 만\uc810
  return Math.max(1, Math.round(5 - ((n - 600000) / 120000)));
}

function buildDormData(dormId: string) {
  const dorm = dormitories.find(d => d.id === dormId);
  if (!dorm) return null;

  const cap       = dormCapacities[dormId];
  const cost      = dormCosts[dormId];
  const facil     = dormFacilities[dormId] ?? [];
  const available = facil.filter(f => f.available).length;

  // \uc218\uc6a9\uc778\uc6d0: totalPeople / 200 (max 5)
  const capScore = Math.min(5, Math.round((cap?.totalPeople ?? 400) / 200));
  // \ud3b8\uc758\uc2dc\uc124: \ud65c\uc131\ud654\ub41c \uc2dc\uc124 \uc218 / \uc804\uccb4 * 5
  const facilScore = facil.length ? Math.round((available / facil.length) * 5) : 3;
  // \ube44\uc6a9 \ud6a8\uc728\uc131 (\uc800\ub834\ud560\uc218\ub85d \uc810\uc218 \ub192\uc74c)
  const costScore = cost ? normalizeCost(cost.semester) : 3;
  // \ub2e4\uc591\uc131 (\ud0dc\uadf8 \uc218)
  const divScore = Math.min(5, dorm.tags.length + 1);
  // \uc2e0\ucd95\uc5ec\ubd80
  const newScore = dorm.tags.includes('#\uc2e0\ucd95') || dorm.id === 'gwanggyo' || dorm.id === 'ilsin' ? 5 : 2;

  return {
    name: dorm.name,
    data: [
      { subject: '\uc218\uc6a9\uc778\uc6d0', value: capScore },
      { subject: '\ud3b8\uc758\uc2dc\uc124', value: facilScore },
      { subject: '\ube44\uc6a9\ud6a8\uc728', value: costScore },
      { subject: '\ub2e4\uc591\uc131',   value: divScore },
      { subject: '\uc2dc\uc124\ud488\uc9c8', value: newScore },
    ],
  };
}

interface ComparisonRadarChartProps {
  selectedIds: string[];
}

export default function ComparisonRadarChart({ selectedIds }: ComparisonRadarChartProps) {
  if (selectedIds.length < 2) return null;

  const dormDataList = selectedIds.map(buildDormData).filter(Boolean) as ReturnType<typeof buildDormData>[];
  const subjects = dormDataList[0]!.data.map(d => d.subject);

  // recharts RadarChart\uc6a9 \ub370\uc774\ud130 \ud3ec\ub9f7 \ubcc0\ud658
  const chartData = subjects.map((subject, si) => {
    const entry: Record<string, number | string> = { subject };
    dormDataList.forEach((dd, di) => {
      entry[dd!.name] = dd!.data[si].value;
    });
    return entry;
  });

  return (
    <div className="glass-card-strong rounded-2xl p-5">
      <h4 className="text-sm font-semibold mb-4">\uc885\ud569 \ube44\uad50</h4>
      <ResponsiveContainer width="100%" height={260}>
        <RadarChart data={chartData} cx="50%" cy="50%" outerRadius={90}>
          <PolarGrid stroke="hsl(213 20% 85%)" />
          <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11 }} />
          {dormDataList.map((dd, i) => (
            <Radar
              key={dd!.name}
              name={dd!.name}
              dataKey={dd!.name}
              stroke={COLORS[i % COLORS.length]}
              fill={COLORS[i % COLORS.length]}
              fillOpacity={0.12}
              strokeWidth={2}
            />
          ))}
          <Legend
            wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }}
          />
          <Tooltip
            contentStyle={{ fontSize: '12px', borderRadius: '8px' }}
            formatter={(v: number) => [`${v}\uc810`, '']}
          />
        </RadarChart>
      </ResponsiveContainer>
      <p className="text-[10px] text-muted-foreground/50 text-center mt-1">
        \ub370\uc774\ud130 \uae30\ubc18 \uc0c1\ub300 \uc218\uce58\uc785\ub2c8\ub2e4
      </p>
    </div>
  );
}
