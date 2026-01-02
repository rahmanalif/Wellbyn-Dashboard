"use client";

import { useState } from "react";
import { useGetAllPatientsQuery, ApiPatient } from "@/lib/store/services/patientsApi";
import { useAppSelector } from "@/lib/store/hooks";
import { PatientsHeader } from "./components/patients/PatientsHeader";
import { PatientsFilters } from "./components/patients/PatientsFilters";
import { PatientsTable } from "./components/patients/PatientsTable";
import { Patient } from "./types/patient";

/**
 * RTK QUERY AUTO-REFRESH STRATEGY
 *
 * RTK Query automatically handles:
 * 1. Auto-refetch on window focus (after 60 seconds of inactivity)
 * 2. Polling every 30 seconds when component is mounted
 * 3. Automatic caching and request deduplication
 * 4. No manual refresh needed - data updates automatically!
 */

export default function PatientsDashboard() {
  // Filter and pagination state
  const [gender, setGender] = useState<string>("");
  const [visitType, setVisitType] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("name_desc");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  // Check if user is authenticated
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  /**
   * RTK QUERY HOOK
   *
   * This single hook provides:
   * - data: The patients data from API
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
  } = useGetAllPatientsQuery(
    {
      gender: gender || undefined,
      visitType: visitType || undefined,
      sortBy: sortBy || undefined,
      search: searchQuery || undefined,
      page: currentPage,
      limit,
    },
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
   * Convert API patients data to the format expected by PatientsTable component
   */
  const patients: Patient[] = (data?.data || []).map((patient: ApiPatient) => {
    // Extract email and phone from contact array
    // Handle case where contact might not be an array
    const contactArray = Array.isArray(patient.contact) ? patient.contact : [];
    const email = contactArray.find((c) => c.includes("@")) || "";
    const phone = contactArray.find((c) => !c.includes("@")) || "";

    // Get initial from patient name
    const initial = patient.patientName.charAt(0).toUpperCase();

    // Format date
    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const year = date.getFullYear();
      return `${month}-${day}-${year}`;
    };

    return {
      id: patient.patientId,
      initial,
      name: patient.patientName,
      contact: {
        email,
        phone,
      },
      gender: patient.gender,
      lastVisit: formatDate(patient.lastVisit),
      status: patient.statusCare,
    };
  });

  // Get total count from metadata
  const totalPatients = data?.metadata?.[0]?.total || 0;

  // Calculate if there are more pages
  const hasMorePages = currentPage * limit < totalPatients;

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

  // Filter handlers
  const handleGenderChange = (value: string) => {
    setGender(value);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handleVisitTypeChange = (value: string) => {
    setVisitType(value);
    setCurrentPage(1);
  };

  const handleSortByChange = (value: string) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  return (
    <div className="flex h-full w-full flex-col bg-[#F6F9FC] p-4 sm:p-6 md:p-8 lg:p-10">
      {/* Header Section - Fixed height */}
      <div className="flex-shrink-0 bg-white rounded-lg shadow-sm mb-5 p-5">
        <PatientsHeader />
        <PatientsFilters
          onGenderChange={handleGenderChange}
          onVisitTypeChange={handleVisitTypeChange}
          onSortByChange={handleSortByChange}
          onSearchChange={handleSearchChange}
          selectedGender={gender}
          selectedVisitType={visitType}
          selectedSortBy={sortBy}
        />
      </div>

      {/* Not Authenticated Message */}
      {!isAuthenticated && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg mb-4">
          <p className="text-sm font-medium">
            Please log in to view patients.
          </p>
        </div>
      )}

      {/* Error Message Display */}
      {error && isAuthenticated && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4">
          <p className="text-sm font-medium">
            {'status' in error
              ? `Error: ${error.status}`
              : 'Failed to load patients'}
          </p>
        </div>
      )}

      {/* Loading State - Only show on initial load */}
      {isAuthenticated && isLoading && patients.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm p-8 flex justify-center items-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-gray-600">Loading patients...</p>
          </div>
        </div>
      )}

      {/* Table Section - Takes remaining space with scroll */}
      {isAuthenticated && (!isLoading || patients.length > 0) && (
        <div className="flex-1 min-h-0 rounded-lg bg-white shadow-sm">
          <div className="h-full flex flex-col">
            <div className="flex-1 p-4 md:p-6 overflow-y-auto">
              <PatientsTable patients={patients} />
            </div>

            {/* Pagination Controls */}
            {data && (
              <div className="px-4 py-4 border-t border-gray-200 flex items-center justify-between">
                {/* Left side - Page info */}
                <div className="text-sm text-gray-600">
                  Page {currentPage} • Showing {patients.length} of {totalPatients} patients
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
        </div>
      )}
    </div>
  );
}