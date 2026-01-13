import Link from 'next/link';
import { Eye, PencilLine } from 'lucide-react';

interface DoctorActionsProps {
  doctorId: string;
}

export const DoctorActions = ({ doctorId }: DoctorActionsProps) => (
  <div className="flex items-center justify-end gap-2">
    {/* View Button */}
    <Link
      href={`/doctor/appointments?doctorId=${doctorId}`}
      className="p-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      aria-label="View appointments"
    >
      <div className="h-5 w-5 flex items-center justify-center">
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 32 32" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="text-gray-600 hover:text-gray-800"
        >
          <path 
            d="M25.544 15.045C25.848 15.4713 26 15.6845 26 16C26 16.3155 25.848 16.5287 25.544 16.955C24.1779 18.8706 20.6892 23 16 23C11.3108 23 7.8221 18.8706 6.45604 16.955C6.15201 16.5287 6 16.3155 6 16C6 15.6845 6.15201 15.4713 6.45604 15.045C7.8221 13.1294 11.3108 9 16 9C20.6892 9 24.1779 13.1294 25.544 15.045Z" 
            stroke="currentColor" 
            strokeWidth="1.5"
          />
          <path 
            d="M19 16C19 14.3431 17.6569 13 16 13C14.3431 13 13 14.3431 13 16C13 17.6569 14.3431 19 16 19C17.6569 19 19 17.6569 19 16Z" 
            stroke="currentColor" 
            strokeWidth="1.5"
          />
        </svg>
      </div>
    </Link>

    {/* Edit Button */}
    <Link
      href={`/doctor/edit/${doctorId}`}
      className="p-2 rounded-md text-blue-600 hover:bg-blue-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      aria-label="Edit"
    >
      <div className="h-5 w-5 flex items-center justify-center">
        <svg
          width="20"
          height="20"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-blue-600 hover:text-blue-800"
        >
          <path
            d="M20.4249 8.60509L21.4149 7.6151C22.2351 6.79497 23.5648 6.79497 24.3849 7.6151C25.205 8.43524 25.205 9.76493 24.3849 10.5851L23.3949 11.5751M20.4249 8.60509L13.7656 15.2644C13.2581 15.772 12.898 16.4078 12.724 17.1041L12 20L14.8959 19.276C15.5922 19.102 16.228 18.7419 16.7356 18.2344L23.3949 11.5751M20.4249 8.60509L23.3949 11.5751"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M22.9999 17.5C22.9999 20.7875 22.9999 22.4312 22.092 23.5376C21.9258 23.7401 21.7401 23.9258 21.5375 24.092C20.4312 25 18.7874 25 15.4999 25H15C11.2288 25 9.34316 25 8.17159 23.8284C7.00003 22.6569 7 20.7712 7 17V16.5C7 13.2125 7 11.5688 7.90794 10.4624C8.07417 10.2599 8.2599 10.0742 8.46244 9.90794C9.56879 9 11.2125 9 14.5 9"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </Link>
  </div>
);