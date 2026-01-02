import React from 'react';
import { Eye } from 'lucide-react';

interface Caregiver {
  id: number;
  name: string;
}

interface CaregiverListProps {
  caregivers: Caregiver[];
  onViewDetails: (id: number) => void;
}

export const CaregiverList: React.FC<CaregiverListProps> = ({ caregivers, onViewDetails }) => (
  <div className="flex justify-center bg-white p-4">
    <div className="w-full max-w-[800px] p-2 shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Caregiver List</h2>
      <div className="rounded-md overflow-hidden">
        <div className="grid grid-cols-2 bg-[#EDF4FA] text-gray-600 font-medium py-2 px-4 border-b border-gray-200">
          <div>Name</div>
          <div className="text-right">Action</div>
        </div>
        {caregivers.map((caregiver, index) => (
          <div 
            key={caregiver.id}
            className={`grid grid-cols-2 items-center py-3 px-4 ${index % 2 === 0 ? 'bg-white' : 'bg-[#EDF4FA]'}`}
          >
            <div>{caregiver.name}</div>
            <div className="flex justify-end">
              <button 
                onClick={() => onViewDetails(caregiver.id)}
                className="text-gray-500 hover:text-gray-700"
                aria-label={`View details for ${caregiver.name}`}
              >
                <Eye className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);