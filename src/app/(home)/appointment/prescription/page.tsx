"use client"

import Image from "next/image"
import { Calendar, Clock, CheckCircle, MapPin, Download } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

export default function Component() {
    const [showTimer, setShowTimer] = useState(true)
    const [activeTab, setActiveTab] = useState("doctor");
  return (

    <div className="relative">
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
    <div className="flex justify-center py-8 px-4 sm:px-6 lg:px-8 bg-gray-100 min-h-screen">
      <div className=" w-2/4   bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 space-y-6">
          {/* Doctor Info */}
          <div className="flex items-center space-x-4">
            <Image
              src="/placeholder.svg"
              alt="Dr. Moule Marrk"
              width={64}
              height={64}
              className="rounded-full border-2 border-gray-200 w-20 h-20"
            />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Dr. Moule Marrk</h2>
              <p className="text-sm text-gray-500">Cardiology</p>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <MapPin className="w-4 h-4 mr-1" />
                <span>Sylhet Health Center</span>
              </div>
            </div>
          </div>

          {/* Last Appointment Time */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">Last Appointment Time</p>
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>May 16, 2025</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>10:30 PM</span>
              </div>
              <div className="flex items-center space-x-1 text-[#237B10]">
               <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.33301 9.33301L5.66634 11.6663L12.6663 4.33301" stroke="#237B10" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

                <span>Complete</span>
              </div>
            </div>
          </div>

          {/* Reason for Visit */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">Reason for Visit</p>
            <p className="text-sm text-gray-600">Need a cleaning</p>
          </div>

          {/* Visit Type */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">Visit Type</p>
            <p className="text-sm text-gray-600">New Patient Visit</p>
          </div>

          {/* Insurance */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">Insurance</p>
            <p className="text-sm text-gray-600">Blusky</p>
          </div>

         

          {/* SOAP Notes */}
          <div className="space-y-2">
            <h3 className="text-base font-semibold text-gray-900">SOAP Notes</h3>

            {/* Subjective */}
            <div className="rounded-md p-2 text-sm text-gray-700">
              <p className="font-semibold mb-1">Subjective</p>
              <p className="shadow-md rounded-md p-2">
                Patient presents for routine annual physical examination. Reports feeling well overall with no acute
                complaints. Denies chest pain, shortness of breath, or palpitations.
              </p>
            </div>

            {/* Objective */}
            <div className=" rounded-md p-2 text-sm text-gray-700">
              <p className="font-semibold mb-1">Objective</p>
              <p className="shadow-md rounded-md p-2">
                Vital signs stable. BP 120/80, HR 72, Temp 98.6°F. Physical examination unremarkable. Heart regular rate
                and rhythm, lungs clear bilaterally.
              </p>
            </div>

            {/* Assessment */}
            <div className=" rounded-md p-2 text-sm text-gray-700">
              <p className="font-semibold mb-1">Assessment</p>
              <p className="shadow-md rounded-md p-2">Healthy adult male for routine preventive care visit.</p>
            </div>

            {/* Plan */}
            <div className=" rounded-md p-2 text-sm text-gray-700">
              <p className="font-semibold mb-1">Plan</p>
              <p className="shadow-md rounded-md p-2">
                Continue current lifestyle habits. Return in 1 year for annual physical. Labs ordered for screening.
              </p>
            </div>
          </div>

          

       
        </div>

        {/* Book Appointment Button */}
        <div className="p-6 pt-0">
           <Link href="/appointment/reschedule/details"> <button className="w-full py-2 px-4 bg-[#2E8BC9]  text-white font-medium rounded-md transition-colors">
           End appointment & Send to secretary 
          </button></Link>
        </div>
      </div>
    {/* Timer Overlay */}
      {showTimer && (
        <div className=" inset-0  bg-[#F2F8FD] flex items-center justify-center z-50">
          <div className="bg-[#F2F8FD] shadow-md absolute right-[80px] bottom-[-225px] rounded-lg p-6 mx-4 w-full max-w-sm">
            {/* Patient Info in Timer */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">Ma</span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">Mahmudur Rahman</h3>
                <p className="text-sm text-gray-500">Patient ID: P607RB</p>
              </div>
            
               <button className="p-2 text-blue-500 rounded-full hover:bg-gray-100">
               <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_3423_46603)">
<rect x="4" y="1" width="40" height="40" rx="8" fill="#2E8BC9"/>
<path d="M24 11C29.5221 11 33.9998 15.2834 34 20.5664C34 25.8496 29.5222 30.1338 24 30.1338C23.3507 30.1347 22.7032 30.0738 22.0654 29.9541C21.6066 29.8679 21.377 29.8252 21.2168 29.8496C21.0565 29.8741 20.8292 29.9947 20.375 30.2363C19.0902 30.9196 17.5922 31.1605 16.1514 30.8926C16.6988 30.2191 17.0723 29.4111 17.2373 28.5449C17.3373 28.0149 17.0899 27.4999 16.7188 27.123C15.0332 25.4115 14 23.1048 14 20.5664C14.0002 15.2834 18.4779 11 24 11ZM20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22H20.0088C20.5611 22 21.0088 21.5523 21.0088 21C21.0088 20.4477 20.5611 20 20.0088 20H20ZM23.9951 20C23.443 20.0002 22.9951 20.4478 22.9951 21C22.9951 21.5522 23.443 21.9998 23.9951 22H24.0049L24.1064 21.9951C24.6109 21.9441 25.0049 21.5179 25.0049 21C25.0049 20.4821 24.6109 20.0559 24.1064 20.0049L24.0049 20H23.9951ZM27.9912 20C27.4389 20 26.9912 20.4477 26.9912 21C26.9912 21.5523 27.4389 22 27.9912 22H28C28.5523 22 29 21.5523 29 21C29 20.4477 28.5523 20 28 20H27.9912Z" fill="white"/>
</g>
<defs>
<filter id="filter0_d_3423_46603" x="0" y="0" width="48" height="48" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="3"/>
<feGaussianBlur stdDeviation="2"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.101961 0 0 0 0 0.25098 0 0 0 0 0.376471 0 0 0 0.1 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3423_46603"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3423_46603" result="shape"/>
</filter>
</defs>
</svg>

              </button>
          
             
            </div>

            {/* Timer Display */}
            <div className="bg-gray-900 rounded-lg p-6 text-center mb-4">
              <div className="text-white text-3xl font-mono font-bold mb-2">00 : 30 : 56</div>
              <div className="flex justify-center gap-8 text-xs text-gray-400">
                <span>hours</span>
                <span>minute</span>
                <span>second</span>
              </div>
            </div>

            {/* Timer Controls */}
            <div className="flex gap-3">
              <button 
                className="flex-1 rounded-md border border-[#2E8BC9] bg-white text-[#2E8BC9] py-2 px-4 text-sm font-medium hover:bg-gray-50"
                onClick={() => setShowTimer(false)}
              >
                View Details
              </button>
              <button 
                className="flex-1 rounded-md bg-red-500 py-2 px-4 text-sm font-medium text-white hover:bg-red-600"
                onClick={() => setShowTimer(false)}
              >
                Finish
              </button>
            </div>
          </div>
        </div>
      )}

    </div>

    </div>
    
  )
}