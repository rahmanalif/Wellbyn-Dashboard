// API configuration file
// This file contains the base URL and API endpoints

// Base URL for your API
export const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1357';

// API endpoints
export const API_ENDPOINTS = {
  auth: {
    doctorSignup: '/api/auth/doctor/signup',
    doctorLogin: '/api/auth/doctor/login',
    doctorForgotPassword: '/api/auth/doctor/forgot-password',
    doctorVerifyOtp: '/api/auth/doctor/verify-otp',
    doctorResetPassword: '/api/auth/doctor/reset-password',
    patientSignup: '/api/auth/patient/signup',
    patientLogin: '/api/auth/patient/login',
    patientForgotPassword: '/api/auth/patient/forgot-password',
    patientVerifyOtp: '/api/auth/patient/verify-otp',
    patientResetPassword: '/api/auth/patient/reset-password',
    logout: '/api/auth/logout',
  },
  doctor: {
    myDoctors: '/api/doctor/my-doctors', // GET with query params: page, limit
    addDoctor: '/api/auth/doctor/add-doctor', // POST with form-data
    getDoctorById: '/api/doctor/my-doctors', // GET /api/doctor/my-doctors/:doctorId
    getAppointments: '/api/doctor', // GET /api/doctor/:doctorId/appointments
    getPatients: '/api/doctor', // GET /api/doctor/:doctorId/patients
    updateAvailability: '/api/doctor/availability', // PUT /api/doctor/availability/:doctorId
    allPatients: '/api/doctor/all-patients', // GET with query params: gender, visitType, sortBy, page, limit
  },
  patient: {
    registrationStep1: '/api/patient/registration/step-1', // POST with multipart/form-data
    registrationStep2: '/api/patient/registration/step-2', // POST with application/json
    registrationStep3: '/api/patient/registration/step-3', // POST with multipart/form-data
    getRegistrationStatus: '/api/patient/registration/status', // GET /api/patient/registration/status/:patientId
    getPatientById: '/api/patient', // GET /api/patient/:patientId
  },
};

/**
 * Utility function to construct full image URL
 * Combines the base URL with the relative path from the backend
 *
 * @param relativePath - The relative path from backend (e.g., "uploads//1762811169222-download%20(1).jpg")
 * @returns Full URL (e.g., "https://wellbyn.grassroots-bd.com/uploads//1762811169222-download%20(1).jpg")
 */
export const getImageUrl = (relativePath: string | undefined | null): string | undefined => {
  if (!relativePath) return undefined;

  // If it's already a full URL (starts with http:// or https://), return as is
  if (relativePath.startsWith('http://') || relativePath.startsWith('https://')) {
    return relativePath;
  }

  // Remove leading slash if present to avoid double slashes
  const cleanPath = relativePath.startsWith('/') ? relativePath.slice(1) : relativePath;

  // Combine base URL with the relative path
  return `${BASE_URL}/${cleanPath}`;
};
