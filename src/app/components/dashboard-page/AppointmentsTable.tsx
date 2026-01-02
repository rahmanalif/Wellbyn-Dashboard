interface Appointment {
  name: string;
  email: string;
  gender: string;
  reason: string;
  lastVisit: string;
}

interface AppointmentsTableProps {
  appointments: Appointment[];
}

export function AppointmentsTable({ appointments }: AppointmentsTableProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm lg:col-span-2">
      <div className="flex items-center justify-between p-3">
        <h2 className="text-md  text-[#3D3D3D] font-semibold">Appointments</h2>
        <button className="text-sm text-[#2B4DCA] hover:underline">View all</button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="border-none">
            <tr className="bg-[#EDF4FA]">
              <th className="px-4 py-3 text-left text-xs font-medium text-[#7C7C7C]  tracking-wider">
                Patients Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-[#7C7C7C]  tracking-wider">
                Email
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-[#7C7C7C]  tracking-wider">
                Gender
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-[#7C7C7C]  tracking-wider">
                Visit Reason
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-[#7C7C7C]  tracking-wider">
                Last Visit
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {appointments.map((appointment, index) => (
              <tr key={index} className="border-none">
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[#D6EBFD] flex items-center justify-center text-xs font-medium text-[#2E8BC9]">
                      {appointment.name.charAt(0)}
                    </div>
                    <div className="ml-2 font-sm">{appointment.name}</div>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-[#3D3D3D]">
                  {appointment.email}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-[#3D3D3D]">
                  {appointment.gender}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-[#3D3D3D]">
                  {appointment.reason}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-[#3D3D3D]">
                  {appointment.lastVisit}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}