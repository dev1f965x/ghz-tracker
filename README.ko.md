# ghz-tracker

[English](./README.md) | [한국어](./README.ko.md)

원신, 붕괴: 스타레일, 젠레스 존 제로 전용 숙제 + 소식 트래커.

![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=next.js&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/DB-PostgreSQL-4169E1?logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker&logoColor=white)

## 기능

**숙제 탭** — 게임별 주기적으로 해야 할 일(일일 의뢰, 주간 보스 등)
- 커스텀 주기 (매일 / 3일마다 / 매주 / 2주마다 / 매월)
- 연속 기록(streak), 주기 놓치면 초기화
- 항목별 최근 14일 완료 캘린더

**소식 탭** — 게임별 공식 방송/PV/업데이트/이벤트
- 타입별 뱃지(방송/PV/업데이트/이벤트)
- D-Day 표시

두 탭 모두 고정된 세 게임 전용으로 스코프가 잡혀있어요 — 범용 게임 트래커가 아니라 원신/붕스타/젠존제 전용입니다.

## 기술 스택

- **Next.js** (App Router, Server Actions) + TypeScript + Tailwind CSS
- **Prisma** + PostgreSQL (`@prisma/adapter-pg` 드라이버 어댑터 사용)
- **Docker / Docker Compose** — 격리된 개발 환경

## 시작하기

### 필요한 것

- Docker Desktop

### 실행

```bash
git clone https://github.com/dev1f965x/ghz-tracker.git
cd ghz-tracker
cp .env.example .env
docker compose up --build
```

`http://localhost:3003` 접속.

## 로드맵

- [ ] 도메인 특화 가중치/우선순위 숙제 추천 — 추가될 수도, 안 될 수도 있음. 수동 입력이 기본값이고 언제나 대체 동작으로 남음
