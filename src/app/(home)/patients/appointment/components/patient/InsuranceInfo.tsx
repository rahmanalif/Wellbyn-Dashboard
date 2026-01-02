import React from 'react';
import { Eye, User } from 'lucide-react';
import { DataField } from './DataField';

interface InsuranceData {
  insuranceName: string;
  contractId: string;
  groupNumber: string;
  expirationDate: string;
  patientRelationship: string;
  firstName: string;
  middleName: string;
  lastName: string;
  patientContractId: string;
  addressLine1: string;
  city: string;
  state: string;
  zip: string;
  employerName: string;
  sex: string;
  dateOfBirth: string;
}

interface InsuranceInfoProps {
  data: InsuranceData;
}

const InsuranceColumn: React.FC<{ data: InsuranceData }> = ({ data }) => (
  <div className="space-y-6">
    {/* Insurance Details */}
    <div className="space-y-4">
      <DataField label="Insurance Name" value={data.insuranceName} />
      <DataField label="Contract ID" value={data.contractId} />
      <DataField label="Group Number" value={data.groupNumber} />
      <DataField label="Expiration Date" value={data.expirationDate} />
    </div>
    <hr className="border-t border-gray-200" />

    {/* Patient Relationship */}
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">Patient Relationship to Policy Holder</p>
      <p className="font-medium">{data.patientRelationship}</p>
    </div>
    <hr className="border-t border-gray-200" />

    {/* Patient Details */}
    <div className="grid grid-cols-3 gap-4">
      <DataField label="First Name" value={data.firstName} />
      <DataField label="Middle Name" value={data.middleName} />
      <DataField label="Last Name" value={data.lastName} />
    </div>
    <div className="space-y-4 mt-4">
      <DataField label="Contract ID" value={data.patientContractId} />
      <DataField label="Address Line 1" value={data.addressLine1} />
      <div className="grid grid-cols-3 gap-4">
        <DataField label="City" value={data.city} />
        <DataField label="State" value={data.state} />
        <DataField label="ZIP" value={data.zip} />
      </div>
    </div>
    <hr className="border-t border-gray-200" />

    {/* Employment and Personal Info */}
    <div className="space-y-4">
      <DataField label="Employer Name" value={data.employerName} />
      <DataField label="Sex" value={data.sex} />
      <DataField label="Date of Birth" value={data.dateOfBirth} />
    </div>
    <hr className="border-t border-gray-200" />

    {/* Documents and Signature */}
    <div className="space-y-4">
      <div className="grid gap-1">
        <p className="text-sm text-muted-foreground">Insurance Card</p>
        <a href="#" className="flex w-[100px] px-1 py-2 shadow-md rounded-md items-center gap-1 text-[#2E8BC9] hover:underline text-sm">
          <Eye className="w-4 h-4" />
          View Card
        </a>
      </div>
      <div className="grid gap-1">
        <p className="text-sm text-muted-foreground">Digital Signature</p>
        <a href="#" className="flex w-1/3 px-4 py-2 rounded-md items-center gap-1 shadow-md text-[#2E8BC9] hover:underline text-sm">
          <Eye className="w-4 h-4" />
          View Signature
        </a>
      </div>
    </div>
  </div>
);

export const InsuranceInfo: React.FC<InsuranceInfoProps> = ({ data }) => (
  <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
    <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm p-6 md:p-8">
      <div className="flex items-center gap-2 mb-6">
        <User className="w-5 h-5 text-gray-600" />
        <h2 className="text-lg font-semibold text-gray-800">Insurance Information</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        <InsuranceColumn data={data} />
        <InsuranceColumn data={data} />
      </div>
    </div>
  </div>
);