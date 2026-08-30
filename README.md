# ghz-tracker

[English](./README.md) | [한국어](./README.ko.md)

A chore + news tracker for Genshin Impact, Honkai: Star Rail, and Zenless Zone Zero.

![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=next.js&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/DB-PostgreSQL-4169E1?logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker&logoColor=white)

## Features

**Chores tab** — recurring per-game to-dos (daily commissions, weekly bosses, etc.)
- Custom interval (daily / every 3 days / weekly / biweekly / monthly)
- Streak counter, reset if a cycle is missed
- 14-day completion calendar strip per chore

**News tab** — official broadcasts/PVs/updates/events for each game
- Type badges (broadcast / PV / update / event)
- D-Day countdown

Both tabs are scoped to the three fixed games — this isn't a general-purpose game tracker, it's specifically for Genshin/HSR/ZZZ.

## Tech Stack

- **Next.js** (App Router, Server Actions) + TypeScript + Tailwind CSS
- **Prisma** + PostgreSQL (via `@prisma/adapter-pg` driver adapter)
- **Docker / Docker Compose** — isolated dev environment

## Getting Started

### Prerequisites

- Docker Desktop

### Run

```bash
git clone https://github.com/dev1f965x/ghz-tracker.git
cd ghz-tracker
cp .env.example .env
docker compose up --build
```

Open `http://localhost:3003`.

## Roadmap

- [ ] Domain-specific weighted/prioritized chore suggestions — may or may not happen; manual entry is the baseline and stays the fallback either way
