import Link from "next/link";
import { Download, Plus } from "lucide-react";

interface PatientsHeaderProps {
  title?: string;
  description?: string;
}

export function PatientsHeader({ 
  title = "Patients", 
  description = "Manage all the patients" 
}: PatientsHeaderProps) {
  return (
    <div className="flex items-center justify-between bg-white p-4">
      <div className="grid gap-1">
        <h1 className="text-2xl font-semibold text-[#3D3D3D]">{title}</h1>
        <p className="text-sm text-[#737373]">{description}</p>
      </div>
         <div className="flex flex-col sm:flex-row gap-3">
       <Link href="/patients/add">  <button className="inline-flex items-center justify-center text-[#2E8BC9] rounded-md shadow-md bg-transparent px-4 py-2 text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
         
        Add New patient
        </button> </Link>
    
         
       
      </div>
      
    </div>
  );
}