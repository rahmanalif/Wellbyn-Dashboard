import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { BASE_URL, API_ENDPOINTS } from '@/lib/api';

// TypeScript interfaces for our data
export interface Qualification {
  degree: string;
  university: string;
}

export interface DoctorSignupData {
  fullName: string;
  email: string;
  password: string;
  mobile: string;
  discipline: string;
  clinicName: string;
  officeLocation: string[];
  googleMapUrl: string[];
  popularReasonsToVisit: string[];
  qualifications: Qualification[];
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface ForgotPasswordData {
  email: string;
}

export interface VerifyOtpData {
  email: string;
  otp: string;
}

export interface ResetPasswordData {
  token: string;
  password: string;
}

export interface Doctor {
  _id: string;
  fullName: string;
  email: string;
  mobile: string;
  discipline: string;
  profilePicture?: string;
  clinicName: string;
  officeLocation: string[];
  googleMapUrl: string[];
  popularReasonsToVisit: string[];
  qualifications: Qualification[];
  role: string;
  status: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface AuthState {
  user: Doctor | null;
  accessToken: string | null;
  refreshToken: string | null;
  resetToken: string | null; // Token from OTP verification for password reset
  isLoading: boolean;
  error: string | null;
  success: boolean;
  isAuthenticated: boolean;
}

/**
 * HELPER FUNCTIONS FOR LOCAL STORAGE
 *
 * These functions help us save and load tokens from browser's localStorage
 * This allows users to stay logged in even after closing the browser
 */
const saveTokensToLocalStorage = (accessToken: string, refreshToken: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }
};

const loadTokensFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    return {
      accessToken: localStorage.getItem('accessToken'),
      refreshToken: localStorage.getItem('refreshToken'),
    };
  }
  return { accessToken: null, refreshToken: null };
};

const removeTokensFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
};

// Load tokens from localStorage on app start
const { accessToken, refreshToken } = loadTokensFromLocalStorage();

// Initial state
const initialState: AuthState = {
  user: null,
  accessToken: accessToken,
  refreshToken: refreshToken,
  resetToken: null,
  isLoading: false,
  error: null,
  success: false,
  isAuthenticated: !!accessToken, // true if token exists
};

/**
 * ASYNC THUNK: doctorSignup
 *
 * This is an async action creator that handles the API call for doctor signup.
 * It automatically creates three action types:
 * - doctorSignup/pending: When the API call starts
 * - doctorSignup/fulfilled: When the API call succeeds
 * - doctorSignup/rejected: When the API call fails
 */
export const doctorSignup = createAsyncThunk(
  'auth/doctorSignup', // Action type prefix
  async (signupData: DoctorSignupData, { rejectWithValue }) => {
    try {
      // Make the API call
      const response = await fetch(`${BASE_URL}${API_ENDPOINTS.auth.doctorSignup}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
      });

      // Parse the response
      const data = await response.json();

      // Check if the response is successful
      if (!response.ok) {
        // If not successful, reject with the error message
        return rejectWithValue(data.message || 'Signup failed');
      }

      // Return the data if successful
      return data;
    } catch (error: any) {
      // Catch any network or other errors
      return rejectWithValue(error.message || 'Network error occurred');
    }
  }
);

/**
 * ASYNC THUNK: doctorLogin
 *
 * This handles the login API call for doctors.
 * Similar to signup, it creates three action types:
 * - doctorLogin/pending: When login starts
 * - doctorLogin/fulfilled: When login succeeds
 * - doctorLogin/rejected: When login fails
 */
export const doctorLogin = createAsyncThunk(
  'auth/doctorLogin',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      // Make the POST request to login endpoint
      const response = await fetch(`${BASE_URL}${API_ENDPOINTS.auth.doctorLogin}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      // Parse the JSON response
      const data = await response.json();

      // Check if login was successful
      if (!response.ok) {
        return rejectWithValue(data.message || 'Login failed');
      }

      // Always save tokens to localStorage to keep user logged in
      // This allows the user to stay authenticated even after page reload
      saveTokensToLocalStorage(data.accessToken, data.refreshToken);

      // Return the response data (doctor info and tokens)
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Network error occurred');
    }
  }
);

/**
 * ASYNC THUNK: doctorForgotPassword
 *
 * This handles the forgot password API call.
 * Sends a password reset email to the user.
 * Creates three action types:
 * - doctorForgotPassword/pending: When request starts
 * - doctorForgotPassword/fulfilled: When email is sent successfully
 * - doctorForgotPassword/rejected: When request fails
 */
export const doctorForgotPassword = createAsyncThunk(
  'auth/doctorForgotPassword',
  async (data: ForgotPasswordData, { rejectWithValue }) => {
    try {
      // Make the POST request to forgot password endpoint
      const response = await fetch(`${BASE_URL}${API_ENDPOINTS.auth.doctorForgotPassword}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
        }),
      });

      // Parse the JSON response
      const responseData = await response.json();

      // Check if request was successful
      if (!response.ok) {
        return rejectWithValue(responseData.message || 'Failed to send reset email');
      }

      // Return the response data (typically just a success message)
      return responseData;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Network error occurred');
    }
  }
);

/**
 * ASYNC THUNK: doctorVerifyOtp
 *
 * This handles the OTP verification API call.
 * Verifies the OTP sent to user's email and returns a reset token.
 * Creates three action types:
 * - doctorVerifyOtp/pending: When verification starts
 * - doctorVerifyOtp/fulfilled: When OTP is verified successfully
 * - doctorVerifyOtp/rejected: When verification fails
 */
export const doctorVerifyOtp = createAsyncThunk(
  'auth/doctorVerifyOtp',
  async (data: VerifyOtpData, { rejectWithValue }) => {
    try {
      // Make the POST request to verify OTP endpoint
      const response = await fetch(`${BASE_URL}${API_ENDPOINTS.auth.doctorVerifyOtp}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          otp: data.otp,
        }),
      });

      // Parse the JSON response
      const responseData = await response.json();

      // Check if request was successful
      if (!response.ok) {
        return rejectWithValue(responseData.message || 'OTP verification failed');
      }

      // Return the response data (includes resetToken)
      return responseData;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Network error occurred');
    }
  }
);

/**
 * ASYNC THUNK: doctorResetPassword
 *
 * This handles the password reset API call.
 * Resets the user's password using the reset token from OTP verification.
 * Creates three action types:
 * - doctorResetPassword/pending: When reset starts
 * - doctorResetPassword/fulfilled: When password is reset successfully
 * - doctorResetPassword/rejected: When reset fails
 */
export const doctorResetPassword = createAsyncThunk(
  'auth/doctorResetPassword',
  async (data: ResetPasswordData, { rejectWithValue }) => {
    try {
      // Make the POST request to reset password endpoint
      const response = await fetch(`${BASE_URL}${API_ENDPOINTS.auth.doctorResetPassword}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: data.token,
          password: data.password,
        }),
      });

      // Parse the JSON response
      const responseData = await response.json();

      // Check if request was successful
      if (!response.ok) {
        return rejectWithValue(responseData.message || 'Password reset failed');
      }

      // Return the response data (success message)
      return responseData;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Network error occurred');
    }
  }
);

/**
 * AUTH SLICE
 *
 * This creates a Redux slice with reducers and actions.
 * A slice automatically generates action creators and action types
 * based on the reducers you define.
 */
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Regular synchronous actions
    resetAuthState: (state) => {
      state.isLoading = false;
      state.error = null;
      state.success = false;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isLoading = false;
      state.error = null;
      state.success = false;
      state.isAuthenticated = false;
      // Remove tokens from localStorage
      removeTokensFromLocalStorage();
    },
  },
  extraReducers: (builder) => {
    /**
     * EXTRA REDUCERS
     *
     * This section handles the async thunk actions.
     * We use the builder pattern to add cases for each state of the async action.
     */
    builder
      // ============ DOCTOR SIGNUP HANDLERS ============
      // When signup starts (API call in progress)
      .addCase(doctorSignup.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      // When signup succeeds
      .addCase(doctorSignup.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.success = true;
        state.user = action.payload.user;
        state.accessToken = action.payload.token;
        state.error = null;
      })
      // When signup fails
      .addCase(doctorSignup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.success = false;
      })

      // ============ DOCTOR LOGIN HANDLERS ============
      /**
       * LOGIN PENDING
       * Called when user clicks "Sign In" and API call starts
       */
      .addCase(doctorLogin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      /**
       * LOGIN FULFILLED
       * Called when login succeeds
       * We save the doctor data and tokens to Redux state
       */
      .addCase(doctorLogin.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.success = true;
        state.user = action.payload.doctor; // Note: API returns "doctor" not "user"
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isAuthenticated = true;
        state.error = null;
      })
      /**
       * LOGIN REJECTED
       * Called when login fails (wrong password, network error, etc.)
       */
      .addCase(doctorLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.success = false;
        state.isAuthenticated = false;
      })

      // ============ FORGOT PASSWORD HANDLERS ============
      /**
       * FORGOT PASSWORD PENDING
       * Called when user submits forgot password form
       */
      .addCase(doctorForgotPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      /**
       * FORGOT PASSWORD FULFILLED
       * Called when password reset email is sent successfully
       */
      .addCase(doctorForgotPassword.fulfilled, (state) => {
        state.isLoading = false;
        state.success = true;
        state.error = null;
      })
      /**
       * FORGOT PASSWORD REJECTED
       * Called when request fails (email not found, network error, etc.)
       */
      .addCase(doctorForgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.success = false;
      })

      // ============ VERIFY OTP HANDLERS ============
      /**
       * VERIFY OTP PENDING
       * Called when user submits OTP verification form
       */
      .addCase(doctorVerifyOtp.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      /**
       * VERIFY OTP FULFILLED
       * Called when OTP is verified successfully
       * We save the resetToken from the response to use in password reset
       */
      .addCase(doctorVerifyOtp.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.success = true;
        state.resetToken = action.payload.resetToken; // Save the reset token
        state.error = null;
      })
      /**
       * VERIFY OTP REJECTED
       * Called when OTP verification fails (invalid OTP, expired, etc.)
       */
      .addCase(doctorVerifyOtp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.success = false;
      })

      // ============ RESET PASSWORD HANDLERS ============
      /**
       * RESET PASSWORD PENDING
       * Called when user submits new password
       */
      .addCase(doctorResetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      /**
       * RESET PASSWORD FULFILLED
       * Called when password is reset successfully
       * We clear the resetToken after successful password reset
       */
      .addCase(doctorResetPassword.fulfilled, (state) => {
        state.isLoading = false;
        state.success = true;
        state.resetToken = null; // Clear the reset token
        state.error = null;
      })
      /**
       * RESET PASSWORD REJECTED
       * Called when password reset fails (invalid token, network error, etc.)
       */
      .addCase(doctorResetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

// Export the actions
export const { resetAuthState, logout } = authSlice.actions;

// Export the reducer
export default authSlice.reducer;
