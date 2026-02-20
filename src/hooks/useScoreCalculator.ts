/**
 * useScoreCalculator.ts
 * ──────────────────────────────────────────────────────────────────────────────
 * State management hook for the ScoreCalculator UI.
 * All calculation logic is delegated to scoreEngine.ts (pure functions).
 *
 * 이전 ScoreCalculator.tsx에서:
 *   - 8개의 분산된 useState
 *   - 인라인 계산 로직 (useMemo 내부)
 *   → 이 hook으로 완전히 이동.
 *
 * ScoreCalculator.tsx는 이 hook에서 반환된 값과 핸들러만 사용한다.
 */

import { useState, useMemo } from "react";
import {
  calcTotalScore,
  getScoreLevelInfo,
  type ScoreMode,
  type ScoreBreakdown,
  type ScoreLevelInfo,
} from "@/lib/calc/scoreEngine";
import { gradeScoreMap, gradeScoreMapFinancial } from "@/data/dormitoryData";

// ── GPA Input Validation ──────────────────────────────────────────────────────

const GPA_MIN = 0;
const GPA_MAX = 4.5;

function clampGpa(value: number): number {
  return Math.min(GPA_MAX, Math.max(GPA_MIN, value));
}

// ── Hook Return Type ──────────────────────────────────────────────────────────

export interface UseScoreCalculatorReturn {
  // Mode
  mode: ScoreMode;
  isFinancial: boolean;
  setMode: (mode: ScoreMode) => void;

  // GPA
  gpa: number;
  gpaInput: string; // controlled input string (allows partial typing like "3.")
  handleGpaSlider: (value: number) => void;
  handleGpaInput: (raw: string) => void;

  // General mode fields
  isPreviousResident: boolean;
  setIsPreviousResident: (v: boolean) => void;
  selectedRegion: string;
  setSelectedRegion: (r: string) => void;

  // Financial mode
  financialRawScore: number;
  setFinancialRawScore: (v: number) => void;

  // Bonus scores
  volunteerRaw: number;
  setVolunteerRaw: (v: number) => void;
  educationRaw: number;
  setEducationRaw: (v: number) => void;

  // Computed output
  breakdown: ScoreBreakdown;
  levelInfo: ScoreLevelInfo;
  gradeMax: number;

  // Chart data (derived — avoids recomputing in UI)
  chartData: { name: string; score: number }[];
}

// ── Hook Implementation ───────────────────────────────────────────────────────

export function useScoreCalculator(): UseScoreCalculatorReturn {
  // ── Mode ──
  const [mode, setModeState] = useState<ScoreMode>("general");
  const isFinancial = mode === "financial";

  const setMode = (m: ScoreMode) => setModeState(m);

  // ── GPA ──
  const [gpa, setGpa] = useState(3.5);
  const [gpaInput, setGpaInput] = useState("3.50");

  const handleGpaSlider = (value: number) => {
    const clamped = clampGpa(value);
    setGpa(clamped);
    setGpaInput(clamped.toFixed(2));
  };

  const handleGpaInput = (raw: string) => {
    setGpaInput(raw); // allow free typing
    const num = parseFloat(raw);
    if (!isNaN(num) && num >= GPA_MIN && num <= GPA_MAX) {
      setGpa(clampGpa(num));
    }
  };

  // ── General mode ──
  const [isPreviousResident, setIsPreviousResident] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("");

  // ── Financial mode ──
  const [financialRawScore, setFinancialRawScore] = useState(30);

  // ── Bonus ──
  const [volunteerRaw, setVolunteerRaw] = useState(0);
  const [educationRaw, setEducationRaw] = useState(0);

  // ── Computed: Score Breakdown ──
  const breakdown = useMemo<ScoreBreakdown>(() => {
    return calcTotalScore({
      mode,
      gpa,
      isPreviousResident,
      region: selectedRegion,
      financialRawScore,
      volunteerRaw,
      educationRaw,
    });
  }, [mode, gpa, isPreviousResident, selectedRegion, financialRawScore, volunteerRaw, educationRaw]);

  // ── Computed: Score Level ──
  const levelInfo = useMemo<ScoreLevelInfo>(() => {
    return getScoreLevelInfo(breakdown.totalScore);
  }, [breakdown.totalScore]);

  // ── Derived: Grade max for UI display ──
  const gradeMax = isFinancial ? 30 : 60;

  // ── Derived: Chart data ──
  const chartData = useMemo(() => {
    return (isFinancial ? gradeScoreMapFinancial : gradeScoreMap).map((entry) => ({
      name: entry.label,
      score: entry.score,
    }));
  }, [isFinancial]);

  return {
    mode,
    isFinancial,
    setMode,
    gpa,
    gpaInput,
    handleGpaSlider,
    handleGpaInput,
    isPreviousResident,
    setIsPreviousResident,
    selectedRegion,
    setSelectedRegion,
    financialRawScore,
    setFinancialRawScore,
    volunteerRaw,
    setVolunteerRaw,
    educationRaw,
    setEducationRaw,
    breakdown,
    levelInfo,
    gradeMax,
    chartData,
  };
}
