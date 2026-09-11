# ghz-tracker

[English](./README.md) | [한국어](./README.ko.md)

Chore and news tracker for Genshin Impact, Honkai: Star Rail, and Zenless Zone Zero.

- **Chores**: repeat interval per chore, streaks, and a 14-day completion strip
- **News**: broadcasts, PVs, updates, and events with a D-day countdown

## Run

```bash
cp .env.example .env
docker compose up --build
```

Open `http://localhost:3003`. Migrations are applied on startup.

Days roll over at midnight in the `TZ` set in `docker-compose.yml` (`Asia/Seoul` by default).

## License

[MIT](./LICENSE)
