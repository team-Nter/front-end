# Team Nter · 독스루 (Docthru)

> 📌 개발 문서 번역 챌린지 서비스 "독스루"<br>
> 챌린지 신청 · 승인부터 번역 작성 · 피드백 · 좋아요 · 알림까지

## 1. 팀 이름

**Team Nter**

팀 협업 문서 링크: [노션 바로가기](https://app.notion.com/p/4012b190d85f804a8f5af1059e92e813?v=d3a2b190d85f836ab32888f5b3690199&source=copy_link)

## 2. 팀원 구성

| 이름              | 담당                                              | 개인 GitHub 링크                    |
| ----------------- | ------------------------------------------------- | ----------------------------------- |
| **이지우** (팀장) | 번역 작업물 상세 · 작성 · 수정, 피드백            | https://github.com/Rasol07          |
| **김하경**        | 랜딩 · 회원가입 · 로그인, 배포                    | https://github.com/Arden-Sol        |
| **이홍균**        | 챌린지 목록 · 상세 · 참여, 어드민 챌린지 목록     | https://github.com/cycling-lion-cub |
| **김재영**        | 챌린지 신청 · 나의 챌린지, 어드민 신청 관리, 알림 | https://github.com/yangpahub        |

## 3. 프로젝트 소개

대다수의 개발 콘텐츠가 영어로 작성되어 있어, 영어에 익숙하지 않은 개발자는 새로운 기술을 익히기 어렵습니다.
**독스루**는 개발 관련 영어 문서를 함께 번역하는 **챌린지**를 열고, 에디터에서 번역을 작성하며, 서로의 번역에 **피드백과 좋아요**를 주고받는 서비스입니다.

**프로젝트 기간**: 2026.10.23 ~ 2026.11.12

## 4. 기술 스택

| 구분      | 사용 기술                                                                                    |
| --------- | -------------------------------------------------------------------------------------------- |
| Frontend  | JavaScript, Next.js 16 (App Router), React 19, vanilla-extract, TanStack Query v5, Tiptap v3 |
| Backend   | Node.js 24, Express 5, Prisma ORM 8, zod 4, bcrypt, jsonwebtoken, Swagger (zod-openapi)      |
| Database  | PostgreSQL (Render)                                                                          |
| 인증      | JWT (accessToken · refreshToken httpOnly 쿠키), Google OAuth 2.0                             |
| 공통 Tool | Git & GitHub, Notion, CodeRabbit (코드 리뷰)                                                 |
| 배포      | Netlify (프론트) · Render (백엔드 · DB)                                                      |

## 5. 팀원별 구현 기능 상세

### 이지우 (팀장)

- 공용 컴포넌트
  - Button · Input · Textarea · Modal · ConfirmModal · DeleteConfirmModal · Popover · Pagination · QueryBoundary 구현 및 팀 공유
  - 공용 Header · Container 레이아웃 구현
  - 공용 Modal: Esc 연타 시 dialog만 닫히고 overlay가 남는 문제 수정
- 번역 작성 페이지 (에디터)
  - Tiptap 에디터로 번역 작성 · 제출 기능 구현 (서식 툴바 · 코드 블록 하이라이트)
  - 임시저장(SubmissionDraft) 저장 · 불러오기 모달 구현, 나가기 확인 모달
- 번역 작업물 상세 페이지
  - fetch(GET)를 사용하여 작업물 조회, 비로그인 상태에서도 조회 가능
  - 작업물 좋아요 기능 및 인증 · 캐시 동기화
  - 피드백 조회 · 작성 · 수정 · 삭제 기능 구현 (더보기 페이지네이션)
  - 작업물 수정 · 삭제 기능 구현 (관리자 삭제 시 삭제 사유 입력)
  - "챌린지로 돌아가기" 링크로 작업물에서 챌린지 상세로 바로 이동
- 백엔드
  - 작업물(Submission) · 피드백 · 임시저장 · 좋아요 API 구현 (검증 및 트랜잭션 처리)
  - 작업물 · 피드백 생성 · 수정 · 삭제 시 알림 생성
  - 요청 출처(Origin) 검사 미들웨어 작성
  - API Swagger 문서 정리 (`/docs`)
- 대소문자 파일명 · 파일 경로 리팩토링 (리눅스 배포 빌드 오류 방지)

### 김하경

- 프로젝트 초기 세팅
  - 백엔드 프로젝트 초기 세팅 (Layered 구조 · 전역 에러 처리 · CORS · 요청 검증 미들웨어)
  - Render 배포 설정 및 Prisma 연동, 개발용 시드 스크립트 작성
  - 프론트 TanStack Query 초기 설정
- 인증 구조
  - JWT accessToken · refreshToken 발급 및 httpOnly 쿠키 인증, 비밀번호 해시 처리
  - 요청마다 로그인 사용자를 식별하는 미들웨어, 내 정보 조회(`useMe`) 훅
- 회원가입 · 로그인 · 로그아웃
  - 인증 API 연동 및 로그인 · 회원가입 페이지 구현, 인증 mutation 훅 분리
  - 회원가입 유효성 검증 및 중복 가입 방지 강화 (백엔드)
  - 헤더 로그인 영역 · 사용자 메뉴(등급 표시 · 로그아웃) 구현
  - 로그인 · 회원가입 페이지 UI 스타일링
- 구글 소셜 로그인
  - 구글 OAuth 로그인 · 회원가입 API 구현 (state 검증 · PKCE)
  - 프론트엔드 구글 로그인 연동
- 랜딩 페이지
  - 비로그인 사용자 대상 서비스 소개 랜딩 페이지 구현, 로그인 사용자는 랜딩을 보지 않도록 처리
- 배포
  - Next.js rewrites 프록시로 배포 환경(Netlify — Render)의 쿠키 유실 문제 해결

### 이홍균

- 프로젝트 초기 세팅
  - 프론트 프로젝트 초기 세팅 및 라우팅 폴더 구조 생성
- 챌린지 목록 페이지
  - fetch(GET)를 사용하여 챌린지 목록 조회 (페이지네이션 · 제목 검색 · 분야 다중 필터 · 문서 타입 · 진행 상태 · 정렬)
  - 검색 · 필터 · 정렬 · 페이지 상태를 URL 쿼리와 동기화
  - 정렬 드롭다운 · 필터 팝업(모바일 시트) 디자인 적용
  - 카드 전체 클릭(stretched link) 및 hover 모션 적용, 나의 챌린지 카드에도 동일 적용
- 챌린지 상세 페이지
  - 로그인 · 역할 · 마감 · 참여 · 제출 · 정원 상태에 따른 버튼 분기 (도전하기 · 계속 도전하기 · 내 작업물 보기 등)
  - fetch(POST)를 사용하여 챌린지 참여하기 구현
  - 참여 현황: 좋아요 기준 공동 순위 · 1등 왕관 표시 · 페이지네이션
  - 마감된 챌린지의 최다 추천 번역 캐러셀 (여러 개 넘기기 · 펼치기 / 접기)
- 어드민 챌린지 관리
  - 챌린지 목록 · 상세의 ⋮ 메뉴에서 삭제 사유 입력 후 챌린지 삭제
  - 어드민에게 신규 챌린지 신청 버튼 숨김
- 헤더 네비게이션
  - 역할별 메뉴 (어드민: 챌린지 관리 · 챌린지 목록 / 일반: 챌린지 목록 · 나의 챌린지 / 비로그인: 챌린지 목록)
  - 현재 페이지 강조, hover 모션, 모바일 심볼 로고
- 백엔드
  - 공개 챌린지 목록 · 상세 조회 API, 마감 후 첫 조회 시 최다 추천 작업물 자동 채택
  - 챌린지 참여하기 · 포기하기 API, 관리자 참여 차단
  - 참여 동시성 처리: 트랜잭션 + 행 잠금으로 정원 초과 방지, 유니크 제약으로 중복 참여 방지
  - 참여 현황 목록 API (공동 순위 rank 계산)
  - 시연용 시드 데이터 (실제 개발 문서 기반 챌린지 120개 · 작업물 · 좋아요 · 피드백)

### 김재영

- 공용 컴포넌트
  - 챌린지 카드 · 칩 공용 컴포넌트 구현
- 신규 챌린지 신청
  - fetch(POST)를 사용하여 챌린지 신청 폼 구현
  - 비로그인 상태에서 신청 시 로그인 후 신청 페이지로 돌아오도록 처리
- 나의 챌린지 페이지
  - 참여중 · 완료한 · 신청한 챌린지 탭 구현, 제출 여부에 따른 버튼 분기
  - 신청한 챌린지 상세 · 신청 취소 · 수정, 거절된 챌린지 재신청
- 어드민 챌린지 신청 관리
  - 신청 목록 (상태 다중 필터 · 정렬 · 검색)
  - 신청 상세 및 승인 · 거절 (거절 사유 모달), 이전 · 다음 챌린지 이동
  - 어드민 페이지 접근 제한 (AdminGuard)
- 알림
  - 헤더 알림 목록 · 읽음 · 모두 읽음 기능 구현
- 백엔드
  - 인증 · 권한 미들웨어(authorization) 작성
  - 내 챌린지 목록 API (참여중 · 완료 목록에 내 제출물 id 포함)
  - 어드민 신청 목록 / 상세 · 승인 · 거절 · 취소 API 구현
  - 챌린지 상태 변경 알림 생성 및 알림 목록 · 읽음 · 모두 읽음 API 구현
  - 신청자 챌린지 수정 API, 거절 · 취소 사유(moderation) 기록

## 6. 파일 구조

> 📌 기준: GitHub `development` 브랜치 최신 (front `3c6dd2a`)<br>
> `node_modules/` · `.next/` · `.env.local`(gitignored) · `src/assets/`의 개별 아이콘 · 이미지 파일 · 빈 폴더용 `.gitkeep`은 트리에서 제외했습니다.<br>
> 컴포넌트 폴더는 모두 `컴포넌트.jsx` · `컴포넌트.css.js`(vanilla-extract) · `index.js`로 구성되어 있어 폴더 단위로 표시했습니다.

```text
프론트엔드 front-end/
├── package.json · pnpm-lock.yaml · pnpm-workspace.yaml   # Next.js 16 · React 19 · vanilla-extract · TanStack Query · Tiptap
├── next.config.mjs                         # vanilla-extract 플러그인 · React Compiler · /api → 백엔드 rewrites 프록시
├── eslint.config.mjs · jsconfig.json · .prettierrc · .prettierignore · .nvmrc
├── .env.example · .gitignore               # NEXT_PUBLIC_API_URL · BACKEND_URL 예시
├── README.md
├── public/
│   └── landing-sm.png · landing-md.png · landing-lg.png   # 랜딩 페이지 반응형 이미지
└── src/
    ├── app/                                # Next.js App Router (라우트 그룹별 레이아웃)
    │   ├── layout.js                       # 루트 레이아웃 (Pretendard 폰트 · 전역 스타일 · Provider)
    │   ├── favicon.ico
    │   ├── (landing)/
    │   │   ├── layout.js                   # 랜딩 헤더
    │   │   └── page.js                     # / 랜딩 페이지
    │   ├── (auth)/
    │   │   ├── layout.js
    │   │   ├── login/page.js               # /login 로그인
    │   │   └── signup/page.js              # /signup 회원가입
    │   ├── (main)/
    │   │   ├── layout.js                   # 공용 헤더(역할별 네비) + 본문 컨테이너
    │   │   ├── challenges/
    │   │   │   ├── page.js                 # /challenges 챌린지 목록
    │   │   │   ├── new/page.js             # /challenges/new 신규 챌린지 신청
    │   │   │   └── [id]/
    │   │   │       ├── page.js             # /challenges/:id 챌린지 상세
    │   │   │       └── participants/[userId]/submission/page.js   # 참여자 작업물 상세
    │   │   ├── my-challenges/
    │   │   │   ├── page.js                 # /my-challenges 나의 챌린지 (참여중 · 완료 · 신청)
    │   │   │   └── [id]/
    │   │   │       ├── page.js             # 신청한 챌린지 상세
    │   │   │       └── edit/page.js        # 신청한 챌린지 수정 · 재신청
    │   │   └── admin/
    │   │       ├── layout.js               # 어드민 접근 제한 (AdminGuard)
    │   │       └── challenges/
    │   │           ├── page.js             # /admin/challenges 챌린지 신청 관리
    │   │           └── [id]/page.js        # 신청 상세 (승인 · 거절)
    │   └── (editor)/
    │       ├── layout.js                   # 에디터 전용 레이아웃 (공용 헤더 없음)
    │       ├── challenges/[id]/work/page.js    # 번역 작성 (도전하기)
    │       └── submissions/[id]/edit/page.js   # 작업물 수정
    ├── api/                                # 도메인별 fetch 함수
    │   ├── auth.js                         # 회원가입 · 로그인 · 로그아웃 · 내 정보
    │   ├── challenges.js                   # 챌린지 목록 · 상세 · 신청 · 수정 · 어드민 · 승인/거절/삭제
    │   ├── participations.js               # 참여하기 · 참여 현황 · 참여 정보
    │   ├── submissions.js                  # 작업물 작성 · 조회 · 수정 · 삭제
    │   ├── submission-draft.js             # 임시저장
    │   ├── submission-like.js              # 좋아요
    │   ├── feedback.js                     # 피드백
    │   └── notifications.js                # 알림 목록 · 읽음 · 모두 읽음
    ├── hooks/                              # TanStack Query 훅 · 화면 로직 훅
    │   ├── useMe.js                        # 내 정보 (undefined: 확인 중 / null: 비로그인 / 객체: 로그인)
    │   ├── useAuthMutation.js · useLogin.js · useSignup.js · useLogout.js   # 인증 mutation
    │   ├── useRedirectIfLoggedIn.js        # 로그인 상태면 이전 페이지(next) · 목록으로 이동
    │   ├── useRedirectFromLanding.js       # 로그인 사용자는 랜딩 대신 목록으로
    │   ├── useRequireAdmin.js              # 어드민이 아니면 이동
    │   ├── useChallenges.js                # 챌린지 목록 · 신청 · 수정 · 어드민 처리 쿼리
    │   ├── useChallengeDetail.js           # 챌린지 상세 쿼리
    │   ├── useChallengeListParams.js       # 검색 · 필터 · 정렬 · 페이지 ↔ URL 쿼리 동기화
    │   ├── useParticipation.js             # 참여하기 · 참여 현황 · 참여 정보 쿼리
    │   ├── useSubmissions.js · useSubmissionLike.js · useSubmissionDraft.js   # 작업물 · 좋아요 · 임시저장
    │   ├── useSubmissionChangeAccess.js    # 작업물 수정 · 삭제 가능 여부 판단
    │   ├── useWorkEditor.js · useWorkEditorDraft.js   # Tiptap 에디터 · 임시저장 불러오기
    │   ├── useFeedback.js                  # 피드백 목록(더보기) · 작성 · 수정 · 삭제
    │   └── useNotifications.js             # 알림 목록 · 읽음 처리
    ├── components/
    │   ├── common/                         # 공용 컴포넌트
    │   │   ├── Button/ · Input/ · Textarea/       # 버튼 · 입력 필드
    │   │   ├── TextField.css.js                   # Input · Textarea 공용 스타일
    │   │   ├── Modal/                             # dialog 기반 공용 모달
    │   │   ├── ConfirmModal/ · DeleteConfirmModal/   # 확인 · 삭제 확인 모달
    │   │   ├── Popover/                           # 드롭다운 · 메뉴 팝오버
    │   │   ├── Pagination/                        # 페이지네이션
    │   │   └── QueryBoundary/                     # 로딩 · 에러 경계 (Suspense + ErrorBoundary)
    │   ├── layout/
    │   │   ├── Header/                     # 공용 헤더 (로고 · 모바일 심볼 로고)
    │   │   ├── HeaderNav/                  # 역할별 네비게이션 · 현재 페이지 강조
    │   │   └── Container/                  # 본문 폭 · 여백 컨테이너
    │   ├── home/                           # 랜딩 페이지
    │   ├── auth/
    │   │   ├── Login/ · Signup/            # 로그인 · 회원가입 폼
    │   │   ├── GoogleLoginButton/ · GoogleLoginError/   # 구글 로그인 버튼 · 실패 안내
    │   │   └── commonAuth/                 # 헤더 로그인 영역 · 사용자 메뉴 · 인증 안내
    │   ├── admin/
    │   │   └── AdminGuard/                 # 어드민 페이지 접근 제한
    │   ├── challenge/
    │   │   ├── ChallengeList/              # 챌린지 목록 (툴바 · 카드 목록 · 페이지네이션)
    │   │   ├── ChallengeFilter/ · ChallengeSort/   # 필터 팝업 · 정렬 드롭다운
    │   │   ├── ChallengeCard/ · ChallengeChip/     # 챌린지 카드 · 분야/문서 타입/상태 칩
    │   │   ├── ChallengeStatusBadge/       # 마감 · 모집 완료 상태 칩
    │   │   ├── ChallengeDetail/            # 챌린지 상세 (상단 정보 · 오른쪽 카드 · 버튼 분기)
    │   │   ├── ChallengeSummary/           # 제목 · 칩 · 설명 (공개 · 신청 · 어드민 상세 공용)
    │   │   ├── ChallengeParticipants/      # 참여 현황 (공동 순위 · 왕관 · 페이지네이션)
    │   │   ├── BestSubmissions/            # 최다 추천 번역 캐러셀 · 펼치기
    │   │   ├── ChallengeAdminMenu/         # 어드민 ⋮ 메뉴 · 삭제 사유 모달
    │   │   ├── ChallengeCreate/ · ChallengeForm/   # 신규 신청 · 신청/수정 공용 폼
    │   │   ├── ChallengeTab/ · MyChallengeTable/   # 나의 챌린지 탭 · 카드/표 목록
    │   │   ├── MyChallengeDetail/ · MyChallengeEdit/ · MyChallengeCancel/   # 신청한 챌린지 상세 · 수정 · 취소
    │   │   ├── ChallengeDetailBody/        # 신청 상세 본문 (원문 링크 · 마감일 · 인원)
    │   │   ├── ChallengeModerationNotice/  # 거절 · 삭제 사유 안내
    │   │   ├── AdminChallengeList/ · AdminChallengeFilter/   # 어드민 신청 관리 목록 · 상태 필터
    │   │   ├── AdminChallengeDetail/       # 어드민 신청 상세 · 승인/거절 · 이전/다음 이동
    │   │   ├── RejectReasonModal/          # 거절 사유 입력 모달
    │   │   └── ChallengeRow/               # 표 형태 목록의 행
    │   ├── editor/
    │   │   ├── Tiptap/ · EditorToolbar/ · CodeBlockComponent/   # 에디터 본문 · 서식 툴바 · 코드 블록 하이라이트
    │   │   ├── WorkEditor/ · Input/        # 제목 입력 + 에디터 화면
    │   │   ├── CreateWorkEditor/ · EditWorkEditor/   # 번역 작성 · 작업물 수정
    │   │   ├── EditHeader/                 # 에디터 상단 (나가기 · 임시저장 · 제출)
    │   │   └── DraftPopUp/ · WorkEditorDraft/   # 임시저장 불러오기 모달 · 상태 안내
    │   ├── submission/
    │   │   ├── SubmissionView/             # 작업물 상세 화면 (챌린지로 돌아가기 · 수정/삭제)
    │   │   ├── SubmissionDetail/           # 작업물 본문 (읽기 전용 Tiptap)
    │   │   └── SubmissionMenu/             # 작업물 ⋮ 메뉴
    │   ├── feedback/                       # 피드백 목록 · 작성 폼 · 수정/삭제
    │   ├── like/                           # 작업물 좋아요 버튼
    │   └── notification/
    │       ├── NotificationBell/ · NotificationList/   # 헤더 알림 아이콘 · 알림 목록
    │       └── getNotificationHref.js      # 알림 종류별 이동 경로
    ├── constants/
    │   ├── api.js                          # API 기본 주소
    │   ├── challenge.js                    # 분야 · 문서 타입 · 상태 · 정렬 옵션
    │   ├── user.js                         # 유저 등급 표시
    │   ├── query-keys.js                   # TanStack Query 키 모음
    │   └── index.js
    ├── providers/
    │   ├── App.provider.js                 # QueryClient · Devtools · 인증 Provider
    │   └── auth.provider.js                # 앱 시작 시 내 정보 불러오기
    ├── utils/
    │   ├── getChallengeAction.js           # 챌린지 상세 버튼 상태 판단 (순서가 곧 규칙)
    │   ├── formatDate.js · formatDeadline.js   # 날짜 · 마감일 표기
    │   ├── validators/                     # 회원가입 · 로그인 · 챌린지 신청 폼 검증
    │   ├── SubmissionError/ · SubmissionDraftError/ · feedbackError.js   # 상태 코드별 에러 문구
    │   └── index.js
    └── styles/
        ├── global.css.js                   # 색상 토큰 · 전역 스타일
        ├── reset.css.js                    # 초기화
        └── media.js                        # 반응형 기준점 (tablet · mobile)
```

> 백엔드 코드와 파일 구조는 [team-Nter/back-end](https://github.com/team-Nter/back-end) 레포에서 확인할 수 있습니다.

## 7. 구현 홈페이지

https://nter.netlify.app/
