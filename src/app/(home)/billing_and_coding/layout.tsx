
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Billing and Coding",
  description: "Welcome to Wellbyn, your personal health companion.",
};


export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <main className='flex items-start w-full'>
  
        <section className='w-full py-4'>{children}</section>
    </main>
  )
}
