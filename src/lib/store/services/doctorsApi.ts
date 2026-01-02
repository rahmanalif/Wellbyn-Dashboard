import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, API_ENDPOINTS } from '@/lib/api';
import { RootState } from '../store';

/**
 * INTERFACES
 */

// Single doctor from API response
export interface ApiDoctor {
  doctorId: string;
  doctorName: string;
  contact: {
    email: string;
    mobile: string;
  };
  appointmentsCount: number;
  patientsCount: number;
  profilePicture?: string;
}

// API Response type
export interface DoctorsResponse {
  doctors?: ApiDoctor[];
  total?: number;
  page?: number;
  limit?: number;
}

// Qualification interface
export interface QualificationData {
  degree: string;
  university?: string;
}

// Add Doctor Request
export interface AddDoctorRequest {
  fullName: string;
  email: string;
  mobile: string;
  discipline: string;
  clinicName: string;
  officeLocation: string[];
  googleMapUrl: string[];
  popularReasonsToVisit: string[];
  qualifications: QualificationData[];
}

// Add Doctor Response
export interface AddDoctorResponse {
  _id: string;
  fullName: string;
  email: string;
  mobile: string;
  discipline: string;
  clinicName: string;
  officeLocation: string[];
  googleMapUrl: string[];
  popularReasonsToVisit: string[];
  qualifications: QualificationData[];
  role: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Get Doctor By ID Response
export interface DoctorByIdResponse {
  doctorId: string;
  doctorName: string;
  email: string;
  mobile: string;
  todaysAppointmentCount: number;
  totalAppointment: number;
  appointmentPerformanceResult: number;
  profilePicture?: string;
}

// Appointment Response
export interface Appointment {
  appointmentTime: string;
  patientName: string;
  status: 'Upcoming' | 'Complete' | 'Cancelled' | 'Next Follow Up In 7 Days';
}

// Patient Response
export interface Patient {
  _id: string;
  patientName: string;
  email: string;
  phone: string;
  gender: string;
  lastVisit: string;
  status: string;
}

// Availability Slot
export interface AvailabilitySlot {
  time: string;
}

// Availability Day
export interface AvailabilityDay {
  day: string;
  office: {
    start: string;
    end: string;
  };
  slots: AvailabilitySlot[];
}

// Update Availability Request
export interface UpdateAvailabilityRequest {
  availability: AvailabilityDay[];
}

// Update Availability Response
export interface UpdateAvailabilityResponse {
  message: string;
}

/**
 * RTK QUERY API SERVICE
 *
 * This creates an API service with automatic:
 * - Caching
 * - Auto-refetching on window focus
 * - Polling for fresh data
 * - Request deduplication
 * - Loading/error state management
 */
export const doctorsApi = createApi({
  reducerPath: 'doctorsApi',

  /**
   * BASE QUERY CONFIGURATION
   *
   * Automatically adds Authorization header to all requests
   */
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_DOCTORS_API_URL || BASE_URL,
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
  tagTypes: ['Doctors'],

  /**
   * API ENDPOINTS
   */
  endpoints: (builder) => ({
    /**
     * ADD DOCTOR ENDPOINT
     *
     * Creates a new doctor with JSON data
     */
    addDoctor: builder.mutation<AddDoctorResponse, AddDoctorRequest>({
      query: (doctorData) => ({
        url: API_ENDPOINTS.doctor.addDoctor,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: doctorData,
      }),
      /**
       * INVALIDATE CACHE
       *
       * After adding a doctor, invalidate the Doctors cache
       * This will trigger a refetch of the doctors list
       */
      invalidatesTags: ['Doctors'],
    }),

    /**
     * GET DOCTORS ENDPOINT
     *
     * Fetches list of doctors with pagination
     *
     * Features:
     * - Auto-refetch on window focus (after 60 seconds)
     * - Auto-polling every 30 seconds when subscribed
     * - Automatic caching
     */
    getDoctors: builder.query<DoctorsResponse, { page?: number; limit?: number }>({
      query: ({ page = 1, limit = 10 }) =>
        `${API_ENDPOINTS.doctor.myDoctors}?page=${page}&limit=${limit}`,

      /**
       * TRANSFORM RESPONSE
       *
       * Normalize API response to handle different formats
       */
      transformResponse: (response: any) => {
        console.log('RTK Query - Raw API Response:', response);
        console.log('RTK Query - Response type:', typeof response);
        console.log('RTK Query - Is Array?:', Array.isArray(response));

        let doctorsArray: ApiDoctor[] = [];

        // Handle different response formats
        if (Array.isArray(response)) {
          console.log('RTK Query - Response is array, using directly');
          doctorsArray = response;
        } else if (response.doctors && Array.isArray(response.doctors)) {
          console.log('RTK Query - Response has doctors property, using that');
          doctorsArray = response.doctors;
        } else if (response.data && Array.isArray(response.data)) {
          console.log('RTK Query - Response has data property, using that');
          doctorsArray = response.data;
        } else {
          console.log('RTK Query - Unknown response format, using empty array');
        }

        console.log('RTK Query - Doctors array length:', doctorsArray.length);
        console.log('RTK Query - First doctor:', doctorsArray[0]);

        return {
          doctors: doctorsArray,
          total: response.total || doctorsArray.length,
          page: response.page || 1,
          limit: response.limit || 10,
        };
      },

      /**
       * CACHE TAGS
       *
       * Marks this data as 'Doctors' for cache management
       */
      providesTags: ['Doctors'],

      /**
       * KEEP UNUSED DATA FOR
       *
       * Keep cached data for 60 seconds after component unmounts
       */
      keepUnusedDataFor: 60,
    }),

    /**
     * GET DOCTOR BY ID ENDPOINT
     *
     * Fetches individual doctor data by ID
     *
     * Features:
     * - Auto-refetch on window focus
     * - Automatic caching
     */
    getDoctorById: builder.query<DoctorByIdResponse, string>({
      query: (doctorId) => `${API_ENDPOINTS.doctor.getDoctorById}/${doctorId}`,

      /**
       * CACHE TAGS
       *
       * Marks this data as 'Doctors' for cache management
       */
      providesTags: (result, error, doctorId) => [{ type: 'Doctors', id: doctorId }],

      /**
       * KEEP UNUSED DATA FOR
       *
       * Keep cached data for 60 seconds after component unmounts
       */
      keepUnusedDataFor: 60,
    }),

    /**
     * GET APPOINTMENTS ENDPOINT
     *
     * Fetches appointments for a specific doctor
     */
    getAppointments: builder.query<Appointment[], string>({
      query: (doctorId) => `${API_ENDPOINTS.doctor.getAppointments}/${doctorId}/appointments`,
      providesTags: (result, error, doctorId) => [{ type: 'Doctors', id: `${doctorId}-appointments` }],
      keepUnusedDataFor: 60,
    }),

    /**
     * GET PATIENTS ENDPOINT
     *
     * Fetches patients for a specific doctor
     */
    getPatients: builder.query<Patient[], string>({
      query: (doctorId) => `${API_ENDPOINTS.doctor.getPatients}/${doctorId}/patients`,
      providesTags: (result, error, doctorId) => [{ type: 'Doctors', id: `${doctorId}-patients` }],
      keepUnusedDataFor: 60,
    }),

    /**
     * UPDATE AVAILABILITY ENDPOINT
     *
     * Updates doctor availability
     */
    updateAvailability: builder.mutation<UpdateAvailabilityResponse, { doctorId: string; availability: AvailabilityDay[] }>({
      query: ({ doctorId, availability }) => ({
        url: `${API_ENDPOINTS.doctor.updateAvailability}/${doctorId}`,
        method: 'PUT',
        body: { availability },
      }),
      invalidatesTags: (result, error, { doctorId }) => [{ type: 'Doctors', id: doctorId }],
    }),
  }),
});

/**
 * EXPORT AUTO-GENERATED HOOKS
 *
 * RTK Query automatically generates React hooks for each endpoint:
 * - useAddDoctorMutation: Mutation hook to add a new doctor
 * - useGetDoctorsQuery: Fetches doctors and manages cache
 * - useLazyGetDoctorsQuery: Fetches doctors on demand
 * - useGetDoctorByIdQuery: Fetches individual doctor data by ID
 * - useGetAppointmentsQuery: Fetches appointments for a specific doctor
 * - useGetPatientsQuery: Fetches patients for a specific doctor
 * - useUpdateAvailabilityMutation: Updates doctor availability
 */
export const {
  useAddDoctorMutation,
  useGetDoctorsQuery,
  useLazyGetDoctorsQuery,
  useGetDoctorByIdQuery,
  useGetAppointmentsQuery,
  useGetPatientsQuery,
  useUpdateAvailabilityMutation,
} = doctorsApi;
