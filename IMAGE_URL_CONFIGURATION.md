# Image URL Configuration Guide

## Overview
This guide explains how profile images and other backend-served images are handled in the application.

## The Problem
The backend returns relative image paths like:
```
"profilePicture": "uploads//1762811169222-download%20(1).jpg"
```

But to display these images, we need the full URL:
```
https://wellbyn.grassroots-bd.com/uploads//1762811169222-download%20(1).jpg
```

## The Solution

### 1. Environment Configuration

The backend base URL is stored in `.env.local`:

```env
NEXT_PUBLIC_API_URL=https://wellbyn.grassroots-bd.com
```

**To change the backend URL:**
1. Open `.env.local`
2. Update `NEXT_PUBLIC_API_URL` with your new backend URL
3. Restart the development server (`npm run dev`)

### 2. Utility Function

The `getImageUrl()` function in [src/lib/api.ts](src/lib/api.ts) automatically constructs full image URLs:

```typescript
export const getImageUrl = (relativePath: string | undefined | null): string | undefined => {
  if (!relativePath) return undefined;

  // If already a full URL, return as is
  if (relativePath.startsWith('http://') || relativePath.startsWith('https://')) {
    return relativePath;
  }

  // Combine base URL with relative path
  const cleanPath = relativePath.startsWith('/') ? relativePath.slice(1) : relativePath;
  return `${BASE_URL}/${cleanPath}`;
};
```

**Features:**
- ✅ Handles `undefined` and `null` safely
- ✅ Detects if URL is already full (starts with http/https)
- ✅ Removes duplicate slashes
- ✅ Uses environment variable for base URL

### 3. Usage in Components

#### Doctor Page Example
[src/app/(home)/doctor/page.tsx](src/app/(home)/doctor/page.tsx):

```typescript
import { getImageUrl } from '@/lib/api';

const doctors: Doctor[] = (data?.doctors || []).map((doctor: ApiDoctor) => {
  const fullImageUrl = getImageUrl(doctor.profilePicture);

  return {
    id: doctor.doctorId,
    name: doctor.doctorName,
    avatar: fullImageUrl || "/placeholder.svg?height=32&width=32",
    // ... other fields
  };
});
```

**What happens:**
1. Backend returns: `"uploads//1762811169222-download%20(1).jpg"`
2. `getImageUrl()` transforms it to: `"https://wellbyn.grassroots-bd.com/uploads//1762811169222-download%20(1).jpg"`
3. Image component receives the full URL

## Files Modified

| File | Purpose |
|------|---------|
| `.env.local` | Stores backend base URL |
| `src/lib/api.ts` | Contains `getImageUrl()` utility function |
| `src/app/(home)/doctor/page.tsx` | Uses `getImageUrl()` for doctor avatars |

## How to Use in Other Components

Whenever you need to display an image from the backend:

```typescript
import { getImageUrl } from '@/lib/api';

// In your component
const imageUrl = getImageUrl(backendImagePath);

// Use in Image component
<Image
  src={imageUrl || '/placeholder.png'}
  alt="Profile"
  width={100}
  height={100}
/>
```

## Testing

### Example API Response:
```json
{
  "doctorId": "69431282b0de1851e2b7490b",
  "doctorName": "scarlet johanson",
  "profilePicture": "uploads//1762811169222-download%20(1).jpg",
  "contact": {
    "email": "scarlet.johanson@gmail.com",
    "mobile": "1234567890"
  }
}
```

### Transformation:
```typescript
Input:  "uploads//1762811169222-download%20(1).jpg"
Output: "https://wellbyn.grassroots-bd.com/uploads//1762811169222-download%20(1).jpg"
```

### Console Logs
The doctor page includes debug logs to track the transformation:

```
Image URL transformation: {
  original: "uploads//1762811169222-download%20(1).jpg",
  full: "https://wellbyn.grassroots-bd.com/uploads//1762811169222-download%20(1).jpg"
}
```

## Important Notes

1. **Environment Variables**
   - Must start with `NEXT_PUBLIC_` to be accessible in browser
   - Requires server restart after changes
   - `.env.local` is gitignored (not committed to version control)

2. **Fallback Images**
   - Always provide a fallback for missing images
   - Example: `fullImageUrl || "/placeholder.svg"`

3. **URL Encoding**
   - The function preserves URL encoding (e.g., `%20` for spaces)
   - Backend paths are used as-is

## Troubleshooting

### Images Not Loading?

1. **Check Console Logs**
   - Open browser DevTools
   - Look for "Image URL transformation" logs
   - Verify the full URL is correct

2. **Verify Environment Variable**
   ```bash
   # Check if .env.local exists
   cat .env.local

   # Restart dev server
   npm run dev
   ```

3. **Check Network Tab**
   - Open DevTools > Network
   - Filter by "Img"
   - See if image requests are reaching the correct URL

4. **CORS Issues**
   - If images fail to load, check CORS settings on backend
   - Backend must allow requests from your frontend domain

### Backend URL Changed?

1. Open `.env.local`
2. Update `NEXT_PUBLIC_API_URL=https://new-backend-url.com`
3. Restart server: `npm run dev`

That's it! All images will automatically use the new URL.
