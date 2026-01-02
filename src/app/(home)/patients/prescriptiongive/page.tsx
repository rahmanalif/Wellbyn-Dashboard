"use client"

import { useState } from "react";
import { MessageCircle } from "lucide-react";

export default function CheckInForm() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [healthChanges, setHealthChanges] = useState("no");
  const [changesDetails, setChangesDetails] = useState("");
  const [takingMeds, setTakingMeds] = useState("no");

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptom)
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const symptoms = [
    "Bleeding gums",
    "Loose teeth",
    "Tooth sensitivity",
    "Jaw pain or clicking"
  ];

  return (
    <div className="max-w-4xl  mx-auto p-6  min-h-screen">
      {/* Check In Information Card */}
      <div className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden">
        <div className="p-6 ">
          <h2 className="text-lg font-medium text-gray-700">Check In Information</h2>
        </div>
        <div className="p-6 ">
          <div className="grid md:grid-cols-2 gap-8 pb-5 border-b border-[#DCDCDC]">
            {/* Doctor Section */}
            <div className="border-r border-[#DCDCDC]">
              <h3 className="text-lg font-bold text-[#3D3D3D] mb-4">Doctor</h3>
              <div className="flex items-center space-x-3 ">
                <div className="h-15 w-15 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-medium">
               <img
                src="/placeholder.svg"
                alt="Dr. Mahmudur Rahman"
                className="w-full h-full object-cover"
              />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Dr. Moule Manix</p>
                  <p className="text-sm text-gray-600">Cardiology</p>
                  <p className="text-sm font-bold gap-1 text-gray-500 flex "><svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.83341 1.83301C5.7038 1.83301 3.16675 4.24489 3.16675 7.22014C3.16675 8.92134 3.87508 10.2441 5.29175 11.4257C6.29029 12.2585 7.50001 13.6417 8.22628 14.7631C8.57461 15.3007 9.06721 15.3007 9.44055 14.7631C10.2036 13.6641 11.3765 12.2585 12.3751 11.4257C13.7917 10.2441 14.5001 8.92134 14.5001 7.22014C14.5001 4.24489 11.963 1.83301 8.83341 1.83301Z" stroke="#3D75E6" strokeLinejoin="round"/>
<path d="M7.5 5.16699V7.16699M7.5 7.16699V9.16699M7.5 7.16699H10.1667M10.1667 5.16699V7.16699M10.1667 7.16699V9.16699" stroke="#3D75E6" strokeLinecap="round"/>
</svg>
 Sylfat Health Center</p>
                </div>
              </div>
            </div>

            {/* Patient Section */}
            <div>
              <h3 className="text-lg font-semibold text-[#3D3D3D] mb-4">Patients</h3>
              <div className="flex items-center space-x-3">
                <div className="h-15 w-15 rounded-full bg-[#2E8BC9] flex items-center justify-center text-white font-medium">
                  Ma
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Mahmudur Rahman</p>
                  <p className="text-sm text-gray-500">Patient ID: P#2789</p>
                </div>
                <svg width="48" height="49" viewBox="0 0 48 49" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_1974_93136)">
<rect x="4" y="1.5" width="40" height="40" rx="8" fill="#2E8BC9"/>
<path d="M24 11.5C29.5221 11.5 33.9998 15.7834 34 21.0664C34 26.3496 29.5222 30.6338 24 30.6338C23.3507 30.6347 22.7032 30.5738 22.0654 30.4541C21.6066 30.3679 21.377 30.3252 21.2168 30.3496C21.0565 30.3741 20.8292 30.4947 20.375 30.7363C19.0902 31.4196 17.5922 31.6605 16.1514 31.3926C16.6988 30.7191 17.0723 29.9111 17.2373 29.0449C17.3373 28.5149 17.0899 27.9999 16.7188 27.623C15.0332 25.9115 14 23.6048 14 21.0664C14.0002 15.7834 18.4779 11.5 24 11.5ZM20 20.5C19.4477 20.5 19 20.9477 19 21.5C19 22.0523 19.4477 22.5 20 22.5H20.0088C20.5611 22.5 21.0088 22.0523 21.0088 21.5C21.0088 20.9477 20.5611 20.5 20.0088 20.5H20ZM23.9951 20.5C23.443 20.5002 22.9951 20.9478 22.9951 21.5C22.9951 22.0522 23.443 22.4998 23.9951 22.5H24.0049L24.1064 22.4951C24.6109 22.4441 25.0049 22.0179 25.0049 21.5C25.0049 20.9821 24.6109 20.5559 24.1064 20.5049L24.0049 20.5H23.9951ZM27.9912 20.5C27.4389 20.5 26.9912 20.9477 26.9912 21.5C26.9912 22.0523 27.4389 22.5 27.9912 22.5H28C28.5523 22.5 29 22.0523 29 21.5C29 20.9477 28.5523 20.5 28 20.5H27.9912Z" fill="white"/>
</g>
<defs>
<filter id="filter0_d_1974_93136" x="0" y="0.5" width="48" height="48" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="3"/>
<feGaussianBlur stdDeviation="2"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.101961 0 0 0 0 0.25098 0 0 0 0 0.376471 0 0 0 0.1 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1974_93136"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1974_93136" result="shape"/>
</filter>
</defs>
</svg>

              </div>
            </div>
          </div>
        </div>
     

      {/* Questionnaire */}
      <div className=" rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="space-y-8">
            {/* Question 1 */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-4">
                Are you currently experiencing any of the following?
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {symptoms.map((symptom) => (
                  <div key={symptom} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={symptom.replace(/\s+/g, "-").toLowerCase()}
                      checked={selectedSymptoms.includes(symptom)}
                      onChange={() => toggleSymptom(symptom)}
                      className="min-w-6 min-h-6 before:bg-[#F2F8FD]  appearance-none text-[#F2F8FD] border-none outline-none bg-[#F2F8FD] rounded-sm shadow-md checked:bg-[#2E8BC9] checked:ring-[#2E8BC9] transition-all checkmarkInput"
                    />
                    <label
                      htmlFor={symptom.replace(/\s+/g, "-").toLowerCase()}
                      className="text-sm text-gray-700 cursor-pointer"
                    >
                      {symptom}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Question 2 */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-4">
                Have you had any changes in your oral health since your last visit?
              </h3>
              <div className="flex items-center space-x-6 w-1/2 justify-between">
                <div className="flex items-center space-x-2 ">
                  <input
                    type="radio"
                    id="changes-yes"
                    name="health-changes"
                    value="yes"
                    checked={healthChanges === "yes"}
                    onChange={() => setHealthChanges("yes")}
                   className="min-w-6 min-h-6 bg-[#F2F8FD] appearance-none border-none outline-none rounded-sm shadow-md checked:bg-[#2E8BC9] checked:ring-[#2E8BC9] transition-all checkmarkInput"
                  />
                  <label htmlFor="changes-yes" className="text-sm text-gray-700 cursor-pointer">
                    Yes
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="changes-no"
                    name="health-changes"
                    value="no"
                    checked={healthChanges === "no"}
                    onChange={() => setHealthChanges("no")}
               className="min-w-6 bg-[#F2F8FD] min-h-6 appearance-none border-none outline-none rounded-sm shadow-md checked:bg-[#2E8BC9] checked:ring-[#2E8BC9] transition-all checkmarkInput"
                  />
                  <label htmlFor="changes-no" className="text-sm text-gray-700 cursor-pointer">
                    No
                  </label>
                </div>
              </div>
              {healthChanges === "yes" && (
                <div className="mt-3">
                
                <textarea
 
  id="changes-details"
  placeholder=" what?"
  value={changesDetails}
  onChange={(e) => setChangesDetails(e.target.value)}
  className="mt-1 p-1 block w-80 h-15 border rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm placeholder:mb-2"
/>
                </div>
              )}
            </div>

            {/* Question 3 */}
            <div >
              <h3 className="text-sm font-medium text-gray-900 mb-4">
                Are you currently taking any dental-related medications or antibiotics?
              </h3>
              <div className="flex items-center space-x-6 justify-between w-1/2">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="medications-yes"
                    name="taking-meds"
                    value="yes"
                    checked={takingMeds === "yes"}
                    onChange={() => setTakingMeds("yes")}
                className="min-w-6 min-h-6 bg-[#F2F8FD] appearance-none border-none outline-none rounded-sm shadow-md checked:bg-[#2E8BC9] checked:ring-[#2E8BC9] transition-all checkmarkInput"
                  />
                  <label htmlFor="medications-yes" className="text-sm text-gray-700 cursor-pointer">
                    Yes
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="medications-no"
                    name="taking-meds"
                    value="no"
                    checked={takingMeds === "no"}
                    onChange={() => setTakingMeds("no")}
                  className="min-w-6 min-h-6 bg-[#F2F8FD] appearance-none border-none outline-none rounded-sm shadow-md checked:bg-[#2E8BC9] checked:ring-[#2E8BC9] transition-all checkmarkInput"
                  />
                  <label htmlFor="medications-no" className="text-sm text-gray-700 cursor-pointer">
                    No
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> </div>
    </div>
  );
}