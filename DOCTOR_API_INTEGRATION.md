# Doctor API Redux Integration

## Overview
The doctor creation API has been successfully integrated using Redux Toolkit Query (RTK Query).

## API Endpoint
```
POST https://wellbyn.grassroots-bd.com/api/auth/doctor/add-doctor
```

## Files Modified

### 1. Redux API Service
**File:** [src/lib/store/services/doctorsApi.ts](src/lib/store/services/doctorsApi.ts)

**What it does:**
- Defines the `addDoctor` mutation endpoint
- Handles automatic caching and state management
- Automatically includes Authorization header from auth state
- Invalidates the doctors list cache after adding a new doctor

**Request Interface:**
```typescript
export interface QualificationData {
  degree: string;
  university?: string;
}

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
```

**Response Interface:**
```typescript
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
```

### 2. Doctor Form Component
**File:** [src/app/(home)/doctor/new/page.tsx](src/app/(home)/doctor/new/page.tsx)

**What it does:**
- Uses the `useAddDoctorMutation` hook from RTK Query
- Collects form data and submits it as JSON
- Shows loading state while submitting
- Displays success/error messages
- Resets form after successful submission

**Key Code:**
```typescript
const [addDoctor, { isLoading: isAddingDoctor }] = useAddDoctorMutation();

const handleSaveDoctor = async () => {
  const doctorData: AddDoctorRequest = {
    fullName: name,
    email: email,
    mobile: phone,
    discipline: disciplines,
    clinicName: clinicName,
    officeLocation: location.split('\n').filter(l => l.trim()),
    googleMapUrl: [...], // Auto-generated from locations
    popularReasonsToVisit: visitReason.split(',').map(r => r.trim()),
    qualifications: qualifications.map(qual => qual.degree),
  };

  const response = await addDoctor(doctorData).unwrap();
  // Handle success
};
```

## How It Works

1. **User fills out the form** with doctor details
2. **User clicks "Add Doctor" button** - triggers `handleSaveDoctor()`
3. **Form data is formatted** into the API request structure
4. **RTK Query mutation is called** - `addDoctor(doctorData)`
5. **API request is sent** with Authorization header automatically included
6. **Response is received** and the form shows success/error
7. **Doctors list cache is invalidated** - triggers automatic refetch on doctor list pages

## Benefits of Redux Integration

✅ **Automatic caching** - No duplicate requests
✅ **Loading states** - Built-in `isLoading` flag
✅ **Error handling** - Structured error responses
✅ **Type safety** - Full TypeScript support
✅ **Auto-refetching** - Doctors list updates automatically after adding
✅ **Auth headers** - Automatically includes JWT token
✅ **Optimistic updates** - Can be configured for instant UI updates

## Example Request/Response

### Request Body:
```json
{
  "fullName": "Dr. Jane Smith",
  "email": "jane.smith@example.com",
  "mobile": "1234567890",
  "discipline": "Cardiology",
  "clinicName": "Heart Care Clinic",
  "officeLocation": ["123 Main St, Anytown, USA"],
  "googleMapUrl": ["https://maps.google.com/?q=123+Main+St"],
  "popularReasonsToVisit": ["Chest pain", "High blood pressure"],
  "qualifications": [
    { "degree": "MD", "university": "Harvard Medical School" },
    { "degree": "FACC" }
  ]
}
```

### Response:
```json
{
  "_id": "68dd8f2e5c11d67de6827707",
  "fullName": "Dr. Jane Smith",
  "email": "jane.smith@example.com",
  "mobile": "1234567890",
  "discipline": "Cardiology",
  "clinicName": "Heart Care Clinic",
  "officeLocation": ["123 Main St, Anytown, USA"],
  "googleMapUrl": ["https://maps.google.com/?q=123+Main+St"],
  "popularReasonsToVisit": ["Chest pain", "High blood pressure"],
  "qualifications": [
    { "degree": "MD", "university": "Harvard Medical School" },
    { "degree": "FACC" }
  ],
  "role": "doctor",
  "createdBy": "68dd65cc333e5f98a8fbafdf",
  "createdAt": "2025-10-01T20:29:34.457Z",
  "updatedAt": "2025-10-01T20:29:34.457Z",
  "__v": 0
}
```

## Testing

To test the integration:
1. Navigate to `/doctor/new`
2. Fill out the form
3. Click "Add Doctor"
4. Check console for request/response logs
5. Verify success message appears
6. Check that the form resets after success

## Notes

- The `popularReasonsToVisit` field accepts comma-separated values
- Multiple office locations can be entered (one per line)
- Google Maps URLs are auto-generated from office locations
- Form automatically resets after successful submission
- The doctors list on other pages will automatically refresh after adding a doctor
