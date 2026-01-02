"use client";

import { useState } from "react";
import { MessageSquare, CheckCircle2, XCircle, Download, CheckCircle, Clock, Calendar, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

type VitalSigns = {
  height: string;
  weight: string;
  bloodPressure: string;
  upperRespiratoryInfection: boolean;
  heartRate: string;
  temperature: string;
};

export default function PatientDashboard() {
  const [activeTab, setActiveTab] = useState("appointment");
  const [noteText, setNoteText] = useState("");
  const [vitalSigns, setVitalSigns] = useState<VitalSigns>({
    height: '',
    weight: '72',
    bloodPressure: '',
    upperRespiratoryInfection: false,
    heartRate: '130/65 mmHg',
    temperature: '98 bpm'
  });

  const handleInputChange = (field: keyof VitalSigns, value: string | boolean) => {
    setVitalSigns(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const [selectedDay, setSelectedDay] = useState<string>('');

  const daysOfWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Selected day:', selectedDay);
  };
  const appointments = [
    {
      id: 1,
      time: "16 May, 2025 || 10:30 PM",
      doctor: "Dr. Moule Markk",
      status: "Upcoming",
      isHighlighted: true,
    },
    {
      id: 2,
      time: "16 May, 2025 || 10:30 PM",
      doctor: "Dr. Moule Markk",
      status: "Next Follow Up In 7 Days",
      isHighlighted: false,
    },
    {
      id: 3,
      time: "16 May, 2025 || 10:30 PM",
      doctor: "Dr. Moule Markk",
      status: "Complete",
      isHighlighted: false,
    },
    {
      id: 4,
      time: "16 May, 2025 || 10:30 PM",
      doctor: "Dr. Moule Markk",
      status: "Complete",
      isHighlighted: false,
    },
    {
      id: 5,
      time: "16 May, 2025 || 10:30 PM",
      doctor: "Dr. Moule Markk",
      status: "Canceled",
      isHighlighted: false,
    },
  ];

  const getStatusClasses = (status: string) => {
    switch (status) {
      case "Upcoming":
        return "bg-orange-100 text-orange-600";
      case "Next Follow Up In 7 Days":
        return "bg-blue-100 text-blue-600";
      case "Complete":
        return "bg-green-100 text-green-600";
      case "Canceled":
        return "bg-red-100 text-red-600";
      default:
        return "";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Complete":
        return <CheckCircle2 className="w-4 h-4 mr-1" />;
      case "Canceled":
        return <XCircle className="w-4 h-4 mr-1" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
   

               <div className="flex justify-center py-8 px-4 sm:px-6 lg:px-8 bg-gray-100 min-h-screen">
      <div className="w-full max-w-[800px] bg-white rounded-xl shadow-lg overflow-hidden">
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
                <div className="relative w-full">
  <p className="text-sm font-medium text-gray-700 inline-block pr-2 bg-white relative z-10">Last Appointment Time</p>
  <span className="absolute left-0 right-0 top-1/2 h-px bg-gray-200 -z-0"></span>
</div>
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
<path d="M3.33331 9.3335L5.66665 11.6668L12.6666 4.3335" stroke="#237B10" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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

          {/* Vital Signs */}
          <div className="space-y-2">
            <h3 className="text-base font-semibold text-gray-900">Vital Signs</h3>
             <div className="p-6 space-y-4 shadow-md rounded-md">
        {/* Height and Weight Row */}
        <div className="grid grid-cols-2 gap-4 ">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Height
            </label>
            <input
              type="text"
              value={vitalSigns.height}
              onChange={(e) => handleInputChange('height', e.target.value)}
              className="w-full px-3 py-2 shadow-md rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter height"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Weight
            </label>
            <input
              type="text"
              value={vitalSigns.weight}
              onChange={(e) => handleInputChange('weight', e.target.value)}
              className="w-full px-3 py-2 shadow-md rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Blood Pressure */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Blood Pressure
          </label>
          <input
            type="text"
            value={vitalSigns.bloodPressure}
            onChange={(e) => handleInputChange('bloodPressure', e.target.value)}
            className="w-full px-3 py-2 shadow-md rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter blood pressure"
          />
        </div>

        {/* Upper Respiratory Infection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upper Respiratory Infection
          </label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="upperRespiratoryInfection"
                checked={vitalSigns.upperRespiratoryInfection === true}
                onChange={() => handleInputChange('upperRespiratoryInfection', true)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">Yes</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="upperRespiratoryInfection"
                checked={vitalSigns.upperRespiratoryInfection === false}
                onChange={() => handleInputChange('upperRespiratoryInfection', false)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">No</span>
            </label>
          </div>
        </div>

        {/* Heart Rate */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Heart Rate
          </label>
          <input
            type="text"
            value={vitalSigns.heartRate}
            onChange={(e) => handleInputChange('heartRate', e.target.value)}
            className="w-full px-3 py-2 shadow-md rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Temperature */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Temperature
          </label>
          <input
            type="text"
            value={vitalSigns.temperature}
            onChange={(e) => handleInputChange('temperature', e.target.value)}
            className="w-full px-3 py-2 shadow-md rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
          </div>

          {/* SOAP Notes */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-gray-900">SOAP Notes</h3>

            {/* Subjective */}
            <div className="rounded-md p-3 text-sm text-gray-700">
              <p className="font-semibold mb-1">Subjective</p>
              <p className="shadow-md rounded-md p-2">
                Patient presents for routine annual physical examination. Reports feeling well overall with no acute
                complaints. Denies chest pain, shortness of breath, or palpitations.
              </p>
            </div>

            {/* Objective */}
            <div className=" rounded-md p-3 text-sm text-gray-700">
              <p className="font-semibold mb-1">Objective</p>
              <p className="shadow-md rounded-md p-2">
                Vital signs stable. BP 120/80, HR 72, Temp 98.6°F. Physical examination unremarkable. Heart regular rate
                and rhythm, lungs clear bilaterally.
              </p>
            </div>

            {/* Assessment */}
            <div className=" rounded-md p-3 text-sm text-gray-700">
              <p className="font-semibold mb-1">Assessment</p>
              <p className="shadow-md rounded-md p-2">Healthy adult male for routine preventive care visit.</p>
            </div>

            {/* Plan */}
            <div className=" rounded-md p-3 text-sm text-gray-700">
              <p className="font-semibold mb-1">Plan</p>
              <p className="shadow-md rounded-md p-2">
                Continue current lifestyle habits. Return in 1 year for annual physical. Labs ordered for screening.
              </p>
            </div>
          </div>

          {/* Download Report */}
          <div className="space-y-2">
            <h3 className="text-base font-semibold text-gray-900">Download Report</h3>
            <button className=" flex justify-center items-center py-2 px-4 text-[#2E8BC9] shadow-md bg-transparent rounded-md hover:bg-blue-50 transition-colors">
           <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.66667 7.99967V9.69581C2.66667 11.8591 2.66667 12.9408 3.25738 13.6735C3.37672 13.8215 3.51154 13.9563 3.65955 14.0756C4.39221 14.6663 5.47388 14.6663 7.6372 14.6663C8.1076 14.6663 8.34273 14.6663 8.55813 14.5903C8.60293 14.5745 8.6468 14.5563 8.68967 14.5359C8.89573 14.4373 9.062 14.271 9.3946 13.9384L12.5523 10.7807C12.9377 10.3953 13.1303 10.2027 13.2319 9.95761C13.3333 9.71261 13.3333 9.44007 13.3333 8.89507V6.66634C13.3333 4.15218 13.3333 2.89511 12.5523 2.11405C11.7713 1.33301 10.5141 1.33301 8 1.33301M8.66667 14.333V13.9997C8.66667 12.1141 8.66667 11.1713 9.25247 10.5855C9.83827 9.99967 10.7811 9.99967 12.6667 9.99967H13" stroke="#2E8BC9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M6.66667 3.33301C6.27344 2.92845 5.22685 1.33301 4.66667 1.33301C4.10649 1.33301 3.05989 2.92845 2.66667 3.33301M4.66667 1.99967V6.66634" stroke="#2E8BC9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

              Upload Report
            </button>
          </div>

          {/* Upcoming */}
          <form 
      onSubmit={handleSubmit}
      className="flex flex-col items-start gap-6  w-full "
    >
      <div className="w-full space-y-2">
        <label 
          htmlFor="check-in" 
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Next Check In
        </label>
        <select
          id="check-in"
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value)}
          className="block w-full px-4 py-2 text-base  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        >
          <option value="">Select days</option>
          {daysOfWeek.map((day) => (
            <option key={day.toLowerCase()} value={day.toLowerCase()}>
              {day}
            </option>
          ))}
        </select>
      </div>
      
      
    </form>
        </div>

        {/* Book Appointment Button */}
        <div className="p-6 pt-0">
          <button className="w-full py-2 px-4 bg-[#2E8BC9] hover:bg-blue-700 text-white font-medium rounded-md transition-colors">
            Save Change
          </button>
        </div>
      </div>
    </div>
      
          {/* Other tab contents would go here */}
     
      </div>
    </div>
  );
}