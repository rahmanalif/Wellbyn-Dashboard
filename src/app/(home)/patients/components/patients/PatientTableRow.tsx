import Link from "next/link";
import { PatientStatusBadge } from "./PatientStatusBadge";
import { Eye, Pencil } from "lucide-react";

interface Patient {
  id: string;
  initial: string;
  name: string;
  contact: { email: string; phone: string };
  gender: string;
  lastVisit: string;
  status: string;
}

interface PatientTableRowProps {
  patient: Patient;
}

export function PatientTableRow({ patient }: PatientTableRowProps) {
  return (
    <tr key={patient.id} className="hover:bg-gray-50">
      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">{patient.id}</td>
      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-[#2E8BC9]">
            {patient.initial}
          </div>
    <span className="min-w-0 truncate">{patient.name}</span>
        </div>
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
        <div className="flex flex-col">
          <span>{patient.contact.email}</span>
          <span className="text-xs text-gray-400">{patient.contact.phone}</span>
        </div>
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{patient.gender}</td>
      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{patient.lastVisit}</td>
      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
        <PatientStatusBadge status={patient.status} />
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
        <div className="flex items-center justify-end gap-2">
          <Link href="/patients/appointment" className="rounded-md p-1 text-gray-400 hover:text-gray-500">
            <Eye className="h-4 w-4" />
            <span className="sr-only">View</span>
          </Link>
          
        </div>
      </td>
    </tr>
  );
}