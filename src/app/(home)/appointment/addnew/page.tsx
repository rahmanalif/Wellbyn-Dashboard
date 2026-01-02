"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface CalendarDay {
  day: string;
  date: number | null;
  isCurrentMonth: boolean;
}

export default function AppointmentForm() {
  const [selectedDate, setSelectedDate] = useState<number>(4)
  const [selectedTime, setSelectedTime] = useState<string>("2:16 PM")
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date(2025, 1, 1)) // Feb 2025
  const [calendarDays, setCalendarDays] = useState<CalendarDay[]>([])

  const timeSlots = ["11:45 AM", "4:30 AM", "1:55 AM", "6:20 PM", "2:16 PM", "10:05 PM", "10:05 PM", "7:00 PM"]

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
    
    // If we have less than 14 days (like in the example), add empty cells
    while (days.length < 14) {
      days.push({ day: "", date: null, isCurrentMonth: false })
    }
    
    // Take only the first 14 days to match the example layout
    setCalendarDays(days.slice(0, 14))
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
    <div className="max-w-2/4 mx-auto p-6 bg-white rounded-lg shadow-sm">
      <div className="space-y-6">
        {/* Visit Reason */}
        <div className="space-y-2">
          <label htmlFor="visit-reason" className="block text-sm font-medium text-gray-700">
            Visit Reason
          </label>
          <input
            id="visit-reason"
            placeholder="I need a cleaning"
            defaultValue="I need a cleaning"
            className="min-h-[30px] w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Visit Type */}
        <div className="space-y-2">
          <label htmlFor="visit-type" className="block text-sm font-medium text-gray-700">
            Visit Type
          </label>
          <select
            id="visit-type"
            defaultValue="new-patient"
            className="block w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="new-patient">New Patient Visit</option>
            <option value="follow-up">Follow-up Visit</option>
            <option value="consultation">Consultation</option>
          </select>
        </div>

        {/* Patient Email */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Patients Email
          </label>
          <input
            id="email"
            type="email"
            defaultValue="sakib@email.com"
            className="block w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Patient Phone */}
        <div className="space-y-2">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Patients Phone
          </label>
          <input
            id="phone"
            type="tel"
            defaultValue="+1 9999999999"
            className="block w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Preferred Doctor */}
        <div className="space-y-2">
          <label htmlFor="doctor" className="block text-sm text-gray-700">
            Preferred Doctor (Optional)
          </label>
          <select
            id="doctor"
            defaultValue="dr-sakib"
            className="block w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="dr-sakib">Dr. Sakib Ahamed</option>
            <option value="dr-smith">Dr. Smith Johnson</option>
            <option value="dr-brown">Dr. Brown Wilson</option>
          </select>
        </div>

        {/* Date Selection */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Select your date</h3>
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={prevMonth}
                className="p-1 rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-sm text-gray-600">
                {currentMonth.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              </span>
              <button
                type="button"
                onClick={nextMonth}
                className="p-1 rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Calendar Grid - Exactly matching the original design */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, index) => (
              <div key={index} className="text-center">
                <div className="text-xs text-gray-500 mb-1">{day.day}</div>
                <button
                  type="button"
                  onClick={() => day.date && setSelectedDate(day.date)}
                  disabled={!day.isCurrentMonth || day.date === null}
                  className={`w-14 h-6 rounded-md text-sm font-medium ${
                    selectedDate === day.date
                      ? 'bg-[#2E8BC9] text-white hover:bg-blue-600'
                      : day.isCurrentMonth && day.date !== null
                        ? 'text-gray-700 hover:bg-gray-100' 
                        : 'text-gray-300'
                  }`}
                >
                  {day.date}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Time Slots */}
        <div className="grid grid-cols-6 gap-2">
          {timeSlots.map((time, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setSelectedTime(time)}
              className={`text-xs py-1.5 px-2 rounded-md border ${
                selectedTime === time
                  ? 'bg-[#2E8BC9] border-blue-500 text-white hover:bg-blue-600'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {time}
            </button>
          ))}
        </div>

        {/* Book Appointment Button */}
        <button
          type="button"
          className="w-full py-3 px-4 bg-[#2E8BC9] hover:bg-blue-600 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Book Appointment
        </button>
      </div>
    </div>
  )
}