import { ReactNode } from 'react';

export default function DoctorEditLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="container mx-auto py-6 px-4">
      {children}
    </div>
  );
}
