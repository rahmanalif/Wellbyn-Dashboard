import React from 'react'
import InputComponent from './InputComponent'

export default function PatientInfo() {
    return (
        <div className='mt-[32px]'>
            <form method="post">
                <div className='flex items-stretch justify-center gap-8 flex-wrap md:flex-nowrap mb-8'>
                    <div className='w-full'>
                        <InputComponent
                            inputComponentProps={{
                                label: "Box 1: Insurance Type *",
                                inputClass: "text-[16px] appearance-none mt-2 border-none rounded-[8px] p-[12px] w-full focus:outline-2 focus:outline-[#2E8BC9] shadow-md",
                                labelClass: "font-[500] text-[18px] text-[#3D3D3D]",
                                required: false,
                                errorMessage: null,
                                inputType: "select",
                                name: "box-1",
                                inputTag: "select",
                                options: ["Group Health Plan", "1", "2"],
                                errorClass: "text-[#B42121] mt-3 flex gap-2"
                            }}
                        />
                    </div>
                    <div className='w-full'>
                        <InputComponent
                            inputComponentProps={{
                                label: "Box 1a: Insured's ID Number *",
                                inputClass: "text-[16px] appearance-none mt-2 border-none rounded-[8px] p-[12px] w-full focus:outline-2 focus:outline-[#2E8BC9] shadow-md",
                                labelClass: "font-[500] text-[18px] text-[#3D3D3D]",
                                required: false,
                                errorMessage: null,
                                inputType: "text",
                                name: "box-1a",
                                inputTag: "text",
                            }}
                        />
                    </div>
                </div>
                
                <div className='mb-8'>
                    <div>
                        <label className="font-[500] text-[18px] text-[#3D3D3D]" htmlFor="box-2">Box 2: Patient's Name *</label>
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

                <div className='flex items-center justify-center gap-8 flex-wrap md:flex-nowrap mb-8'>
                    <div className='w-full'>
                        <InputComponent
                            inputComponentProps={{
                                label: "Box 3: Patient's Birth Date*",
                                inputClass: "text-[16px] mt-2 border-none focus:outline-2 focus:outline-[#2E8BC9] rounded-[8px] p-[12px] w-full shadow-md",
                                labelClass: "font-[500] text-[18px] text-[#3D3D3D]",
                                required: false,
                                errorMessage: null,
                                inputType: "date",
                                name: "box-3-1",
                                inputTag: "date",
                            }}
                        />
                    </div>
                    <div className='w-full'>
                        <label className="font-[500] text-[18px] text-[#3D3D3D]" htmlFor="box-3-2">Box 3: Patient's Sex *</label>
                        <div className='flex gap-8 mt-4'>
                            <div className='flex items-center'>
                                <label className="font-[500] text-[18px] text-[#3D3D3D]" htmlFor="male">Male</label>
                                <input type="radio" name="gender" id="male" className='ml-4 w-6 h-6' />
                            </div>
                            <div className='flex items-center'>
                                <label className="font-[500] text-[18px] text-[#3D3D3D]" htmlFor="female">Female</label>
                                <input type="radio" name="gender" id="female" className='ml-4 w-6 h-6' />
                            </div>
                            <div className='flex items-center'>
                                <label className="font-[500] text-[18px] text-[#3D3D3D]" htmlFor="other">Other</label>
                                <input type="radio" name="gender" id="other" className='ml-4 w-6 h-6' />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='mb-8'>
                    <div>
                        <label className="font-[500] text-[18px] text-[#3D3D3D]" htmlFor="box-4">Box 4: Insured's Name *</label>
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
                            label: "Box 5: Patient's Address *",
                            inputClass: "text-[16px] mt-4 border-none focus:outline-2 focus:outline-[#2E8BC9] rounded-[8px] p-[12px] w-full shadow-md",
                            labelClass: "font-[500] text-[18px] text-[#3D3D3D]",
                            required: false,
                            errorMessage: null,
                            inputType: "textarea",
                            name: "box-2",
                            inputTag: "textarea",
                            placeholder: "Street address"
                        }}
                    />
                    <div className='flex items-center justify-center gap-4 flex-wrap md:flex-nowrap mt-4'>
                        <div className='w-full'>
                            <InputComponent
                                inputComponentProps={{
                                    label: "City",
                                    inputClass: "text-[16px] mt-2 border-none focus:outline-2 focus:outline-[#2E8BC9] rounded-[8px] p-[12px] w-full shadow-md",
                                    labelClass: "font-[500] text-[18px] text-[#3D3D3D]",
                                    required: false,
                                    errorMessage: null,
                                    inputType: "text",
                                    name: "city",
                                    inputTag: "text",
                                    placeholder: "City"
                                }}
                            />
                        </div>
                        <div className='w-full'>
                            <div className='relative inline-block gap-8 rounded-lg w-full'>
                                <InputComponent
                                    inputComponentProps={{
                                        label: "State",
                                        inputClass: "text-[16px] appearance-none mt-2 border-none rounded-[8px] p-[12px] w-full focus:outline-2 focus:outline-[#2E8BC9] shadow-md",
                                        labelClass: "font-[500] text-[18px] text-[#3D3D3D]",
                                        required: false,
                                        errorMessage: null,
                                        inputType: "select",
                                        name: "street",
                                        inputTag: "select",
                                        options: ["Select", "1", "2"]
                                    }}
                                />
                            </div>
                        </div>
                        <div className='w-full'>
                            <InputComponent
                                inputComponentProps={{
                                    label: "ZIP",
                                    inputClass: "text-[16px] appearance-none mt-2 border-none rounded-[8px] p-[12px] w-full focus:outline-2 focus:outline-[#2E8BC9] shadow-md",
                                    labelClass: "font-[500] text-[18px] text-[#3D3D3D]",
                                    required: false,
                                    errorMessage: null,
                                    inputType: "text",
                                    name: "zip-code",
                                    inputTag: "text",
                                    placeholder: "ZIP"
                                }}
                            />
                        </div>
                    </div>
                    <div className='mt-4'>
                        <InputComponent
                            inputComponentProps={{
                                label: "Phone",
                                inputClass: "text-[16px] appearance-none mt-2 border-none rounded-[8px] p-[12px] w-full focus:outline-2 focus:outline-[#2E8BC9] shadow-md",
                                labelClass: "font-[500] text-[18px] text-[#3D3D3D]",
                                required: false,
                                errorMessage: null,
                                inputType: "tel",
                                name: "phone",
                                inputTag: "tel",
                                placeholder: "+1 9999999999"
                            }}
                        />
                    </div>
                </div>

                <div className='mb-8'>
                    <div className='relative inline-block gap-2 rounded-lg w-full'>
                        <InputComponent
                            inputComponentProps={{
                                label: "Box 6: Patient Relationship to Insured",
                                inputClass: "text-[16px] appearance-none mt-2 border-none rounded-[8px] p-[12px] w-full focus:outline-2 focus:outline-[#2E8BC9] shadow-md",
                                labelClass: "font-[500] text-[18px] text-[#3D3D3D]",
                                required: false,
                                errorMessage: null,
                                inputType: "select",
                                name: "street",
                                inputTag: "select",
                                options: ["Select", "1", "2"]
                            }}
                        />
                    </div>
                </div>

                <div className='mb-8'>
                    <div className='mt-2'>
                        <InputComponent
                            inputComponentProps={{
                                label: "Box 7: Insured's Address",
                                inputClass: "text-[16px] appearance-none mt-4 border-none rounded-[8px] p-[12px] w-full focus:outline-2 focus:outline-[#2E8BC9] shadow-md",
                                labelClass: "font-[500] text-[18px] text-[#3D3D3D]",
                                required: false,
                                errorMessage: null,
                                inputType: "textarea",
                                name: "street-address",
                                inputTag: "textarea",
                                placeholder: "Street address"
                            }}
                        />
                        <div className='flex items-center justify-center gap-4 flex-wrap md:flex-nowrap mt-4'>
                            <div className='w-full'>
                                <InputComponent
                                    inputComponentProps={{
                                        label: "City",
                                        inputClass: "text-[16px] appearance-none mt-2 border-none rounded-[8px] p-[12px] w-full focus:outline-2 focus:outline-[#2E8BC9] shadow-md",
                                        labelClass: "font-[500] text-[18px] text-[#3D3D3D]",
                                        required: false,
                                        errorMessage: null,
                                        inputType: "text",
                                        name: "city",
                                        inputTag: "text",
                                        placeholder: "City"
                                    }}
                                />
                            </div>
                            <div className='w-full'>
                                <div className='relative inline-block gap-8 rounded-lg w-full'>
                                    <InputComponent
                                        inputComponentProps={{
                                            label: "State",
                                            inputClass: "text-[16px] appearance-none mt-2 border-none rounded-[8px] p-[12px] w-full focus:outline-2 focus:outline-[#2E8BC9] shadow-md",
                                            labelClass: "font-[500] text-[18px] text-[#3D3D3D]",
                                            required: false,
                                            errorMessage: null,
                                            inputType: "select",
                                            name: "street",
                                            inputTag: "select",
                                            options: ["Select", "1", "2"]
                                        }}
                                    />
                                </div>
                            </div>
                            <div className='w-full'>
                                <InputComponent
                                    inputComponentProps={{
                                        label: "ZIP",
                                        inputClass: "text-[16px] appearance-none mt-2 border-none rounded-[8px] p-[12px] w-full focus:outline-2 focus:outline-[#2E8BC9] shadow-md",
                                        labelClass: "font-[500] text-[18px] text-[#3D3D3D]",
                                        required: false,
                                        errorMessage: null,
                                        inputType: "text",
                                        name: "zip-code",
                                        inputTag: "text",
                                        placeholder: "ZIP"
                                    }}
                                />
                            </div>
                        </div>
                        <div className='mt-4'>
                            <InputComponent
                                inputComponentProps={{
                                    label: "Phone",
                                    inputClass: "text-[16px] appearance-none mt-2 border-none rounded-[8px] p-[12px] w-full focus:outline-2 focus:outline-[#2E8BC9] shadow-md",
                                    labelClass: "font-[500] text-[18px] text-[#3D3D3D]",
                                    required: false,
                                    errorMessage: null,
                                    inputType: "tel",
                                    name: "street-address",
                                    inputTag: "tel",
                                    placeholder: "+1 9999999999"
                                }}
                            />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}