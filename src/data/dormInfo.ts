/**
 * 기숙사 상세 정보 파일
 * 
 * 이 파일은 학기별로 변경될 수 있는 정보를 관리합니다.
 * 각 학기 시작 전에 최신 정보로 업데이트해 주세요.
 */

export const CURRENT_SEMESTER = "2026-1학기";

export interface DormCapacityInfo {
  capacity: string;
  note?: string;
}

/**
 * 기숙사별 수용 인원 정보
 * 매 학기 TO(정원)가 변경될 수 있으므로 학기 시작 전 업데이트 필요
 */
export const dormCapacities: Record<string, DormCapacityInfo> = {
  namje: {
    capacity: "약 400명",
    note: `(${CURRENT_SEMESTER} 기준)`
  },
  yongji: {
    capacity: "약 350명",
    note: `(${CURRENT_SEMESTER} 기준)`
  },
  hwahong: {
    capacity: "약 200명",
    note: `(${CURRENT_SEMESTER} 기준)`
  },
  gwanggyo: {
    capacity: "약 450명",
    note: `(${CURRENT_SEMESTER} 기준)`
  },
  international: {
    capacity: "약 500명",
    note: `(${CURRENT_SEMESTER} 기준)`
  },
  ilsin: {
    capacity: "약 300명",
    note: `(${CURRENT_SEMESTER} 기준)`
  }
};

/**
 * 기숙사별 공지사항
 * 중요한 변경사항이나 추가 정보를 여기에 작성합니다.
 */
export const dormNotices: Record<string, string[]> = {
  namje: [
    "⚠️ 2027년 6월 행복기숙사 완공과 함께 철거 예정",
    "구축 건물로 시설이 상대적으로 오래되었습니다"
  ]
};
