# 아주대 긱사 어디가

아주대학교 기숙사 지원 자격 확인 및 배정 점수 계산 서비스입니다.

## 📋 주요 기능

- **지원 자격 확인**: 성별 및 학생 신분에 따른 지원 가능 기숙사 확인
- **점수 자동 계산**: 학점, 거리 등을 고려한 기숙사 배정 점수 자동 계산
- **실시간 시설현황**: 2026-1학기 기준 6개 기숙사 상세 정보 제공
- **방 유형 시각화**: 1/2/3/4인실 비율을 한눈에 볼 수 있는 인터랙티브 차트
- **시설 등급 구분**: 신축/노후 기숙사를 색상으로 직관적으로 구분
- **행복기숙사 D-Day**: 2027년 완공 예정 신축 기숙사 카운트다운
- **공식 홈페이지 연동**: 각 섹션에서 생활관 공식 사이트로 바로 이동
- **반응형 디자인**: 모바일/태블릿/데스크톱 완벽 지원

## 🎨 UI/UX 특징

### 시각적 계층 구조
- **신축 기숙사** (일신관, 국제학사): 녹색 테두리로 쾌적한 이미지 전달
- **노후 기숙사** (남제관): 주황색 테두리로 주의가 필요함을 표시
- **일반 기숙사**: 기본 프라이머리 컬러

### 인터랙티브 차트
- 방 유형별 구성 비율을 색상으로 구분된 프로그레스 바로 표시
- 1인실(파랑), 2인실(녹색), 3인실(노랑), 4인실(보라)
- 호버 시 정확한 퍼센티지 표시

### D-Day 카운트다운
- 행복기숙사 완공까지 남은 일수 실시간 표시
- 진행 상황 프로그레스 바
- 예상 수용 인원 및 최신 시설 정보 제공

## 🔧 데이터 관리 가이드

### 학기별 데이터 업데이트

매 학기 시작 전에 다음 파일들을 업데이트해야 합니다:

#### 1. `src/data/dormInfo.ts` ⭐ 주요 업데이트 파일
이 파일에는 학기별로 변경되는 모든 데이터가 집중되어 있습니다.

**수정 항목:**
```typescript
// 1. 현재 학기 변경
export const CURRENT_SEMESTER = "2026-1학기"; // → "2026-2학기"로 변경

// 2. 기숙사별 수용 인원 업데이트
export const dormCapacities: Record<string, DormCapacityInfo> = {
  namje: {
    capacity: "총 688명",        // TO 변경 시 수정
    totalPeople: 688,
    note: `(${CURRENT_SEMESTER} 시설현황 기준)`, // 자동 업데이트
    roomBreakdown: {
      double: 4,                 // 실수 변경 시 수정
      quad: 170
    },
    area: "6,579㎡"
  },
  // ... 나머지 기숙사
};

// 3. 공지사항 업데이트
export const dormNotices: Record<string, string[]> = {
  namje: [
    "⚠️ 2027년 6월 행복기숙사 완공과 함께 철거 예정",
    // 새로운 공지사항 추가
  ]
};

// 4. 행복기숙사 완공일 (필요시 수정)
export const HAENGBOK_COMPLETION_DATE = new Date("2027-06-30");
```

#### 2. `src/data/dormitoryData.ts`
기숙사 기본 정보 및 지원 자격 로직이 변경될 때만 수정합니다.

**수정이 필요한 경우:**
- 새로운 기숙사 추가
- 기존 기숙사 이름 변경
- 지원 자격 정책 변경
- 기숙사 설명 업데이트

**수정 방법:**
```typescript
// getEligibleDormitories 함수에서 지원 자격 로직 수정
export function getEligibleDormitories(
  gender: Gender,
  type: StudentType
): string[] {
  const eligible: string[] = [];
  
  // 예: 남제관 신입생 지원 불가
  if (
    gender === "male" &&
    (type === "enrolled" || type === "foreigner") // freshman 제외
  ) {
    eligible.push("namje");
  }
  // ...
}
```

### 데이터 구조

```typescript
// 기숙사 정보 인터페이스
interface Dormitory {
  id: string;                    // 고유 ID
  name: string;                  // 한글명
  nameEn: string;                // 영문명
  tags: string[];                // 태그 (#재학생전용 등)
  competitionBadge?: string;     // 경쟁률 뱃지
  description: string;           // 설명
  capacity: string;              // dormInfo.ts에서 자동 가져옴
  capacityNote?: string;         // 학기 정보 자동 표시
  roomType: string;              // 방 유형 요약
  features: string[];            // 특징 목록
  notices?: string[];            // 공지사항 (dormInfo.ts)
}

// 방 유형별 실수
interface RoomBreakdown {
  single?: number;   // 1인실
  double?: number;   // 2인실
  triple?: number;   // 3인실
  quad?: number;     // 4인실
}
```

## 📊 시설현황 데이터 출처

현재 적용된 데이터는 **2026년 1학기 아주대학교 생활관 시설현황**을 기준으로 합니다.

| 기숙사 | 1인실 | 2인실 | 3인실 | 4인실 | 총 인원 | 면적 |
|--------|-------|-------|-------|-------|---------|------|
| 국제학사 | - | 204실 | - | - | 408명 | 10,096㎡ |
| 용지관 | - | 31실 | - | 107실 | 490명 | 5,415㎡ |
| 화홍관 | 10실 | 94실 | - | 48실 | 390명 | 5,874㎡ |
| 광교관 | - | 32실 | - | 122실 | 552명 | 6,645㎡ |
| 남제관 | - | 4실 | - | 170실 | 688명 | 6,579㎡ |
| 일신관 | 59실 | 270실 | 4실 | 35실 | 751명 | 14,228㎡ |

## 🚀 개발 시작하기

### 필수 요구사항
- Node.js 18+ 
- npm 또는 bun

### 설치 및 실행

```bash
# 저장소 클론
git clone https://github.com/sinsangwoo/ajou-dorm-finder.git
cd ajou-dorm-finder

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

## 📂 프로젝트 구조

```
src/
├── data/
│   ├── dormInfo.ts              # ⭐ 학기별 변경 데이터 (TO, 공지, D-Day)
│   └── dormitoryData.ts         # 기숙사 기본 데이터 및 로직
├── components/
│   ├── HeroSection.tsx          # 메인 히어로 섹션
│   ├── EligibilityResult.tsx    # 지원 가능 기숙사 결과
│   ├── DormitoryCards.tsx       # 기숙사 카드 목록 (차트 포함)
│   ├── ScoreCalculator.tsx      # 배정 점수 계산기
│   ├── NoticeSection.tsx        # 공지사항 및 D-Day
│   └── FreshmanGuide.tsx        # 신입생 가이드
└── pages/
    └── Index.tsx                # 메인 페이지 및 푸터
```

## 🔗 주요 링크 연동

### 공식 홈페이지 링크 위치
1. **푸터**: 생활관 공식 홈페이지 & 공지사항 바로가기 버튼
2. **기숙사 카드**: 각 카드 하단에 '공식 홈페이지 바로가기' 버튼
3. **지원 가능 기숙사 결과**: 각 기숙사에 '공식 홈페이지 바로가기' 버튼

### 링크 관리
`src/data/dormInfo.ts`에서 중앙 관리:
```typescript
export const DORM_HOMEPAGE = "https://dorm.ajou.ac.kr/dorm/index.do";
export const DORM_NOTICE_PAGE = "https://dorm.ajou.ac.kr/dorm/community/notice.do";
```

## 📝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## ⚠️ 주의사항

- 본 사이트는 **비공식 정보 제공 목적**입니다
- 정확한 정보는 **아주대학교 생활관 공식 홈페이지**를 참고하세요
- 기숙사 정책은 학기별로 변경될 수 있습니다
- 남제관은 2027년 6월 행복기숙사 완공과 함께 **철거 예정**입니다

## 🎯 로드맵

- [ ] 관리자 페이지 추가 (데이터 관리)
- [ ] 과거 경쟁률 통계 추가
- [ ] 기숙사 내부 사진 갤러리
- [ ] 재학생 후기 시스템
- [ ] 다국어 지원 (영어/중국어)

## 📄 라이선스

This project is licensed under the MIT License.

## 🔗 관련 링크

- [아주대학교 공식 홈페이지](https://www.ajou.ac.kr)
- [아주대학교 생활관(기숙사)](https://dorm.ajou.ac.kr/dorm/index.do)
- [생활관 공지사항](https://dorm.ajou.ac.kr/dorm/community/notice.do)

---

**Made with ❤️ for Ajou University Students**
