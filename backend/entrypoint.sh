#!/bin/sh
set -e

echo "Pushing Prisma database schema..."
npx prisma db push --skip-generate

echo "Starting backend server..."
exec npm start
