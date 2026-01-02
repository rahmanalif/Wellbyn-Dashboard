# Patient Registration API Specification

## Overview
This document outlines the API endpoints needed for the patient registration/onboarding flow. The flow consists of 3 steps:
1. **Patient Information** (Step 1) - Personal details, contact info, address
2. **Medical Information** (Step 2) - Allergies, medications, conditions, lifestyle factors
3. **Insurance Information** (Step 3) - Insurance details and coverage

## Multi-Step Patient Registration Flow

### Base URL
```
http://localhost:1357
```

---

## API Endpoints Required

### 1. Create/Update Patient - Step 1: Patient Information

**Endpoint:** `POST /api/patient/registration/step-1`

**Description:** Saves patient's personal information (first step of registration)

**Authentication:** Required (Bearer Token in Authorization header)

**Request Headers:**
```
Content-Type: multipart/form-data
Authorization: Bearer {accessToken}
```

**Request Body (multipart/form-data):**
```json
{
  // Personal Info
  "firstName": "string (required)",
  "middleName": "string (optional)",
  "lastName": "string (required)",
  "dateOfBirth": "string (YYYY-MM-DD) (required)",
  "sex": "string (Male/Female/Other) (required)",
  "maritalStatus": "string (optional)",
  "numberOfChildren": "number (optional)",

  // Contact Info
  "email": "string (required, valid email)",
  "phone": "string (required)",

  // Address
  "addressLine1": "string (required)",
  "addressLine2": "string (optional)",
  "city": "string (required)",
  "state": "string (required)",
  "zip": "string (required)",

  // Additional Info
  "employer": "string (optional)",
  "driversLicense": "string (optional)",
  "ssnLast4": "string (optional, 4 digits)",

  // Driver's License Files (if uploaded)
  "frontLicenseImage": "file (image, optional)",
  "backLicenseImage": "file (image, optional)",

  // Privacy Agreement
  "agreedToPrivacy": "boolean (required, must be true)"
}
```

**Success Response:** `201 Created` or `200 OK`
```json
{
  "success": true,
  "message": "Patient information saved successfully",
  "data": {
    "patientId": "string (unique patient ID)",
    "currentStep": 1,
    "completedSteps": [1],
    "nextStep": "/patients/medical-info"
  }
}
```

**Error Response:** `400 Bad Request`
```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    {
      "field": "firstName",
      "message": "First name is required"
    }
  ]
}
```

---

### 2. Create/Update Patient - Step 2: Medical Information

**Endpoint:** `POST /api/patient/registration/step-2`

**Description:** Saves patient's medical information (second step of registration)

**Authentication:** Required (Bearer Token in Authorization header)

**Request Headers:**
```
Content-Type: application/json
Authorization: Bearer {accessToken}
```

**Request Body (JSON):**
```json
{
  "patientId": "string (required, from step 1 response)",

  "allergies": [
    {
      "name": "string (required)",
      "severity": "string (Mild/Moderate/Severe) (required)"
    }
  ],

  "medications": [
    {
      "name": "string (required)",
      "frequency": "string (Once daily/Twice daily/Three times daily/As needed) (required)"
    }
  ],

  "conditions": [
    "string (e.g., Diabetes, Hypertension, Anxiety, Depression, Asthma, None)"
  ],

  "lifestyleFactors": [
    "string (e.g., Smoking, Former Smoker, Alcohol)"
  ]
}
```

**Success Response:** `200 OK`
```json
{
  "success": true,
  "message": "Medical information saved successfully",
  "data": {
    "patientId": "string",
    "currentStep": 2,
    "completedSteps": [1, 2],
    "nextStep": "/patients/insurance-info"
  }
}
```

**Error Response:** `400 Bad Request`
```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    {
      "field": "allergies[0].severity",
      "message": "Severity must be Mild, Moderate, or Severe"
    }
  ]
}
```

---

### 3. Create/Update Patient - Step 3: Insurance Information

**Endpoint:** `POST /api/patient/registration/step-3`

**Description:** Saves patient's insurance information (final step of registration)

**Authentication:** Required (Bearer Token in Authorization header)

**Request Headers:**
```
Content-Type: multipart/form-data
Authorization: Bearer {accessToken}
```

**Request Body (multipart/form-data):**
```json
{
  "patientId": "string (required, from step 1 response)",

  // Primary Insurance
  "primaryInsuranceProvider": "string (required)",
  "primaryPolicyNumber": "string (required)",
  "primaryGroupNumber": "string (optional)",
  "primaryPolicyHolderName": "string (required)",
  "primaryRelationToPatient": "string (Self/Spouse/Parent/Child/Other) (required)",
  "primaryPolicyHolderDOB": "string (YYYY-MM-DD) (required)",

  // Insurance Card Images
  "primaryInsuranceFrontImage": "file (image, required)",
  "primaryInsuranceBackImage": "file (image, required)",

  // Secondary Insurance (Optional)
  "hasSecondaryInsurance": "boolean (default: false)",
  "secondaryInsuranceProvider": "string (optional)",
  "secondaryPolicyNumber": "string (optional)",
  "secondaryGroupNumber": "string (optional)",
  "secondaryPolicyHolderName": "string (optional)",
  "secondaryRelationToPatient": "string (optional)",
  "secondaryPolicyHolderDOB": "string (YYYY-MM-DD) (optional)",
  "secondaryInsuranceFrontImage": "file (image, optional)",
  "secondaryInsuranceBackImage": "file (image, optional)"
}
```

**Success Response:** `201 Created`
```json
{
  "success": true,
  "message": "Patient registration completed successfully",
  "data": {
    "patientId": "string",
    "currentStep": 3,
    "completedSteps": [1, 2, 3],
    "registrationComplete": true,
    "patient": {
      "patientId": "string",
      "patientName": "string (full name)",
      "email": "string",
      "phone": "string",
      "dateOfBirth": "string",
      "sex": "string",
      "status": "string (Active/Inactive)",
      "createdAt": "string (ISO 8601 timestamp)",
      "updatedAt": "string (ISO 8601 timestamp)"
    }
  }
}
```

**Error Response:** `400 Bad Request`
```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    {
      "field": "primaryInsuranceFrontImage",
      "message": "Front insurance card image is required"
    }
  ]
}
```

---

## Additional Helper Endpoints

### 4. Get Patient Registration Status

**Endpoint:** `GET /api/patient/registration/status/:patientId`

**Description:** Gets the current registration status and completed steps for a patient

**Authentication:** Required

**Success Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "patientId": "string",
    "currentStep": 2,
    "completedSteps": [1],
    "registrationComplete": false,
    "nextStep": "/patients/medical-info"
  }
}
```

---

### 5. Get Patient by ID (for editing)

**Endpoint:** `GET /api/patient/:patientId`

**Description:** Gets complete patient information for viewing or editing

**Authentication:** Required

**Success Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "patientId": "string",
    "personalInfo": {
      "firstName": "string",
      "middleName": "string",
      "lastName": "string",
      "dateOfBirth": "string",
      "sex": "string",
      "maritalStatus": "string",
      "numberOfChildren": 0,
      "email": "string",
      "phone": "string",
      "address": {
        "addressLine1": "string",
        "addressLine2": "string",
        "city": "string",
        "state": "string",
        "zip": "string"
      },
      "employer": "string",
      "driversLicense": "string",
      "frontLicenseImage": "string (URL)",
      "backLicenseImage": "string (URL)"
    },
    "medicalInfo": {
      "allergies": [
        {
          "id": "string",
          "name": "string",
          "severity": "string"
        }
      ],
      "medications": [
        {
          "id": "string",
          "name": "string",
          "frequency": "string"
        }
      ],
      "conditions": ["string"],
      "lifestyleFactors": ["string"]
    },
    "insuranceInfo": {
      "primary": {
        "provider": "string",
        "policyNumber": "string",
        "groupNumber": "string",
        "policyHolderName": "string",
        "relationToPatient": "string",
        "policyHolderDOB": "string",
        "frontImage": "string (URL)",
        "backImage": "string (URL)"
      },
      "secondary": {
        "provider": "string",
        "policyNumber": "string",
        "groupNumber": "string",
        "policyHolderName": "string",
        "relationToPatient": "string",
        "policyHolderDOB": "string",
        "frontImage": "string (URL)",
        "backImage": "string (URL)"
      }
    },
    "status": "string",
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

---

## Important Notes

### File Upload Handling
- **Accepted formats:** JPG, JPEG, PNG, PDF (for license and insurance cards)
- **Max file size:** 5MB per file
- **Storage:** Files should be stored securely and returned as accessible URLs
- **Image paths:** Return full URLs like `https://wellbyn.grassroots-bd.com/uploads/patients/123/license-front.jpg`

### Data Validation
- Email must be valid and unique per patient
- Phone number should be validated
- Date of birth format: `YYYY-MM-DD`
- SSN last 4 digits: exactly 4 numeric characters
- ZIP code: 5 or 9 digits

### Security Considerations
- All endpoints require authentication (JWT Bearer token)
- Validate file types to prevent malicious uploads
- Sanitize all string inputs to prevent XSS
- Hash or encrypt sensitive data (SSN, insurance numbers) in database
- Rate limit registration endpoints to prevent abuse

### Database Schema Suggestions
```
patients
├── id (primary key)
├── doctor_id (foreign key, creator)
├── first_name
├── middle_name
├── last_name
├── date_of_birth
├── sex
├── marital_status
├── number_of_children
├── email (unique)
├── phone
├── address_line1
├── address_line2
├── city
├── state
├── zip
├── employer
├── drivers_license
├── ssn_last4 (encrypted)
├── front_license_image_url
├── back_license_image_url
├── agreed_to_privacy
├── registration_step (1/2/3)
├── registration_complete (boolean)
├── status (Active/Inactive)
├── created_at
├── updated_at

patient_allergies
├── id
├── patient_id (foreign key)
├── name
├── severity (Mild/Moderate/Severe)

patient_medications
├── id
├── patient_id (foreign key)
├── name
├── frequency

patient_conditions
├── id
├── patient_id (foreign key)
├── condition_name

patient_lifestyle_factors
├── id
├── patient_id (foreign key)
├── factor_name

patient_insurance
├── id
├── patient_id (foreign key)
├── insurance_type (primary/secondary)
├── provider
├── policy_number (encrypted)
├── group_number
├── policy_holder_name
├── relation_to_patient
├── policy_holder_dob
├── front_image_url
├── back_image_url
```

---

## Testing Checklist

### Step 1 - Patient Information
- [ ] Create patient with all required fields
- [ ] Create patient with optional driver's license images
- [ ] Validate email format
- [ ] Validate phone number
- [ ] Validate date of birth (must be in past)
- [ ] Reject if privacy policy not agreed

### Step 2 - Medical Information
- [ ] Save allergies with different severities
- [ ] Save multiple medications
- [ ] Save conditions (including "None" option)
- [ ] Save lifestyle factors
- [ ] Handle empty arrays gracefully

### Step 3 - Insurance Information
- [ ] Save primary insurance with images
- [ ] Save secondary insurance (optional)
- [ ] Validate image uploads
- [ ] Reject if required images are missing
- [ ] Mark registration as complete

### General
- [ ] Return proper error messages for validation failures
- [ ] Return 401 for unauthenticated requests
- [ ] Test with large file uploads (edge cases)
- [ ] Test file upload security (reject .exe, .sh files)

---

## Frontend Integration Notes

The frontend will:
1. Navigate through 3 pages: `/patient-information` → `/patients/medical-info` → `/patients/insurance-info`
2. Save `patientId` from Step 1 response to send in Steps 2 and 3
3. Display loading states during API calls
4. Show success/error messages based on API responses
5. Redirect to patient list or dashboard after Step 3 completion

---

## Questions?

If you have questions or need clarification on any endpoint, please contact the frontend team. We can provide sample payloads or help with testing.
