import Image from 'next/image'
import React from 'react'
import InputComponent from './InputComponent'

export default function Insurance() {
    return (
        <div className='mt-8'>
            <form method="post">
                <h3 className='text-[#7C7C7C] font-[500] text-[16px] mb-6'>Insurance Information (Boxes 9-13)</h3>
                
                <div className='mb-8'>
                    <div>
                        <label className="font-[500] text-[18px] text-[#3D3D3D] mb-2" htmlFor="box-9">Box 9: Other Insured's Name</label>
                    </div>
                    <div className='flex items-center justify-center gap-4 flex-wrap md:flex-nowrap mt-4'>
                        {
                            ["First Name", "Middle", "Last"].map((nameData, index) => (
                                <InputComponent
                                    key={index}
                                    inputComponentProps={{
                                        inputClass: "text-[16px] mt-2 border-none focus:outline-2 focus:outline-[#2E8BC9] rounded-[8px] p-[12px] w-full shadow-md",
                                        labelClass: "font-[500] text-[18px] text-[#3D3D3D]",
                                        required: false,
                                        errorMessage: null,
                                        inputType: "text",
                                        name: "box-2",
                                        inputTag: "text",
                                        placeholder: nameData
                                    }}
                                />
                            ))
                        }
                    </div>
                </div>

                <div className='mb-8'>
                    <InputComponent
                        inputComponentProps={{
                            label: "Box 9a: Other Insured's Policy or Group Number",
                            inputClass: "text-[16px] mt-4 border-none focus:outline-2 focus:outline-[#2E8BC9] rounded-[8px] p-[12px] w-full shadow-md",
                            labelClass: "font-[500] text-[18px] text-[#3D3D3D]",
                            required: false,
                            errorMessage: null,
                            inputType: "text",
                            name: "box-9a",
                            inputTag: "text",
                        }}
                    />
                </div>

                <div className='mb-8'>
                    <InputComponent
                        inputComponentProps={{
                            label: "Box 9d: Insurance Plan Name or Program Name",
                            inputClass: "text-[16px] mt-4 border-none focus:outline-2 focus:outline-[#2E8BC9] rounded-[8px] p-[12px] w-full shadow-md",
                            labelClass: "font-[500] text-[18px] text-[#3D3D3D]",
                            required: false,
                            errorMessage: null,
                            inputType: "text",
                            name: "box-9d",
                            inputTag: "text",
                        }}
                    />
                </div>

                <div className='mb-8'>
                    <InputComponent
                        inputComponentProps={{
                            label: "Box 11: Insured's Policy Group or FECA Number",
                            inputClass: "text-[16px] mt-4 border-none focus:outline-2 focus:outline-[#2E8BC9] rounded-[8px] p-[12px] w-full shadow-md",
                            labelClass: "font-[500] text-[18px] text-[#3D3D3D]",
                            required: false,
                            errorMessage: null,
                            inputType: "text",
                            name: "box-11",
                            inputTag: "text",
                        }}
                    />
                </div>

                <div className='flex items-center justify-center gap-8 flex-wrap md:flex-nowrap mb-8'>
                    <div className='w-full'>
                        <InputComponent
                            inputComponentProps={{
                                label: "Box 11a: Insured's Date of Birth",
                                inputClass: "text-[16px] mt-4 border-none focus:outline-2 focus:outline-[#2E8BC9] rounded-[8px] p-[12px] w-full shadow-md",
                                labelClass: "font-[500] text-[18px] text-[#3D3D3D]",
                                required: false,
                                errorMessage: null,
                                inputType: "date",
                                name: "box-11a-1",
                                inputTag: "date",
                            }}
                        />
                    </div>
                    <div className='w-full'>
                        <label className="font-[500] text-[18px] text-[#3D3D3D] mb-2" htmlFor="box-11a-2">Box 11a: Insured's Sex</label>
                        <div className='flex gap-8 mt-4'>
                            <div className='flex items-center'>
                                <label className="font-[500] text-[18px] text-[#3D3D3D]" htmlFor="male">Male</label>
                                <input type="radio" name="insured-gender" id="male" className='ml-4 w-6 h-6' />
                            </div>
                            <div className='flex items-center'>
                                <label className="font-[500] text-[18px] text-[#3D3D3D]" htmlFor="female">Female</label>
                                <input type="radio" name="insured-gender" id="female" className='ml-4 w-6 h-6' />
                            </div>
                            <div className='flex items-center'>
                                <label className="font-[500] text-[18px] text-[#3D3D3D]" htmlFor="other">Other</label>
                                <input type="radio" name="insured-gender" id="other" className='ml-4 w-6 h-6' />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='mb-8'>
                    <InputComponent
                        inputComponentProps={{
                            label: "Box 11b: Other Claim ID (Designated by NUCC)",
                            inputClass: "text-[16px] mt-4 border-none focus:outline-2 focus:outline-[#2E8BC9] rounded-[8px] p-[12px] w-full shadow-md",
                            labelClass: "font-[500] text-[18px] text-[#3D3D3D]",
                            required: false,
                            errorMessage: null,
                            inputType: "text",
                            name: "box-11b",
                            inputTag: "text",
                        }}
                    />
                </div>

                <div className='mb-8'>
                    <InputComponent
                        inputComponentProps={{
                            label: "Box 11c: Insurance Plan Name or Program Name *",
                            inputClass: "text-[16px] mt-4 border-none focus:outline-2 focus:outline-[#2E8BC9] rounded-[8px] p-[12px] w-full shadow-md",
                            labelClass: "font-[500] text-[18px] text-[#3D3D3D]",
                            required: false,
                            errorMessage: null,
                            inputType: "text",
                            name: "box-11c",
                            inputTag: "text",
                            placeholder: "G987654321"
                        }}
                    />
                </div>

                <div className='flex items-center justify-center gap-8 flex-wrap md:flex-nowrap mb-8'>
                    <div className='w-full'>
                        <label className="font-[500] text-[18px] text-[#3D3D3D] mb-2" htmlFor="box-11d">Box 11d: Is There Another Health Benefit Plan?</label>
                        <div className='flex gap-16 mt-4'>
                            <div className='flex items-center'>
                                <label className="font-[500] text-[18px] text-[#3D3D3D]" htmlFor="yes">Yes</label>
                                <input type="radio" name="box-11d" id="yes" className='ml-4 w-6 h-6' />
                            </div>
                            <div className='flex items-center'>
                                <label className="font-[500] text-[18px] text-[#3D3D3D]" htmlFor="no">No</label>
                                <input type="radio" name="box-11d" id="no" className='ml-4 w-6 h-6' />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex items-end justify-center gap-8 flex-wrap md:flex-nowrap mb-8'>
                    <div className='w-full'>
                        <InputComponent
                            inputComponentProps={{
                                label: "Box 12: Patient's or Authorized Person's Signature",
                                inputClass: "text-[16px] mt-4 border-none focus:outline-2 focus:outline-[#2E8BC9] rounded-[8px] p-[12px] w-full shadow-md",
                                labelClass: "font-[500] text-[18px] text-[#3D3D3D]",
                                required: false,
                                errorMessage: null,
                                inputType: "text",
                                name: "box-12-1",
                                inputTag: "text",
                                placeholder: "G987654321"
                            }}
                        />
                    </div>
                    <div className='w-full'>
                        <InputComponent
                            inputComponentProps={{
                                label: "Box 12: Date",
                                inputClass: "text-[16px] mt-4 border-none focus:outline-2 focus:outline-[#2E8BC9] rounded-[8px] p-[12px] w-full shadow-md",
                                labelClass: "font-[500] text-[18px] text-[#3D3D3D]",
                                required: false,
                                errorMessage: null,
                                inputType: "date",
                                name: "box-12-1",
                                inputTag: "date",
                            }}
                        />
                    </div>
                </div>

                <div className='mb-8'>
                    <label className="font-[500] text-[18px] text-[#3D3D3D] mb-2" htmlFor="box-13">Box 13: Insured's or Authorized Person's Signature</label>
                    <button className='px-4 py-3 text-center flex gap-3 items-center text-[#2E8BC9] rounded-md mt-4 cursor-pointer shadow-md hover:bg-gray-50 transition-colors'>
                        <Image src="/view.svg" alt='View signature' width="20" height="20" />
                        <span>View signature</span>
                    </button>
                </div>

                <div className='mb-8'>
                    <h3 className='text-xl font-bold text-center text-[#7C7C7C]'>OR</h3>
                    <hr className='border-t-2 border-[#2E8BC9] my-4' />
                </div>

                <div className='mb-8'>
                    <div>
                        <InputComponent
                            inputComponentProps={{
                                label: "Box 13: Insured's or Authorized Person's Signature",
                                inputClass: "text-[16px] mt-4 border-none focus:outline-2 focus:outline-[#2E8BC9] rounded-[8px] p-[12px] w-full shadow-md min-h-[100px]",
                                labelClass: "font-[500] text-[18px] text-[#3D3D3D]",
                                required: false,
                                errorMessage: null,
                                inputType: "textarea",
                                name: "box-13-1",
                                inputTag: "textarea",
                            }}
                        />
                    </div>
                </div>
            </form>
        </div>
    )
}