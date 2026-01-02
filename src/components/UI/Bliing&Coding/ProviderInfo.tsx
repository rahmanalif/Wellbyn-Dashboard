import React from "react";
import InputComponent from "./InputComponent";

export default function ProviderInfo() {
  return (
    <div className="space-y-8">
      <div className="flex items-end justify-center gap-8 flex-wrap md:flex-nowrap">
        <div className="w-full">
          <InputComponent
            inputComponentProps={{
              label: "Box 31: Signature of Physician or Supplier",
              inputClass:
                "text-[16px] mt-4 border-none focus:outline-2 focus:outline-[#2E8BC9] rounded-[8px] p-[12px] w-full shadow-md",
              labelClass: "font-[500] text-[18px] text-[#3D3D3D]",
              required: false,
              errorMessage: null,
              inputType: "text",
              name: "box-31",
              inputTag: "text",
            }}
          />
        </div>

        <div className="w-full">
          <InputComponent
            inputComponentProps={{
              label: "Box 12: Date",
              inputClass:
                "text-[16px] mt-4 border-none focus:outline-2 focus:outline-[#2E8BC9] rounded-[8px] p-[12px] w-full shadow-md",
              labelClass: "font-[500] text-[18px] text-[#3D3D3D]",
              required: false,
              errorMessage: null,
              inputType: "date",
              name: "box-12-1-2",
              inputTag: "date",
              placeholder: "Group Health Plan",
            }}
          />
        </div>
      </div>

      <div className="space-y-6">
        <label
          htmlFor="box-23"
          className="font-[500] text-[18px] text-[#3D3D3D] block mb-2"
        >
          Box 32: Service Facility Location Information
        </label>
        <InputComponent
          inputComponentProps={{
            inputClass:
              "text-[16px] mt-2 border-none focus:outline-2 focus:outline-[#2E8BC9] rounded-[8px] p-[12px] w-full shadow-md",
            labelClass: "font-[500] text-[18px] text-[#3D3D3D]",
            required: false,
            errorMessage: null,
            inputType: "text",
            name: "box-32-1",
            inputTag: "text",
            placeholder: "Wellbyn Healthcare Center",
          }}
        />
        <InputComponent
          inputComponentProps={{
            inputClass:
              "text-[16px] mt-2 border-none focus:outline-2 focus:outline-[#2E8BC9] rounded-[8px] p-[12px] w-full shadow-md",
            labelClass: "font-[500] text-[18px] text-[#3D3D3D]",
            required: false,
            errorMessage: null,
            inputType: "text",
            name: "box-32-2",
            inputTag: "text",
            placeholder: "456 Medical Boulevard",
          }}
        />
        <div className="flex items-center justify-center gap-4 flex-wrap md:flex-nowrap">
          <InputComponent
            inputComponentProps={{
              inputClass:
                "text-[16px] mt-2 border-none focus:outline-2 focus:outline-[#2E8BC9] rounded-[8px] p-[12px] w-full shadow-md",
              labelClass: "font-[500] text-[18px] text-[#3D3D3D]",
              required: false,
              errorMessage: null,
              inputType: "text",
              name: "box-17-fname",
              inputTag: "text",
              placeholder: "Anytown",
            }}
          />
          <InputComponent
            inputComponentProps={{
              inputClass:
                "text-[16px] mt-2 border-none focus:outline-2 focus:outline-[#2E8BC9] rounded-[8px] p-[12px] w-full shadow-md",
              labelClass: "font-[500] text-[18px] text-[#3D3D3D]",
              required: false,
              errorMessage: null,
              inputType: "text",
              name: "box-17-mname",
              inputTag: "text",
              placeholder: "CA",
            }}
          />
          <InputComponent
            inputComponentProps={{
              inputClass:
                "text-[16px] mt-2 border-none focus:outline-2 focus:outline-[#2E8BC9] rounded-[8px] p-[12px] w-full shadow-md",
              labelClass: "font-[500] text-[18px] text-[#3D3D3D]",
              required: false,
              errorMessage: null,
              inputType: "text",
              name: "box-17-lname",
              inputTag: "text",
              placeholder: "12345",
            }}
          />
        </div>
        <InputComponent
          inputComponentProps={{
            inputClass:
              "text-[16px] mt-2 border-none focus:outline-2 focus:outline-[#2E8BC9] rounded-[8px] p-[12px] w-full shadow-md",
            labelClass: "font-[500] text-[18px] text-[#3D3D3D]",
            required: false,
            errorMessage: null,
            inputType: "text",
            name: "box-32-3",
            inputTag: "text",
            placeholder: "(555) 987-6543",
          }}
        />
      </div>

      <div className="flex items-end justify-center gap-8 flex-wrap md:flex-nowrap">
        <div className="w-full">
          <InputComponent
            inputComponentProps={{
              label: "Box 32a: NPI *",
              inputClass:
                "text-[16px] mt-4 border-none focus:outline-2 focus:outline-[#2E8BC9] rounded-[8px] p-[12px] w-full shadow-md",
              labelClass: "font-[500] text-[18px] text-[#3D3D3D]",
              required: false,
              errorMessage: null,
              inputType: "text",
              name: "box-32a",
              inputTag: "text",
            }}
          />
        </div>

        <div className="w-full">
          <InputComponent
            inputComponentProps={{
              label: "Box 32b: Other ID#",
              inputClass:
                "text-[16px] mt-4 border-none focus:outline-2 focus:outline-[#2E8BC9] rounded-[8px] p-[12px] w-full shadow-md",
              labelClass: "font-[500] text-[18px] text-[#3D3D3D]",
              required: false,
              errorMessage: null,
              inputType: "text",
              name: "box-32b",
              inputTag: "text",
            }}
          />
        </div>
      </div>

      <div className="space-y-6">
        <label
          htmlFor="box-33"
          className="font-[500] text-[18px] text-[#3D3D3D] block mb-2"
        >
          Box 33: Billing Provider Info & Ph#
        </label>
        <InputComponent
          inputComponentProps={{
            inputClass:
              "text-[16px] mt-2 border-none focus:outline-2 focus:outline-[#2E8BC9] rounded-[8px] p-[12px] w-full shadow-md",
            labelClass: "font-[500] text-[18px] text-[#3D3D3D]",
            required: false,
            errorMessage: null,
            inputType: "text",
            name: "box-32-1",
            inputTag: "text",
            placeholder: "Wellbyn Healthcare Center",
          }}
        />
        <InputComponent
          inputComponentProps={{
            inputClass:
              "text-[16px] mt-2 border-none focus:outline-2 focus:outline-[#2E8BC9] rounded-[8px] p-[12px] w-full shadow-md",
            labelClass: "font-[500] text-[18px] text-[#3D3D3D]",
            required: false,
            errorMessage: null,
            inputType: "text",
            name: "box-32-2",
            inputTag: "text",
            placeholder: "456 Medical Boulevard",
          }}
        />
        <div className="flex items-center justify-center gap-4 flex-wrap md:flex-nowrap">
          <InputComponent
            inputComponentProps={{
              inputClass:
                "text-[16px] mt-2 border-none focus:outline-2 focus:outline-[#2E8BC9] rounded-[8px] p-[12px] w-full shadow-md",
              labelClass: "font-[500] text-[18px] text-[#3D3D3D]",
              required: false,
              errorMessage: null,
              inputType: "text",
              name: "box-17-fname",
              inputTag: "text",
              placeholder: "Anytown",
            }}
          />
          <InputComponent
            inputComponentProps={{
              inputClass:
                "text-[16px] mt-2 border-none focus:outline-2 focus:outline-[#2E8BC9] rounded-[8px] p-[12px] w-full shadow-md",
              labelClass: "font-[500] text-[18px] text-[#3D3D3D]",
              required: false,
              errorMessage: null,
              inputType: "text",
              name: "box-17-mname",
              inputTag: "text",
              placeholder: "CA",
            }}
          />
          <InputComponent
            inputComponentProps={{
              inputClass:
                "text-[16px] mt-2 border-none focus:outline-2 focus:outline-[#2E8BC9] rounded-[8px] p-[12px] w-full shadow-md",
              labelClass: "font-[500] text-[18px] text-[#3D3D3D]",
              required: false,
              errorMessage: null,
              inputType: "text",
              name: "box-17-lname",
              inputTag: "text",
              placeholder: "12345",
            }}
          />
        </div>
        <InputComponent
          inputComponentProps={{
            inputClass:
              "text-[16px] mt-2 border-none focus:outline-2 focus:outline-[#2E8BC9] rounded-[8px] p-[12px] w-full shadow-md",
            labelClass: "font-[500] text-[18px] text-[#3D3D3D]",
            required: false,
            errorMessage: null,
            inputType: "text",
            name: "box-32-3",
            inputTag: "text",
            placeholder: "(555) 987-6543",
          }}
        />
      </div>

      <div className="flex items-end justify-center gap-8 flex-wrap md:flex-nowrap">
        <div className="w-full">
          <InputComponent
            inputComponentProps={{
              label: "Box 33a: NPI *",
              inputClass:
                "text-[16px] mt-4 border-none focus:outline-2 focus:outline-[#2E8BC9] rounded-[8px] p-[12px] w-full shadow-md",
              labelClass: "font-[500] text-[18px] text-[#3D3D3D]",
              required: false,
              errorMessage: null,
              inputType: "text",
              name: "box-32a",
              inputTag: "text",
            }}
          />
        </div>

        <div className="w-full">
          <InputComponent
            inputComponentProps={{
              label: "Box 33b: Other ID#",
              inputClass:
                "text-[16px] mt-4 border-none focus:outline-2 focus:outline-[#2E8BC9] rounded-[8px] p-[12px] w-full shadow-md",
              labelClass: "font-[500] text-[18px] text-[#3D3D3D]",
              required: false,
              errorMessage: null,
              inputType: "text",
              name: "box-32b",
              inputTag: "text",
            }}
          />
        </div>
      </div>
    </div>
  );
}