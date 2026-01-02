"use client";
import { useState } from 'react';
import { useGetDoctorsQuery, ApiDoctor } from '@/lib/store/services/doctorsApi';
import { useAppSelector } from '@/lib/store/hooks';
import { getImageUrl } from '@/lib/api';
import { DoctorsHeader } from './components/doctors/DoctorsHeader';
import { DoctorsTable } from './components/doctors/DoctorsTable';
import { Doctor } from './types/doctor';

/**
 * RTK QUERY AUTO-REFRESH STRATEGY
 *
 * RTK Query automatically handles:
 * 1. Auto-refetch on window focus (after 60 seconds of inactivity)
 * 2. Polling every 30 seconds when component is mounted
 * 3. Automatic caching and request deduplication
 * 4. No manual refresh needed - data updates automatically!
 */

export default function DoctorsPage() {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  // Check if user is authenticated
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  /**
   * RTK QUERY HOOK
   *
   * This single hook provides:
   * - data: The doctors data from API
   * - isLoading: True on initial load
   * - isFetching: True when fetching (including background refetches)
   * - error: Any error that occurred
   * - refetch: Manual refetch function (if needed)
   *
   * Automatic features enabled:
   * - pollingInterval: Refetch every 30 seconds
   * - refetchOnFocus: Refetch when user returns to window
   * - refetchOnReconnect: Refetch when internet reconnects
   * - skip: Don't fetch if user is not authenticated
   */
  const {
    data,
    isLoading,
    isFetching,
    error,
  } = useGetDoctorsQuery(
    { page: currentPage, limit },
    {
      // Auto-refetch every 30 seconds
      pollingInterval: 30000,
      // Refetch when user focuses window (after 60s)
      refetchOnFocus: true,
      // Refetch when internet reconnects
      refetchOnReconnect: true,
      // Skip query if user is not authenticated
      skip: !isAuthenticated,
    }
  );

  /**
   * TRANSFORM API DATA TO COMPONENT FORMAT
   *
   * Convert API doctors data to the format expected by DoctorsTable component
   * Uses getImageUrl to construct full image URLs from backend relative paths
   */
  console.log('Raw data from API:', data);
  console.log('Doctors array from data:', data?.doctors);

  const doctors: Doctor[] = (data?.doctors || []).map((doctor: ApiDoctor) => {
    console.log('Transforming doctor:', doctor);

    try {
      const fullImageUrl = getImageUrl(doctor.profilePicture);
      console.log('Image URL transformation:', {
        original: doctor.profilePicture,
        full: fullImageUrl
      });

      // Handle different contact formats from API
      let email = '';
      let phone = '';

      console.log('Doctor contact type:', typeof doctor.contact);
      console.log('Doctor contact value:', doctor.contact);

      if (typeof doctor.contact === 'object' && doctor.contact !== null && !Array.isArray(doctor.contact)) {
        // Contact is an object with email and mobile properties
        email = doctor.contact.email || '';
        phone = doctor.contact.mobile || '';
      } else if (Array.isArray(doctor.contact)) {
        // Contact is an array (like in patients API)
        email = doctor.contact.find((c) => c.includes('@')) || '';
        phone = doctor.contact.find((c) => !c.includes('@')) || '';
      } else if (typeof doctor.contact === 'string') {
        // Contact is a string - try to determine if it's email or phone
        if (doctor.contact.includes('@')) {
          email = doctor.contact;
        } else {
          phone = doctor.contact;
        }
      }

      return {
        id: doctor.doctorId,
        name: doctor.doctorName,
        avatar: fullImageUrl || "/placeholder.svg?height=32&width=32",
        contact: {
          email,
          phone,
        },
        appointments: doctor.appointmentsCount || 0,
        patients: doctor.patientsCount || 0,
      };
    } catch (err) {
      console.error('Error transforming doctor:', err, doctor);
      throw err;
    }
  });

  // Debug log to see transformed data
  console.log('Transformed doctors:', doctors);

  // Check if there might be more pages
  // If we got a full page (10 doctors), there might be more
  const hasMorePages = doctors.length === limit;

  // Pagination handlers
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (hasMorePages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F9FC] sm:p-6 md:p-8">
      <DoctorsHeader
        title="Doctors"
        description="Oversee all the doctors."
      />

      {/* Not Authenticated Message */}
      {!isAuthenticated && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg mb-4">
          <p className="text-sm font-medium">
            Please log in to view doctors.
          </p>
        </div>
      )}

      {/* Error Message Display */}
      {error && isAuthenticated && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4">
          <p className="text-sm font-medium">
            {'status' in error
              ? `Error: ${error.status}`
              : 'Failed to load doctors'}
          </p>
        </div>
      )}

      {/* Loading State - Only show on initial load */}
      {isAuthenticated && isLoading && doctors.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm p-8 flex justify-center items-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-gray-600">Loading doctors...</p>
          </div>
        </div>
      )}

      {/* Doctors Table */}
      {isAuthenticated && (!isLoading || doctors.length > 0) ? (
        <div className="bg-white rounded-lg shadow-sm">
          <DoctorsTable doctors={doctors} />

          {/* Pagination Controls */}
          {data && (
            <div className="px-4 py-4 border-t border-gray-200 flex items-center justify-between">
              {/* Left side - Page info */}
              <div className="text-sm text-gray-600">
                Page {currentPage} • Showing {doctors.length} doctors
              </div>

              {/* Right side - Pagination buttons */}
              <div className="flex items-center gap-2">
                {/* Previous Button */}
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1 || isFetching}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>

                {/* Current Page Indicator */}
                <div className="px-4 py-2 text-sm font-medium bg-primary-500 text-white rounded-lg">
                  {currentPage}
                </div>

                {/* Next Button */}
                <button
                  onClick={handleNextPage}
                  disabled={!hasMorePages || isFetching}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}