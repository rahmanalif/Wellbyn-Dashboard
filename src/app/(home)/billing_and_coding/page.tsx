"use client"
import BillingCodeDialogBox from '@/components/UI/Bliing&Coding/BillingCodeDialogBox'
import { firstCardInfo } from '@/utils/billing&coding_cards_info'
import Image from 'next/image'
import React, { useState } from 'react'
import { tableData } from './data'

export default function page() {
    const [showDialogBox, setShowDialogBox] = useState<boolean>(false)
    return (
        <div className=''>
            <div className='px-2 md:px-6'>
             
                <div className='flex items-center justify-between flex-wrap md:flex-nowrap gap-[24px]'>
                    {
                        firstCardInfo.map(info =>
                            <div key={info.id} className='relative p-4 rounded-sm bg-white w-full shadow-md'>
                                <Image src={info.imagePath} alt={info.text} width="48" height="48" className='' />
                                <br />
                                <p className='font-[500] text-[#999] text-[18px]'>{info.text}</p>
                                <br />
                                <div className='flex items-center justify-between'>
                                    <p className='text-[32px] font-[700]'>{info.count}</p>
                                    <span className='flex items-center justify-center bg-[#EEFEE7] p-1 text-[12px] font-[500] rounded-full text-[#237B10]'>
                                        <Image src="/Arrow up.svg" alt='arrow up' width="16" height="16" />
                                        +12
                                    </span>
                                </div>
                            </div>
                        )
                    }
                </div>
                <br />
                <div className='bg-white p-2 md:p-4 rounded-lg'>
                    <div className='flex items-center justify-between flex-wrap md:flex-nowrap'>
                        <div className='gap-[8px]'>
                            <h3 className=' text-[24px] font-[500]'>Appointment</h3> <br />
                            <p className='font-[400] text-[16px] text-[#737373]'>Total: 120</p>
                        </div>
                        <div className='flex items-center justify-center gap-4 flex-wrap mt-8 md:mt-0'>
                            <div className='flex items-center justify-center gap-2 rounded-md px-2 py-0.5 shadow-md focus-within:ring-2 focus-within:ring-[#2E8BC9] focus-within:outline-none'>
                                <label htmlFor="search"><Image src="/search.svg" alt='search image' width="25" height="25" /></label>
                                <input className='border-none outline-none p-1 text-lg w-full' type="search" name="search" id="search" placeholder='Search here...' />
                            </div>
                            <div className='focus-within:ring-2 focus-within:ring-[#2E8BC9] focus-within:outline-none'>
                                <select name="type" id="type" className='shadow-md w-full flex items-center justify-center gap-2 rounded-md p-2 border-none outline-none text-lg'>
                                    <option value="">All types</option>
                                    <option value="">Type 1</option>
                                    <option value="">Type 2</option>
                                </select>
                            </div>
                            <div className='focus-within:ring-2 focus-within:ring-[#2E8BC9] focus-within:outline-none'>
                                <select name="time" id="time" className='shadow-md w-full flex items-center justify-center gap-2 rounded-md p-2 border-none outline-none text-lg'>
                                    <option value="">Today</option>
                                    <option value="">Tomorrow</option>
                                    <option value="">The day after tomorrow</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <br /><br />
                    <div className="w-full overflow-x-auto">
                        <table className="min-w-[1000px] w-full p-4 billing&coding_table">
                            <thead className="bg-[#EDF4FA] rounded-md text-left">
                                <tr className="bg-[#EDF4FA] rounded-md text-left text-[#7C7C7C]">
                                    <th style={{ borderRadius: "10px 0 0 0" }} className="px-[6px] py-[14px] font-[500]">ID</th>
                                    <th className="px-[6px] py-[14px] font-[500]">Patient's Name</th>
                                    <th className="px-[6px] py-[14px] font-[500]">Contact</th>
                                    <th className="px-[6px] py-[14px] font-[500]">Gender</th>
                                    <th className="px-[6px] py-[14px] font-[500]">Last Visit</th>
                                    <th className="px-[6px] py-[14px] font-[500]">Status</th>
                                    <th className="px-[6px] py-[14px] font-[500]" style={{ borderRadius: "0 10px 0 0" }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    tableData.map((data, index) => (
                                        <tr key={`${data.id}-${index}`}>
                                            <td className="py-[12px] px-[6px] text-[#3D3D3D] font-[500] text-[16px]">{data.id}</td>

                                            <td className="py-[12px] px-[6px] text-[#3D3D3D] font-[500] text-[16px] max-w-[200px]">
                                                <div className="flex items-center gap-2">
                                                    <span className="p-1 px-2 rounded-full bg-[#F2F8FD] text-[#2E8BC9]">R</span>
                                                    <span className="block truncate max-w-[130px] lg:max-w-none">{data.name}</span>
                                                </div>
                                            </td>
                                            <td className="py-[12px] px-[6px] text-[#3D3D3D] font-[500] text-[16px] max-w-[250px]">
                                                <div className="block truncate max-w-[180px] lg:max-w-none">
                                                    {data.email}
                                                </div>
                                                <div>(555) 123-4567</div>
                                            </td>

                                            <td className="py-[12px] px-[6px] text-[#3D3D3D] font-[500] text-[16px]">Male</td>
                                            <td className="py-[12px] px-[6px] text-[#3D3D3D] font-[500] text-[16px]">04-30-2026</td>
                                            <td className="py-[12px] px-[6px] text-[#3D3D3D] font-[500] text-[16px]">
                                                <span className="py-[6px] px-[8px] rounded-full bg-[#EEFEE7] text-[#237B10] text-[12px] font-[500]">In care</span>
                                            </td>
                                            <td className="py-[12px] px-[6px] text-[#3D3D3D] font-[500] text-[16px]">
                                                <div className="flex items-center gap-[10px]">
                                                    <Image src="/pencil-edit-02.svg" alt="edit" width={24} height={24} />
                                                    <Image
                                                        onClick={() => setShowDialogBox(true)}
                                                        src="/Frame 2147226749.svg"
                                                        alt="view"
                                                        width={32}
                                                        height={32}
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>


                </div>
            </div>
            {
                // showDialogBox ? <BillingCodeDialogBox showDialogBox={showDialogBox} setShowDialogBox={setShowDialogBox} /> : <></>
                <BillingCodeDialogBox showDialogBox={showDialogBox} setShowDialogBox={setShowDialogBox} />
            }
        </div>
    )
}
