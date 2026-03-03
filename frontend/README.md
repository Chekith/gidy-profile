# Gidy Profile Replica

This is my full-stack replica of the Gidy.ai profile page.

Repo layout:

- **`frontend/`** React UI (Vite + TypeScript + Tailwind)
- **`backend/`** REST API (Node.js + Express)
- **`database/`** MySQL schema + seed data

---

## Local Setup

### Prerequisites

- **Node.js** 18+ (recommended)
- **MySQL** 8+

### 1) Create the database + import schema

1. Create the DB (if you haven’t already):

```sql
CREATE DATABASE gidy_profile;
```

2. Import schema + seed data from `database/schema.sql`.

**PowerShell (Windows):**

```powershell
Get-Content ..\database\schema.sql | mysql -u root -p gidy_profile
```

**Mac/Linux:**

```bash
mysql -u root -p gidy_profile < ../database/schema.sql
```

### 2) Configure and run the backend

1. Copy the env file:

```bash
# from backend/
cp .env.example .env
```

2. Update `backend/.env` with your MySQL creds (example values below):

- **`PORT=3001`**
- **`DB_HOST=localhost`**
- **`DB_PORT=3306`**
- **`DB_USER=root`**
- **`DB_PASSWORD=...`**
- **`DB_NAME=gidy_profile`**

3. Install deps + run the server:

```bash
# from backend/
npm install
npm run dev
```

Backend URLs:

- `http://localhost:3001`
- Health check: `GET http://localhost:3001/health`
- Profile API: `GET http://localhost:3001/api/profile`

### 3) Run the frontend

Open a new terminal for the frontend:

```bash
# from frontend/
npm install
npm run dev
```

Frontend URL:

- `http://localhost:5173`

---

## Tech Stack

- **Frontend**
  - React 18 + TypeScript (Vite)
  - TailwindCSS for styling
  - lucide-react for icons
  - axios for API calls
- **Backend**
  - Node.js + Express
  - mysql2 (promise) for database access
  - CORS + dotenv
- **Database**
  - MySQL schema in `database/schema.sql`

---

## Innovation Features

### 1) Persistent Dark Mode Toggle

- **What it does**
  - There’s a light/dark toggle.
  - Whatever you pick stays even after refresh.

- **How it works**
  - Tailwind is configured for class-based dark mode (`darkMode: 'class'`).
  - The UI toggles the `dark` class and stores the preference in `localStorage`.

- **Why this innovation**
  - **User Experience**: Dark mode reduces eye strain in low-light environments and improves battery life on OLED displays.
  - **Accessibility**: Provides better contrast for users with visual sensitivities and light sensitivity conditions.
  - **Modern Expectation**: Users now expect dark mode as a standard feature in professional applications.
  - **Persistence**: Using localStorage ensures the user's preference is remembered across sessions, creating a seamless experience.

### 2) Skill Endorsements (Persisted)

- **What it does**
  - You can endorse a skill and it bumps the count.
  - It’s not just frontend state — it saves in MySQL.

- **How it works**
  - Frontend calls:
    - `POST /api/profile/skills/:id/endorse`
  - Backend updates the skill in the DB and returns the updated skill. Then the UI refreshes the profile state.
