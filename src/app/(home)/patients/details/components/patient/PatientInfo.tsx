import React from 'react';
import { Settings } from 'lucide-react';
import { Button } from "@/app/components/ui/Button";
import { DataField } from './DataField';

export const PatientInfo: React.FC = () => (
  <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
    <div className="flex items-center gap-2 text-lg font-semibold text-gray-700 mb-6">
      <Settings className="w-5 h-5" />
      <span>Patient Information</span>
    </div>

    <div className="space-y-8">
      {/* Personal Information */}
      <div className="border-b pb-6">
        <h2 className="text-xl font-sm mb-4">Personal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
          <DataField label="Email" value="mahmud.uiuxdesign@gmail.com" />
          <DataField label="Mobile" value="(555) 456-7890" />
          <DataField label="Date of Birth" value="10-10-2009" />
          <DataField label="Age" value="23" />
          <DataField label="Gender" value="Male" />
          <DataField label="Blood Group" value="O+" />
          <DataField label="Marital Status" value="Single" />
          <DataField label="Number of children" value="-" />
        </div>
      </div>

      {/* Address Section */}
      <div className="border-b pb-6">
        <h2 className="text-xl font-semibold mb-4">Address</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
          <DataField label="Address Line 1" value="1234 Elm Street" />
          <DataField label="Address Line 2" value="Apt 101" />
          <DataField label="City" value="San Juan" />
          <DataField label="State" value="Puerto Rico" />
          <DataField label="ZIP" value="00901" />
        </div>
      </div>

      {/* Additional Info */}
      <div className="pb-6">
        <h2 className="text-xl font-semibold mb-4">Additional info</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
          <DataField label="Employer" value="N/A" />
          <DataField label="Last 4 digits of SSN" value="5241" />
          <DataField label="Driver's License" value="56170" />
        </div>
      </div>

      {/* Upload License */}
      <div className="pt-4">
        <p className="text-sm text-muted-foreground mb-3">Upload Driver's License Images</p>
        <div className="flex gap-3 items-center">
          <Button variant="outline" className="flex gap-2 items-center border-none shadow-md">
            Front Of License
          </Button>
          <Button variant="outline" className="flex gap-2 items-center border-none shadow-md">
            Back Of License
          </Button>
        </div>
      </div>
    </div>
  </div>
);