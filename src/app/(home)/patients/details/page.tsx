"use client";

import { useState } from "react";
import { PatientProfile } from "./components/patient/PatientProfile";
import { NotesSection } from "./components/patient/NotesSection";
import { AppointmentDetails } from "./components/patient/AppointmentDetails";
import { AppointmentCard } from "./components/patient/AppointmentCard";
import { CaregiverDetails } from "./components/patient/CaregiverDetails";
import { CaregiverList } from "./components/patient/CaregiverList";
import { DocumentList } from "./components/patient/DocumentList";
import { InsuranceInfo } from "./components/patient/InsuranceInfo";
import { MedicalInfo } from "./components/patient/MedicalInfo";
import { PatientInfo } from "./components/patient/PatientInfo";
import { Tabs } from "./components/patient/Tabs";

export default function PatientDashboard() {
  const [activeTab, setActiveTab] = useState("appointment");
  const [selectedAppointment, setSelectedAppointment] = useState<number | null>(null);
  const [noteText, setNoteText] = useState("");

  const handleSaveVitalSigns = (vitalSigns: {
    bloodPressure: string;
    heartRate: string;
    temperature: string;
  }) => {
    console.log("Saving vital signs:", vitalSigns);
    setSelectedAppointment(null); // Close details after saving
  };

  const appointments = [
    { id: 1, time: "16 May, 2025 || 10:30 PM", doctor: "Dr. Moule Markk", status: "Complete", isHighlighted: true },
    { id: 2, time: "16 May, 2025 || 10:30 PM", doctor: "Dr. Moule Markk", status: "Next Follow Up In 7 Days", isHighlighted: false },
    { id: 3, time: "16 May, 2025 || 10:30 PM", doctor: "Dr. Moule Markk", status: "Complete", isHighlighted: false },
    { id: 4, time: "16 May, 2025 || 10:30 PM", doctor: "Dr. Moule Markk", status: "Complete", isHighlighted: false },
    { id: 5, time: "16 May, 2025 || 10:30 PM", doctor: "Dr. Moule Markk", status: "Canceled", isHighlighted: false },
  ];

  const documents = [
    { name: "Document_Name.jpeg", size: "25kb", status: "downloading" as const },
    { name: "Document_Name.jpeg", size: "25kb", status: "ready" as const },
    { name: "Document_Name.jpeg", size: "25kb", status: "ready" as const },
    { name: "Document_Name.jpeg", size: "25kb", status: "ready" as const },
  ];

  const caregivers = [
    { id: 1, name: "MD Mahmudur Rahman Talukder", relation: "Brother" }
  ];

// In your PatientDashboard component, update the insuranceData to match the full InsuranceData interface:
const insuranceData = {
  insuranceName: "Blusky",
  contractId: "123456789",
  groupNumber: "GRP12345",
  expirationDate: "12/31/2025",
  patientRelationship: "Self",
  firstName: "Mahmudur",
  middleName: "Rahman",
  lastName: "Talukder",
  patientContractId: "P6Q7R8",
  addressLine1: "123 Main Street",
  city: "Sylhet",
  state: "Sylhet Division",
  zip: "3100",
  employerName: "Self Employed",
  sex: "Male",
  dateOfBirth: "02/02/1999"
};

// The rest of your PatientDashboard component remains the same...

  const handleViewDetails = (appointmentId: number) => {
    setSelectedAppointment(appointmentId);
    setActiveTab("details");
  };

  const handleViewCaregiver = (id: number) => {
    setActiveTab("caregiver_details");
  };

  const appointment = appointments.find(a => a.id === selectedAppointment);

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-white rounded-lg shadow p-6">
          <PatientProfile name="Mahmudur Rahman" patientId="P6Q7R8" />
          <NotesSection />
        </div>

        {/* Bottom Section */}
        <div className="w-full bg-white rounded-lg shadow p-6">
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
          
          {activeTab === "appointment" && (
            <div className="mt-6 space-y-4">
              {appointments.map((appointment) => (
                <AppointmentCard 
                  key={appointment.id} 
                  appointment={appointment}
                  onViewDetails={() => handleViewDetails(appointment.id)}
                />
              ))}
            </div>
          )}

          {activeTab === "details" && appointment && (
            <AppointmentDetails
              doctorName={appointment.doctor}
              specialty="Cardiology"
              location="Sylhet Health Center"
              appointmentDate={appointment.time.split(" || ")[0]}
              appointmentTime={appointment.time.split(" || ")[1]}
              status={appointment.status}
              reasonForVisit="Need a cleaning"
              visitType="New Patient Visit"
              insurance="Blusky"
              initialVitalSigns={{
                bloodPressure: "",
                heartRate: "",
                temperature: ""
              }}
              soapNotes={{
                subjective: "Patient presents for routine annual physical examination...",
                objective: "Vital signs stable. BP 120/80, HR 72, Temp 98.6°F...",
                assessment: "Healthy adult male for routine preventive care visit.",
                plan: "Continue current lifestyle habits..."
              }}
              onSaveChanges={handleSaveVitalSigns}
            />
          )}

          {activeTab === "patients-info" && <PatientInfo />}
          {activeTab === "document" && <DocumentList documents={documents} />}
          {activeTab === "medication" && <MedicalInfo />}
          {activeTab === "insurance-info" && <InsuranceInfo data={insuranceData} />}
          {activeTab === "caregiver" && (
            <CaregiverList 
              caregivers={caregivers} 
              onViewDetails={handleViewCaregiver} 
            />
          )}
          {activeTab === "caregiver_details" && (
            <CaregiverDetails
              name="MD Mahmudur Rahman Talukder"
              relation="Brother"
              dateOfBirth="2 Feb 1999"
              age="26"
              email="example@email.com"
              phone="+1 9999999999"
            />
          )}
        </div>
      </div>
    </div>
  );
}