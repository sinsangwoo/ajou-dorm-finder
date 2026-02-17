import { dormCapacities, dormNotices } from "./dormInfo";

export type Gender = "male" | "female";

export type StudentType =
  | "freshman"
  | "enrolled"
  | "graduate"
  | "foreigner"
  | "medical"
  | "nursing"
  | "law";

export interface StudentCategory {
  gender: Gender;
  type: StudentType;
  label: string;
}

export interface Dormitory {
  id: string;
  name: string;
  nameEn: string;
  tags: string[];
  competitionBadge?: string;
  description: string;
  capacity: string;
  capacityNote?: string;
  roomType: string;
  features: string[];
  notices?: string[];
}

export const studentTypes: { type: StudentType; label: string }[] = [
  { type: "freshman", label: "학부 신입생" },
  { type: "enrolled", label: "학부 재학생" },
  { type: "graduate", label: "일반대학원" },
  { type: "foreigner", label: "외국인" },
  { type: "medical", label: "의과대학" },
  { type: "nursing", label: "간호대학" },
  { type: "law", label: "법학전문대학원" },
];

export const dormitories: Dormitory[] = [
  {
    id: "namje",
    name: "남제관",
    nameEn: "Namje Hall",
    tags: ["#재학생전용", "#남성전용", "#구축건물"],
    description: "학부 재학생 남학생 및 외국인 남학생이 거주할 수 있는 기숙사입니다.",
    capacity: dormCapacities.namje.capacity,
    capacityNote: dormCapacities.namje.note,
    roomType: "2인실, 4인실 (4인실 위주)",
    features: [
      "학부 재학생 남학생 전용 (신입생 지원 불가)",
      "외국인 남학생 입주 가능",
      "구축 건물로 시설이 상대적으로 오래됨",
      "4인실 비중 98.8%",
    ],
    notices: dormNotices.namje,
  },
  {
    id: "yongji",
    name: "용지관",
    nameEn: "Yongji Hall",
    tags: ["#대학원가능", "#남성전용"],
    description: "학부 남학생 및 일반·특수대학원 남학생이 거주할 수 있는 기숙사입니다.",
    capacity: dormCapacities.yongji.capacity,
    capacityNote: dormCapacities.yongji.note,
    roomType: "2인실, 4인실",
    features: [
      "학부 신입생·재학생 남학생",
      "일반대학원·특수대학원 남학생",
      "캠퍼스 인근",
    ],
  },
  {
    id: "hwahong",
    name: "화홍관",
    nameEn: "Hwahong Hall",
    tags: ["#외국인전용", "#남녀공용"],
    description: "외국인 학생 전용 기숙사입니다. 남녀 모두 입주 가능합니다.",
    capacity: dormCapacities.hwahong.capacity,
    capacityNote: dormCapacities.hwahong.note,
    roomType: "1인실, 2인실, 4인실",
    features: [
      "외국인 학생 전용",
      "남녀 모두 입주 가능",
      "국제교류 활성화 환경",
    ],
  },
  {
    id: "gwanggyo",
    name: "광교관",
    nameEn: "Gwanggyo Hall",
    tags: ["#여성전용", "#신축"],
    description:
      "여자 학부생, 여자 간호대생, 여자 일반·특수대학원생이 거주할 수 있습니다.",
    capacity: dormCapacities.gwanggyo.capacity,
    capacityNote: dormCapacities.gwanggyo.note,
    roomType: "2인실, 4인실",
    features: [
      "학부 신입생·재학생 여학생",
      "간호대학 여학생",
      "일반·특수대학원 여학생",
      "신축 건물",
    ],
  },
  {
    id: "international",
    name: "국제학사",
    nameEn: "International House",
    tags: ["#남녀공용", "#다양한대상"],
    competitionBadge: "경쟁 높음",
    description:
      "학부생, 외국인 학생, 일반대학원생 모두 지원 가능한 기숙사입니다.",
    capacity: dormCapacities.international.capacity,
    capacityNote: dormCapacities.international.note,
    roomType: "2인실",
    features: [
      "학부 신입생·재학생 (남/여)",
      "외국인 학생 (남/여)",
      "일반대학원생 (남/여)",
      "지원자 다양해 경쟁률 높을 수 있음",
    ],
  },
  {
    id: "ilsin",
    name: "일신관",
    nameEn: "Ilsin Hall",
    tags: ["#남녀공용", "#전문대학원"],
    description:
      "학부생, 법학전문대학원생, 의대생, 간호대생이 거주할 수 있는 기숙사입니다.",
    capacity: dormCapacities.ilsin.capacity,
    capacityNote: dormCapacities.ilsin.note,
    roomType: "1인실, 2인실, 3인실, 4인실",
    features: [
      "학부 신입생·재학생 (남/여)",
      "법학전문대학원생 — 3학년 및 원우회 우선 선발",
      "의과대학생 — 고학년 우선 선발",
      "간호대학생 — 고학년 우선 선발",
    ],
  },
];

// ── Eligibility mapping ──────────────────────────────────────────────────────
// Source: 아주대학교 생활관 선발대상 기준 (2026-1학기)
// Image 1 참조: 각 기숙사별 학부(신입생/재학생)/대학원/외국인/의대/간호대/법대 남·여 매핑

export function getEligibleDormitories(
  gender: Gender,
  type: StudentType
): string[] {
  const eligible: string[] = [];

  // 남제관: 남자 학부 재학생, 남자 외국인 (신입생 불가)
  if (gender === "male" && (type === "enrolled" || type === "foreigner")) {
    eligible.push("namje");
  }

  // 용지관: 남자 학부 신입생·재학생, 남자 일반대학원
  if (
    gender === "male" &&
    (type === "freshman" || type === "enrolled" || type === "graduate")
  ) {
    eligible.push("yongji");
  }

  // 화홍관: 외국인 전용 (남/여)
  if (type === "foreigner") {
    eligible.push("hwahong");
  }

  // 광교관: 여자 학부 신입생·재학생, 여자 간호대, 여자 일반대학원
  if (
    gender === "female" &&
    (type === "freshman" ||
      type === "enrolled" ||
      type === "nursing" ||
      type === "graduate")
  ) {
    eligible.push("gwanggyo");
  }

  // 국제학사: 학부 신입생·재학생(남/여), 외국인(남/여), 일반대학원(남/여)
  if (
    type === "freshman" ||
    type === "enrolled" ||
    type === "foreigner" ||
    type === "graduate"
  ) {
    eligible.push("international");
  }

  // 일신관: 학부 신입생·재학생(남/여), 의대(남/여), 간호대(남/여), 법학전문대학원(남/여)
  if (
    type === "freshman" ||
    type === "enrolled" ||
    type === "law" ||
    type === "medical" ||
    type === "nursing"
  ) {
    eligible.push("ilsin");
  }

  return eligible;
}

// ── Grade score maps ─────────────────────────────────────────────────────────
// Source: 선발기준 환산표 > 가) 성적환산표 (Image 2 참조)

/** 일반학생 성적 환산표 (60점 만점) */
export const gradeScoreMap: {
  min: number;
  max: number;
  score: number;
  label: string;
}[] = [
  { min: 4.21, max: 4.5,  score: 60, label: "4.21 이상" },
  { min: 4.01, max: 4.20, score: 55, label: "4.01 ~ 4.20" },
  { min: 3.81, max: 4.00, score: 50, label: "3.81 ~ 4.00" },
  { min: 3.61, max: 3.80, score: 45, label: "3.61 ~ 3.80" },
  { min: 3.41, max: 3.60, score: 40, label: "3.41 ~ 3.60" },
  { min: 3.21, max: 3.40, score: 35, label: "3.21 ~ 3.40" },
  { min: 3.01, max: 3.20, score: 30, label: "3.01 ~ 3.20" },
  { min: 2.81, max: 3.00, score: 25, label: "2.81 ~ 3.00" },
  { min: 2.51, max: 2.80, score: 20, label: "2.51 ~ 2.80" },
  { min: 0,    max: 2.50, score: 10, label: "2.50 이하" },
];

/** 가계곤란학생 성적 환산표 (30점 만점) */
export const gradeScoreMapFinancial: {
  min: number;
  max: number;
  score: number;
  label: string;
}[] = [
  { min: 4.21, max: 4.5,  score: 30, label: "4.21 이상" },
  { min: 4.01, max: 4.20, score: 27, label: "4.01 ~ 4.20" },
  { min: 3.81, max: 4.00, score: 24, label: "3.81 ~ 4.00" },
  { min: 3.61, max: 3.80, score: 21, label: "3.61 ~ 3.80" },
  { min: 3.41, max: 3.60, score: 18, label: "3.41 ~ 3.60" },
  { min: 3.21, max: 3.40, score: 15, label: "3.21 ~ 3.40" },
  { min: 3.01, max: 3.20, score: 12, label: "3.01 ~ 3.20" },
  { min: 2.81, max: 3.00, score:  9, label: "2.81 ~ 3.00" },
  { min: 2.51, max: 2.80, score:  6, label: "2.51 ~ 2.80" },
  { min: 0,    max: 2.50, score:  3, label: "2.50 이하" },
];

export function getGradeScore(gpa: number, isFinancial = false): number {
  const map = isFinancial ? gradeScoreMapFinancial : gradeScoreMap;
  for (const entry of map) {
    if (gpa >= entry.min) return entry.score;
  }
  return isFinancial ? 3 : 10;
}

// ── Distance regions ──────────────────────────────────────────────────────────
// Source: 선발기준 환산표 > 다) 지역조건 (Image 3 참조)
// 공식 문서 기준으로 전체 지역명 수록

export const distanceRegions = [
  {
    category: "통학거리 3시간 이상 (30점)",
    points: 30,
    description: "제주, 경상, 전라, 강원, 충청, 경기북부",
    regions: [
      "제주",
      "경상남도",
      "경상북도",
      "부산",
      "대구",
      "울산",
      "전라남도",
      "전라북도",
      "광주",
      "강원도(영동)",
      "충청남도",
      "충청북도",
      "대전",
      "세종",
      "경기북부(의정부·구리·남양주·가평·양주·고양·파주·동두천·포천·연천)",
    ],
  },
  {
    category: "통학거리 1~3시간 이내 (15점)",
    points: 15,
    description: "서울북부, 인천, 천안, 경기도 일부",
    regions: [
      "서울북부",
      "인천",
      "천안",
      "경기도 광주",
      "여주",
      "이천",
      "의정부",
      "구리",
      "남양주",
      "광명",
      "양주",
      "부천",
      "고양",
      "가평",
      "안성",
      "시흥",
    ],
  },
  {
    category: "통학거리 1시간 이내 (0점)",
    points: 0,
    description: "서울남부, 수원·용인 등 근거리",
    regions: [
      "서울남부",
      "안양",
      "용인",
      "안산",
      "성남",
      "평택",
      "과천",
      "오산",
      "광주(경기)",
      "화성",
      "군포",
      "의왕",
      "수원",
    ],
  },
];

export function getDistanceScore(region: string): number {
  for (const d of distanceRegions) {
    if (d.regions.some((r) => r === region || region.includes(r) || r.includes(region)))
      return d.points;
  }
  return 0;
}

// ── Tie-break rules ───────────────────────────────────────────────────────────
// 동점자 처리: (1) 평점 → (2) 취득학점 → (3) 생년월일(연소자 순)
export const tieBreakRules = [
  { order: 1, label: "평점", desc: "학업 성적 평점이 높은 학생 우선" },
  { order: 2, label: "취득학점", desc: "이수 취득학점이 높은 학생 우선" },
  { order: 3, label: "생년월일", desc: "연소자(나이 어린 학생) 우선" },
];
