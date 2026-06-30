# KMEDITOUR — Native HTML/CSS/JS

React/Next.js 변환 전 **기준 원본(Source of Truth)**. 모든 디자인·인터랙션·크로스브라우징 기준은 이 프로젝트를 따릅니다.

---

## 파일 구조

```
k-medi-web/
├── *.html                    # 12개 페이지
├── css/
│   ├── font.css              # 웹폰트 @import (첫 번째 로드)
│   ├── reset.css             # 브라우저 리셋 + font-synthesis: none
│   ├── theme.css             # 디자인 토큰 (:root CSS 변수)
│   ├── common.css            # 공통 컴포넌트 (page-hero, mobile-bar, trust 등)
│   ├── home.css              # index.html 전용
│   ├── [page].css            # 페이지별 CSS
│   └── components/
│       ├── header.css
│       ├── footer.css
│       ├── button.css
│       ├── card.css
│       ├── accordion.css
│       ├── modal.css
│       ├── breadcrumb.css
│       ├── tab.css
│       ├── subpage.css
│       ├── mag-card.css
│       ├── topbar.css
│       └── travel-card.css
├── js/
│   ├── app.js                # 공통 인터랙션 (헤더, GNB, 언어, 스크롤)
│   ├── mobile-bar.js         # 하단 바텀바 JS 컴포넌트 (auto-inject)
│   ├── [page].js             # 페이지별 JS
│   └── image-slot.js         # 이미지 슬롯 Web Component
├── assets/
└── design-system.html        # 디자인 시스템 문서 (내부용)
```

---

## CSS 로드 순서

모든 HTML 파일에서 다음 순서를 유지합니다:

```html
<link rel="stylesheet" href="css/font.css" />
<link rel="stylesheet" href="css/reset.css" />
<link rel="stylesheet" href="css/theme.css" />
<link rel="stylesheet" href="css/components/button.css" />
<!-- ... 기타 components ... -->
<link rel="stylesheet" href="css/common.css" />
<link rel="stylesheet" href="css/[page].css" />
```

---

## 폰트

| 변수          | 폰트                                  | 용도              |
| ------------- | ------------------------------------- | ----------------- |
| `--font-sans` | Pretendard Variable → 시스템 폰트     | 국문/기본         |
| `--font-en`   | Optima, Marcellus, Cormorant Garamond | 영문 전용 eyebrow |

- **로딩 방식**: unpkg CDN dynamic-subset (성능 최적화)
- **font-synthesis: none**: reset.css 에 선언 → Windows Chrome 가짜 볼드 방지
- **가변 폰트(Variable Font)**: 450/550/650/750 등 중간 weight 모두 지원

---

## 디자인 토큰 (theme.css)

| 카테고리 | 변수 접두사                                                 |
| -------- | ----------------------------------------------------------- |
| 색상     | `--gray-*`, `--blue-*`, `--text-*`, `--bg-*`, `--surface-*` |
| 간격     | `--space-{n}`                                               |
| 타이포   | `--text-{n}`, `--tracking-*`                                |
| 레이아웃 | `--maxw`, `--gutter`, `--header-h`                          |
| 반지름   | `--radius-*`                                                |

---

## 주요 컴포넌트

### 하단 바텀바 (Mobile Bottom Bar)

- **방식**: JS 컴포넌트 (`js/mobile-bar.js`) — body에 자동 주입
- **테마**: 기본 dark (`mobile-bar--dark`), 화이트 모드: `<body data-mbar-theme="white">`
- **Active 탭**: URL 파일명으로 자동 감지
- **CSS**: `css/common.css` → `.mobile-bar`, `.mbar-btn`, `.mbar-btn--cta`
- **iOS safe-area**: `height: calc(80px + env(safe-area-inset-bottom, 0px))` 적용

### Editorial Page Head (페이지 헤더)

- **A형** (ISSUE 컬럼 있음): magazine.html
- **B형** (심플): skin-sol.html, cosmetic.html
- **CSS**: `css/common.css` → `.page-head-edito`

### Page Hero

- **white 버전**: `.page-hero--white` — about, center, faq, procedure 등
- **navy 버전**: `.page-hero--navy`
- **CSS**: `css/common.css` → `.page-hero`

---

## 반응형 브레이크포인트

| 이름   | 값        | 용도                                            |
| ------ | --------- | ----------------------------------------------- |
| mobile | `≤ 860px` | 바텀바, 헤더 햄버거, 컴포넌트 모바일            |
| tablet | `≤ 768px` | page-hero 크기, faq 탭 스크롤                   |
| small  | `≤ 700px` | foot-contact 단일 컬럼                          |
| small  | `≤ 600px` | page-head-edito 단일 컬럼, 모바일 타이포 최소값 |
| xs     | `≤ 520px` | 그리드 1컬럼                                    |
| xxs    | `≤ 480px` | 코스메틱 그리드                                 |

## 모바일 타이포그래피 조정 (미디어 쿼리)

| 파일                    | 선택자                    | 데스크탑         | 모바일 브레이크포인트                                     |
| ----------------------- | ------------------------- | ---------------- | --------------------------------------------------------- |
| `common.css`            | `.page-hero__title`       | `var(--text-80)` | `≤ 860px`: `clamp(40–56px)`                               |
| `common.css`            | `.page-head-edito__title` | `clamp(40–88px)` | `≤ 600px`: `clamp(32–52px)`                               |
| `magazine.css`          | `.art2-hero__title`       | `clamp(32–76px)` | `≤ 860px`: `clamp(28–44px)` · `≤ 600px`: `clamp(24–34px)` |
| `procedure.css`         | `.proc-slide__title`      | `clamp(32–52px)` | `≤ 900px`: `clamp(24–36px)`                               |
| `procedure-detail.css`  | `.pd-hero__title`         | `clamp(44–88px)` | `≤ 900px`: `clamp(32–48px)` · `≤ 600px`: `clamp(36–60px)` |
| `center.css`            | `.related-posts__heading` | `--space-16`     | `≤ 860px`: `--space-8`                                    |
| `components/footer.css` | `.foot-contact__title`    | `var(--type-h3)` | `≤ 700px`: `var(--type-h4)`                               |
| `components/footer.css` | `.foot-contact__desc`     | `var(--text-15)` | `≤ 700px`: `var(--text-14)`                               |

---

## 크로스브라우저 주의사항

| 환경           | 주의 항목                                             |
| -------------- | ----------------------------------------------------- |
| iOS Safari     | `safe-area-inset-bottom` 필수 (바텀바, 채팅 버튼)     |
| Windows Chrome | Pretendard Variable 로드 실패 시 Segoe UI 폴백        |
| Firefox        | `text-wrap: balance` 지원 확인 필요                   |
| Safari         | `position: sticky` — `top: var(--header-h)` 적용 완료 |

---

## 페이지 목록

| 파일                  | 경로                | 설명          |
| --------------------- | ------------------- | ------------- |
| index.html            | `/`                 | 홈            |
| about.html            | `/about`            | 소개          |
| center.html           | `/center`           | 휴그로센터    |
| cosmetic.html         | `/cosmetic`         | 코스메틱 쇼핑 |
| faq.html              | `/faq`              | FAQ           |
| magazine.html         | `/magazine`         | 매거진 목록   |
| magazine-detail.html  | `/magazine-detail`  | 매거진 상세   |
| procedure.html        | `/procedure`        | 시술 목록     |
| procedure-detail.html | `/procedure-detail` | 시술 상세     |
| product.html          | `/product`          | 상품 상세     |
| skin-sol.html         | `/skin-sol`         | 피부 솔루션   |
| travel.html           | `/travel`           | 여행          |

---

## React/Next.js 변환 전 체크리스트

- [x] 모든 페이지 `<h1>` 존재 확인
- [x] CSS 로드 순서 정리
- [x] font-synthesis: none 선언
- [x] iOS safe-area 대응
- [x] 하단 바텀바 JS 컴포넌트화
- [x] 디자인 토큰 하드코딩 제거 (`#fff` → `var(--text-white)`)
- [x] Editorial Page Head 컴포넌트화 (A형/B형)
- [x] Magazine 필터 탭 → pill 칩 가로 스크롤 (모바일)
- [x] 모바일 타이포그래피 미디어 쿼리 전수 점검
- [ ] `prefers-reduced-motion` 애니메이션 대응
- [ ] `focus-visible` 스타일 보완
- [ ] React 환경에서 `app.js` → hooks 분리 설계
- [ ] `image-slot.js` Web Component → React 컴포넌트 변환 설계
