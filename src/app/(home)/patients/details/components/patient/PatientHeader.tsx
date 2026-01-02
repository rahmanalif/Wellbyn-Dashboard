import { MessageSquare } from "lucide-react";
import Link from "next/link";

interface PatientHeaderProps {
  name: string;
  status: string;
  patientId: string;
  initials: string;
}

export function PatientHeader({ name, status, patientId, initials }: PatientHeaderProps) {
  return (
    <div className="flex flex-col items-start border-r border-[#DCDCDC] gap-4 pr-5">
      <div className="w-16 h-16 rounded-full bg-[#2E8BC9] flex items-center justify-center text-white text-xl font-semibold">
        {initials}
      </div>
      <div className="flex items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold">{name}</h2>
            <span className="bg-green-100 text-green-700 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {status}
            </span>
          </div>
          <p className="text-sm text-gray-500">Patient ID: {patientId}</p>
        </div>
      </div>
      <Link href="#" className="w-full bg-[#2E8BC9] hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center justify-center">
        <MessageSquare className="w-4 h-4 mr-2" />
        Send Message
      </Link>
    </div>
  );
}