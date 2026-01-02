import React from 'react';

interface CaregiverDetailsProps {
  name: string;
  relation: string;
  dateOfBirth: string;
  age: string;
  email: string;
  phone: string;
}

export const CaregiverDetails: React.FC<CaregiverDetailsProps> = ({
  name,
  relation,
  dateOfBirth,
  age,
  email,
  phone
}) => (
  <div className="flex justify-center py-8 px-4 sm:px-6 lg:px-8 bg-white min-h-screen">
    <div className="w-full max-w-md space-y-6">
      <div className="p-6 rounded-lg">
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            readOnly
            value={name}
            className="w-full px-3 py-2 shadow-md rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-1">Relation</label>
          <input
            readOnly
            value={relation}
            className="w-full px-3 py-2 shadow-md rounded-md bg-white text-gray-700"
          />
        </div>

        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-1">Date Of Birth</label>
          <input
            readOnly
            value={dateOfBirth}
            className="w-full px-3 py-2 shadow-md rounded-md bg-white text-gray-700 mb-1"
          />
          <p className="text-xs text-gray-500">{age} years old</p>
        </div>

        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            readOnly
            value={email}
            className="w-full px-3 py-2 shadow-md rounded-md bg-white text-gray-700"
          />
        </div>

        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <input
            readOnly
            value={phone}
            className="w-full px-3 py-2 shadow-md rounded-md bg-white text-gray-700"
          />
        </div>
      </div>
    </div>
  </div>
);