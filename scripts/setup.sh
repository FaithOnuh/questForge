#!/usr/bin/env bash
# scripts/setup.sh
# One-shot local dev setup: install deps, start Postgres, run migrations.

set -euo pipefail

echo "📦 Installing JS dependencies..."
pnpm install

echo "🐳 Starting Postgres..."
docker compose -f infra/docker-compose.yml up -d postgres

echo "⏳ Waiting for Postgres to be ready..."
until docker compose -f infra/docker-compose.yml exec -T postgres pg_isready -U questforge; do
  sleep 1
done

echo "🗄️  Running Prisma migrations..."
pnpm --filter api exec prisma migrate dev --name init

echo ""
echo "✅ Setup complete!"
echo "  Start backend:  pnpm --filter api dev"
echo "  Start frontend: pnpm --filter web dev"
