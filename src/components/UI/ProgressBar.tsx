import React from 'react'

export default function ProgressBar() {
  return (
    <div className="w-[62px] h-[73px] flex flex-col items-center justify-center rounded-md border border-gray-300">
      <div className="relative w-[40px] h-[40px]">
        <div
          className="absolute top-0 left-0 w-full h-full rounded-full"
          style={{
            background:
              "conic-gradient(#2d8dcf 0deg 135deg, #e6f0fa 135deg 360deg)",
          }}
        ></div>
        <div className="absolute top-1/2 left-1/2 w-[32px] h-[32px] bg-white rounded-full flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2">
          <span className="text-[#2d8dcf] font-bold text-sm">12</span>
        </div>
      </div>
      <div className="mt-1 text-[12px] text-gray-600 font-medium">total 32</div>
    </div>

  )
}

