# Message to Backend Developer

Hi [Backend Developer Name],

I need your help implementing the API endpoints for our **Patient Registration/Onboarding** feature. This is a 3-step registration flow where doctors can add new patients to the system.

## What I Need

### 3 API Endpoints for Patient Registration:

1. **POST `/api/patient/registration/step-1`** - Patient Personal Information
2. **POST `/api/patient/registration/step-2`** - Medical Information
3. **POST `/api/patient/registration/step-3`** - Insurance Information

Each step builds on the previous one. The first endpoint returns a `patientId` that we send in steps 2 and 3.

---

## Quick Summary

### Step 1: Patient Information (multipart/form-data)
**Required fields:**
- Personal: `firstName`, `lastName`, `dateOfBirth`, `sex`
- Contact: `email`, `phone`
- Address: `addressLine1`, `city`, `state`, `zip`
- Agreement: `agreedToPrivacy` (boolean, must be true)

**Optional:**
- `middleName`, `maritalStatus`, `numberOfChildren`, `employer`, `driversLicense`, `ssnLast4`
- File uploads: `frontLicenseImage`, `backLicenseImage`

**Response:**
```json
{
  "success": true,
  "message": "Patient information saved successfully",
  "data": {
    "patientId": "abc123",
    "currentStep": 1,
    "completedSteps": [1],
    "nextStep": "/patients/medical-info"
  }
}
```

---

### Step 2: Medical Information (application/json)
**Required:**
- `patientId` (from step 1)

**Optional Arrays:**
- `allergies`: `[{ "name": "Penicillin", "severity": "Moderate" }]`
- `medications`: `[{ "name": "Lisinopril", "frequency": "Once daily" }]`
- `conditions`: `["Diabetes", "Hypertension"]`
- `lifestyleFactors`: `["Smoking", "Alcohol"]`

**Response:**
```json
{
  "success": true,
  "message": "Medical information saved successfully",
  "data": {
    "patientId": "abc123",
    "currentStep": 2,
    "completedSteps": [1, 2],
    "nextStep": "/patients/insurance-info"
  }
}
```

---

### Step 3: Insurance Information (multipart/form-data)
**Required:**
- `patientId`
- Primary Insurance: `primaryInsuranceProvider`, `primaryPolicyNumber`, `primaryPolicyHolderName`, `primaryRelationToPatient`, `primaryPolicyHolderDOB`
- Images: `primaryInsuranceFrontImage`, `primaryInsuranceBackImage`

**Optional:**
- `hasSecondaryInsurance` (boolean)
- If true, include all secondary insurance fields with `secondary` prefix

**Response:**
```json
{
  "success": true,
  "message": "Patient registration completed successfully",
  "data": {
    "patientId": "abc123",
    "currentStep": 3,
    "completedSteps": [1, 2, 3],
    "registrationComplete": true,
    "patient": {
      "patientId": "abc123",
      "patientName": "John Doe",
      "email": "john@example.com",
      "phone": "+1234567890",
      "status": "Active",
      "createdAt": "2025-12-24T19:00:00Z"
    }
  }
}
```

---

## Additional Helper Endpoints (Nice to Have)

1. **GET `/api/patient/registration/status/:patientId`** - Get which steps are completed
2. **GET `/api/patient/:patientId`** - Get full patient details for editing

---

## Important Technical Details

### File Uploads
- Accept: JPG, JPEG, PNG, PDF
- Max size: 5MB per file
- Return URLs in response (e.g., `https://wellbyn.grassroots-bd.com/uploads/patients/123/license-front.jpg`)

### Validation
- Email must be unique and valid format
- Date format: `YYYY-MM-DD`
- Allergy severity: `Mild`, `Moderate`, or `Severe`
- Medication frequency: `Once daily`, `Twice daily`, `Three times daily`, `As needed`

### Security
- All endpoints require authentication (Bearer token)
- Encrypt sensitive data: SSN, insurance policy numbers
- Validate file types (reject executables)
- Store files securely

### Error Handling
Return errors in this format:
```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    {
      "field": "email",
      "message": "Email is required"
    }
  ]
}
```

---

## Complete Documentation

I've prepared a detailed API specification document with:
- Complete request/response examples
- Database schema suggestions
- Testing checklist
- Security considerations

**See full details in:** `PATIENT_ADD_API_SPECIFICATION.md`

---

## Frontend Flow

Here's what happens on the frontend:

1. User fills form at `/patient-information` → Calls Step 1 API
2. Gets `patientId` in response → Redirects to `/patients/medical-info`
3. Fills medical info → Calls Step 2 API with `patientId`
4. Redirects to `/patients/insurance-info`
5. Fills insurance info → Calls Step 3 API with `patientId`
6. Registration complete → Redirect to patients list

---

## When Do You Need This?

Please let me know:
- **Timeline:** When can you have these endpoints ready?
- **Questions:** Do you need clarification on anything?
- **Testing:** When should we test together?

---

## Current Setup

- **Base URL:** `http://localhost:1357` (local) / `https://wellbyn.grassroots-bd.com` (production)
- **Auth:** JWT Bearer tokens (from existing login API)
- **Frontend:** Next.js 14 with TypeScript
- **State Management:** Redux Toolkit

---

Thanks! Let me know if you have any questions or need sample requests for testing.

Best regards,
[Your Name]
