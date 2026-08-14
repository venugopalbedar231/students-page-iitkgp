#!/bin/sh
set -e

echo "Pushing Prisma database schema..."
npx prisma db push --skip-generate

echo "Seeding initial database data if needed..."
node prisma/seed.js || true

echo "Starting backend server..."
exec npm start
