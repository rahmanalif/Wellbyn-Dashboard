"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

interface CalendarDay {
  day: string;
  date: number | null;
  isCurrentMonth: boolean;
}

export default function AppointmentReschedule() {
  const [selectedDate, setSelectedDate] = useState<number>(11)
  const [selectedTime, setSelectedTime] = useState<string>("2:25 PM")
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date(2025, 1, 1)) // Feb 2025
  const [calendarDays, setCalendarDays] = useState<CalendarDay[]>([])

  const timeSlots = ["11:45 AM", "2:25 PM", "4:30 AM", "6:20 PM", "10:05 PM", "7:00 AM", "1:55 AM"]

  // Function to generate calendar days for the current month
  const generateCalendar = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    
    // First day of the month
    const firstDay = new Date(year, month, 1)
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0)
    // Days in the month
    const daysInMonth = lastDay.getDate()
    // Day of the week for the first day (0 = Sunday, 1 = Monday, etc.)
    const firstDayOfWeek = firstDay.getDay()
    
    // Adjust to start week on Monday (1) instead of Sunday (0)
    const adjustedFirstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1
    
    const days: CalendarDay[] = []
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < adjustedFirstDayOfWeek; i++) {
      days.push({ day: "", date: null, isCurrentMonth: false })
    }
    
    // Add days of the current month
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i)
      days.push({ 
        day: date.toLocaleDateString('en-US', { weekday: 'short' }), 
        date: i,
        isCurrentMonth: true 
      })
    }
    
    // If we have less than 12 days (like in the example), add empty cells
    while (days.length < 12) {
      days.push({ day: "", date: null, isCurrentMonth: false })
    }
    
    // Take only the first 12 days to match the example layout
    setCalendarDays(days.slice(0, 12))
  }

  // Navigate to previous month
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  // Navigate to next month
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  // Generate calendar on component mount and when currentMonth changes
  useEffect(() => {
    generateCalendar()
  }, [currentMonth])

  return (
    <div className="max-w-2/4 mx-auto bg-white p-4 rounded-md">
      {/* Patient Section */}
      <div className="mb-6">
        <h2 className="text-gray-600 text-sm mb-3">Patients</h2>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#2E8BC9] flex items-center justify-center">
              <span className="text-white font-medium">Ma</span>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Mahmudur Rahman</h3>
              <p className="text-sm text-gray-500">Patient ID: P002704</p>
            </div>
          </div>
          <button className="p-2 text-blue-500 rounded-full hover:bg-gray-100">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g filter="url(#filter0_d_1117_37760)">
                <rect x="4" y="1" width="40" height="40" rx="8" fill="#2E8BC9"/>
                <path d="M24 11C29.5221 11 33.9998 15.2834 34 20.5664C34 25.8496 29.5222 30.1338 24 30.1338C23.3507 30.1347 22.7032 30.0738 22.0654 29.9541C21.6066 29.8679 21.377 29.8252 21.2168 29.8496C21.0565 29.8741 20.8292 29.9947 20.375 30.2363C19.0902 30.9196 17.5922 31.1605 16.1514 30.8926C16.6988 30.2191 17.0723 29.4111 17.2373 28.5449C17.3373 28.0149 17.0899 27.4999 16.7188 27.123C15.0332 25.4115 14 23.1048 14 20.5664C14.0002 15.2834 18.4779 11 24 11ZM20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22H20.0088C20.5611 22 21.0088 21.5523 21.0088 21C21.0088 20.4477 20.5611 20 20.0088 20H20ZM23.9951 20C23.443 20.0002 22.9951 20.4478 22.9951 21C22.9951 21.5522 23.443 21.9998 23.9951 22H24.0049L24.1064 21.9951C24.6109 21.9441 25.0049 21.5179 25.0049 21C25.0049 20.4821 24.6109 20.0559 24.1064 20.0049L24.0049 20H23.9951ZM27.9912 20C27.4389 20 26.9912 20.4477 26.9912 21C26.9912 21.5523 27.4389 22 27.9912 22H28C28.5523 22 29 21.5523 29 21C29 20.4477 28.5523 20 28 20H27.9912Z" fill="white"/>
              </g>
              <defs>
                <filter id="filter0_d_1117_37760" x="0" y="0" width="48" height="48" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                  <feOffset dy="3"/>
                  <feGaussianBlur stdDeviation="2"/>
                  <feComposite in2="hardAlpha" operator="out"/>
                  <feColorMatrix type="matrix" values="0 0 0 0 0.101961 0 0 0 0 0.25098 0 0 0 0 0.376471 0 0 0 0.1 0"/>
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1117_37760"/>
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1117_37760" result="shape"/>
                </filter>
              </defs>
            </svg>
          </button>
        </div>
      </div>

      {/* Doctor Section */}
      <div className="mb-8">
        <h2 className="text-gray-600 text-sm mb-3">Doctor</h2>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            {/* Placeholder for doctor image */}
            <Image width={100} height={100} src="/placeholder.svg" alt="Doctor" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Dr. Moule Marrk</h3>
            <p className="text-sm text-gray-500">Cardiologist</p>
            <p className="text-sm text-gray-500">@ Sylhet Health Center</p>
          </div>
        </div>
      </div>

      {/* Date Selection */}
      <div className="bg-white rounded-lg overflow-hidden mb-6">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-gray-900">Select your date</h3>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <button onClick={prevMonth} className="p-1 hover:bg-gray-100 rounded">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span>{currentMonth.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
              <button onClick={nextMonth} className="p-1 hover:bg-gray-100 rounded">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-4">
            {calendarDays.map((day, index) => (
              <div key={index} className="text-center">
                <div className="text-xs text-gray-500 mb-1">{day.day}</div>
                <button
                  onClick={() => day.date && setSelectedDate(day.date)}
                  disabled={!day.isCurrentMonth || day.date === null}
                  className={`w-14 h-6 text-sm rounded-md transition-colors ${
                    selectedDate === day.date 
                      ? "bg-[#2E8BC9] text-white" 
                      : day.isCurrentMonth && day.date !== null
                        ? "text-gray-700 hover:bg-gray-100" 
                        : "text-gray-300"
                  }`}
                >
                  {day.date}
                </button>
              </div>
            ))}
          </div>

          {/* Time Slots */}
          <div className="grid grid-cols-5 gap-2">
            {timeSlots.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`px-3 py-2 text-sm rounded-md transition-colors ${
                  selectedTime === time 
                    ? "bg-[#2E8BC9] text-white" 
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Reschedule Button */}
      <button className="w-full bg-[#2E8BC9] hover:bg-blue-600 text-white py-3 rounded-lg flex items-center justify-center">
        <span className="mr-2">🔄</span>
        Reschedule
      </button>
    </div>
  )
}