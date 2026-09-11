# ghz-tracker

[English](./README.md) | [한국어](./README.ko.md)

원신, 붕괴: 스타레일, 젠레스 존 제로의 숙제와 소식을 관리하는 트래커입니다.

- **숙제**: 항목별 반복 주기, 연속 기록, 최근 14일 완료 표시
- **소식**: 방송, PV, 업데이트, 이벤트를 D-Day와 함께 표시

## 실행

```bash
cp .env.example .env
docker compose up --build
```

`http://localhost:3003`에서 열립니다. DB 마이그레이션은 시작할 때 자동으로 적용됩니다.

날짜는 `docker-compose.yml`의 `TZ`(기본값 `Asia/Seoul`) 기준 자정에 바뀝니다.
