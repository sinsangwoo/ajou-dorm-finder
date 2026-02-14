/**
 * 기숙사 상세 정보 파일
 * 
 * 이 파일은 학기별로 변경될 수 있는 정보를 관리합니다.
 * 각 학기 시작 전에 최신 정보로 업데이트해 주세요.
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
  area?: string; // 면적 (㎡)
}

/**
 * 기숙사별 수용 인원 정보
 * 매 학기 TO(정원)가 변경될 수 있으므로 학기 시작 전 업데이트 필요
 * 
 * 출처: 아주대학교 생활관 시설현황 (2026-1학기 기준)
 */
export const dormCapacities: Record<string, DormCapacityInfo> = {
  namje: {
    capacity: "총 688명",
    totalPeople: 688,
    note: `(${CURRENT_SEMESTER} 시설현황 기준)`,
    roomBreakdown: {
      double: 4,    // 2인실 4실 (8명)
      quad: 170     // 4인실 170실 (680명)
    },
    area: "6,579㎡"
  },
  yongji: {
    capacity: "총 490명",
    totalPeople: 490,
    note: `(${CURRENT_SEMESTER} 시설현황 기준)`,
    roomBreakdown: {
      double: 31,   // 2인실 31실 (62명)
      quad: 107     // 4인실 107실 (428명)
    },
    area: "5,415㎡"
  },
  hwahong: {
    capacity: "총 390명",
    totalPeople: 390,
    note: `(${CURRENT_SEMESTER} 시설현황 기준)`,
    roomBreakdown: {
      single: 10,   // 1인실 10실 (10명)
      double: 94,   // 2인실 94실 (188명)
      quad: 48      // 4인실 48실 (192명)
    },
    area: "5,874㎡"
  },
  gwanggyo: {
    capacity: "총 552명",
    totalPeople: 552,
    note: `(${CURRENT_SEMESTER} 시설현황 기준)`,
    roomBreakdown: {
      double: 32,   // 2인실 32실 (64명)
      quad: 122     // 4인실 122실 (488명)
    },
    area: "6,645㎡"
  },
  international: {
    capacity: "총 408명",
    totalPeople: 408,
    note: `(${CURRENT_SEMESTER} 시설현황 기준)`,
    roomBreakdown: {
      double: 204   // 2인실 204실 (408명)
    },
    area: "10,096㎡"
  },
  ilsin: {
    capacity: "총 751명",
    totalPeople: 751,
    note: `(${CURRENT_SEMESTER} 시설현황 기준)`,
    roomBreakdown: {
      single: 59,   // 1인실(레지던셜) 59실 (59명)
      double: 270,  // 2인실 270실 (회장실 17 + 코너실 16 + 일반실 237)
      triple: 4,    // 3인실 4실 (12명)
      quad: 35      // 4인실 35실 (140명)
    },
    area: "14,228㎡"
  }
};

/**
 * 방 유형별 비율 계산
 */
export function getRoomTypePercentage(dormId: string): {
  single?: number;
  double?: number;
  triple?: number;
  quad?: number;
} {
  const dorm = dormCapacities[dormId];
  if (!dorm?.roomBreakdown) return {};
  
  const total = (dorm.roomBreakdown.single || 0) + 
                (dorm.roomBreakdown.double || 0) + 
                (dorm.roomBreakdown.triple || 0) + 
                (dorm.roomBreakdown.quad || 0);
  
  return {
    single: dorm.roomBreakdown.single ? Math.round((dorm.roomBreakdown.single / total) * 100) : undefined,
    double: dorm.roomBreakdown.double ? Math.round((dorm.roomBreakdown.double / total) * 100) : undefined,
    triple: dorm.roomBreakdown.triple ? Math.round((dorm.roomBreakdown.triple / total) * 100) : undefined,
    quad: dorm.roomBreakdown.quad ? Math.round((dorm.roomBreakdown.quad / total) * 100) : undefined,
  };
}

/**
 * 기숙사별 공지사항
 * 중요한 변경사항이나 추가 정보를 여기에 작성합니다.
 */
export const dormNotices: Record<string, string[]> = {
  namje: [
    "⚠️ 2027년 6월 행복기숙사 완공과 함께 철거 예정",
    "구축 건물로 시설이 상대적으로 오래되었습니다",
    "4인실 비중이 98.8%로 대부분을 차지합니다"
  ]
};

/**
 * 기숙사별 공식 홈페이지 링크
 */
export const DORM_HOMEPAGE = "https://dorm.ajou.ac.kr/dorm/index.do";
export const DORM_NOTICE_PAGE = "https://dorm.ajou.ac.kr/dorm/community/notice.do";

/**
 * D-Day 계산 함수
 */
export function getDaysUntilCompletion(): number {
  const today = new Date();
  const diffTime = HAENGBOK_COMPLETION_DATE.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
