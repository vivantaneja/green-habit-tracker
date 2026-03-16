# Green Habit Tracker

Track green habits (no plastic bottle, reusable bag, bike/walk, recycle, and more) and see your environmental impact. Includes **Re-turn** (Ireland’s deposit return scheme) so you can log containers returned and track your refund. All data stays on your device.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Build

```bash
npm run build
npm run preview   # optional: preview production build
```

## Features

- **Dashboard** – Quick-log today’s habits, Re-turn containers, streak, and impact (bottles saved, CO₂ avoided, trees equivalent).
- **Habits** – Full list of habits with counts; choose which appear on the Dashboard quick log.
- **Re-turn** – Log small (15c) and large (25c) containers; see refund earned and plastic diverted.
- **Impact** – Charts and totals over time; Re-turn stats when you have data.
- **Request an option** – Suggest new habits or features; stored locally; export or download to file.

## Tech

- React 18, TypeScript, Vite
- Tailwind CSS
- React Router
- Recharts for impact charts
- Local storage only (no backend)
