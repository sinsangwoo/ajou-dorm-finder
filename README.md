# 아주대 긱사 어디가

아주대학교 기숙사 지원 자격 확인 및 배정 점수 계산 서비스입니다.

## 📋 주요 기능

- 성별 및 학생 신분에 따른 지원 가능 기숙사 확인
- 기숙사 배정 점수 자동 계산
- 6개 기숙사 상세 정보 제공
- 반응형 디자인으로 모바일/데스크톱 지원

## 🔧 데이터 관리 가이드

### 학기별 데이터 업데이트

매 학기 시작 전에 다음 파일들을 업데이트해야 합니다:

#### 1. `src/data/dormInfo.ts`
- **수정 대상**: 기숙사별 수용 인원(TO), 공지사항
- **수정 시기**: 학기 시작 전
- **수정 방법**:
  ```typescript
  export const CURRENT_SEMESTER = "2026-1학기"; // 현재 학기로 변경
  
  export const dormCapacities: Record<string, DormCapacityInfo> = {
    namje: {
      capacity: "약 400명", // TO 변경 시 수정
      note: `(${CURRENT_SEMESTER} 기준)`
    },
    // ... 나머지 기숙사
  };
  ```

#### 2. `src/data/dormitoryData.ts`
- **수정 대상**: 기숙사 기본 정보, 지원 자격
- **수정 시기**: 정책 변경 시
- **주의사항**: 
  - `getEligibleDormitories` 함수에서 지원 자격 로직 수정
  - 기숙사 설명, 특징 등 변경 가능

### 기숙사 정보 구조

```typescript
{
  id: "namje",
  name: "남제관",
  tags: ["#재학생전용", "#남성전용"],
  capacity: dormCapacities.namje.capacity,  // dormInfo.ts에서 가져옴
  capacityNote: dormCapacities.namje.note,   // 학기 정보 자동 표시
  notices: dormNotices.namje,                // 공지사항 (선택)
  // ...
}
```

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
│   ├── dormInfo.ts          # 학기별 변경 데이터 (TO, 공지사항)
│   └── dormitoryData.ts     # 기숙사 기본 데이터
├── components/
│   ├── HeroSection.tsx      # 메인 페이지
│   ├── EligibilityResult.tsx # 지원 가능 기숙사 표시
│   ├── DormitoryCards.tsx   # 기숙사 카드 목록
│   └── ScoreCalculator.tsx  # 점수 계산기
└── pages/
    └── Index.tsx            # 메인 페이지
```

## 📝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## ⚠️ 주의사항

- 본 사이트는 비공식 정보 제공 목적입니다
- 정확한 정보는 아주대학교 공식 홈페이지를 참고하세요
- 기숙사 정책은 학기별로 변경될 수 있습니다

## 📄 라이선스

This project is licensed under the MIT License.

## 🔗 관련 링크

- [아주대학교 공식 홈페이지](https://www.ajou.ac.kr)
- [아주대학교 생활관(기숙사)](https://dorm.ajou.ac.kr)
