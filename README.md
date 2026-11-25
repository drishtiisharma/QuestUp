# ⚔️ QuestUp

QuestUp is a personal skill-tracking dashboard for building consistent learning habits. Add the skills you practice, set weekly goals, log study sessions, and view progress through streaks, achievements, and an activity heatmap.

## 🚀 Features

- Create, edit, and delete skills with custom weekly goals and colors
- Log practice sessions with a duration and optional note
- Track total study time and progress toward each weekly goal
- View current and longest streaks, active days, and personal-best activity
- Review a year-long activity heatmap and recent session history
- Earn achievement badges based on study time and consistency
- Persist skills and sessions automatically in browser local storage

## 💻 Tech Stack

- [React 18](https://react.dev/) and [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) for development and production builds
- [Tailwind CSS](https://tailwindcss.com/) for styling
- Font Awesome icons and Inter typography

## 🏁 Getting Started

### 📃 Prerequisites

- Node.js 18 or later
- npm

### ⬇️ Installation

```bash
git clone https://github.com/drishtiisharma/QuestUp.git
cd QuestUp
npm install
```

### ▶️ Run Locally

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

## 📜 Available Scripts

| Command             | Description                              |
| ------------------- | ---------------------------------------- |
| `npm run dev`     | Start the Vite development server        |
| `npm run build`   | Type-check and create a production build |
| `npm run lint`    | Run ESLint across the project            |
| `npm run preview` | Preview the production build locally     |

## 💾 How Data Is Stored

QuestUp is a client-side application. Skills and sessions are saved under the `questup_data` key in browser `localStorage`; no account or backend service is required.

Clearing site data or using a different browser or device will not retain the existing QuestUp history.

## 📂 Project Structure

```text
src/
├── components/   # Dashboard panels, modals, and reusable UI
├── pages/        # Dashboard page
├── types/        # Shared TypeScript models
├── App.tsx       # Application entry component
└── main.tsx      # React DOM entry point
```
