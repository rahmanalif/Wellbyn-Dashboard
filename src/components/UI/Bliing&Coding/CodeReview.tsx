import Image from 'next/image'
import React, { useState } from 'react'
import AddCode from './AddCode'

export default function CodeReview() {
    const [showAddCode, setShowAddCode] = useState<boolean>(false)
  return (
    <div className='relative mt-[16px]'>
        <div> <br /> 
            <h2 className='text-[#3D3D3D] font-[500] text-[18px]'>SOAP Notes</h2> <br />
            <div className='flex items-stretch justify-center gap-3 mr-0'>
                
                <div className='p-4 border-[1px] border-[#DCDCDC] rounded-md flex-wrap w-full'>
                    <h3 className='text-[18px] text-[#3D3D3D] font-[700] mb-4'>Subjective</h3>
                    <p className='font-[500] text-[14px] text-[#7C7C7C]'>
                        Patient presents for routine annual physical examination. Reports feeling well overall with no acute complaints. Denies chest pain, shortness of breath, or palpitations.
                    </p>
                </div>
                <div className='p-4 border-[1px] border-[#DCDCDC] rounded-md w-full'>
                    <h3 className='text-[18px] text-[#3D3D3D] font-[700] mb-4'>Objective</h3>
                    <p className='font-[500] text-[14px] text-[#7C7C7C]'>
                        Vital signs stable. BP 120/80, HR 72, Temp 98.6°F. Physical examination unremarkable. Heart regular rate and rhythm, lungs clear bilaterally.
                    </p>
                </div>
            </div>
            <div className='flex items-stretch justify-center gap-3 mt-3.5'>
                <div className='p-4 border-[1px] border-[#DCDCDC] rounded-md w-full'>
                    <h3 className='text-[18px] text-[#3D3D3D] font-[700] mb-4'>Assessment</h3>
                    <p className='font-[500] text-[14px] text-[#7C7C7C]'>
                        Healthy adult male for routine preventive care visit.
                    </p>
                </div>
                <div className='p-4 border-[1px] border-[#DCDCDC] rounded-md w-full'>
                    <h3 className='text-[18px] text-[#3D3D3D] font-[700] mb-4'>Plan</h3>
                    <p className='font-[500] text-[14px] text-[#7C7C7C]'>
                        Continue current lifestyle habits. Return in 1 year for annual physical. Labs ordered for screening.
                    </p>
                </div>
            </div>
        </div>
        <div className='flex items-center justify-between mt-8 mr-0'>
            <h3 className='text-[24px] font-[500] text-[#3D3D3D]'>Suggested Codes</h3>
            <button onClick={() => setShowAddCode(true)} className='bg-[#F2F8FD] hover:opacity-80 text-[#2E8BC9] px-4 py-2 shadow-md flex items-center justify-center gap-2 cursor-pointer rounded-md  '>
                <Image  src="/add-01.svg" alt='add icon' width="20" height="20" />
                Add Code
            </button>
        </div>
        <div className='pb-8'>
            <div className='bg-[#DCDCDC] p-4 w-full mr-4 rounded-md mt-4 flex items-center justify-between'>
                <div>
                    <div className='flex items-start justify-start mb-2'>
                    <br />
                        <span className='text-[#2B4DCA] bg-[#F0F5FE] rounded-full text-[12px] px-[8px] py-[6px] font-[500]'>ICD-10</span>
                        <span className='mx-3 text-[12px] font-[500] px-[8px] py-[6px]'>Z00.00</span>
                        <span className='flex items-center justify-center gap-2 text-[#237B10] bg-[#EEFEE7] text-[12px] font-[500] px-[8px] py-[6px] rounded-full'>
                            <Image src="/tick-02.svg" alt='tik icon' width="20" height="20"/>
                            ICD-10
                        </span>
                    </div>
                    <p className='text-[14px] text-[#7C7C7C] font-[500]'>Encounter for general adult medical examination without abnormal findings</p>
                </div>
                <div className='flex items-center justify-center gap-[12px]'>
                    <Image src="/Frame 2147226750.svg" alt='update icon' width="30" height="30" className='cursor-pointer'/>
                    <Image src="/delete-02.svg" alt='update icon' width="20" height="20" className='cursor-pointer'/>
                </div>
            </div>
            <div className='bg-[#DCDCDC] p-4 w-full mr-4 rounded-md mt-4 flex items-center justify-between'>
                <div>
                    <div className='flex items-start justify-start mb-2'>
                    <br />
                        <span className='text-[#8226CA] bg-[#FAF5FF] rounded-full text-[12px] font-[500] px-[8px] py-[6px]'>ICD-10</span>
                        <span className='mx-3 text-[12px] font-[500] px-[8px] py-[6px]'>Z00.00</span>
                        <span className='flex items-center justify-center gap-2 text-[#93531F] bg-[#FBF7EB]  px-[8px] py-[6px] rounded-full text-[12px] font-[500]'>
                            <Image src="/information-circle.svg" alt='tik icon' width="20" height="20"/>
                            ICD-10
                        </span>
                    </div>
                    <p className='text-[14px] text-[#7C7C7C] font-[500]'>Encounter for general adult medical examination without abnormal findings</p>
                </div>
                <div className='flex items-center justify-center gap-[12px]'>
                    <Image src="/Frame 2147226750.svg" alt='update icon' width="30" height="30" className='cursor-pointer'/>
                    <Image src="/delete-02.svg" alt='update icon' width="20" height="20" className='cursor-pointer'/>
                </div>
            </div>
        </div>
        {
            showAddCode && <AddCode showAddCode={showAddCode} setShowAddCode={setShowAddCode} />
        }
    </div>
  )
}
