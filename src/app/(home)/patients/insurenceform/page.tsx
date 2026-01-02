"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { CalendarIcon, Plus } from "lucide-react"
import { useSubmitPatientRegistrationStep3Mutation } from "@/lib/store/services/patientsApi"

export default function InsuranceEnrollmentForm() {
  const router = useRouter()
  const [submitPatientRegistrationStep3, { isLoading }] =
    useSubmitPatientRegistrationStep3Mutation()

  const [patientId, setPatientId] = useState<string | null>(null)
  const [apiError, setApiError] = useState<string | null>(null)

  const [date, setDate] = useState<Date>()
  const [insuranceName, setInsuranceName] = useState("")
  const [policyNumber, setPolicyNumber] = useState("")
  const [groupNumber, setGroupNumber] = useState("")
  const [relationship, setRelationship] = useState("")
  const [firstName, setFirstName] = useState("")
  const [middleName, setMiddleName] = useState("")
  const [lastName, setLastName] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [zip, setZip] = useState("")
  const [employer, setEmployer] = useState("")
  const [sex, setSex] = useState("Male")
  const [insuranceCardFront, setInsuranceCardFront] = useState<File | null>(null)
  const [signatureImage, setSignatureImage] = useState<File | null>(null)

  // Get patientId from sessionStorage on mount
  useEffect(() => {
    const storedPatientId = sessionStorage.getItem("patientId")
    if (!storedPatientId) {
      router.push("/patients/add")
    } else {
      setPatientId(storedPatientId)
    }
  }, [router])

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, side: "front" | "signature") => {
    const file = e.target.files?.[0]
    if (file) {
      if (side === "front") {
        setInsuranceCardFront(file)
      } else if (side === "signature") {
        setSignatureImage(file)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setApiError(null)

    if (!patientId) {
      setApiError("Patient ID not found. Please start from step 1.")
      return
    }

    if (!date) {
      setApiError("Please select date of birth.")
      return
    }

    try {
      const formData = new FormData()

      // Add required fields
      formData.append("patientId", patientId)
      formData.append("primaryInsuranceProvider", insuranceName)
      formData.append("primaryPolicyNumber", policyNumber)
      formData.append("primaryGroupNumber", groupNumber)
      formData.append("primaryRelationToPatient", relationship)
      formData.append("primaryPolicyHolderName", `${firstName} ${middleName} ${lastName}`.trim())
      formData.append("primaryPolicyHolderAddress", `${address}, ${city}, ${state} ${zip}`.trim())
      formData.append("primaryPolicyHolderSex", sex)
      formData.append("primaryPolicyHolderDOB", format(date, "yyyy-MM-dd"))

      // Add insurance card images if they exist
      if (insuranceCardFront) {
        formData.append("primaryInsuranceFrontImage", insuranceCardFront)
      }
      // Use signature image as the back image as requested
      if (signatureImage) {
        formData.append("primaryInsuranceBackImage", signatureImage)
      }

      console.log("Submitting Step 3 data")

      const response = await submitPatientRegistrationStep3(formData).unwrap()

      console.log("Registration Step 3 Success:", response)

      // Clear sessionStorage
      sessionStorage.removeItem("patientId")
      sessionStorage.removeItem("currentStep")

      // Navigate to success page or patients list
      router.push("/patients")
    } catch (err: any) {
      console.error("Registration Step 3 Error:", err)

      if (err.data) {
        const errorData = err.data
        if (errorData.message) {
          setApiError(errorData.message)
        }
      } else {
        setApiError("An unexpected error occurred. Please try again.")
      }
    }
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-2/4 mx-auto bg-white rounded-lg shadow-sm p-6 space-y-4">
        {/* Error Message Display */}
        {apiError && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6">
            <p className="font-medium">{apiError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
        {/* Insurance Name */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Insurance Name</label>
          <select
            value={insuranceName}
            onChange={(e) => setInsuranceName(e.target.value)}
            className="block w-full h-10 px-3 py-2 bg-white  rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select</option>
            <option value="aetna">Aetna</option>
            <option value="blue-cross">Blue Cross Blue Shield</option>
            <option value="cigna">Cigna</option>
          </select>
        </div>

        {/* Policy Number */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Policy Number</label>
          <input
            type="text"
            className="block w-full h-10 px-3 py-2 bg-white rounded-md shadow-sm text-gray-700"
            value={policyNumber}
            onChange={(e) => setPolicyNumber(e.target.value)}
            placeholder="Enter policy number"
            required
          />
        </div>

        {/* Group Number */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Group Number</label>
          <input
            type="text"
            className="block w-full h-10 px-3 py-2 bg-white  rounded-md shadow-sm text-gray-700"
            value={groupNumber}
            onChange={(e) => setGroupNumber(e.target.value)}
            placeholder="Enter group number"
            required
          />
        </div>

        {/* Patient Relationship To Insured */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Patient Relationship To Insured</label>
          <select
            value={relationship}
            onChange={(e) => setRelationship(e.target.value)}
            className="block w-full h-10 px-3 py-2 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select</option>
            <option value="Self">Self</option>
            <option value="Spouse">Spouse</option>
            <option value="Child">Child</option>
            <option value="Parent">Parent</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Full Name */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <div className="grid grid-cols-3 gap-2">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="block w-full h-10 px-3 py-2 bg-white  rounded-md shadow-sm text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="text"
              placeholder="Middle"
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
              className="block w-full h-10 px-3 py-2 bg-white  rounded-md shadow-sm text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="text"
              placeholder="Last"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="block w-full h-10 px-3 py-2 bg-white rounded-md shadow-sm text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>


        {/* Address Line 1 */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Address Line 1</label>
          <input
            type="text"
            placeholder="Street address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="block w-full h-10 px-3 py-2 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* City, State, ZIP */}
        <div className="grid grid-cols-3 gap-2">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="block w-full h-10 px-3 py-2 bg-white  rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">State</label>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="block w-full h-10 px-3 py-2 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select</option>
              <option value="ca">California</option>
              <option value="ny">New York</option>
              <option value="tx">Texas</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">ZIP</label>
            <input
              type="text"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              className="block w-full h-10 px-3 py-2 bg-white  rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Employer Name */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Employer Name</label>
          <input
            type="text"
            placeholder="Company name"
            value={employer}
            onChange={(e) => setEmployer(e.target.value)}
            className="block w-full h-10 px-3 py-2 bg-white  rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Sex */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Sex</label>
          <select
            value={sex}
            onChange={(e) => setSex(e.target.value)}
            className="block w-full h-10 px-3 py-2 bg-white  rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        {/* Date of Birth */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Date Of Birth</label>
          <div className="relative">
            <button
              type="button"
              className={`w-full h-10 px-3 py-2 text-left bg-white  rounded-md shadow-sm ${
                !date ? "text-gray-500" : "text-gray-900"
              }`}
              onClick={() => document.getElementById('datepicker')?.focus()}
            >
              {date ? format(date, "MM/dd/yyyy") : "mm/dd/yyyy"}
              <CalendarIcon className="absolute right-3 top-2.5 h-4 w-4 text-blue-500" />
            </button>
            <input
              id="datepicker"
              type="date"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={(e) => setDate(e.target.valueAsDate || undefined)}
            />
          </div>
        </div>

        {/* Insurance Card Front */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Insurance Card (Front)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileUpload(e, "front")}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {insuranceCardFront && (
            <p className="text-sm text-gray-600 mt-1">{insuranceCardFront.name}</p>
          )}
        </div>

        {/* Digital Signature */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Digital Signature (This will be used as Insurance Card Back)</label>
          <div className="flex items-center gap-4">
            <label className="flex items-center justify-center shadow-sm px-5 py-2 rounded-md text-[#2E8BC9] text-sm hover:bg-blue-50 focus:outline-none cursor-pointer border border-[#2E8BC9] transition-colors">
              <Plus className="w-4 h-4 mr-1" />
              Upload Signature
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileUpload(e, "signature")}
              />
            </label>
            {signatureImage && (
              <span className="text-sm text-gray-600 truncate max-w-[200px]">{signatureImage.name}</span>
            )}
          </div>
        </div>

        {/* Save Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 px-4 py-2 bg-[#2E8BC9] hover:bg-blue-600 text-white font-medium rounded-md shadow-sm mt-6 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Submitting...
            </>
          ) : (
            "Complete Registration"
          )}
        </button>
        </form>
      </div>
    </div>
  )
}