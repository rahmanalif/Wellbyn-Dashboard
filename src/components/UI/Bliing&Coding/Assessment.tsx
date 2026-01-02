import Image from 'next/image'
import React from 'react'

export default function Assessment() {
  return (
    <div> 
        <br /> <br />
        <h2 className='text-[18px] font-[500] text-[#3D3D3D]'>Reason for a meeting</h2>
        <p className='font-[500] text-[16px] text-[#7C7C7C]'>Need a cleaning</p>

        <br /> <br />
        <h2 className='text-[18px] text-[#3D3D3D] font-[500] leading-[24px] mb-[8px]'>Vital signs</h2>
        <p className='text-[#7C7C7C]'>
            <span className='text-[#333] font-[500]'>Blood Pressure : </span>
            130/85 mmHg 
        </p>
        <p className='text-[#7C7C7C]'>
            <span className='text-[#333] font-[500]'>Heart Rate : </span>
            88 bpm
        </p>
        <p className='text-[#7C7C7C]'>
            <span className='text-[#333] font-[500]'>Temperature : </span>
            100,20F
        </p>
            <br /> <br />
        <p className='text-[18px] font-[500] text-[#3D3D3D]'>Download Report</p>
        <button className='cursor-pointer text-[#2E8BC9] flex items-center justify-center gap-2 px-4 py-2 rounded-md mt-4 shadow-md'>
            <Image src="/download-circle-01.svg" width="15" height="15" alt='download icon'/>
            Download
        </button>
        <h3 className='text-lg mt-8'>
            <span className='text-[#7C7C7C] font-[500] text-[18px]'>Upcoming</span>
            <span className='text-[#2E8BC9] font-[500] text-[18px] ml-4'>- In 7 days </span>
        </h3>
    </div>
  )
}
