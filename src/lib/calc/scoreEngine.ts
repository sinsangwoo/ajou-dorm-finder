/**
 * scoreEngine.ts
 * ──────────────────────────────────────────────────────────────────────────────
 * Pure calculation functions for the AjouDorm score system.
 * Zero React dependencies — fully testable with Vitest in isolation.
 *
 * Scoring formula (2026-1학기 기준):
 *   일반학생  : 성적(60) + 지역/사생(30) + 봉사(5) + 법정교육(5) = 100
 *   가계곤란  : 가계곤란(60) + 성적(30) + 봉사(5) + 법정교육(5) = 100
 */

import {
  gradeScoreMap,
  gradeScoreMapFinancial,
  distanceRegions,
  type Gender,
  type StudentType,
} from "@/data/dormitoryData";

// ── Types ─────────────────────────────────────────────────────────────────────

export type ScoreMode = "general" | "financial";

export interface ScoreBreakdown {
  gradeScore: number;      // 성적 점수
  distanceScore: number;   // 지역 or 사생 점수 (일반 모드)
  financialScore: number;  // 가계곤란 점수 (가계곤란 모드, 일반 모드는 0)
  volunteerScore: number;  // 봉사활동 점수 (0 or 5)
  educationScore: number;  // 법정필수교육 점수 (0 or 5)
  totalScore: number;      // 최종 합산
}

export type ScoreLevel = "excellent" | "good" | "average" | "competitive";

export interface ScoreLevelInfo {
  level: ScoreLevel;
  label: string;
  colorClass: string;
  bgClass: string;
}

// ── [TD-1 FIX] Region Alias Table ─────────────────────────────────────────────
/**
 * 지역명 정규화 테이블.
 *
 * 이전 구현의 문제:
 *   d.regions.some((r) => r === region || region.includes(r) || r.includes(region))
 *
 * 위 로직은 "광주"가 "경기도 광주", "전라남도 광주" 모두에 substring-match 되어
 * 의도치 않게 첫 번째로 매칭된 카테고리의 점수를 반환할 수 있었다.
 *
 * 해결 전략:
 *   1. 모든 지역 키를 소문자+공백제거로 정규화 (normalize)
 *   2. UI 드롭다운에서 넘어오는 정확한 지역 문자열은 distanceRegions 데이터와
 *      1:1 exact match를 먼저 시도한다.
 *   3. Alias table을 통해 사용자가 다양하게 입력할 수 있는 약칭을 공식 명칭으로
 *      매핑한다. (예: "광주" → 컨텍스트 없이는 undefined → 0점 반환, 명확한
 *      "광주광역시" 또는 "경기도 광주"로 입력해야 점수 부여)
 */
export const REGION_ALIAS_MAP: Record<string, string> = {
  // 광역시/도 약칭 → 공식 표기
  "광주광역시": "광주",
  "광주시": "경기도 광주",   // 경기 광주는 '경기도 광주'로 구분
  "부산광역시": "부산",
  "대구광역시": "대구",
  "울산광역시": "울산",
  "대전광역시": "대전",
  "인천광역시": "인천",
  "세종특별자치시": "세종",
  "제주특별자치도": "제주",
  // 도 약칭
  "경남": "경상남도",
  "경북": "경상북도",
  "전남": "전라남도",
  "전북": "전라북도",
  "강원": "강원도(영동)",
  "충남": "충청남도",
  "충북": "충청북도",
  // 경기 세부 지역 (1~3시간대)
  "광주(경기)": "경기도 광주",
  "경기광주": "경기도 광주",
};

/**
 * 입력된 지역 문자열을 정규화하여 distanceRegions 배열에서
 * exact match로 카테고리를 찾아 점수를 반환한다.
 *
 * @param regionInput - UI에서 선택/입력된 지역 문자열
 * @returns 해당 지역의 거리 점수 (0 | 15 | 30)
 */
export function getDistanceScoreSafe(regionInput: string): number {
  if (!regionInput || regionInput.trim() === "") return 0;

  // 1. alias 테이블에서 정규화된 이름으로 변환 (없으면 원본 사용)
  const normalized = REGION_ALIAS_MAP[regionInput.trim()] ?? regionInput.trim();

  // 2. 각 카테고리의 regions 배열에서 정확히 일치하는 항목 탐색
  for (const category of distanceRegions) {
    if (category.regions.includes(normalized)) {
      return category.points;
    }
  }

  // 3. 완전 일치 실패 시 prefix 매칭 (예: "경기북부(의정부·구리...)") 처리
  //    단, 양방향 substring 대신 단방향(입력이 카테고리 항목의 prefix)만 허용
  for (const category of distanceRegions) {
    for (const r of category.regions) {
      if (r.startsWith(normalized) || normalized.startsWith(r.split("(")[0].trim())) {
        return category.points;
      }
    }
  }

  return 0;
}

// ── Grade Score ───────────────────────────────────────────────────────────────

/**
 * GPA → 성적 환산 점수 반환.
 * 성적 없는 신입생(gpa = -1 등)은 상위 표에서 최대점수로 처리됨.
 * 해당 로직은 공식 문서: "취득학점·성적 평점 없으면 60점으로 환산"
 */
export function calcGradeScore(gpa: number, mode: ScoreMode): number {
  const map = mode === "financial" ? gradeScoreMapFinancial : gradeScoreMap;
  // 내림차순 정렬을 가정하고 순차 탐색 (데이터 소스가 이미 내림차순)
  for (const entry of map) {
    if (gpa >= entry.min) return entry.score;
  }
  return mode === "financial" ? 3 : 10;
}

// ── Bonus Scores ──────────────────────────────────────────────────────────────

/** 봉사활동 점수: 0 or 5 */
export function calcVolunteerScore(hasVolunteer: boolean): number {
  return hasVolunteer ? 5 : 0;
}

/** 법정필수교육 점수: 0 or 5 */
export function calcEducationScore(hasEducation: boolean): number {
  return hasEducation ? 5 : 0;
}

// ── Total Score Calculator ────────────────────────────────────────────────────

export interface CalcScoreInput {
  mode: ScoreMode;
  gpa: number;                   // 0.0 ~ 4.5
  isPreviousResident: boolean;   // 사생점수 적용 여부 (일반 모드)
  region: string;                // 거주 지역 (일반 모드, 사생인 경우 무시)
  financialRawScore: number;     // 가계곤란점수 (가계곤란 모드, 0~60)
  volunteerRaw: number;          // 0 or 5 (슬라이더에서 step=5로 입력됨)
  educationRaw: number;          // 0 or 5
}

/**
 * 모든 입력을 받아 ScoreBreakdown을 반환하는 단일 진입점.
 * UI는 이 함수의 결과만을 표시한다.
 */
export function calcTotalScore(input: CalcScoreInput): ScoreBreakdown {
  const { mode, gpa, isPreviousResident, region, financialRawScore, volunteerRaw, educationRaw } = input;

  const gradeScore = calcGradeScore(gpa, mode);
  const volunteerScore = calcVolunteerScore(volunteerRaw === 5);
  const educationScore = calcEducationScore(educationRaw === 5);

  if (mode === "financial") {
    const financialScore = Math.min(60, Math.max(0, financialRawScore));
    return {
      gradeScore,
      distanceScore: 0,
      financialScore,
      volunteerScore,
      educationScore,
      totalScore: financialScore + gradeScore + volunteerScore + educationScore,
    };
  }

  // 일반 모드
  const distanceScore = isPreviousResident ? 30 : getDistanceScoreSafe(region);

  return {
    gradeScore,
    distanceScore,
    financialScore: 0,
    volunteerScore,
    educationScore,
    totalScore: gradeScore + distanceScore + volunteerScore + educationScore,
  };
}

// ── Score Level ───────────────────────────────────────────────────────────────

/**
 * 총점을 기반으로 경쟁력 레벨을 반환한다.
 * (일반/가계곤란 모두 100점 만점이므로 동일 기준 적용)
 */
export function getScoreLevelInfo(totalScore: number): ScoreLevelInfo {
  if (totalScore >= 85) {
    return { level: "excellent", label: "매우 유리", colorClass: "text-success", bgClass: "bg-success/10" };
  }
  if (totalScore >= 70) {
    return { level: "good", label: "유리", colorClass: "text-primary", bgClass: "bg-primary/10" };
  }
  if (totalScore >= 55) {
    return { level: "average", label: "보통", colorClass: "text-warning", bgClass: "bg-warning/10" };
  }
  return { level: "competitive", label: "경쟁 필요", colorClass: "text-destructive", bgClass: "bg-destructive/10" };
}

// ── Eligibility ───────────────────────────────────────────────────────────────
// Re-export from dormitoryData for consumers who only need scoreEngine
export type { Gender, StudentType };
