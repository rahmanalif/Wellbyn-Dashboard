import React from 'react';
import { Button } from "@/app/components/ui/Button";

export const MedicalInfo: React.FC = () => (
  <div className="rounded-lg bg-card text-card-foreground shadow-sm p-6 max-w-2xl mx-auto my-8">
    <div className="flex items-center gap-2 text-lg font-semibold mb-6">
      <h2 className="text-[#3D3D3D]">Medical Information</h2>
    </div>

    <div className="mb-6">
      <h3 className="text-base font-sm mb-3">Allergies</h3>
      <div className="shadow-md rounded-md">
        <div className="grid grid-cols-4 bg-[#EDF4FA] text-muted-foreground bg-muted/50 p-2 rounded-t-md">
          <p className="text-xs pt-1 text-[#7C7C7C]">Name</p>
          <div className="text-right text-xs pt-1 text-[#7C7C7C] mr-4">Severity</div>
        </div>
        <div className="grid grid-cols-4 text-sm p-2">
          <div>Penicillin</div>
          <div className="text-right">Moderate</div>
        </div>
        <div className="grid grid-cols-4 bg-[#EDF4FA] text-sm p-2 bg-muted/20">
          <div>Penicillin</div>
          <div className="text-right">Moderate</div>
        </div>
      </div>
    </div>

    <div className="mb-6">
      <h3 className="text-base font-semibold mb-3">Current Medications</h3>
      <div className="shadow-md rounded-md">
        <div className="grid grid-cols-4 bg-[#EDF4FA] text-muted-foreground bg-muted/50 p-2 rounded-t-md">
          <p className="text-xs pt-1 text-[#7C7C7C]">Name</p>
          <div className="text-right text-xs pt-1 text-[#7C7C7C] mr-5">Dosage</div>
        </div>
        <div className="grid grid-cols-4 text-sm p-2">
          <div>Lisinopril</div>
          <div className="text-right">Once daily</div>
        </div>
        <div className="grid grid-cols-4 bg-[#EDF4FA] text-sm p-2 bg-muted/20">
          <div>Metformin</div>
          <div className="text-right">Twice daily</div>
        </div>
      </div>
    </div>

    <div className="mb-6">
      <h3 className="text-base font-semibold mb-3">Existing Conditions</h3>
      <ul className="list-disc pl-5 text-sm space-y-1">
        {['Diabetes', 'Hypertension', 'Anxiety', 'Depression', 'Asthma', 'None'].map((condition) => (
          <li key={condition}>{condition}</li>
        ))}
      </ul>
    </div>

    <div>
      <h3 className="text-base font-semibold mb-3">Lifestyle Factors</h3>
      <ul className="list-disc pl-5 text-sm space-y-1">
        {['Smoking', 'Former Smoker', 'Alcohol'].map((factor) => (
          <li key={factor}>{factor}</li>
        ))}
      </ul>
    </div>
  </div>
);