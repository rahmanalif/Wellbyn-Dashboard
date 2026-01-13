import { Doctor } from '../../types/doctor';
import { DoctorActions } from './DoctorActions';

interface DoctorRowProps {
  doctor: Doctor;
}

export const DoctorRow = ({ doctor }: DoctorRowProps) => {
  console.log('DoctorRow - Avatar URL:', doctor.avatar);

  return (
    <tr key={doctor.id}>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {doctor.id}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-8 w-8">
            <img
              className="h-8 w-8 rounded-full object-cover"
              src={doctor.avatar || "/placeholder.svg"}
              alt={doctor.name}
              onError={(e) => {
                console.error('Failed to load image:', doctor.avatar);
                e.currentTarget.src = "/placeholder.svg";
              }}
            />
          </div>
          <div className="ml-3">
            <div className="text-sm font-medium text-gray-900">{doctor.name}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{doctor.contact.email}</div>
        <div className="text-sm text-gray-500">{doctor.contact.phone}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {doctor.appointments}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {doctor.patients}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <DoctorActions doctorId={doctor.id} />
      </td>
    </tr>
  );
};
