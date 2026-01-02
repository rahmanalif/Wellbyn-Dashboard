# Redux Integration Guide - Doctor Signup Feature

This guide explains how Redux was integrated into your create account page to handle the doctor signup API call.

## 📁 File Structure

```
src/
├── lib/
│   ├── api.ts                          # API configuration and endpoints
│   └── store/
│       ├── store.ts                    # Redux store configuration
│       ├── hooks.ts                    # Custom typed Redux hooks
│       └── slices/
│           └── authSlice.ts            # Authentication slice with signup logic
├── components/
│   └── providers/
│       └── ReduxProvider.tsx           # Redux Provider wrapper component
└── app/
    ├── layout.tsx                      # Root layout (wrapped with ReduxProvider)
    └── (auth)/
        └── create-account/
            └── page.tsx                # Create account page (uses Redux)
```

## 🔍 What is Redux?

Redux is a **state management library** that helps you manage and centralize application state. Think of it as a global storage container that any component in your app can access.

### Why use Redux?
- **Centralized State**: All your app's data lives in one place
- **Predictable**: State changes follow strict patterns
- **Debuggable**: Time-travel debugging with Redux DevTools
- **Scalable**: Easy to manage complex state as your app grows

## 🏗️ Redux Architecture

Redux follows a **unidirectional data flow**:

```
Component → Action → Reducer → Store → Component
```

### Key Concepts:

1. **Store**: The single source of truth for your app's state
2. **Action**: An object describing what happened (e.g., "user clicked signup")
3. **Reducer**: A function that determines how the state changes based on actions
4. **Dispatch**: A function to send actions to the store

## 📝 What We Built - Step by Step

### 1. API Configuration (`src/lib/api.ts`)

```typescript
export const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const API_ENDPOINTS = {
  auth: {
    doctorSignup: '/api/auth/doctor/signup',
  },
};
```

**Purpose**: Centralize API URLs so you can change them in one place.

---

### 2. Auth Slice (`src/lib/store/slices/authSlice.ts`)

This is the heart of our Redux integration. It contains:

#### a) TypeScript Interfaces
```typescript
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
```
**Purpose**: Define the shape of our signup data for type safety.

#### b) Initial State
```typescript
const initialState: AuthState = {
  user: null,           // Stores user data after signup
  token: null,          // Stores authentication token
  isLoading: false,     // Tracks if API call is in progress
  error: null,          // Stores error messages
  success: false,       // Indicates successful signup
};
```
**Purpose**: Define the default state before any actions occur.

#### c) Async Thunk (doctorSignup)
```typescript
export const doctorSignup = createAsyncThunk(
  'auth/doctorSignup',
  async (signupData: DoctorSignupData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}${API_ENDPOINTS.auth.doctorSignup}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signupData),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || 'Signup failed');
      }

      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Network error occurred');
    }
  }
);
```

**What is an Async Thunk?**
- An async thunk is a special Redux function for handling asynchronous operations (like API calls)
- It automatically creates 3 action types:
  - `doctorSignup/pending` - When API call starts
  - `doctorSignup/fulfilled` - When API call succeeds
  - `doctorSignup/rejected` - When API call fails

**How it works:**
1. You call `dispatch(doctorSignup(formData))` from your component
2. Redux automatically dispatches `doctorSignup/pending`
3. The API call is made
4. If successful, Redux dispatches `doctorSignup/fulfilled` with the response data
5. If failed, Redux dispatches `doctorSignup/rejected` with the error

#### d) Slice Creation
```typescript
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.isLoading = false;
      state.error = null;
      state.success = false;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(doctorSignup.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(doctorSignup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(doctorSignup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});
```

**What is a Slice?**
- A slice is a collection of Redux logic for a specific feature
- It includes: state, reducers, and actions

**Reducers vs Extra Reducers:**
- `reducers`: Synchronous actions (instant state changes)
- `extraReducers`: Handles external actions like async thunks

---

### 3. Store Configuration (`src/lib/store/store.ts`)

```typescript
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
```

**Purpose**: Create the Redux store and combine all reducers.

**What it does:**
- Sets up Redux DevTools (for debugging in browser)
- Enables Redux Thunk middleware (for async actions)
- Combines all your slices into one store

**State Structure:**
```javascript
{
  auth: {
    user: null,
    token: null,
    isLoading: false,
    error: null,
    success: false
  }
}
```

---

### 4. Custom Hooks (`src/lib/store/hooks.ts`)

```typescript
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

**Purpose**: Provide type-safe versions of Redux hooks.

**Why custom hooks?**
- Better TypeScript autocomplete
- Catch type errors at compile time
- Cleaner code in components

---

### 5. Redux Provider (`src/components/providers/ReduxProvider.tsx`)

```typescript
export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
```

**Purpose**: Make the Redux store available to all components.

**Why "use client"?**
- Redux needs client-side JavaScript
- In Next.js 13+, components are server-side by default
- "use client" marks this as a client component

---

### 6. Layout Update (`src/app/layout.tsx`)

```typescript
<ReduxProvider>{children}</ReduxProvider>
```

**Purpose**: Wrap the entire app with Redux so all pages can access the store.

---

### 7. Component Integration (`src/app/(auth)/create-account/page.tsx`)

#### Import Redux Hooks and Actions
```typescript
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { doctorSignup, resetAuthState } from "@/lib/store/slices/authSlice";
```

#### Get Dispatch and State
```typescript
const dispatch = useAppDispatch();
const { isLoading, error, success } = useAppSelector((state) => state.auth);
```

**What's happening:**
- `useAppDispatch()`: Gets the function to send actions to Redux
- `useAppSelector()`: Reads data from Redux store
- We're extracting `isLoading`, `error`, and `success` from `state.auth`

#### Handle Success
```typescript
useEffect(() => {
  if (success) {
    router.push(`/verify-code?flow=create-account&email=${formData.email}`);
    dispatch(resetAuthState());
  }
}, [success, router, formData.email, selectedRole, dispatch]);
```

**Purpose**: When signup succeeds, redirect to verification page.

#### Submit Handler
```typescript
const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();

  if (validateForm()) {
    const signupData = {
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
      mobile: formData.mobile,
      discipline: formData.discipline,
      clinicName: formData.clinicName,
      officeLocation: formData.officeLocation.filter((loc) => loc.trim() !== ""),
      googleMapUrl: formData.googleMapUrl.filter((url) => url.trim() !== ""),
      popularReasonsToVisit: formData.popularReasonsToVisit.filter((reason) => reason.trim() !== ""),
      qualifications: formData.qualifications.filter(
        (qual) => qual.degree.trim() !== "" && qual.university.trim() !== ""
      ),
    };

    dispatch(doctorSignup(signupData));
  }
};
```

**Flow:**
1. User clicks submit button
2. Form is validated
3. Empty array items are filtered out
4. `dispatch(doctorSignup(signupData))` is called
5. Redux:
   - Sets `isLoading = true`
   - Makes API call to `/api/auth/doctor/signup`
   - On success: Sets `success = true`, stores user data
   - On error: Sets `error = "error message"`
6. Component automatically re-renders with new state
7. If successful, useEffect redirects to verify page

#### Display Loading and Errors
```typescript
{error && (
  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
    <p className="text-sm font-medium">{error}</p>
  </div>
)}

<Button disabled={!isFormValid}>
  {isLoading ? "Processing..." : "Next"}
</Button>
```

---

## 🔄 Complete Data Flow Example

Let's trace what happens when a user signs up:

1. **User fills form and clicks "Next"**
   ```
   User Input → handleSubmit()
   ```

2. **Form is validated and data is prepared**
   ```javascript
   const signupData = { fullName: "John", email: "john@example.com", ... }
   ```

3. **Redux action is dispatched**
   ```javascript
   dispatch(doctorSignup(signupData))
   ```

4. **Redux sets loading state**
   ```javascript
   // doctorSignup.pending is automatically called
   state.isLoading = true
   state.error = null
   state.success = false
   ```

5. **Component re-renders**
   ```jsx
   // Button now shows "Processing..."
   {isLoading ? "Processing..." : "Next"}
   ```

6. **API call is made**
   ```javascript
   fetch('http://localhost:3000/api/auth/doctor/signup', {
     method: 'POST',
     body: JSON.stringify(signupData)
   })
   ```

7. **API responds successfully**
   ```javascript
   // doctorSignup.fulfilled is automatically called
   state.isLoading = false
   state.success = true
   state.user = responseData.user
   state.token = responseData.token
   ```

8. **useEffect detects success**
   ```javascript
   useEffect(() => {
     if (success) {
       router.push('/verify-code')
       dispatch(resetAuthState())
     }
   }, [success])
   ```

9. **User is redirected to verification page**

### If API fails:

7. **API responds with error**
   ```javascript
   // doctorSignup.rejected is automatically called
   state.isLoading = false
   state.error = "Email already exists"
   state.success = false
   ```

8. **Component shows error message**
   ```jsx
   {error && (
     <div className="bg-red-50">
       <p>{error}</p> {/* Shows: "Email already exists" */}
     </div>
   )}
   ```

---

## 🎯 Key Takeaways

### What Redux Does:
1. **Manages API state** (loading, error, success)
2. **Stores user data** after successful signup
3. **Makes state accessible** to any component
4. **Handles async operations** cleanly

### Benefits:
- ✅ No prop drilling (passing data through many components)
- ✅ Centralized error handling
- ✅ Easy to debug with Redux DevTools
- ✅ Reusable across components
- ✅ Type-safe with TypeScript

### The Flow in Simple Terms:
```
Component → Dispatch Action → Reducer Updates State → Component Re-renders
```

---

## 🧪 Testing Your Integration

1. **Install Redux DevTools** browser extension
2. **Run your app**: `npm run dev`
3. **Open DevTools** and go to Redux tab
4. **Fill the signup form** and click submit
5. **Watch the Redux actions**:
   - You'll see `auth/doctorSignup/pending`
   - Then either `auth/doctorSignup/fulfilled` or `auth/doctorSignup/rejected`
6. **Inspect the state** changes in real-time

---

## 🚀 Next Steps

To extend this:

1. **Add patient signup**: Create similar thunk in authSlice
2. **Add login**: Create `loginUser` thunk
3. **Persist auth**: Save token to localStorage
4. **Protected routes**: Check auth state before rendering pages
5. **Add more slices**: Create slices for doctors, appointments, etc.

---

## 📚 Additional Resources

- [Redux Toolkit Docs](https://redux-toolkit.js.org/)
- [Redux DevTools](https://github.com/reduxjs/redux-devtools)
- [createAsyncThunk](https://redux-toolkit.js.org/api/createAsyncThunk)

---

**Remember**: Redux might seem complex at first, but it follows a simple pattern. Every feature follows the same flow: Create slice → Configure store → Use in components. Once you understand this pattern, it becomes second nature!
