export const tableData = [
  {
    "id": "P6Q7R8",
    "name": "Rami Rahman Chowdhury",
    "email": "sarah_illustrates@gmail.com",
    "phone": "(555) 123-4567",
    "gender": "Male",
    "lastVisit": "04-30-2026",
    "status": "In care"
  },
  {
    "id": "P6Q7R8",
    "name": "Rami Rahman Chowdhury",
    "email": "sarah_illustrates@gmail.com",
    "phone": "(555) 123-4567",
    "gender": "Male",
    "lastVisit": "04-30-2026",
    "status": "Recovered"
  },
  {
    "id": "P6Q7R8",
    "name": "Rami Rahman Chowdhury",
    "email": "sarah_illustrates@gmail.com",
    "phone": "(555) 123-4567",
    "gender": "Male",
    "lastVisit": "04-30-2026",
    "status": "In care"
  },
  {
    "id": "P6Q7R8",
    "name": "Rami Rahman Chowdhury",
    "email": "sarah_illustrates@gmail.com",
    "phone": "(555) 123-4567",
    "gender": "Male",
    "lastVisit": "04-30-2026",
    "status": "Recovered"
  }
]


export const patientInfoFormSetup = {
  section1: {
    heading: "Box 1: Insurance Type*",
    fields: [
      {
        inputType: "select",
        inputValue: "Group Health Plan",
        label: "Group Health Plan",
        options: ["Group Health Plan", "Other Option"], // Example options
      },
      {
        inputType: "text",
        inputValue: "",
        label: "Box 1a: Insured's ID Number*",
      },
    ],
  },
  section2: {
    heading: "Box 2: Patient's Name*",
    fields: [
      {
        inputType: "text",
        inputValue: "",
        label: "First Name",
      },
      {
        inputType: "text",
        inputValue: "",
        label: "Middle",
      },
      {
        inputType: "text",
        inputValue: "",
        label: "Last",
      },
    ],
  },
  section3: {
    heading: "Box 3: Patient's Birth Date*",
    fields: [
      {
        inputType: "date",
        inputValue: "",
        label: "mm/dd/yyyy",
        placeholder: "mm/dd/yyyy",
      },
    ],
  },
  section3b: {
    heading: "Box 3: Patient's Sex*",
    fields: [
      {
        inputType: "radio",
        inputValue: "Male",
        label: "Male",
        checked: true,
      },
      {
        inputType: "radio",
        inputValue: "Female",
        label: "Female",
        checked: false,
      },
      {
        inputType: "radio",
        inputValue: "Other",
        label: "Other",
        checked: false,
      },
    ],
  },
  section4: {
    heading: "Box 4: Insured's Name*",
    fields: [
      {
        inputType: "text",
        inputValue: "",
        label: "First Name",
      },
      {
        inputType: "text",
        inputValue: "",
        label: "Middle",
      },
      {
        inputType: "text",
        inputValue: "",
        label: "Last",
      },
    ],
  },
  section5: {
    heading: "Box 5: Patient's Address*",
    fields: [
      {
        inputType: "text",
        inputValue: "",
        label: "Street Address",
      },
      {
        inputType: "text",
        inputValue: "",
        label: "City",
      },
      {
        inputType: "select",
        inputValue: "Select",
        label: "State",
        options: ["Select", "State1", "State2"], // Example options
      },
      {
        inputType: "text",
        inputValue: "",
        label: "ZIP",
      },
      {
        inputType: "tel",
        inputValue: "+19999999999",
        label: "Phone",
        placeholder: "+19999999999",
      },
    ],
  },
  section6: {
    heading: "Box 6: Patient Relationship to Insured",
    fields: [
      {
        inputType: "select",
        inputValue: "Self",
        label: "Relationship",
        options: ["Self", "Spouse", "Child"], // Example options
      },
    ],
  },
  section7: {
    heading: "Box 6: Patient Relationship to Insured",
    fields: [
      {
        inputType: "text",
        inputValue: "",
        label: "Street Address",
      },
      {
        inputType: "text",
        inputValue: "",
        label: "City",
      },
      {
        inputType: "select",
        inputValue: "Select",
        label: "State",
        options: ["Select", "State1", "State2"], // Example options
      },
      {
        inputType: "text",
        inputValue: "",
        label: "ZIP",
      },
      {
        inputType: "tel",
        inputValue: "+19999999999",
        label: "Phone",
        placeholder: "+19999999999",
      },
    ],
  },
};

export interface InputComponentProps {
  label?: string,
  inputClass?: string,
  labelClass?: string,
  required: boolean,
  onChange?: (e: 
    React.ChangeEvent<HTMLInputElement> | 
    React.ChangeEvent<HTMLTextAreaElement> |
    React.ChangeEvent<HTMLSelectElement>
  ) => void,
  onClick?: (e: React.MouseEventHandler<HTMLInputElement>) => void,
  errorMessage: string | null,
  inputType: string,
  name: string,
  value?: string | number | readonly string[] | undefined,
  placeholder?: string,
  errorClass?: string,
  inputTag: string,
  options?: string[],
  radioOptions?: string[],
  radioLabel?: string
}