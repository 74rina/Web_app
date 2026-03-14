# Bulletin Board (Next.js + Nest + PostgreSQL)

## 構成
- `frontend`: Next.js
- `backend`: Nest + Prisma
- `db`: PostgreSQL (Docker)

## セットアップ
1. `.env` を作成
   - `backend/.env` は `backend/.env.example` を参照（ホスト側接続は `localhost:5433`）
   - `frontend/.env` は `frontend/.env.example` を参照
2. Docker 起動

```bash
cd /Users/rinayoneyama/rina/KCS/Web/bulletin_board_nest
docker compose up --build
```

3. 初回のみ Prisma マイグレーションとシード

```bash
cd /Users/rinayoneyama/rina/KCS/Web/bulletin_board_nest/backend
npx prisma migrate dev --name init
npx prisma db seed
```

## エンドポイント
- `GET /post-types`
- `GET /posts`
- `POST /posts`
- `POST /posts/:id/likes`
