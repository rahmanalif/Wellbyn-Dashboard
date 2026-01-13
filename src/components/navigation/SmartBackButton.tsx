'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

// A component that intelligently handles back navigation
// It tracks navigation history and provides smart back functionality
export default function SmartBackButton({
  className = ''
}: {
  className?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [canGoBack, setCanGoBack] = useState(false);

  // Determine the appropriate fallback based on the current path
  const getFallbackPath = () => {
    if (pathname.startsWith('/doctor')) {
      return '/doctor'; // Go back to doctor list page
    } else if (pathname.startsWith('/patients')) {
      return '/patients'; // Go back to patients list page
    } else if (pathname.startsWith('/appointment')) {
      return '/appointment'; // Go back to appointments page
    } else if (pathname.startsWith('/calendar')) {
      return '/calendar'; // Go back to calendar page
    } else if (pathname.startsWith('/staff')) {
      return '/staff'; // Go back to staff page
    } else if (pathname.startsWith('/analytics')) {
      return '/analytics'; // Go back to analytics page
    } else {
      return '/dashboard'; // Default fallback
    }
  };

  useEffect(() => {
    // Check if browser supports history state (to determine if we can go back)
    // This is a heuristic approach since Next.js doesn't expose the full history API
    const lastPath = sessionStorage.getItem('currentPath');
    setCanGoBack(window.history.state?.idx > 0 || !!lastPath);

    // Track previous path across client-side navigations
    if (lastPath && lastPath !== pathname) {
      sessionStorage.setItem('previousPath', lastPath);
    }
    sessionStorage.setItem('currentPath', pathname);
  }, [pathname]);

  const handleBackClick = () => {
    // First, try to use browser's back functionality
    if (window.history.state?.idx > 0) {
      router.back();
    } else {
      // If browser back isn't available, try to determine previous location
      const previousPath = sessionStorage.getItem('previousPath');

      // If we have a previous path and it's different from current, navigate there
      if (previousPath && previousPath !== pathname && previousPath !== '/') {
        router.push(previousPath);
      } else {
        // Fallback to the appropriate path based on current location
        const fallbackPath = getFallbackPath();
        router.push(fallbackPath);
      }
    }
  };

  return (
    <button
      onClick={handleBackClick}
      className={`p-2 hover:bg-gray-100 rounded-lg transition-colors ${className}`}
      aria-label="Go back"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 6V18" stroke="#3D3D3D" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M8 12.0005H20" stroke="#3D3D3D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 8C12 8 8.00001 10.946 8 12C7.99999 13.0541 12 16 12 16" stroke="#3D3D3D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );
}
