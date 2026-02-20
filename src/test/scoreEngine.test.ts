/**
 * scoreEngine.test.ts
 * ──────────────────────────────────────────────────────────────────────────────
 * Unit tests for src/lib/calc/scoreEngine.ts
 *
 * Coverage targets:
 *   - calcGradeScore: 일반/가계곤란 모드 전체 GPA 구간
 *   - getDistanceScoreSafe: TD-1 버그 수정 검증 (exact match, alias, 모호한 입력)
 *   - calcVolunteerScore / calcEducationScore: 바이너리 점수
 *   - calcTotalScore: 일반/가계곤란 통합 시나리오
 *   - getScoreLevelInfo: 경계값 검증
 *   - getEligibleDormitories: 신입생/재학생 × 성별 전체 조합
 */

import { describe, it, expect } from "vitest";
import {
  calcGradeScore,
  getDistanceScoreSafe,
  calcVolunteerScore,
  calcEducationScore,
  calcTotalScore,
  getScoreLevelInfo,
  REGION_ALIAS_MAP,
} from "@/lib/calc/scoreEngine";
import { getEligibleDormitories } from "@/data/dormitoryData";

// ═════════════════════════════════════════════════════════════════════════════
// 1. calcGradeScore
// ═════════════════════════════════════════════════════════════════════════════

describe("calcGradeScore — 일반 모드 (60점 만점)", () => {
  const cases: [number, number][] = [
    [4.5,  60],
    [4.21, 60],
    [4.20, 55],
    [4.01, 55],
    [4.00, 50],
    [3.81, 50],
    [3.80, 45],
    [3.61, 45],
    [3.60, 40],
    [3.41, 40],
    [3.40, 35],
    [3.21, 35],
    [3.20, 30],
    [3.01, 30],
    [3.00, 25],
    [2.81, 25],
    [2.80, 20],
    [2.51, 20],
    [2.50, 10],
    [2.00, 10],
    [0.00, 10],
  ];

  cases.forEach(([gpa, expected]) => {
    it(`GPA ${gpa} → ${expected}점`, () => {
      expect(calcGradeScore(gpa, "general")).toBe(expected);
    });
  });
});

describe("calcGradeScore — 가계곤란 모드 (30점 만점)", () => {
  const cases: [number, number][] = [
    [4.5,  30],
    [4.21, 30],
    [4.20, 27],
    [4.01, 27],
    [4.00, 24],
    [3.61, 21],
    [3.41, 18],
    [3.21, 15],
    [3.01, 12],
    [2.81,  9],
    [2.51,  6],
    [2.50,  3],
    [0.00,  3],
  ];

  cases.forEach(([gpa, expected]) => {
    it(`GPA ${gpa} → ${expected}점 (가계곤란)`, () => {
      expect(calcGradeScore(gpa, "financial")).toBe(expected);
    });
  });
});

// ═════════════════════════════════════════════════════════════════════════════
// 2. getDistanceScoreSafe — TD-1 버그 수정 검증
// ═════════════════════════════════════════════════════════════════════════════

describe("getDistanceScoreSafe — 30점 지역 (3시간 이상)", () => {
  const regions30 = ["제주", "경상남도", "경상북도", "부산", "대구", "울산",
                     "전라남도", "전라북도", "광주", "강원도(영동)",
                     "충청남도", "충청북도", "대전", "세종"];

  regions30.forEach((r) => {
    it(`"${r}" → 30점`, () => {
      expect(getDistanceScoreSafe(r)).toBe(30);
    });
  });
});

describe("getDistanceScoreSafe — 15점 지역 (1~3시간)", () => {
  const regions15 = ["서울북부", "인천", "천안", "경기도 광주", "여주", "이천"];

  regions15.forEach((r) => {
    it(`"${r}" → 15점`, () => {
      expect(getDistanceScoreSafe(r)).toBe(15);
    });
  });
});

describe("getDistanceScoreSafe — 0점 지역 (1시간 이내)", () => {
  const regions0 = ["수원", "안양", "용인", "성남", "과천"];

  regions0.forEach((r) => {
    it(`"${r}" → 0점`, () => {
      expect(getDistanceScoreSafe(r)).toBe(0);
    });
  });
});

describe("getDistanceScoreSafe — TD-1 모호성 버그 검증", () => {
  it("\"광주\" (전라도) → 30점 (substring 오매칭 아닌 exact match)", () => {
    // 이전 버그: '광주'가 '경기도 광주'에도 substring match 될 수 있었음
    // 수정 후: '광주'는 distanceRegions에서 전라도 카테고리(30점)에만 exact match
    expect(getDistanceScoreSafe("광주")).toBe(30);
  });

  it("\"경기도 광주\" → 15점 (수원·안양과 구분)", () => {
    expect(getDistanceScoreSafe("경기도 광주")).toBe(15);
  });

  it("Alias: \"광주광역시\" → 30점 (alias → '광주' 변환)", () => {
    expect(getDistanceScoreSafe("광주광역시")).toBe(30);
  });

  it("Alias: \"광주시\" → 15점 (alias → '경기도 광주' 변환)", () => {
    expect(getDistanceScoreSafe("광주시")).toBe(15);
  });

  it("Alias: \"경남\" → 30점", () => {
    expect(getDistanceScoreSafe("경남")).toBe(30);
  });

  it("Alias: \"충남\" → 30점", () => {
    expect(getDistanceScoreSafe("충남")).toBe(30);
  });

  it("빈 문자열 → 0점", () => {
    expect(getDistanceScoreSafe("")).toBe(0);
  });

  it("알 수 없는 지역 → 0점 (안전 기본값)", () => {
    expect(getDistanceScoreSafe("화성")).toBe(0); // 화성은 0점 지역이지만 현재 목록에 없음 → 0
  });

  it("공백 포함 입력 정규화", () => {
    expect(getDistanceScoreSafe("  제주  ")).toBe(30);
  });
});

describe("REGION_ALIAS_MAP — alias 테이블 무결성", () => {
  it("모든 alias 값이 string임", () => {
    Object.values(REGION_ALIAS_MAP).forEach((v) => {
      expect(typeof v).toBe("string");
    });
  });

  it("광주광역시와 광주시가 서로 다른 지역을 가리킴", () => {
    expect(REGION_ALIAS_MAP["광주광역시"]).not.toBe(REGION_ALIAS_MAP["광주시"]);
  });
});

// ═════════════════════════════════════════════════════════════════════════════
// 3. calcVolunteerScore / calcEducationScore
// ═════════════════════════════════════════════════════════════════════════════

describe("calcVolunteerScore", () => {
  it("봉사 충족 → 5점", () => expect(calcVolunteerScore(true)).toBe(5));
  it("봉사 미충족 → 0점", () => expect(calcVolunteerScore(false)).toBe(0));
});

describe("calcEducationScore", () => {
  it("교육 이수 → 5점", () => expect(calcEducationScore(true)).toBe(5));
  it("교육 미이수 → 0점", () => expect(calcEducationScore(false)).toBe(0));
});

// ═════════════════════════════════════════════════════════════════════════════
// 4. calcTotalScore — 통합 시나리오
// ═════════════════════════════════════════════════════════════════════════════

describe("calcTotalScore — 일반 모드 시나리오", () => {
  it("GPA 4.5 + 제주(30) + 봉사(5) + 교육(5) = 100점", () => {
    const result = calcTotalScore({
      mode: "general",
      gpa: 4.5,
      isPreviousResident: false,
      region: "제주",
      financialRawScore: 0,
      volunteerRaw: 5,
      educationRaw: 5,
    });
    expect(result.totalScore).toBe(100);
    expect(result.gradeScore).toBe(60);
    expect(result.distanceScore).toBe(30);
    expect(result.volunteerScore).toBe(5);
    expect(result.educationScore).toBe(5);
    expect(result.financialScore).toBe(0);
  });

  it("사생점수(30) 적용 시 region 무시", () => {
    const result = calcTotalScore({
      mode: "general",
      gpa: 3.5,
      isPreviousResident: true,
      region: "수원", // 0점 지역이지만 무시되어야 함
      financialRawScore: 0,
      volunteerRaw: 0,
      educationRaw: 0,
    });
    expect(result.distanceScore).toBe(30); // 사생점수
    expect(result.totalScore).toBe(40 + 30); // 3.5 → 40점 + 사생 30점
  });

  it("GPA 2.0 + 수원(0) + 봉사없음 + 교육없음 = 10점 (최저)", () => {
    const result = calcTotalScore({
      mode: "general",
      gpa: 2.0,
      isPreviousResident: false,
      region: "수원",
      financialRawScore: 0,
      volunteerRaw: 0,
      educationRaw: 0,
    });
    expect(result.totalScore).toBe(10);
  });

  it("일반 모드에서 financialScore는 항상 0", () => {
    const result = calcTotalScore({
      mode: "general",
      gpa: 4.0,
      isPreviousResident: false,
      region: "대전",
      financialRawScore: 60, // 무시되어야 함
      volunteerRaw: 5,
      educationRaw: 5,
    });
    expect(result.financialScore).toBe(0);
  });
});

describe("calcTotalScore — 가계곤란 모드 시나리오", () => {
  it("가계곤란 60 + GPA 4.5(30) + 봉사(5) + 교육(5) = 100점", () => {
    const result = calcTotalScore({
      mode: "financial",
      gpa: 4.5,
      isPreviousResident: false,
      region: "제주", // 가계곤란 모드에서는 무시
      financialRawScore: 60,
      volunteerRaw: 5,
      educationRaw: 5,
    });
    expect(result.totalScore).toBe(100);
    expect(result.financialScore).toBe(60);
    expect(result.gradeScore).toBe(30);
    expect(result.distanceScore).toBe(0); // 가계곤란 모드에서는 항상 0
  });

  it("가계곤란 모드에서 distanceScore는 항상 0", () => {
    const result = calcTotalScore({
      mode: "financial",
      gpa: 3.0,
      isPreviousResident: true, // 무시되어야 함
      region: "부산",             // 무시되어야 함
      financialRawScore: 30,
      volunteerRaw: 0,
      educationRaw: 0,
    });
    expect(result.distanceScore).toBe(0);
  });

  it("financialRawScore 상한 클램프: 60 초과 입력 → 60으로 제한", () => {
    const result = calcTotalScore({
      mode: "financial",
      gpa: 4.0,
      isPreviousResident: false,
      region: "",
      financialRawScore: 999, // 비정상 입력
      volunteerRaw: 0,
      educationRaw: 0,
    });
    expect(result.financialScore).toBe(60);
  });
});

// ═════════════════════════════════════════════════════════════════════════════
// 5. getScoreLevelInfo — 경계값 테스트
// ═════════════════════════════════════════════════════════════════════════════

describe("getScoreLevelInfo — 경계값", () => {
  it("85점 → '매우 유리'", () => expect(getScoreLevelInfo(85).level).toBe("excellent"));
  it("84점 → '유리'",     () => expect(getScoreLevelInfo(84).level).toBe("good"));
  it("70점 → '유리'",     () => expect(getScoreLevelInfo(70).level).toBe("good"));
  it("69점 → '보통'",     () => expect(getScoreLevelInfo(69).level).toBe("average"));
  it("55점 → '보통'",     () => expect(getScoreLevelInfo(55).level).toBe("average"));
  it("54점 → '경쟁 필요'", () => expect(getScoreLevelInfo(54).level).toBe("competitive"));
  it("100점 → '매우 유리'", () => expect(getScoreLevelInfo(100).level).toBe("excellent"));
  it("0점 → '경쟁 필요'",  () => expect(getScoreLevelInfo(0).level).toBe("competitive"));
});

// ═════════════════════════════════════════════════════════════════════════════
// 6. getEligibleDormitories — 신입생/재학생 × 성별 전체 조합
// ═════════════════════════════════════════════════════════════════════════════

describe("getEligibleDormitories — 남자 신입생", () => {
  const result = getEligibleDormitories("male", "freshman");

  it("용지관 포함",     () => expect(result).toContain("yongji"));
  it("국제학사 포함",   () => expect(result).toContain("international"));
  it("일신관 포함",     () => expect(result).toContain("ilsin"));
  it("남제관 미포함 (신입생 지원 불가)", () => expect(result).not.toContain("namje"));
  it("광교관 미포함 (여성전용)",         () => expect(result).not.toContain("gwanggyo"));
  it("화홍관 미포함 (외국인전용)",       () => expect(result).not.toContain("hwahong"));
});

describe("getEligibleDormitories — 남자 재학생", () => {
  const result = getEligibleDormitories("male", "enrolled");

  it("남제관 포함 (재학생 가능)", () => expect(result).toContain("namje"));
  it("용지관 포함",               () => expect(result).toContain("yongji"));
  it("국제학사 포함",             () => expect(result).toContain("international"));
  it("일신관 포함",               () => expect(result).toContain("ilsin"));
  it("광교관 미포함 (여성전용)",   () => expect(result).not.toContain("gwanggyo"));
});

describe("getEligibleDormitories — 여자 신입생", () => {
  const result = getEligibleDormitories("female", "freshman");

  it("광교관 포함",             () => expect(result).toContain("gwanggyo"));
  it("국제학사 포함",           () => expect(result).toContain("international"));
  it("일신관 포함",             () => expect(result).toContain("ilsin"));
  it("남제관 미포함 (남성전용)", () => expect(result).not.toContain("namje"));
  it("용지관 미포함 (남성전용)", () => expect(result).not.toContain("yongji"));
  it("화홍관 미포함 (외국인전용)", () => expect(result).not.toContain("hwahong"));
});

describe("getEligibleDormitories — 여자 재학생", () => {
  const result = getEligibleDormitories("female", "enrolled");

  it("광교관 포함",               () => expect(result).toContain("gwanggyo"));
  it("국제학사 포함",             () => expect(result).toContain("international"));
  it("일신관 포함",               () => expect(result).toContain("ilsin"));
  it("남제관 미포함 (남성전용)",   () => expect(result).not.toContain("namje"));
  it("용지관 미포함 (남성전용)",   () => expect(result).not.toContain("yongji"));
});

describe("getEligibleDormitories — 외국인 학생", () => {
  it("화홍관 포함 (외국인 전용)",     () => expect(getEligibleDormitories("male", "foreigner")).toContain("hwahong"));
  it("화홍관 포함 (외국인 여학생)",   () => expect(getEligibleDormitories("female", "foreigner")).toContain("hwahong"));
  it("외국인 남학생 → 남제관 포함",   () => expect(getEligibleDormitories("male", "foreigner")).toContain("namje"));
  it("외국인 남학생 → 국제학사 포함", () => expect(getEligibleDormitories("male", "foreigner")).toContain("international"));
});

describe("getEligibleDormitories — 일반대학원생", () => {
  it("남자 대학원생 → 용지관 포함",     () => expect(getEligibleDormitories("male", "graduate")).toContain("yongji"));
  it("여자 대학원생 → 광교관 포함",     () => expect(getEligibleDormitories("female", "graduate")).toContain("gwanggyo"));
  it("남자 대학원생 → 국제학사 포함",   () => expect(getEligibleDormitories("male", "graduate")).toContain("international"));
  it("대학원생 → 일신관 미포함 (일신관은 학부+전문대학원)", () => {
    // 일신관은 학부생과 의대/간호대/법대 전용 — 일반대학원 불포함
    expect(getEligibleDormitories("male", "graduate")).not.toContain("ilsin");
  });
});

describe("getEligibleDormitories — 전문대학원 (의대/간호대/법대)", () => {
  it("의대생 → 일신관 포함",   () => expect(getEligibleDormitories("male", "medical")).toContain("ilsin"));
  it("간호대생 → 일신관 포함", () => expect(getEligibleDormitories("female", "nursing")).toContain("ilsin"));
  it("법대생 → 일신관 포함",   () => expect(getEligibleDormitories("male", "law")).toContain("ilsin"));
  it("의대생 → 용지관 미포함", () => expect(getEligibleDormitories("male", "medical")).not.toContain("yongji"));
});
