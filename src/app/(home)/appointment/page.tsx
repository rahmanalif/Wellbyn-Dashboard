"use client"
import Image from "next/image";
import { Plus, Calendar, Users, MapPin, Clock } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function AppointmentDashboard() {
  const [activeTab, setActiveTab] = useState("doctor");

  const doctorAppointments = Array(9).fill({
    doctorName: "Dr. Moule Marrk",
    specialty: "Cardiology",
    location: "Sylhet Health Center",
    date: "16 May, 2025",
    totalPatients: 46,
  });

  const patientAppointments = [
    {
      id: 1,
      patientName: "Mahmudur Rahman",
      patientId: "P007RB",
      date: "May 16, 2025",
      time: "10:30 PM",
      hasPreVisit: true,
      canStartAppointment: true,
      checkedIn: false,
    },
    {
      id: 2,
      patientName: "Mahmudur Rahman",
      patientId: "P007RB",
      date: "May 16, 2025",
      time: "10:30 PM",
      hasPreVisit: true,
      canStartAppointment: true,
      checkedIn: false,
    },
    {
      id: 3,
      patientName: "Mahmudur Rahman",
      patientId: "P007RB",
      date: "May 16, 2025",
      time: "10:30 PM",
      hasPreVisit: false,
      canStartAppointment: false,
      checkedIn: false,
    },
    {
      id: 4,
      patientName: "Mahmudur Rahman",
      patientId: "P007RB",
      date: "May 16, 2025",
      time: "10:30 PM",
      hasPreVisit: false,
      canStartAppointment: false,
      checkedIn: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-4">
      <div className="max-w-full ">
        {/* Header Tabs */}
        <div className="flex gap-3 p-3 mb-8 bg-white w-md rounded-lg">
          <button
            onClick={() => setActiveTab("doctor")}
            className={`px-4 py-2 text-sm font-medium   ${activeTab === "doctor"
                ? "bg-white shadow-md rounded-md text-gray-700"
                : " text-gray-500"
              } hover:bg-white`}
          >
            View As Doctor
          </button>
          <button
            onClick={() => setActiveTab("patient")}
            className={`px-4 py-2 text-sm font-medium  ${activeTab === "patient"
                ? "bg-white shadow-md rounded-md text-gray-700"
                : " text-gray-500"
              } hover:bg-white`}
          >
            View As Patient
          </button>
        </div>

        {/* Common Header */}
        <div className="bg-white px-4 pt-4 shadow-md rounded-lg">
          <div className="flex items-center justify-between mb-6 ">
            <div>
              <h1 className="text-2xl font-semibold text-[#3D3D3D]">Appointment</h1>
              <p className="text-sm text-[#737373] mt-1">Total: 1200</p>
            </div>
            <Link href="/appointment/addnew">
              <button className="flex items-center px-4 py-2 bg-[#2E8BC9] hover:bg-[#2E8BC9] text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <Plus className="w-4 h-4 mr-2" />
                Add New
              </button>
            </Link>

          </div>     {/* Doctor View Filters */}
          <div className="flex gap-4 mb-8 pb-5">
            {/* Today Select */}
            <div className="relative w-full">
              <select className="w-full px-3 py-2 text-sm shadow-sm rounded-md appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="today">Today</option>
                <option value="tomorrow">Tomorrow</option>
                <option value="this-week">This Week</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </div>

            {/* Doctor Select */}
            <div className="relative w-full">
              <select className="w-full px-3 py-2 text-sm shadow-sm rounded-md appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Select doctor name</option>
                <option value="dr-marrk">Dr. Moule Marrk</option>
                <option value="dr-smith">Dr. John Smith</option>
                <option value="dr-johnson">Dr. Sarah Johnson</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </div>

            {/* Discipline Select */}
            <div className="relative w-full">
              <select className="w-full px-3 py-2 text-sm shadow-sm rounded-md appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Discipline</option>
                <option value="cardiology">Cardiology</option>
                <option value="neurology">Neurology</option>
                <option value="orthopedics">Orthopedics</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>


        {activeTab === "doctor" ? (
          <>


            {/* Doctor Appointment Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {doctorAppointments.map((appointment, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg  p-6 shadow-sm"
                >
                  {/* Doctor Info */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden">
                      <Image
                        src="/placeholder.svg"
                        alt="Doctor profile"
                        width={48}
                        height={48}
                        className="rounded-full"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {appointment.doctorName}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {appointment.specialty}
                      </p>
                      <p className="text-sm text-gray-500">
                        {appointment.location}
                      </p>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {appointment.date}
                    </span>
                  </div>

                  {/* Total Patients */}
                  <div className="flex items-center gap-2 mb-4">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      Total Patients -{" "}
                      <span className="font-medium text-[#2E8BC9]">
                        {appointment.totalPatients}
                      </span>
                    </span>
                  </div>

                  {/* View Details Button */}
                  <Link href="/appointment/details">
                    <button className="w-full px-4 py-2 bg-[#2E8BC9] hover:bg-[#2E8BC9] text-white rounded-md">
                      View Details
                    </button>
                  </Link>

                </div>
              ))}
            </div>
          </>
        ) : (
          <>


            {/* Patient Appointment Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {patientAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden"
                >
                  <div className="p-4">
                    {/* Patient Info */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-15 w-15 rounded-full bg-[#2E8BC9] flex items-center justify-center text-white font-medium">
                        Ma
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {appointment.patientName}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Patient ID: {appointment.patientId}
                        </p>
                      </div>
                      <div className="ml-auto">
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g filter="url(#filter0_d_3311_18119)">
                            <rect x="4" y="1" width="40" height="40" rx="8" fill="#2E8BC9" />
                            <path d="M24 11C29.5221 11 33.9998 15.2834 34 20.5664C34 25.8496 29.5222 30.1338 24 30.1338C23.3507 30.1347 22.7032 30.0738 22.0654 29.9541C21.6066 29.8679 21.377 29.8252 21.2168 29.8496C21.0565 29.8741 20.8292 29.9947 20.375 30.2363C19.0902 30.9196 17.5922 31.1605 16.1514 30.8926C16.6988 30.2191 17.0723 29.4111 17.2373 28.5449C17.3373 28.0149 17.0899 27.4999 16.7188 27.123C15.0332 25.4115 14 23.1048 14 20.5664C14.0002 15.2834 18.4779 11 24 11ZM20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22H20.0088C20.5611 22 21.0088 21.5523 21.0088 21C21.0088 20.4477 20.5611 20 20.0088 20H20ZM23.9951 20C23.443 20.0002 22.9951 20.4478 22.9951 21C22.9951 21.5522 23.443 21.9998 23.9951 22H24.0049L24.1064 21.9951C24.6109 21.9441 25.0049 21.5179 25.0049 21C25.0049 20.4821 24.6109 20.0559 24.1064 20.0049L24.0049 20H23.9951ZM27.9912 20C27.4389 20 26.9912 20.4477 26.9912 21C26.9912 21.5523 27.4389 22 27.9912 22H28C28.5523 22 29 21.5523 29 21C29 20.4477 28.5523 20 28 20H27.9912Z" fill="white" />
                          </g>
                          <defs>
                            <filter id="filter0_d_3311_18119" x="0" y="0" width="48" height="48" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                              <feFlood flood-opacity="0" result="BackgroundImageFix" />
                              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                              <feOffset dy="3" />
                              <feGaussianBlur stdDeviation="2" />
                              <feComposite in2="hardAlpha" operator="out" />
                              <feColorMatrix type="matrix" values="0 0 0 0 0.101961 0 0 0 0 0.25098 0 0 0 0 0.376471 0 0 0 0.1 0" />
                              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3311_18119" />
                              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3311_18119" result="shape" />
                            </filter>
                          </defs>
                        </svg>

                      </div>
                    </div>

                    {/* Date & Time */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <span>Date & Time</span>
                      </div>

                    </div>
                    <div className="flex justify-between  text-sm text-gray-900 mb-4">
                      <div className="flex gap-2"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.6668 1.33301V3.99967M5.3335 1.33301V3.99967" stroke="#3D3D3D" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M8.66667 2.66699H7.33333C4.81917 2.66699 3.5621 2.66699 2.78105 3.44804C2 4.22909 2 5.48617 2 8.00033V9.33366C2 11.8478 2 13.1049 2.78105 13.8859C3.5621 14.667 4.81917 14.667 7.33333 14.667H8.66667C11.1808 14.667 12.4379 14.667 13.2189 13.8859C14 13.1049 14 11.8478 14 9.33366V8.00033C14 5.48617 14 4.22909 13.2189 3.44804C12.4379 2.66699 11.1808 2.66699 8.66667 2.66699Z" stroke="#3D3D3D" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M2 6.66699H14" stroke="#3D3D3D" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg> {appointment.date}</div>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{appointment.time}</span>
                      </div>
                    </div>

                    {/* Check In Button */}
                    <div className="flex w-full justify-center items-center gap-2 mb-4">

                      <Link href="/patients/prescriptiongive" className="w-full" >
                        <button className="w-full flex justify-center gap-2 items-center bg-[#FBF7EB]  px-3 py-1 text-sm border border-orange-200 text-[#93531F] rounded-md  focus:outline-none focus:ring-2 focus:ring-orange-500">
                          <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.1177 21.367C13.6841 21.773 13.1044 22 12.5011 22C11.8978 22 11.3182 21.773 10.8845 21.367C6.91302 17.626 1.59076 13.4469 4.18627 7.37966C5.58963 4.09916 8.95834 2 12.5011 2C16.0439 2 19.4126 4.09916 20.816 7.37966C23.4082 13.4393 18.099 17.6389 14.1177 21.367Z" stroke="#93531F" strokeWidth="1.5" />
                            <path d="M9.5 11.8333C9.5 11.8333 10.375 11.8333 11.25 13.5C11.25 13.5 14.0294 9.33333 16.5 8.5" stroke="#93531F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>

                          Check In
                        </button></Link>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Link href="/patients/details" className="flex-1 "  >
                        <button className="w-full text-[#2E8BC9] px-3 py-2 text-sm shadow-md rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-500">
                          View Details
                        </button></Link>
                      {appointment.hasPreVisit && (
                        <Link href="/patients/prescription" className="flex-1 "  >
                          <button className=" w-full text-[#2E8BC9] px-3 py-2 text-sm shadow-md rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-500">
                            Pre-Visit
                          </button>
                        </Link>
                      )}
                    </div>

                    {/* Start Appointment Button */}
                    {appointment.canStartAppointment && (
                      <Link href="/appointment/book">
                        <button className="w-full mt-3 px-4 py-2 bg-[#2E8BC9] hover:bg-[#2E8BC9] text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                          Start Appointment
                        </button></Link>
                    )}
                   {/* {!appointment.canStartAppointment && (

                      <button className="w-full mt-3 px-4 py-2 border border-gray-300 rounded-md hover:bg-[#2E8BC9] focus:outline-none focus:ring-2 focus:ring-blue-500">
                        View Details
                      </button>
                    )} */}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}