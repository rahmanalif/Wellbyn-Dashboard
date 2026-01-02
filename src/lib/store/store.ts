import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import { doctorsApi } from './services/doctorsApi';
import { patientsApi } from './services/patientsApi';

/**
 * MAKE STORE FUNCTION
 *
 * Creates a new Redux store instance.
 * This is called once per client session to ensure proper hydration.
 */
export const makeStore = () => {
  return configureStore({
    reducer: {
      // Add your reducers here
      // Each key will become a slice of the state
      auth: authReducer,

      // RTK Query API reducers
      [doctorsApi.reducerPath]: doctorsApi.reducer,
      [patientsApi.reducerPath]: patientsApi.reducer,

      // You can add more slices here as your app grows
      // For example:
      // user: userReducer,
      // posts: postsReducer,
    },

    /**
     * ADD RTK QUERY MIDDLEWARE
     *
     * This enables:
     * - Caching
     * - Invalidation
     * - Polling
     * - Auto-refetching
     */
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(doctorsApi.middleware, patientsApi.middleware),
  });
};

/**
 * TypeScript types for the store
 */
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
