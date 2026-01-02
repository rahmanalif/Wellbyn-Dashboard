import { MessageCircle } from "lucide-react"

export default function CheckInForm() {
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Card Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Check In Information</h2>
        </div>

        {/* Card Content */}
        <div className="p-6 space-y-6">
          {/* Doctor and Patient Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Doctor Section */}
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-3">Doctor</h3>
              <div className="flex items-center space-x-3">
                <div className="relative h-12 w-12 rounded-full overflow-hidden bg-teal-100 flex items-center justify-center">
                  <span className="text-teal-700 font-medium">MM</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Dr. Mavis Merk</p>
                  <p className="text-sm text-gray-600">Cardiology</p>
                  <p className="text-sm text-gray-500">Sylhet Health Center</p>
                </div>
              </div>
            </div>

            {/* Patient Section */}
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-3">Patients</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-700 font-medium">MR</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Mahmudur Rahman</p>
                    <p className="text-sm text-gray-500">Patient ID: P40798</p>
                  </div>
                </div>
                <button className="p-2 text-blue-600 hover:bg-gray-100 rounded-full">
                  <MessageCircle className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Health Questions */}
          <div className="space-y-6">
            {/* Current Symptoms */}
            <div>
              <label className="text-base font-medium text-gray-900 mb-4 block">
                Are you currently experiencing any of the following?
              </label>
              <div className="grid grid-cols-2 gap-3">
                {["Bleeding gums", "Loose teeth", "Tooth sensitivity", "Jaw pain or clicking"].map((symptom) => (
                  <div key={symptom} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={symptom.toLowerCase().replace(/\s+/g, "-")}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor={symptom.toLowerCase().replace(/\s+/g, "-")}
                      className="text-sm text-gray-700 cursor-pointer"
                    >
                      {symptom}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Oral Health Changes */}
            <div>
              <label className="text-base font-medium text-gray-900 mb-4 block">
                Have you had any changes in your oral health since your last visit?
              </label>
              <div className="flex space-x-6">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="changes-yes"
                    name="oral-health-changes"
                    value="yes"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <label htmlFor="changes-yes" className="text-sm text-gray-700 cursor-pointer">
                    Yes
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="changes-no"
                    name="oral-health-changes"
                    value="no"
                    defaultChecked
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <label htmlFor="changes-no" className="text-sm text-gray-700 cursor-pointer">
                    No
                  </label>
                </div>
              </div>
              <div className="mt-2">
                <label className="text-xs text-gray-500">What?</label>
              </div>
            </div>

            {/* Medications */}
            <div>
              <label className="text-base font-medium text-gray-900 mb-4 block">
                Are you currently taking any dental-related medications or antibiotics?
              </label>
              <div className="flex space-x-6">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="meds-yes"
                    name="medications"
                    value="yes"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <label htmlFor="meds-yes" className="text-sm text-gray-700 cursor-pointer">
                    Yes
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="meds-no"
                    name="medications"
                    value="no"
                    defaultChecked
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <label htmlFor="meds-no" className="text-sm text-gray-700 cursor-pointer">
                    No
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Submit Check-in
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}