# Fix for CORS Errors

## Problem
Your Next.js dev server is still using the old `BASE_URL` pointing to `https://wellbyn.grassroots-bd.com` instead of `http://localhost:1357`.

## Solution

**You MUST restart your Next.js development server for environment variable changes to take effect.**

### Steps:

1. **Stop your current dev server**:
   - Press `Ctrl + C` in the terminal where `npm run dev` is running

2. **Start it again**:
   ```bash
   npm run dev
   ```

3. **Verify the fix**:
   - Open your browser's Developer Console (F12)
   - Go to the Network tab
   - Try logging in
   - You should now see requests going to `http://localhost:1357` instead of `https://wellbyn.grassroots-bd.com`

## Why This Happens

Next.js only reads environment variables when the development server starts. Changes to `.env.local` while the server is running are **NOT** automatically picked up. You must restart the server.

## Verification

After restarting, the following should all point to `http://localhost:1357`:
- ✅ Login endpoint: `http://localhost:1357/api/auth/doctor/login`
- ✅ Patients endpoint: `http://localhost:1357/api/doctor/all-patients`
- ✅ Doctors endpoint: `http://localhost:1357/api/doctor/my-doctors`

## Current Configuration

Your `.env.local` file is correctly configured:
```env
NEXT_PUBLIC_API_URL=http://localhost:1357
NEXT_PUBLIC_DOCTORS_API_URL=http://localhost:1357
NEXT_PUBLIC_PATIENTS_API_URL=http://localhost:1357
```

Your `src/lib/api.ts` is correctly configured:
```typescript
export const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1357';
```

Everything is set up correctly - you just need to restart the dev server!
