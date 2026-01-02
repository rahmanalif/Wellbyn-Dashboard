interface PatientStatusBadgeProps {
  status: string;
}

export function PatientStatusBadge({ status }: PatientStatusBadgeProps) {
  const statusClasses: Record<string, string> = {
    "In Care": "bg-[#EEFEE7] text-[#237B10]",
    "Recovered": "bg-[#F0F5FE] text-[#2B4DCA]",
    "Discharged": "bg-gray-100 text-gray-800"
  };

  return (
    <span className={`inline-flex rounded-full px-4 py-1 text-xs font-semibold leading-5 ${statusClasses[status]}`}>
      {status}
    </span>
  );
}