import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, API_ENDPOINTS } from '@/lib/api';
import { RootState } from '../store';

/**
 * INTERFACES
 */

// Single patient from API response
export interface ApiPatient {
  patientId: string;
  patientName: string;
  contact: string[];
  gender: string;
  lastVisit: string;
  statusCare: string;
}

// Metadata from API response
export interface PatientsMetadata {
  total: number;
}

// API Response type
export interface PatientsResponse {
  metadata: PatientsMetadata[];
  data: ApiPatient[];
}

// Query parameters for filtering and pagination
export interface PatientsQueryParams {
  gender?: string;
  visitType?: string;
  sortBy?: string;
  page?: number;
  limit?: number;
  search?: string;
}

// Patient Registration Step 1 Response
export interface PatientRegistrationStep1Response {
  success: boolean;
  message: string;
  data: {
    patientId: string;
    currentStep: number;
    completedSteps: number[];
    nextStep: string;
  };
}

// Patient Registration Step 2 Request
export interface PatientRegistrationStep2Request {
  patientId: string;
  allergies?: Array<{
    name: string;
    severity: string;
  }>;
  medications?: Array<{
    name: string;
    dosage?: string;
    frequency: string;
  }>;
  conditions?: string[];
  lifestyleFactors?: string[];
}

// Patient Registration Step 2 Response
export interface PatientRegistrationStep2Response {
  success: boolean;
  message: string;
  data: {
    patientId: string;
    currentStep: number;
    completedSteps: number[];
    nextStep: string;
  };
}

// Patient Registration Step 3 Response
export interface PatientRegistrationStep3Response {
  success: boolean;
  message: string;
  data: {
    patientId: string;
    currentStep: number;
    completedSteps: number[];
    registrationComplete: boolean;
    patient: {
      patientId: string;
      patientName: string;
      email: string;
      phone: string;
      status: string;
      createdAt: string;
    };
  };
}

// Error Response
export interface ApiError {
  success: false;
  message: string;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}

/**
 * RTK QUERY API SERVICE FOR PATIENTS
 *
 * This creates an API service with automatic:
 * - Caching
 * - Auto-refetching on window focus
 * - Polling for fresh data
 * - Request deduplication
 * - Loading/error state management
 */
export const patientsApi = createApi({
  reducerPath: 'patientsApi',

  /**
   * BASE QUERY CONFIGURATION
   *
   * Automatically adds Authorization header to all requests
   */
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_PATIENTS_API_URL || BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      // Get access token from auth state
      const token = (getState() as RootState).auth.accessToken;

      // Add authorization header if token exists
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),

  /**
   * TAG TYPES
   *
   * Used for cache invalidation and refetching
   */
  tagTypes: ['Patients', 'PatientRegistration'],

  /**
   * API ENDPOINTS
   */
  endpoints: (builder) => ({
    /**
     * GET ALL PATIENTS ENDPOINT
     *
     * Fetches list of patients with filtering and pagination
     *
     * Features:
     * - Auto-refetch on window focus (after 60 seconds)
     * - Auto-polling every 30 seconds when subscribed
     * - Automatic caching
     * - Filtering by gender, visitType, sortBy
     * - Search functionality
     */
    getAllPatients: builder.query<PatientsResponse, PatientsQueryParams>({
      query: ({ gender, visitType, sortBy, page = 1, limit = 10, search }) => {
        // Build query parameters
        const params = new URLSearchParams();

        if (gender) params.append('gender', gender);
        if (visitType) params.append('visitType', visitType);
        if (sortBy) params.append('sortBy', sortBy);
        if (page) params.append('page', page.toString());
        if (limit) params.append('limit', limit.toString());
        if (search) params.append('search', search);

        return `${API_ENDPOINTS.doctor.allPatients}?${params.toString()}`;
      },

      /**
       * TRANSFORM RESPONSE
       *
       * Normalize API response to expected format
       */
      transformResponse: (response: any) => {
        console.log('Patients API - Raw Response:', response);

        // Normalize metadata to ensure it's always an array
        let metadata = response.metadata;
        // If metadata is an object but not an array, wrap it
        if (metadata && typeof metadata === 'object' && !Array.isArray(metadata)) {
          metadata = [metadata];
        }

        return {
          metadata: Array.isArray(metadata) ? metadata : [{ total: 0 }],
          data: response.data || [],
        };
      },

      /**
       * CACHE TAGS
       *
       * Marks this data as 'Patients' for cache management
       */
      providesTags: ['Patients'],

      /**
       * KEEP UNUSED DATA FOR
       *
       * Keep cached data for 60 seconds after component unmounts
       */
      keepUnusedDataFor: 60,
    }),

    /**
     * PATIENT REGISTRATION STEP 1 ENDPOINT
     *
     * Submits patient personal information (step 1 of registration)
     *
     * Features:
     * - Accepts FormData with multipart/form-data
     * - Handles file uploads (license images)
     * - Returns patientId for subsequent steps
     */
    submitPatientRegistrationStep1: builder.mutation<
      PatientRegistrationStep1Response,
      FormData
    >({
      query: (formData) => ({
        url: API_ENDPOINTS.patient.registrationStep1,
        method: 'POST',
        body: formData,
        // Don't set Content-Type header - browser will set it automatically for FormData with boundary
      }),

      /**
       * TRANSFORM ERROR RESPONSE
       *
       * Normalize error responses from API
       */
      transformErrorResponse: (response: any) => {
        console.error('Patient Registration Step 1 - Error:', response);
        return response.data || response;
      },

      /**
       * INVALIDATE TAGS
       *
       * Invalidate patients list cache after successful registration
       */
      invalidatesTags: ['Patients', 'PatientRegistration'],
    }),

    /**
     * PATIENT REGISTRATION STEP 2 ENDPOINT
     *
     * Submits patient medical information (step 2 of registration)
     *
     * Features:
     * - Accepts JSON with application/json
     * - Handles allergies, medications, conditions, and lifestyle factors
     * - Requires patientId from step 1
     */
    submitPatientRegistrationStep2: builder.mutation<
      PatientRegistrationStep2Response,
      PatientRegistrationStep2Request
    >({
      query: (data) => ({
        url: API_ENDPOINTS.patient.registrationStep2,
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/json',
        },
      }),

      /**
       * TRANSFORM ERROR RESPONSE
       *
       * Normalize error responses from API
       */
      transformErrorResponse: (response: any) => {
        console.error('Patient Registration Step 2 - Error:', response);
        return response.data || response;
      },

      /**
       * INVALIDATE TAGS
       *
       * Invalidate patients list cache after successful registration
       */
      invalidatesTags: ['Patients', 'PatientRegistration'],
    }),

    /**
     * PATIENT REGISTRATION STEP 3 ENDPOINT
     *
     * Submits patient insurance information (step 3 of registration)
     *
     * Features:
     * - Accepts FormData with multipart/form-data
     * - Handles insurance information and images
     * - Requires patientId from step 1
     * - Completes patient registration
     */
    submitPatientRegistrationStep3: builder.mutation<
      PatientRegistrationStep3Response,
      FormData
    >({
      query: (formData) => ({
        url: API_ENDPOINTS.patient.registrationStep3,
        method: 'POST',
        body: formData,
        // Don't set Content-Type header - browser will set it automatically for FormData with boundary
      }),

      /**
       * TRANSFORM ERROR RESPONSE
       *
       * Normalize error responses from API
       */
      transformErrorResponse: (response: any) => {
        console.error('Patient Registration Step 3 - Error:', response);
        return response.data || response;
      },

      /**
       * INVALIDATE TAGS
       *
       * Invalidate patients list cache after successful registration
       */
      invalidatesTags: ['Patients', 'PatientRegistration'],
    }),
  }),
});

/**
 * EXPORT AUTO-GENERATED HOOKS
 *
 * RTK Query automatically generates React hooks for each endpoint:
 * - useGetAllPatientsQuery: Fetches patients and manages cache
 * - useLazyGetAllPatientsQuery: Fetches patients on demand
 * - useSubmitPatientRegistrationStep1Mutation: Submits patient registration step 1
 * - useSubmitPatientRegistrationStep2Mutation: Submits patient registration step 2
 * - useSubmitPatientRegistrationStep3Mutation: Submits patient registration step 3
 */
export const {
  useGetAllPatientsQuery,
  useLazyGetAllPatientsQuery,
  useSubmitPatientRegistrationStep1Mutation,
  useSubmitPatientRegistrationStep2Mutation,
  useSubmitPatientRegistrationStep3Mutation,
} = patientsApi;
