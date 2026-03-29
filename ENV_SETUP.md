# Environment Variables Setup

## Overview

All sensitive configuration like Firebase credentials are now stored in `.env.local` and excluded from version control via `.gitignore`.

## Files

- **`.env.local`** - Your actual secrets (⚠️ NEVER commit this)
- **`.env.example`** - Template showing required variables
- **`.gitignore`** - Already configured to exclude `.env.local`

## Setup for New Developers

1. Clone the repository
2. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
3. Fill in your Firebase credentials in `.env.local`
4. The app will automatically load these variables

## Security Best Practices

✅ **DO:**
- Store `.env.local` locally only
- Use `.env.example` for version control
- Regenerate Firebase keys if accidentally exposed
- Keep credentials out of logs and console

❌ **DON'T:**
- Commit `.env.local` to git
- Share credentials in code or comments
- Hardcode sensitive values
- Log environment variables

## Firebase Environment Variables

Required variables for Firebase setup:

```
VITE_FIREBASE_API_KEY          - API Key for authentication
VITE_FIREBASE_AUTH_DOMAIN      - Firebase auth domain
VITE_FIREBASE_PROJECT_ID       - Your Firebase project ID
VITE_FIREBASE_STORAGE_BUCKET   - Storage bucket URL
VITE_FIREBASE_MESSAGING_SENDER_ID - Messaging sender ID
VITE_FIREBASE_APP_ID           - Firebase app ID
VITE_FIREBASE_MEASUREMENT_ID   - Google Analytics measurement ID
```

## How It Works

1. Variables are defined in `.env.local`
2. Vite loads them automatically (only VITE_* prefix is exposed to client)
3. `src/config/firebase.ts` reads them via `import.meta.env`
4. Firebase initialization uses these values

## Vite Environment Variables

- Client-side variables must start with `VITE_`
- Access them in code: `import.meta.env.VITE_VARIABLE_NAME`
- Only VITE_* variables are exposed to browser for security
