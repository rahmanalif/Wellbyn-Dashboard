import { NextResponse } from 'next/server';
import { BASE_URL } from '@/lib/api';

export async function GET() {
  return NextResponse.json({
    BASE_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    env_vars: {
      NEXT_PUBLIC_DOCTORS_API_URL: process.env.NEXT_PUBLIC_DOCTORS_API_URL,
      NEXT_PUBLIC_PATIENTS_API_URL: process.env.NEXT_PUBLIC_PATIENTS_API_URL,
      NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    }
  });
}
