/**
 * 기숙사 상세 정보 파일
 * 매 학기 시작 전에 최신 정보로 업데이트해 주세요.
 */

export const CURRENT_SEMESTER = "2026-1학기";

// 행복기숙사 완공 예정일
export const HAENGBOK_COMPLETION_DATE = new Date("2027-06-30");

export interface DormCapacityInfo {
  capacity: string;
  totalPeople: number;
  note?: string;
  roomBreakdown?: {
    single?: number;
    double?: number;
    triple?: number;
    quad?: number;
  };
  area?: string;
}

export interface DormCostInfo {
  semester: string; // 학기 기숙사비 (원)
  meal?: string;    // 식비 (선택적, 없으면 미포함)
  mealNote?: string;
  note?: string;
}

export interface DormFacility {
  icon: string; // emoji
  label: string;
  available: boolean;
}

export interface DormSchedule {
  phase: string;
  dateRange: string;
  description: string;
  status: "done" | "active" | "upcoming";
}

/**
 * 기숙사별 수용 인원 정보
 * 출처: 아주대학교 생활관 시설현황 (2026-1학기 기준)
 */
export const dormCapacities: Record<string, DormCapacityInfo> = {
  namje: {
    capacity: "총 688명",
    totalPeople: 688,
    note: `(${CURRENT_SEMESTER} 시설현황 기준)`,
    roomBreakdown: {
      double: 4,
      quad: 170,
    },
    area: "6,579㎡",
  },
  yongji: {
    capacity: "총 490명",
    totalPeople: 490,
    note: `(${CURRENT_SEMESTER} 시설현황 기준)`,
    roomBreakdown: {
      double: 31,
      quad: 107,
    },
    area: "5,415㎡",
  },
  hwahong: {
    capacity: "총 390명",
    totalPeople: 390,
    note: `(${CURRENT_SEMESTER} 시설현황 기준)`,
    roomBreakdown: {
      single: 10,
      double: 94,
      quad: 48,
    },
    area: "5,874㎡",
  },
  gwanggyo: {
    capacity: "총 552명",
    totalPeople: 552,
    note: `(${CURRENT_SEMESTER} 시설현황 기준)`,
    roomBreakdown: {
      double: 32,
      quad: 122,
    },
    area: "6,645㎡",
  },
  international: {
    capacity: "총 408명",
    totalPeople: 408,
    note: `(${CURRENT_SEMESTER} 시설현황 기준)`,
    roomBreakdown: {
      double: 204,
    },
    area: "10,096㎡",
  },
  ilsin: {
    capacity: "총 751명",
    totalPeople: 751,
    note: `(${CURRENT_SEMESTER} 시설현황 기준)`,
    roomBreakdown: {
      single: 59,
      double: 270,
      triple: 4,
      quad: 35,
    },
    area: "14,228㎡",
  },
};

/**
 * 방 유형별 비율 계산 (방 수 기준)
 */
export function getRoomTypePercentage(dormId: string): {
  single?: number;
  double?: number;
  triple?: number;
  quad?: number;
} {
  const dorm = dormCapacities[dormId];
  if (!dorm?.roomBreakdown) return {};

  const total =
    (dorm.roomBreakdown.single || 0) +
    (dorm.roomBreakdown.double || 0) +
    (dorm.roomBreakdown.triple || 0) +
    (dorm.roomBreakdown.quad || 0);

  return {
    single: dorm.roomBreakdown.single
      ? Math.round((dorm.roomBreakdown.single / total) * 100)
      : undefined,
    double: dorm.roomBreakdown.double
      ? Math.round((dorm.roomBreakdown.double / total) * 100)
      : undefined,
    triple: dorm.roomBreakdown.triple
      ? Math.round((dorm.roomBreakdown.triple / total) * 100)
      : undefined,
    quad: dorm.roomBreakdown.quad
      ? Math.round((dorm.roomBreakdown.quad / total) * 100)
      : undefined,
  };
}

/**
 * 기숙사별 비용 정보 (2026-1학기 기준, 참고용)
 */
export const dormCosts: Record<string, DormCostInfo> = {
  namje: {
    semester: "약 680,000원",
    meal: "약 480,000원 (선택)",
    mealNote: "조식+석식 기준",
    note: "4인실 기준",
  },
  yongji: {
    semester: "약 720,000원",
    meal: "약 480,000원 (선택)",
    mealNote: "조식+석식 기준",
    note: "2인실 기준",
  },
  hwahong: {
    semester: "약 720,000원",
    meal: "약 480,000원 (선택)",
    note: "2인실 기준",
  },
  gwanggyo: {
    semester: "약 750,000원",
    meal: "약 480,000원 (선택)",
    note: "2인실 기준, 신축 건물",
  },
  international: {
    semester: "약 850,000원",
    meal: "약 480,000원 (선택)",
    note: "2인실 기준",
  },
  ilsin: {
    semester: "약 950,000원 (2인실)",
    meal: "약 480,000원 (선택)",
    mealNote: "1인실은 약 1,100,000원",
    note: "방 유형에 따라 상이",
  },
};

/**
 * 기숙사별 시설 정보
 */
export const dormFacilities: Record<string, DormFacility[]> = {
  namje: [
    { icon: "❄️", label: "에어컨", available: true },
    { icon: "🧺", label: "세탁실", available: true },
    { icon: "📶", label: "Wi-Fi", available: true },
    { icon: "🍳", label: "공용 주방", available: false },
    { icon: "🏋️", label: "헬스장", available: false },
    { icon: "🛁", label: "개인 욕실", available: false },
  ],
  yongji: [
    { icon: "❄️", label: "에어컨", available: true },
    { icon: "🧺", label: "세탁실", available: true },
    { icon: "📶", label: "Wi-Fi", available: true },
    { icon: "🍳", label: "공용 주방", available: false },
    { icon: "🏋️", label: "헬스장", available: false },
    { icon: "🛁", label: "개인 욕실", available: false },
  ],
  hwahong: [
    { icon: "❄️", label: "에어컨", available: true },
    { icon: "🧺", label: "세탁실", available: true },
    { icon: "📶", label: "Wi-Fi", available: true },
    { icon: "🍳", label: "공용 주방", available: true },
    { icon: "🏋️", label: "헬스장", available: false },
    { icon: "🛁", label: "개인 욕실", available: false },
  ],
  gwanggyo: [
    { icon: "❄️", label: "에어컨", available: true },
    { icon: "🧺", label: "세탁실", available: true },
    { icon: "📶", label: "Wi-Fi", available: true },
    { icon: "🍳", label: "공용 주방", available: true },
    { icon: "🏋️", label: "헬스장", available: false },
    { icon: "🛁", label: "개인 욕실", available: false },
  ],
  international: [
    { icon: "❄️", label: "에어컨", available: true },
    { icon: "🧺", label: "세탁실", available: true },
    { icon: "📶", label: "Wi-Fi", available: true },
    { icon: "🍳", label: "공용 주방", available: true },
    { icon: "🏋️", label: "헬스장", available: true },
    { icon: "🛁", label: "개인 욕실", available: false },
  ],
  ilsin: [
    { icon: "❄️", label: "에어컨", available: true },
    { icon: "🧺", label: "세탁실", available: true },
    { icon: "📶", label: "Wi-Fi", available: true },
    { icon: "🍳", label: "공용 주방", available: true },
    { icon: "🏋️", label: "헬스장", available: true },
    { icon: "🛁", label: "개인 욕실", available: false },
  ],
};

/**
 * 입사 신청 일정 (2026-1학기 기준, 참고용)
 */
export const dormSchedule: DormSchedule[] = [
  {
    phase: "입사 공고",
    dateRange: "2025년 12월 중순",
    description: "모집 인원 및 신청 자격 공고",
    status: "done",
  },
  {
    phase: "온라인 신청",
    dateRange: "2026년 1월 초",
    description: "아주대 생활관 홈페이지에서 신청",
    status: "done",
  },
  {
    phase: "선발 결과 발표",
    dateRange: "2026년 1월 말",
    description: "합격자 개별 통보 (홈페이지 확인)",
    status: "active",
  },
  {
    phase: "기숙사비 납부",
    dateRange: "2026년 2월 초",
    description: "입금 기한 내 미납 시 자동 취소",
    status: "upcoming",
  },
  {
    phase: "입사",
    dateRange: "2026년 2월 말",
    description: "1학기 정식 입사일",
    status: "upcoming",
  },
];

/**
 * 기숙사별 공지사항
 */
export const dormNotices: Record<string, string[]> = {
  namje: [
    "⚠️ 2027년 6월 행복기숙사 완공과 함께 철거 예정",
    "구축 건물로 시설이 상대적으로 오래되었습니다",
    "4인실 비중이 98.8%로 대부분을 차지합니다",
  ],
};

/**
 * 과거 커트라인 (참고용 — 실제와 다를 수 있음, 반드시 참고치로만 표시)
 */
export const scoreReference = {
  note: "아래 수치는 참고용이며 매 학기 달라질 수 있습니다",
  cutlines: [
    { label: "합격 가능성 높음", minScore: 75, color: "success" },
    { label: "경쟁 필요", minScore: 55, color: "warning" },
    { label: "어려울 수 있음", minScore: 0, color: "destructive" },
  ],
};

/**
 * 공식 링크
 */
export const DORM_HOMEPAGE = "https://dorm.ajou.ac.kr/dorm/index.do";
export const DORM_NOTICE_PAGE =
  "https://dorm.ajou.ac.kr/dorm/community/notice.do";

/**
 * D-Day 계산
 */
export function getDaysUntilCompletion(): number {
  const today = new Date();
  const diffTime =
    HAENGBOK_COMPLETION_DATE.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
