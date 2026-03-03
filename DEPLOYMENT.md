# Deployment Guide

## Step 1: Initialize Git Repository

Since Git isn't available in your terminal, use one of these methods:

### Option A: GitHub Desktop (Recommended)
1. Open GitHub Desktop
2. File → Add Local Repository
3. Select the `gidy-profile` folder
4. Create a new repository on GitHub
5. Publish your repository

### Option B: Install Git for Windows
1. Download Git from https://git-scm.com/download/win
2. Install with default settings
3. Restart PowerShell/Command Prompt
4. Run these commands:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/gidy-profile.git
git push -u origin main
```

## Step 2: Deploy Frontend (Vercel - Recommended)

### Option A: Vercel CLI
1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy from frontend folder:
```bash
cd frontend
vercel --prod
```

### Option B: Vercel Dashboard
1. Go to https://vercel.com
2. Connect your GitHub account
3. Import the `gidy-profile` repository
4. Set build settings:
   - **Build Command**: `cd frontend && npm run build`
   - **Output Directory**: `frontend/dist`
   - **Install Command**: `cd frontend && npm install`

## Step 3: Deploy Backend (Railway/Render)

### Option A: Railway
1. Go to https://railway.app
2. Connect GitHub account
3. New Project → Deploy from GitHub
4. Select `gidy-profile` repository
5. Set environment variables in Railway dashboard:
   - `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`
   - `PORT=3001`

### Option B: Render
1. Go to https://render.com
2. New → Web Service
3. Connect GitHub repository
4. Build settings:
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Environment Variables**: Add your database credentials

## Step 4: Update Frontend API URL

After deploying backend, update the frontend API URL:

1. In Vercel dashboard, add environment variable:
   - `VITE_API_URL`: `https://your-backend-url.railway.app`

2. Or update in `frontend/src/App.tsx`:
```typescript
const response = await fetch('https://your-backend-url.railway.app/api/profile')
```

## Step 5: Database Setup

### Option A: Railway (Easiest)
1. In Railway project, add PostgreSQL service
2. Copy database URL to environment variables

### Option B: PlanetScale
1. Go to https://planetscale.com
2. Create new database
3. Get connection string
4. Update backend environment variables

## Final URLs Structure

- **Frontend**: https://your-app.vercel.app
- **Backend**: https://your-api.railway.app
- **Database**: Managed by Railway/PlanetScale

## Quick Start Commands

```bash
# Frontend development
cd frontend
npm install
npm run dev

# Backend development
cd backend
npm install
npm run dev
```

## Environment Variables Needed

### Backend (.env)
```
PORT=3001
DB_HOST=your-db-host
DB_PORT=3306
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_NAME=gidy_profile
```

### Frontend (Vercel)
```
VITE_API_URL=https://your-backend-url.railway.app
```

## Troubleshooting

1. **CORS Issues**: Make sure backend allows frontend URL
2. **Database Connection**: Check credentials and network access
3. **Build Failures**: Verify all dependencies are installed
4. **Environment Variables**: Double-check all required variables are set
