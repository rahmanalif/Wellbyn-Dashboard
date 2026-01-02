import React from 'react'
import InputComponent from './InputComponent'

export default function ClinicalInfo() {
    return (
        <div className='mt-6'>
            <div className='mb-8'>
                <label htmlFor="box-10" className='font-[500] text-[18px] text-[#3D3D3D] mb-4'>Box 10: Is Patient's Condition Related to:</label>
                
                <div className='flex items-center justify-between gap-4 mt-6'>
                    <p className='font-[500] text-[18px] text-[#3D3D3D]'>A. Employment</p>
                    <div className='flex items-center justify-center gap-8 mr-0 md:mr-80'>
                        <div className='flex items-center gap-4'>
                            <input type="radio" name="employment" id="e-yes" className='w-6 h-6' />
                            <label htmlFor="e-yes" className='font-[500] text-[18px] text-[#3D3D3D]'>Yes</label>
                        </div>
                        <div className='flex items-center gap-4'>
                            <input type="radio" name="employment" id="e-no" className='w-6 h-6' />
                            <label htmlFor="e-no" className='font-[500] text-[18px] text-[#3D3D3D]'>No</label>
                        </div>
                    </div>
                </div>
                
                <div className='flex items-center justify-between gap-4 mt-6'>
                    <p className='font-[500] text-[18px] text-[#3D3D3D]'>B. Auto Accident?</p>
                    <div className='flex items-center justify-center gap-8 mr-0 md:mr-80'>
                        <div className='flex items-center gap-4'>
                            <input type="radio" name="auto-accident" id="b-yes" className='w-6 h-6' />
                            <label htmlFor="b-yes" className='font-[500] text-[18px] text-[#3D3D3D]'>Yes</label>
                        </div>
                        <div className='flex items-center gap-4'>
                            <input type="radio" name="auto-accident" id="b-no" className='w-6 h-6' />
                            <label htmlFor="b-no" className='font-[500] text-[18px] text-[#3D3D3D]'>No</label>
                        </div>
                    </div>
                </div>
                
                <div className='flex items-center justify-between gap-4 mt-6'>
                    <p className='font-[500] text-[18px] text-[#3D3D3D]'>C. Other Accident?</p>
                    <div className='flex items-center justify-center gap-8 mr-0 md:mr-80'>
                        <div className='flex items-center gap-4'>
                            <input type="radio" name="other-accident" id="c-yes" className='w-6 h-6' />
                            <label htmlFor="c-yes" className='font-[500] text-[18px] text-[#3D3D3D]'>Yes</label>
                        </div>
                        <div className='flex items-center gap-4'>
                            <input type="radio" name="other-accident" id="c-no" className='w-6 h-6' />
                            <label htmlFor="c-no" className='font-[500] text-[18px] text-[#3D3D3D]'>No</label>
                        </div>
                    </div>
                </div>
            </div>

            <div className='mb-8'>
                <InputComponent
                    inputComponentProps={{
                        label: "Box 10d: Claim Codes (Designated by NUCC)",
                        inputClass: "text-[16px] mt-4 border-none focus:outline-2 focus:outline-[#2E8BC9] rounded-[8px] p-[12px] w-full shadow-md",
                        labelClass: "font-[500] text-[18px] text-[#3D3D3D]",
                        required: false,
                        errorMessage: null,
                        inputType: "text",
                        name: "box-10d",
                        inputTag: "text",
                        placeholder: "G987654321"
                    }}
                />
            </div>

            <div className='flex items-end justify-center gap-8 flex-wrap md:flex-nowrap mb-8'>
                <div className='w-full'>
                    <InputComponent
                        inputComponentProps={{
                            label: "Box 14: Date of Current Illness, Injury, or Pregnancy (LMP)",
                            inputClass: "text-[16px] mt-4 border-none focus:outline-2 focus:outline-[#2E8BC9] rounded-[8px] p-[12px] w-full shadow-md",
                            labelClass: "font-[500] text-[18px] text-[#3D3D3D]",
                            required: false,
                            errorMessage: null,
                            inputType: "date",
                            name: "box-14",
                            inputTag: "date",
                            placeholder: "G987654321"
                        }}
                    />
                </div>
                <div className='w-full'>
                    <InputComponent
                        inputComponentProps={{
                            label: "Qualifier",
                            inputClass: "text-[16px] mt-4 border-none focus:outline-2 focus:outline-[#2E8BC9] rounded-[8px] p-[12px] w-full shadow-md",
                            labelClass: "font-[500] text-[18px] text-[#3D3D3D]",
                            required: false,
                            errorMessage: null,
                            inputType: "text",
                            name: "box-14-1",
                            inputTag: "text",
                            placeholder: "Illness"
                        }}
                    />
                </div>
            </div>

            <div className='flex items-end justify-center gap-8 flex-wrap md:flex-nowrap mb-8'>
                <div className='w-full'>
                    <InputComponent
                        inputComponentProps={{
                            label: "Box 15: Other Date",
                            inputClass: "text-[16px] mt-4 border-none focus:outline-2 focus:outline-[#2E8BC9] rounded-[8px] p-[12px] w-full shadow-md",
                            labelClass: "font-[500] text-[18px] text-[#3D3D3D]",
                            required: false,
                            errorMessage: null,
                            inputType: "date",
                            name: "box-15",
                            inputTag: "date",
                        }}
                    />
                </div>
                <div className='w-full'>
                    <InputComponent
                        inputComponentProps={{
                            label: "Qualifier",
                            inputClass: "text-[16px] mt-4 border-none focus:outline-2 focus:outline-[#2E8BC9] rounded-[8px] p-[12px] w-full shadow-md",
                            labelClass: "font-[500] text-[18px] text-[#3D3D3D]",
                            required: false,
                            errorMessage: null,
                            inputType: "text",
                            name: "box-15-1",
                            inputTag: "text",
                            placeholder: "Illness"
                        }}
                    />
                </div>
            </div>

            <div className='mb-8'>
                <h3 className='font-[500] text-[18px] text-[#3D3D3D] mb-4'>Box 16: Dates Patient Unable to Work in Current Occupation</h3>
                <div className='flex items-end justify-center gap-8 flex-wrap md:flex-nowrap'>
                    <div className='w-full'>
                        <InputComponent
                            inputComponentProps={{
                                label: "From",
                                inputClass: "text-[16px] mt-4 border-none focus:outline-2 focus:outline-[#2E8BC9] rounded-[8px] p-[12px] w-full shadow-md",
                                labelClass: "font-[500] text-[18px] text-[#7C7C7C]",
                                required: false,
                                errorMessage: null,
                                inputType: "date",
                                name: "box-16",
                                inputTag: "date",
                            }}
                        />
                    </div>
                    <div className='w-full'>
                        <InputComponent
                            inputComponentProps={{
                                label: "To",
                                inputClass: "text-[16px] mt-4 border-none focus:outline-2 focus:outline-[#2E8BC9] rounded-[8px] p-[12px] w-full shadow-md",
                                labelClass: "font-[500] text-[18px] text-[#7C7C7C]",
                                required: false,
                                errorMessage: null,
                                inputType: "date",
                                name: "box-16-1",
                                inputTag: "date",
                            }}
                        />
                    </div>
                </div>
            </div>

            <div className='mb-8'>
                <div>
                    <label htmlFor="box-17" className='font-[500] text-[18px] text-[#3D3D3D] mb-4'>Box 17: Name of Referring Provider or Other Source</label>
                </div>
                <div className='flex items-center justify-center gap-4 flex-wrap md:flex-nowrap'>
                    {["First Name", "Middle", "Last"].map((nameData, index) => (
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
                    ))}
                </div>
            </div>

            <div className='flex items-end justify-center gap-8 flex-wrap md:flex-nowrap mb-8'>
                <div className='w-full'>
                    <InputComponent
                        inputComponentProps={{
                            label: "Box 17a: Other ID#",
                            inputClass: "text-[16px] mt-4 border-none focus:outline-2 focus:outline-[#2E8BC9] rounded-[8px] p-[12px] w-full shadow-md",
                            labelClass: "font-[500] text-[18px] text-[#3D3D3D]",
                            required: false,
                            errorMessage: null,
                            inputType: "text",
                            name: "box-17a",
                            inputTag: "text",
                        }}
                    />
                </div>
                <div className='w-full'>
                    <InputComponent
                        inputComponentProps={{
                            label: "Box 17b: NPI",
                            inputClass: "text-[16px] mt-4 border-none focus:outline-2 focus:outline-[#2E8BC9] rounded-[8px] p-[12px] w-full shadow-md",
                            labelClass: "font-[500] text-[18px] text-[#3D3D3D]",
                            required: false,
                            errorMessage: null,
                            inputType: "text",
                            name: "box-17b",
                            inputTag: "text",
                        }}
                    />
                </div>
            </div>

            <div className='mb-8'>
                <h3 className='font-[500] text-[18px] text-[#3D3D3D] mb-4'>Box 18: Hospitalization Dates Related to Current Services</h3>
                <div className='flex items-end justify-center gap-8 flex-wrap md:flex-nowrap'>
                    <div className='w-full'>
                        <InputComponent
                            inputComponentProps={{
                                label: "From",
                                inputClass: "text-[16px] mt-4 border-none focus:outline-2 focus:outline-[#2E8BC9] rounded-[8px] p-[12px] w-full shadow-md",
                                labelClass: "font-[500] text-[18px] text-[#7C7C7C]",
                                required: false,
                                errorMessage: null,
                                inputType: "date",
                                name: "box-18-from",
                                inputTag: "date",
                            }}
                        />
                    </div>
                    <div className='w-full'>
                        <InputComponent
                            inputComponentProps={{
                                label: "To",
                                inputClass: "text-[16px] mt-4 border-none focus:outline-2 focus:outline-[#2E8BC9] rounded-[8px] p-[12px] w-full shadow-md",
                                labelClass: "font-[500] text-[18px] text-[#7C7C7C]",
                                required: false,
                                errorMessage: null,
                                inputType: "date",
                                name: "box-18-to",
                                inputTag: "date",
                            }}
                        />
                    </div>
                </div>
            </div>

            <div className='mb-8'>
                <InputComponent
                    inputComponentProps={{
                        label: "Box 19: Additional Claim Information (Designated by NUCC)",
                        inputClass: "text-[16px] mt-4 border-none focus:outline-2 focus:outline-[#2E8BC9] rounded-[8px] p-[12px] w-full shadow-md",
                        labelClass: "font-[500] text-[18px] text-[#3D3D3D]",
                        required: false,
                        errorMessage: null,
                        inputType: "text",
                        name: "box-19",
                        inputTag: "text",
                    }}
                />
            </div>

            <div className='mb-8'>
                <div className='w-full'>
                    <label htmlFor="box-20" className='font-[500] text-[18px] text-[#3D3D3D] mb-4'>Box 20: Outside Lab?</label>
                    <div className='flex mt-4 gap-16'>
                        <div className='flex items-center'>
                            <input type="radio" name="outside-lab" id="yes" className='w-6 h-6' />
                            <label htmlFor="yes" className='text-lg ml-3'>Yes</label>
                        </div>
                        <div className='flex items-center'>
                            <input type="radio" name="outside-lab" id="no" className='w-6 h-6' />
                            <label htmlFor="no" className='text-lg ml-3'>No</label>
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex items-end justify-center gap-8 flex-wrap md:flex-nowrap mb-8'>
                <div className='w-full'>
                    <InputComponent
                        inputComponentProps={{
                            label: "Box 22: Resubmission Code",
                            inputClass: "text-[16px] mt-4 border-none focus:outline-2 focus:outline-[#2E8BC9] rounded-[8px] p-[12px] w-full shadow-md",
                            labelClass: "font-[500] text-[18px] text-[#3D3D3D]",
                            required: false,
                            errorMessage: null,
                            inputType: "text",
                            name: "box-22",
                            inputTag: "text",
                        }}
                    />
                </div>
                <div className='w-full'>
                    <InputComponent
                        inputComponentProps={{
                            label: "Original Reference Number",
                            inputClass: "text-[16px] mt-4 border-none focus:outline-2 focus:outline-[#2E8BC9] rounded-[8px] p-[12px] w-full shadow-md",
                            labelClass: "font-[500] text-[18px] text-[#3D3D3D]",
                            required: false,
                            errorMessage: null,
                            inputType: "text",
                            name: "box-22b",
                            inputTag: "text",
                        }}
                    />
                </div>
            </div>

            <div className='mb-8'>
                <InputComponent
                    inputComponentProps={{
                        label: "Box 23: Prior Authorization Number",
                        inputClass: "text-[16px] mt-4 border-none focus:outline-2 focus:outline-[#2E8BC9] rounded-[8px] p-[12px] w-full shadow-md",
                        labelClass: "font-[500] text-[18px] text-[#3D3D3D]",
                        required: false,
                        errorMessage: null,
                        inputType: "text",
                        name: "box-23",
                        inputTag: "text",
                    }}
                />
            </div>
        </div>
    )
}