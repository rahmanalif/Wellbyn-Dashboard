"use client"

import { AlertCircle } from "lucide-react"
import { useState } from "react"

interface CancelAppointmentModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirmCancel: () => void
  onReschedule: () => void
}

export default function CancelAppointmentModal({
  open,
  onOpenChange,
  onConfirmCancel,
  onReschedule,
}: CancelAppointmentModalProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 rounded-6xl  bg-opacity-50 flex items-center justify-center p-2 z-50">
      <div className="bg-white rounded-2xl shadow-xl  w-[300px] p-3">
        <div className=" space-y-4">
        <div className="flex justify-center">
                <AlertCircle className="w-6 h-6 text-red-500" />
        </div>
        
         
          <h2 className="text-lg font-semibold">Cancel Appointment ?</h2>
          <div className="text-sm text-gray-600 space-y-2">
            <p>Could you please confirm your intention to cancel the appointment?</p>
            <p>
              If needed, you may{" "}
              <button 
                onClick={onReschedule} 
                className="text-[#2E8BC9] hover:text-blue-800 underline font-medium"
              >
                Reschedule
              </button>{" "}
              for a later date.
            </p>
          </div>
        </div>
        <div className="mt-6 flex flex-col space-y-2">
          <button 
            onClick={onConfirmCancel} 
            className="  text-[#B42121] py-2 border-t border-b border-[#DCDCDC] px-4  transition-colors"
          >
            Yes
          </button>
          <button 
            onClick={() => onOpenChange(false)} 
            className="text-[#2E8BC9]   hover:bg-gray-50 py-2 px-4 rounded-md transition-colors"
          >
            No
          </button>
        </div>
      </div>
    </div>
  )
}