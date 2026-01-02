# Redux Login Integration Guide - Complete Tutorial

This guide explains how Redux was integrated for the doctor login feature and teaches you the concepts behind it.

## 📋 Table of Contents
1. [What We Built](#what-we-built)
2. [File Changes Overview](#file-changes-overview)
3. [Understanding Each Part](#understanding-each-part)
4. [Complete Data Flow](#complete-data-flow)
5. [Key Concepts Explained](#key-concepts-explained)
6. [Testing Your Integration](#testing-your-integration)

---

## 🎯 What We Built

We integrated a **login system** that:
- ✅ Sends email & password to API
- ✅ Receives doctor data and tokens
- ✅ Saves tokens to localStorage (optional "Remember Me")
- ✅ Manages loading and error states
- ✅ Redirects to dashboard on success
- ✅ Keeps user logged in across browser sessions

---

## 📁 File Changes Overview

### Files Modified:
1. ✏️ `src/lib/store/slices/authSlice.ts` - Added login logic
2. ✏️ `src/lib/api.ts` - Added login endpoint
3. ✏️ `src/app/(auth)/login/page.tsx` - Integrated Redux

### What Each File Does:
```
authSlice.ts    → Handles login API call and state management
api.ts          → Defines API endpoints
login/page.tsx  → Login form that uses Redux
```

---

## 🔍 Understanding Each Part

### Part 1: TypeScript Interfaces (authSlice.ts)

```typescript
export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}
```

**What is this?**
- A **type definition** that describes the shape of login data
- The `?` means `rememberMe` is optional

**Why do we need it?**
- TypeScript will check that we're sending the right data
- Prevents bugs like forgetting to include email or misspelling field names

```typescript
export interface Doctor {
  _id: string;
  fullName: string;
  email: string;
  mobile: string;
  discipline: string;
  profilePicture?: string;
  clinicName: string;
  // ... more fields
}
```

**What is this?**
- Describes the structure of doctor data we get from API

**Why?**
- When we access `user.fullName`, TypeScript knows it exists
- Auto-complete works in your editor
- Catches typos like `user.fulName` (missing 'l')

---

### Part 2: Updated State Interface

```typescript
export interface AuthState {
  user: Doctor | null;           // Doctor data or null if not logged in
  accessToken: string | null;    // Short-lived token for API requests
  refreshToken: string | null;   // Long-lived token to get new accessToken
  isLoading: boolean;            // True when API call is in progress
  error: string | null;          // Error message if login fails
  success: boolean;              // True when login succeeds
  isAuthenticated: boolean;      // True if user is logged in
}
```

**Key Changes from Signup:**
- Changed `token` → `accessToken` and added `refreshToken`
- Added `isAuthenticated` flag
- Changed `user: any` → `user: Doctor` for better type safety

**Why two tokens?**
- **accessToken**: Used for API requests, expires quickly (15 mins)
- **refreshToken**: Used to get new accessToken, expires slowly (7 days)

---

### Part 3: LocalStorage Helpers (authSlice.ts)

```typescript
const saveTokensToLocalStorage = (accessToken: string, refreshToken: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }
};
```

**What is localStorage?**
- Browser storage that persists even after closing the browser
- Like a small database in your browser

**Why check `typeof window !== 'undefined'`?**
- In Next.js, some code runs on the server (which has no `window`)
- This check ensures we only access localStorage in the browser

**Flow:**
```
User logs in → Save tokens to localStorage → User closes browser
→ User reopens browser → Tokens still exist → User stays logged in
```

```typescript
const loadTokensFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    return {
      accessToken: localStorage.getItem('accessToken'),
      refreshToken: localStorage.getItem('refreshToken'),
    };
  }
  return { accessToken: null, refreshToken: null };
};
```

**When is this called?**
- When the app first loads
- Checks if user was previously logged in

```typescript
const removeTokensFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
};
```

**When is this used?**
- When user logs out
- Clears all authentication data

---

### Part 4: Initial State with Persistence

```typescript
// Load tokens from localStorage on app start
const { accessToken, refreshToken } = loadTokensFromLocalStorage();

const initialState: AuthState = {
  user: null,
  accessToken: accessToken,           // Restored from localStorage
  refreshToken: refreshToken,         // Restored from localStorage
  isLoading: false,
  error: null,
  success: false,
  isAuthenticated: !!accessToken,     // true if token exists
};
```

**What does `!!accessToken` mean?**
- First `!`: Converts to boolean and inverts (null → true, "token" → false)
- Second `!`: Inverts again (true → false, false → true)
- Result: `null` or `undefined` → `false`, any string → `true`

**Example:**
```javascript
!!null        → false
!!undefined   → false
!!""          → false
!!"abc123"    → true
```

---

### Part 5: Login Async Thunk

```typescript
export const doctorLogin = createAsyncThunk(
  'auth/doctorLogin',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
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

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || 'Login failed');
      }

      // Save tokens if "Remember Me" is checked
      if (credentials.rememberMe) {
        saveTokensToLocalStorage(data.accessToken, data.refreshToken);
      }

      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Network error occurred');
    }
  }
);
```

**Step-by-Step Breakdown:**

1. **Function signature:**
   ```typescript
   async (credentials: LoginCredentials, { rejectWithValue })
   ```
   - Takes login credentials as input
   - `rejectWithValue`: Redux function to return errors

2. **Making the API call:**
   ```typescript
   const response = await fetch(url, {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ email, password }),
   });
   ```
   - `await`: Wait for API response before continuing
   - `JSON.stringify()`: Convert JavaScript object to JSON string

3. **Parsing response:**
   ```typescript
   const data = await response.json();
   ```
   - Converts JSON string response to JavaScript object

4. **Error handling:**
   ```typescript
   if (!response.ok) {
     return rejectWithValue(data.message || 'Login failed');
   }
   ```
   - `response.ok`: true for status 200-299, false otherwise
   - If error, triggers `doctorLogin.rejected` action

5. **Conditional token saving:**
   ```typescript
   if (credentials.rememberMe) {
     saveTokensToLocalStorage(data.accessToken, data.refreshToken);
   }
   ```
   - Only saves to localStorage if user checked "Remember Me"

6. **Return success:**
   ```typescript
   return data;
   ```
   - Triggers `doctorLogin.fulfilled` action with this data

---

### Part 6: Extra Reducers - Login Handlers

```typescript
.addCase(doctorLogin.pending, (state) => {
  state.isLoading = true;
  state.error = null;
  state.success = false;
})
```

**When is this called?**
- Immediately when `dispatch(doctorLogin(...))` is called
- Before API request completes

**What happens?**
- Button shows "Loading..." spinner
- Error message (if any) is cleared
- Form is disabled

```typescript
.addCase(doctorLogin.fulfilled, (state, action: PayloadAction<any>) => {
  state.isLoading = false;
  state.success = true;
  state.user = action.payload.doctor;
  state.accessToken = action.payload.accessToken;
  state.refreshToken = action.payload.refreshToken;
  state.isAuthenticated = true;
  state.error = null;
})
```

**When is this called?**
- When API returns success (status 200-299)

**What is `action.payload`?**
- The data returned from the async thunk
- In our case: `{ doctor: {...}, accessToken: "...", refreshToken: "..." }`

**Why `action.payload.doctor` not `action.payload.user`?**
- The API response has this structure:
  ```json
  {
    "doctor": { ... },
    "accessToken": "...",
    "refreshToken": "..."
  }
  ```
- We access it exactly as the API sends it

```typescript
.addCase(doctorLogin.rejected, (state, action) => {
  state.isLoading = false;
  state.error = action.payload as string;
  state.success = false;
  state.isAuthenticated = false;
})
```

**When is this called?**
- When API returns error (status 400+)
- When network error occurs
- When `rejectWithValue()` is called

**What is `action.payload` here?**
- The error message we passed to `rejectWithValue()`

---

### Part 7: Updated Logout Action

```typescript
logout: (state) => {
  state.user = null;
  state.accessToken = null;
  state.refreshToken = null;
  state.isLoading = false;
  state.error = null;
  state.success = false;
  state.isAuthenticated = false;
  removeTokensFromLocalStorage();
}
```

**What changed?**
- Added `removeTokensFromLocalStorage()`
- Clear both `accessToken` and `refreshToken`
- Set `isAuthenticated` to false

---

### Part 8: Login Page Integration

```typescript
const dispatch = useAppDispatch();
const { isLoading, error, success, isAuthenticated, user } = useAppSelector(
  (state) => state.auth
);
```

**What's happening?**
- `useAppDispatch()`: Get function to send actions
- `useAppSelector()`: Read data from Redux store

**Destructuring:**
```typescript
const { isLoading, error } = useAppSelector((state) => state.auth);
```
This is equivalent to:
```typescript
const authState = useAppSelector((state) => state.auth);
const isLoading = authState.isLoading;
const error = authState.error;
```

---

### Part 9: Success Handler (useEffect)

```typescript
useEffect(() => {
  if (success && isAuthenticated) {
    dispatch(resetAuthState());
    router.push("/dashboard");
  }
}, [success, isAuthenticated, router, dispatch]);
```

**How useEffect works:**
1. **Function**: The code inside `useEffect(() => { ... })`
2. **Dependencies**: The array `[success, isAuthenticated, router, dispatch]`
3. **When it runs**: When any dependency changes

**Step by step:**
```
1. User enters email/password
2. Clicks "Sign In"
3. doctorLogin.pending → isLoading = true
4. API call happens
5. doctorLogin.fulfilled → success = true, isAuthenticated = true
6. useEffect detects success changed to true
7. Runs the redirect code
8. User goes to dashboard
```

**Why reset state?**
```typescript
dispatch(resetAuthState());
```
- Clears `success` flag
- Prevents redirect from happening again if user navigates back

---

### Part 10: Submit Handler

```typescript
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  if (validateForm()) {
    dispatch(
      doctorLogin({
        email: formData.email,
        password: formData.password,
        rememberMe: formData.rememberMe,
      })
    );
  }
};
```

**What is `e.preventDefault()`?**
- Stops the form from doing its default action (page refresh)
- Without it, the page would reload and lose all state

**Flow:**
```
Form submit → Prevent reload → Validate → Dispatch action → Redux takes over
```

---

### Part 11: Error Display in UI

```tsx
{error && (
  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
    <p className="text-sm font-medium">{error}</p>
  </div>
)}
```

**How this works:**
- `error &&`: Only render if error exists
- If `error` is `null` or `""`, nothing shows
- If `error` is `"Invalid password"`, the div appears

**JavaScript truthy/falsy:**
```javascript
null && <div>Hello</div>        → null (nothing rendered)
"Error!" && <div>Hello</div>    → <div>Hello</div> (rendered)
```

---

### Part 12: Button Loading State

```tsx
<Button
  loading={isLoading}
  disabled={isLoading || !formData.email || !formData.password}
>
  Sign In
</Button>
```

**What's happening:**
- `loading={isLoading}`: Shows spinner when true
- `disabled={...}`: Prevents clicks when:
  - Login is in progress (`isLoading`)
  - Email is empty (`!formData.email`)
  - Password is empty (`!formData.password`)

---

## 🔄 Complete Data Flow

Let's trace a complete login from start to finish:

### **Scenario: User logs in with email and password**

#### Step 1: User fills form and clicks "Sign In"
```
UI State:
- formData = { email: "john@example.com", password: "pass123", rememberMe: true }
- isLoading = false
- error = null
```

#### Step 2: Form submits
```javascript
handleSubmit(e) {
  e.preventDefault();              // Don't reload page
  if (validateForm()) {            // Check email and password format
    dispatch(doctorLogin({...}));  // Send action to Redux
  }
}
```

#### Step 3: Redux receives action
```
Action dispatched: doctorLogin({ email, password, rememberMe })
```

#### Step 4: doctorLogin.pending fires
```javascript
State changes:
- isLoading: false → true
- error: null
- success: false
```

UI updates:
```tsx
<Button loading={true}>  {/* Shows spinner */}
  Sign In
</Button>
```

#### Step 5: API call happens
```javascript
fetch('https://wellbyn.grassroots-bd.com/api/auth/doctor/login', {
  method: 'POST',
  body: JSON.stringify({ email, password })
})
```

#### Step 6: Server processes request
```
Server checks:
1. Does email exist? ✓
2. Is password correct? ✓
3. Generate tokens
4. Return response
```

#### Step 7: Server responds with success
```json
{
  "doctor": {
    "_id": "6940738cb0de1851e2b73c0d",
    "fullName": "Mahmudur Rahman Alif",
    "email": "rahman.alif.007@gmail.com",
    ...
  },
  "accessToken": "eyJhbGciOiJI...",
  "refreshToken": "eyJhbGciOiJI..."
}
```

#### Step 8: doctorLogin.fulfilled fires
```javascript
State changes:
- isLoading: true → false
- success: false → true
- user: null → { _id: "...", fullName: "...", ... }
- accessToken: null → "eyJhbGciOiJI..."
- refreshToken: null → "eyJhbGciOiJI..."
- isAuthenticated: false → true
- error: null

Side effect (because rememberMe = true):
localStorage.setItem('accessToken', "eyJhbGciOiJI...")
localStorage.setItem('refreshToken', "eyJhbGciOiJI...")
```

#### Step 9: useEffect detects success
```javascript
useEffect(() => {
  if (success && isAuthenticated) {  // Both are true now!
    dispatch(resetAuthState());      // Clear success flag
    router.push("/dashboard");       // Navigate away
  }
}, [success, isAuthenticated, ...]);
```

#### Step 10: User is on dashboard
```
URL changes: /login → /dashboard
User can see their data: user.fullName
All protected routes work because isAuthenticated = true
```

---

### **Scenario: Login fails (wrong password)**

Steps 1-5 are the same...

#### Step 6: Server responds with error
```json
{
  "message": "Invalid password",
  "status": 401
}
```

#### Step 7: doctorLogin.rejected fires
```javascript
State changes:
- isLoading: true → false
- error: null → "Invalid password"
- success: false
- isAuthenticated: false
```

#### Step 8: UI shows error
```tsx
{error && (  // error = "Invalid password", so this renders
  <div className="bg-red-50...">
    <p>{error}</p>  {/* Shows: "Invalid password" */}
  </div>
)}
```

#### Step 9: User sees error message
```
Button stops loading
Error message appears in red box
Form stays on login page
User can try again
```

---

## 🎓 Key Concepts Explained

### 1. What is an Async Thunk?

**Simple explanation:**
- A function that does something asynchronous (like an API call)
- Automatically manages loading/success/error states

**Without async thunk (the hard way):**
```javascript
const login = () => {
  dispatch(setLoading(true));
  fetch('/api/login')
    .then(data => dispatch(setUser(data)))
    .catch(error => dispatch(setError(error)))
    .finally(() => dispatch(setLoading(false)));
};
```

**With async thunk (the easy way):**
```javascript
const login = createAsyncThunk('login', async (credentials) => {
  const response = await fetch('/api/login', { body: credentials });
  return response.json();
});
// Redux handles pending/fulfilled/rejected automatically!
```

---

### 2. What is State Management?

**Without Redux:**
```
LoginPage has: user, isLoading, error
DashboardPage needs: user  ← How to share?
ProfilePage needs: user    ← How to share?
```

**Solution 1: Prop drilling (bad)**
```tsx
<App>
  <LoginPage user={user} setUser={setUser} />
  <Dashboard user={user}>
    <Profile user={user}>
      <Settings user={user} />  ← Passing through many levels!
    </Profile>
  </Dashboard>
</App>
```

**Solution 2: Redux (good)**
```tsx
// Any component can access user:
const user = useAppSelector((state) => state.auth.user);
// No prop passing needed!
```

---

### 3. What is localStorage?

**Demo:**
```javascript
// Save
localStorage.setItem('name', 'John');

// Read
const name = localStorage.getItem('name');  // "John"

// Delete
localStorage.removeItem('name');

// Close browser and reopen
const name = localStorage.getItem('name');  // Still "John"!
```

**Limitations:**
- Only stores strings (use `JSON.stringify` for objects)
- ~5-10MB limit per domain
- Not secure (anyone with browser access can read it)
- Don't store sensitive data unencrypted

---

### 4. Why Two Tokens (Access + Refresh)?

**Security pattern:**

**Access Token:**
- Short-lived (15 minutes)
- Used for every API request
- If stolen, attacker has limited time

**Refresh Token:**
- Long-lived (7 days)
- Only used to get new access tokens
- Stored more securely

**Flow:**
```
1. Login → Get both tokens
2. API request → Use access token
3. Access token expires → Use refresh token to get new access token
4. Continue making requests with new access token
5. Refresh token expires → User must log in again
```

---

### 5. What is `useEffect`?

**Think of it as:**
"Do something when something changes"

```typescript
useEffect(() => {
  // Code to run
}, [dependencies]);
```

**Examples:**

```javascript
// Run when component mounts (only once)
useEffect(() => {
  console.log("Component loaded!");
}, []);

// Run when count changes
useEffect(() => {
  console.log("Count changed to:", count);
}, [count]);

// Run when success or error changes
useEffect(() => {
  if (success) router.push("/dashboard");
}, [success]);
```

---

## 🧪 Testing Your Integration

### 1. Install Redux DevTools
- Chrome: [Redux DevTools Extension](https://chrome.google.com/webstore/detail/redux-devtools)
- Firefox: [Redux DevTools Extension](https://addons.mozilla.org/en-US/firefox/addon/reduxdevtools/)

### 2. Test Successful Login

1. **Open DevTools** (F12) → Redux tab
2. **Fill login form:**
   - Email: `rahman.alif.007@gmail.com`
   - Password: `password1234`
3. **Click "Sign In"**
4. **Watch Redux actions:**
   ```
   ⚡ auth/doctorLogin/pending
   ⚡ auth/doctorLogin/fulfilled
   ⚡ auth/resetAuthState
   ```
5. **Check State tab:**
   ```javascript
   {
     auth: {
       user: { fullName: "Mahmudur Rahman Alif", ... },
       accessToken: "eyJhbG...",
       refreshToken: "eyJhbG...",
       isAuthenticated: true
     }
   }
   ```

### 3. Test Failed Login

1. **Enter wrong password**
2. **Watch actions:**
   ```
   ⚡ auth/doctorLogin/pending
   ⚡ auth/doctorLogin/rejected
   ```
3. **Check State:**
   ```javascript
   {
     auth: {
       error: "Invalid password",
       isAuthenticated: false
     }
   }
   ```
4. **See error on page:** Red box with error message

### 4. Test "Remember Me"

1. **Login with "Remember Me" checked**
2. **Open DevTools** → Application tab → Local Storage
3. **See:**
   ```
   accessToken: "eyJhbG..."
   refreshToken: "eyJhbG..."
   ```
4. **Close browser completely**
5. **Reopen and check Application tab**
6. **Tokens still there!**

### 5. Test Logout

```javascript
// In browser console:
import { store } from './lib/store/store';
store.dispatch({ type: 'auth/logout' });
```

Check:
- localStorage is cleared
- Redux state is reset
- User is logged out

---

## 📚 Summary: What You Learned

### Redux Concepts:
- ✅ **Async Thunks**: Handle API calls with automatic loading states
- ✅ **Actions**: Events that describe what happened
- ✅ **Reducers**: Functions that update state based on actions
- ✅ **State**: Central data store for your app
- ✅ **Selectors**: Functions to read data from state

### React Concepts:
- ✅ **useEffect**: Run code when dependencies change
- ✅ **useState**: Local component state
- ✅ **Custom Hooks**: Reusable logic (useAppDispatch, useAppSelector)

### Web Concepts:
- ✅ **localStorage**: Browser storage that persists
- ✅ **Tokens**: Authentication credentials
- ✅ **API calls**: Communicate with backend
- ✅ **HTTP methods**: POST for sending data

### Best Practices:
- ✅ **Type Safety**: Use TypeScript interfaces
- ✅ **Error Handling**: Display errors to users
- ✅ **Loading States**: Show feedback during operations
- ✅ **Security**: Don't store sensitive data in plain localStorage

---

## 🚀 Next Steps

### Extend This:
1. **Add token refresh logic**
2. **Implement protected routes**
3. **Add patient login**
4. **Add "Forgot Password" flow**
5. **Persist user data** (not just tokens)

### Practice:
1. Add a "Show user info" button on dashboard
2. Create a logout button
3. Add form validation for email format
4. Show different errors for different failure types

---

**Congratulations!** 🎉 You now understand how Redux manages authentication in a real application!
