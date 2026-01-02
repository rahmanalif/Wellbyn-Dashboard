"use client"

import { useState } from "react"
import { Calendar, Clock, MapPin, FileText, MoreHorizontal } from "lucide-react"
import Link from "next/link"
import CancelAppointmentModal from "./CancelAppointmentModal"
export default function PatientAppointment() {
  const [showTimer, setShowTimer] = useState(false)
 const [activeTab, setActiveTab] = useState("doctor");


  const [isModalOpen, setIsModalOpen] = useState(false)
  const handleConfirmCancel = () => {
    console.log("Appointment cancelled")
    setIsModalOpen(false)
    // Add your cancellation logic here
  }

  const handleReschedule = () => {
    console.log("Redirecting to reschedule")
    setIsModalOpen(false)
    // Add your reschedule logic here
  }
  return (

<div className="relative">
  <CancelAppointmentModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onConfirmCancel={handleConfirmCancel}
        onReschedule={handleReschedule}
      />
    <div className="flex gap-1 p-3 mb-8 bg-white w-md rounded-lg ">
          <button
            onClick={() => setActiveTab("doctor")}
            className={`px-4 py-2 text-sm font-medium border border-gray-200 rounded-l-md ${
              activeTab === "doctor"
                ? "bg-white shadow-md text-gray-700"
                : "bg-gray-100 text-gray-500"
            } hover:bg-gray-50`}
          >
            View As Doctor
          </button>
          <button
            onClick={() => setActiveTab("patient")}
            className={`px-4 py-2 text-sm font-medium border border-gray-200 rounded-r-md ${
              activeTab === "patient"
                ? "bg-white shadow-md text-gray-700"
                : "bg-gray-100 text-gray-500"
            } hover:bg-gray-50`}
          >
            View As Patient
          </button>
        </div>
 <div className="max-w-2/4 mx-auto bg-gray-50 min-h-screen relative">
      {/* Header */}

 


      <div className="bg-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-lg">Ma</span>
          </div>
          <div>
            <h1 className="font-semibold text-gray-900 text-lg">Mahmudur Rahman</h1>
            <p className="text-sm text-gray-500">Patient ID: P607RB</p>
          </div>
        </div>
        <button className="p-2 text-blue-500 rounded-full hover:bg-gray-100">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_3423_38010)">
<rect x="4" y="1" width="40" height="40" rx="8" fill="#2E8BC9"/>
<path d="M24 11C29.5221 11 33.9998 15.2834 34 20.5664C34 25.8496 29.5222 30.1338 24 30.1338C23.3507 30.1347 22.7032 30.0738 22.0654 29.9541C21.6066 29.8679 21.377 29.8252 21.2168 29.8496C21.0565 29.8741 20.8292 29.9947 20.375 30.2363C19.0902 30.9196 17.5922 31.1605 16.1514 30.8926C16.6988 30.2191 17.0723 29.4111 17.2373 28.5449C17.3373 28.0149 17.0899 27.4999 16.7188 27.123C15.0332 25.4115 14 23.1048 14 20.5664C14.0002 15.2834 18.4779 11 24 11ZM20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22H20.0088C20.5611 22 21.0088 21.5523 21.0088 21C21.0088 20.4477 20.5611 20 20.0088 20H20ZM23.9951 20C23.443 20.0002 22.9951 20.4478 22.9951 21C22.9951 21.5522 23.443 21.9998 23.9951 22H24.0049L24.1064 21.9951C24.6109 21.9441 25.0049 21.5179 25.0049 21C25.0049 20.4821 24.6109 20.0559 24.1064 20.0049L24.0049 20H23.9951ZM27.9912 20C27.4389 20 26.9912 20.4477 26.9912 21C26.9912 21.5523 27.4389 22 27.9912 22H28C28.5523 22 29 21.5523 29 21C29 20.4477 28.5523 20 28 20H27.9912Z" fill="white"/>
</g>
<defs>
<filter id="filter0_d_3423_38010" x="0" y="0" width="48" height="48" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="3"/>
<feGaussianBlur stdDeviation="2"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.101961 0 0 0 0 0.25098 0 0 0 0 0.376471 0 0 0 0.1 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3423_38010"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3423_38010" result="shape"/>
</filter>
</defs>
</svg>

        </button>
      </div>

      <div className="p-4 space-y-6 bg-white">
        {/* Date & Time */}
        <div>
          <h2 className="font-semibold text-gray-900 mb-3">Date & Time</h2>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-700">May 16, 2025</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-700">10:30 PM</span>
            </div>
            <span className="inline-flex items-center rounded-full  px-2.5 py-0.5 text-xs font-medium text-green-700">
              ✓ Complete
            </span>
          </div>
         
        </div>

        {/* Visit Reason */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">Visit Reason</h3>
          <div className="bg-white p-3 rounded shadow-sm">
            <p className="text-sm text-gray-700">I need a cleaning</p>
          </div>
        </div>

        {/* Visit Type */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">Visit Type</h3>
          <div className="bg-white p-3 rounded shadow-sm">
            <p className="text-sm text-gray-700">New Patient Visit</p>
          </div>
        </div>

        {/* Insurance */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">Insurance</h3>
          <div className="bg-white p-3 rounded shadow-sm">
            <p className="text-sm text-gray-700">Blusky</p>
          </div>
        </div>

        {/* Documentation */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">Documentation</h3>
          <div className="bg-white p-3 rounded shadow-sm flex items-center gap-3">
            <FileText className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-900">doc 1.pdf</p>
              <p className="text-xs text-gray-500">20.3MB</p>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">Summary</h3>
          <div className="bg-white p-3 rounded shadow-sm">
            <p className="text-sm text-gray-700 mb-1">Problem</p>
            <p className="text-sm text-gray-700">• heart</p>
          </div>
        </div>

        {/* Current Medications */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">Current Medications</h3>
          <div className="bg-white rounded shadow-sm overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-3 gap-4 p-3 bg-[#F2F8FD] ">
              <span className="text-xs font-medium text-gray-600">Name</span>
              <span className="text-xs font-medium text-gray-600">Frequency</span>
              <div className="flex justify-end">
                 <span className="text-xs font-medium text-gray-600 ">Action</span>
              </div>
             
            </div>
            {/* Table Rows */}
            <div className="">
              <div className="grid grid-cols-3 gap-4 p-3 items-center">
                <span className="text-sm text-gray-600">Lisinopril</span>
                <span className="text-sm text-gray-700">Once daily</span>
                  <div className="flex justify-end">
                <button className="w-6 h-6 p-0 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full">
               <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13 3.66699L12.5869 10.3504C12.4813 12.0579 12.4285 12.9117 12.0005 13.5256C11.7889 13.8291 11.5165 14.0852 11.2005 14.2777C10.5614 14.667 9.706 14.667 7.99513 14.667C6.28208 14.667 5.42553 14.667 4.78603 14.2769C4.46987 14.0841 4.19733 13.8275 3.98579 13.5235C3.55792 12.9087 3.5063 12.0537 3.40307 10.3438L3 3.66699" stroke="#3D3D3D" strokeLinecap="round"/>
<path d="M2 3.66634H14M10.7038 3.66634L10.2487 2.72749C9.9464 2.10385 9.7952 1.79202 9.53447 1.59755C9.47667 1.55441 9.4154 1.51603 9.35133 1.48281C9.0626 1.33301 8.71607 1.33301 8.023 1.33301C7.31253 1.33301 6.95733 1.33301 6.66379 1.48909C6.59873 1.52368 6.53665 1.56361 6.47819 1.60845C6.21443 1.81081 6.06709 2.13404 5.77241 2.78051L5.36861 3.66634" stroke="#3D3D3D" strokeLinecap="round"/>
<path d="M6.33301 11V7" stroke="#3D3D3D" strokeLinecap="round"/>
<path d="M9.66699 11V7" stroke="#3D3D3D" strokeLinecap="round"/>
</svg>

                </button></div>
              </div>
              <div className="grid grid-cols-3 gap-4 p-3 items-center bg-[#F2F8FD]">
                <span className="text-sm text-gray-600">Metformin</span>
                <span className="text-sm text-gray-700">Twice daily</span>
                  <div className="flex justify-end">
                <button className="w-6 h-6 p-0 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full">
               <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13 3.66699L12.5869 10.3504C12.4813 12.0579 12.4285 12.9117 12.0005 13.5256C11.7889 13.8291 11.5165 14.0852 11.2005 14.2777C10.5614 14.667 9.706 14.667 7.99513 14.667C6.28208 14.667 5.42553 14.667 4.78603 14.2769C4.46987 14.0841 4.19733 13.8275 3.98579 13.5235C3.55792 12.9087 3.5063 12.0537 3.40307 10.3438L3 3.66699" stroke="#3D3D3D" strokeLinecap="round"/>
<path d="M2 3.66634H14M10.7038 3.66634L10.2487 2.72749C9.9464 2.10385 9.7952 1.79202 9.53447 1.59755C9.47667 1.55441 9.4154 1.51603 9.35133 1.48281C9.0626 1.33301 8.71607 1.33301 8.023 1.33301C7.31253 1.33301 6.95733 1.33301 6.66379 1.48909C6.59873 1.52368 6.53665 1.56361 6.47819 1.60845C6.21443 1.81081 6.06709 2.13404 5.77241 2.78051L5.36861 3.66634" stroke="#3D3D3D" strokeLinecap="round"/>
<path d="M6.33301 11V7" stroke="#3D3D3D" strokeLinecap="round"/>
<path d="M9.66699 11V7" stroke="#3D3D3D" strokeLinecap="round"/>
</svg>

                </button></div>
              </div>
            </div>
          </div>
        </div>

        {/* Prior Diagnoses */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">Prior Diagnoses (Optional)</h3>
          <div className="bg-white p-3 rounded shadow-sm">
            <p className="text-sm text-gray-700">
              Patient's medical history includes previous surgeries, allergies to penicillin, and a family history of
              diabetes. Current concerns involve persistent headaches and occasional dizziness.
            </p>
          </div>
        </div>

        {/* Start Appointment Button */}
        <div className="flex gap-3 items-center">
          <Link href="/appointment/reschedule">
           <button
          className="flex gap-2 items-center shadow-sm bg-[#EEFEE7]  text-[#2E8BC9] px-4 py-2 text-base font-medium rounded-md"
          onClick={() => setShowTimer(true)}
        ><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.3178 13C12.9345 11.9251 14 10.087 14 8C14 4.68629 11.3137 2 8 2C7.54173 2 7.09547 2.05137 6.66667 2.14868M11.3178 13V10.6667M11.3178 13H13.6667M4.66667 3.01037C3.05869 4.08671 2 5.91972 2 8C2 11.3137 4.68629 14 8 14C8.45827 14 8.90453 13.9486 9.33333 13.8513M4.66667 3.01037V5.33333M4.66667 3.01037H2.33333" stroke="#2E8BC9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

          Reschedule
        </button>
          </Link> 
<div className="terxt-gray-800">
   OR
</div>
   
             <button
          className="flex gap-2 items-center shadow-sm bg-white  text-[#B42121] px-4 py-2 text-base font-medium rounded-md"
          onClick={() => setIsModalOpen(true)}
        >

          Cancel
        </button>
        </div>
      
    
        
      </div>

    </div>
</div>


   
  )
}