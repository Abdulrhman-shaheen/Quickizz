@echo off
cd backend
start cmd /k "flask --app app --debug run"
cd ..
start cmd /k "pnpm run dev"