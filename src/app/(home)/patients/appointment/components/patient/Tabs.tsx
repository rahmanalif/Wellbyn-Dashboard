import React from 'react';

interface TabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "appointment", label: "Appointment" },
    { id: "patients-info", label: "Patients Info" },
    { id: "document", label: "Document" },
    { id: "medication", label: "Medication" },
    { id: "insurance-info", label: "Insurance Info" },
    { id: "caregiver", label: "Caregiver Details" },
  ];

  return (
    <div className="grid w-3/4 grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-1 bg-[#F5F7F9] p-3 rounded-md mb-6">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`py-2 px-4 text-sm font-medium rounded-md ${
            activeTab === tab.id 
              ? "bg-white shadow-md p-5 text-gray-500" 
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};