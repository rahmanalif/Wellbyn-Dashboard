"use client"

import { useState } from "react"
import { Search, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Doctor {
  id: string
  name: string
  avatar: string
}

interface CalendarSlot {
  type: "morning" | "afternoon" | "evening"
  slots: string
  color: string
}

interface CalendarData {
  [yearMonth: string]: {
    [day: number]: CalendarSlot[]
  }
}

const doctors: Doctor[] = [
  { id: "PG0758", name: "Rami Rahman Chowdhury", avatar: "/placeholder.svg?height=32&width=32" },
  { id: "J0K1L2", name: "Tariq Rahman Chowdhury", avatar: "/placeholder.svg?height=32&width=32" },
  { id: "V2W3X4", name: "Maya Rahman Chowdhury", avatar: "/placeholder.svg?height=32&width=32" },
  { id: "D4E5F6", name: "Sami Rahman Chowdhury", avatar: "/placeholder.svg?height=32&width=32" },
]

const calendarData: CalendarData = {
  "2025-02": {
    1: [{ type: "morning", slots: "10+", color: "blue" }],
    5: [{ type: "afternoon", slots: "20+", color: "red" }],
    15: [{ type: "evening", slots: "20+", color: "red" }],
    17: [
      { type: "morning", slots: "5+", color: "blue" },
      { type: "afternoon", slots: "15+", color: "green" }
    ],
  }
}

const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

export default function DoctorAppointmentScheduler() {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor>(doctors[0])
  const [searchTerm, setSearchTerm] = useState("")
  const [currentDate, setCurrentDate] = useState<Date>(new Date(2025, 1, 1)) // February 2025

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getDaysInMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const renderCalendarGrid = () => {
    const daysInMonth = getDaysInMonth(currentDate)
    const firstDayIndex = getFirstDayOfMonth(currentDate)
    const weeks = []
    let dayCounter = 1

    for (let week = 0; week < 6; week++) {
      const weekDays = []
      
      for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
        const cellIndex = week * 7 + dayOfWeek
        
        if (cellIndex < firstDayIndex || dayCounter > daysInMonth) {
          weekDays.push(
            <div key={`empty-${week}-${dayOfWeek}`} className="h-50 border border-gray-200 bg-white"></div>
          )
        } else {
          const day = dayCounter
          const dateKey = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}`
          const dayData = calendarData[dateKey]?.[day] || []

          weekDays.push(
            <div 
              key={day} 
              className={`h-50 border border-gray-200 p-2 relative bg-white ${
                day === new Date().getDate() && currentDate.getMonth() === new Date().getMonth() ? 'bg-blue-50' : ''
              }`}
            >
              <div className={`text-sm text-end font-medium ${day === new Date().getDate() ? 'text-blue-600' : 'text-gray-900'}`}>
                {day}
              </div>
              <div className="space-y-2 mt-2">
                {dayData.map((slot, index) => (
                  <div
                    key={index}
                    className={`text-xs px-2 py-1 rounded font-medium ${
                      slot.type === 'evening' ? 'bg-[#FBF7EB] text-[#93531F]' :
                      slot.type === 'morning' ? 'bg-[#EEFEE7] text-[#237B10]' :
                      slot.type === 'afternoon' ? 'bg-[#F0F5FE] text-[#2B4DCA]' :
                      'bg-gray-100'
                    }`}
                  >
                    <div className="flex justify-between">
                      <span>Dr. Sakil</span>
                      <span>{slot.slots}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
          dayCounter++
        }
      }
      
      weeks.push(
        <div key={week} className="grid grid-cols-7">
          {weekDays}
        </div>
      )
      
      if (dayCounter > daysInMonth) break
    }

    return weeks
  }

  return (
    <div className="flex h-screen bg-[#F6F9FC]">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-[#7C7C7C] mb-3">Doctor</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search here ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 shadow-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="flex p-4 bg-[#EDF4FA]">
            <div className="text-xs text-gray-500 w-12 mr-3">ID</div>
            <div className="flex-1">
              <div className="text-xs text-gray-500 w-12 mr-3">Doctor</div>
            </div>
          </div>

          {filteredDoctors.map((doctor) => (
            <div
              key={doctor.id}
              className={`flex items-center font-semibold p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 ${
                selectedDoctor.id === doctor.id ? "bg-white" : ""
              }`}
              onClick={() => setSelectedDoctor(doctor)}
            >
              <div className="text-xs text-gray-500 w-12 mr-3">{doctor.id}</div>
              <div className="h-8 w-8 mr-3 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                <Image src="/placeholder.svg" width={100} height={100} alt="images" />
              </div>
              <div className="flex-1 min-w-0">
                <Link href="/calendar/details">
                  <div className="text-sm font-medium text-gray-900 truncate">{doctor.name}</div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-[#3D3D3D]">Doctor Appointment Schedule</h1>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-[#3D3D3D] font-medium">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </div>
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}
                  className="p-1.5 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}
                  className="p-1.5 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar */}
        <div className="p-4 flex-1 overflow-auto">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 w-full">
            {/* Calendar Header */}
            <div className="grid grid-cols-7 border-b border-gray-200">
              {weekDays.map((day) => (
                <div key={day} className="p-3 text-center text-sm font-medium text-[#3D3D3D] bg-gray-50 border-r border-gray-200 last:border-r-0">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-rows-6 min-h-[800px]">
              {renderCalendarGrid()}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}