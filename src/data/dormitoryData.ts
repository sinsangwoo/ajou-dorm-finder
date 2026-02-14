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
  { type: "medical", label: "의대" },
  { type: "nursing", label: "간호대" },
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
      "구축 건물로 시설이 오래됨",
      "4인실이 대부분을 차지함"
    ],
    notices: dormNotices.namje,
  },
  {
    id: "yongji",
    name: "용지관",
    nameEn: "Yongji Hall",
    tags: ["#대학원가능", "#남성전용"],
    description: "학부 및 대학원 남학생이 거주할 수 있는 기숙사입니다.",
    capacity: dormCapacities.yongji.capacity,
    capacityNote: dormCapacities.yongji.note,
    roomType: "2인실",
    features: ["학부 남학생", "일반/특수대학원 남학생", "캠퍼스 인근"],
  },
  {
    id: "hwahong",
    name: "화홍관",
    nameEn: "Hwahong Hall",
    tags: ["#외국인전용", "#남녀공용"],
    description: "외국인 학생 전용 기숙사입니다.",
    capacity: dormCapacities.hwahong.capacity,
    capacityNote: dormCapacities.hwahong.note,
    roomType: "2인실",
    features: ["외국인 전용", "남녀 모두 입주 가능", "국제교류 활성화"],
  },
  {
    id: "gwanggyo",
    name: "광교관",
    nameEn: "Gwanggyo Hall",
    tags: ["#여성전용", "#신축"],
    description: "학부 여학생, 간호대 여학생, 대학원 여학생이 거주할 수 있습니다.",
    capacity: dormCapacities.gwanggyo.capacity,
    capacityNote: dormCapacities.gwanggyo.note,
    roomType: "2인실 / 4인실",
    features: ["학부 여학생", "간호대 여학생", "대학원 여학생", "신축 건물"],
  },
  {
    id: "international",
    name: "국제학사",
    nameEn: "International House",
    tags: ["#남녀공용", "#다양한대상"],
    competitionBadge: "다양한 지원자",
    description: "학부생, 외국인, 일반대학원생이 거주할 수 있는 기숙사입니다.",
    capacity: dormCapacities.international.capacity,
    capacityNote: dormCapacities.international.note,
    roomType: "2인실",
    features: ["학부생 (남/여)", "외국인 (남/여)", "일반대학원 (남/여)"],
  },
  {
    id: "ilsin",
    name: "일신관",
    nameEn: "Ilsin Hall",
    tags: ["#남녀공용", "#전문대학원"],
    description: "학부생 및 전문대학원생이 거주할 수 있는 기숙사입니다.",
    capacity: dormCapacities.ilsin.capacity,
    capacityNote: dormCapacities.ilsin.note,
    roomType: "1인실 / 2인실",
    features: ["학부생 (남/여)", "법학전문대학원", "의대", "간호대"],
  },
];

// Mapping: which dormitories each category can apply to
export function getEligibleDormitories(
  gender: Gender,
  type: StudentType
): string[] {
  const eligible: string[] = [];

  // 남제관: Enrolled Male, Foreigner Male (신입생 지원 불가)
  if (
    gender === "male" &&
    (type === "enrolled" || type === "foreigner")
  ) {
    eligible.push("namje");
  }

  // 용지관: Undergraduate Male, Graduate Male
  if (
    gender === "male" &&
    (type === "freshman" || type === "enrolled" || type === "graduate")
  ) {
    eligible.push("yongji");
  }

  // 화홍관: Foreigner (All)
  if (type === "foreigner") {
    eligible.push("hwahong");
  }

  // 광교관: Undergraduate Female, Nursing Female, Graduate Female
  if (
    gender === "female" &&
    (type === "freshman" ||
      type === "enrolled" ||
      type === "nursing" ||
      type === "graduate")
  ) {
    eligible.push("gwanggyo");
  }

  // 국제학사: Undergraduate, Foreigner, Graduate (All)
  if (
    type === "freshman" ||
    type === "enrolled" ||
    type === "foreigner" ||
    type === "graduate"
  ) {
    eligible.push("international");
  }

  // 일신관: Undergraduate, Law, Medical, Nursing (All)
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

// Grade to score mapping
export const gradeScoreMap: { min: number; max: number; score: number; label: string }[] = [
  { min: 4.21, max: 4.5, score: 60, label: "4.21 이상" },
  { min: 4.01, max: 4.2, score: 55, label: "4.01 ~ 4.20" },
  { min: 3.81, max: 4.0, score: 50, label: "3.81 ~ 4.00" },
  { min: 3.61, max: 3.8, score: 45, label: "3.61 ~ 3.80" },
  { min: 3.41, max: 3.6, score: 40, label: "3.41 ~ 3.60" },
  { min: 3.21, max: 3.4, score: 35, label: "3.21 ~ 3.40" },
  { min: 3.01, max: 3.2, score: 30, label: "3.01 ~ 3.20" },
  { min: 2.81, max: 3.0, score: 25, label: "2.81 ~ 3.00" },
  { min: 2.51, max: 2.8, score: 20, label: "2.51 ~ 2.80" },
  { min: 0, max: 2.5, score: 10, label: "2.50 이하" },
];

export function getGradeScore(gpa: number): number {
  for (const entry of gradeScoreMap) {
    if (gpa >= entry.min) return entry.score;
  }
  return 10;
}

// Distance regions
export const distanceRegions = [
  {
    category: "3시간 이상 (30점)",
    points: 30,
    regions: ["제주", "경상남도", "경상북도", "전라남도", "전라북도", "강원도(영동)"],
  },
  {
    category: "1~3시간 (15점)",
    points: 15,
    regions: ["인천", "천안", "충청남도", "충청북도", "강원도(영서)", "대전", "세종"],
  },
  {
    category: "1시간 미만 (0점)",
    points: 0,
    regions: ["수원", "용인", "성남", "안양", "서울", "화성", "오산", "평택", "안산"],
  },
];

export function getDistanceScore(region: string): number {
  for (const d of distanceRegions) {
    if (d.regions.includes(region)) return d.points;
  }
  return 0;
}
