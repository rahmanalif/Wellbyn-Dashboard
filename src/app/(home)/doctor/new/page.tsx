"use client"

import { useState } from "react";
import Image from "next/image";
import { Plus, Trash2 } from "lucide-react";
import { useAddDoctorMutation, type AddDoctorRequest, type QualificationData } from "@/lib/store/services/doctorsApi";

interface Qualification {
  id: number;
  degree: string;
  university: string;
}

export default function DoctorProfileForm() {
  const [qualifications, setQualifications] = useState<Qualification[]>([]);

  // Form fields state
  const [name, setName] = useState("");
  const [disciplines, setDisciplines] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [clinicName, setClinicName] = useState("");
  const [officeLocations, setOfficeLocations] = useState("");
  const [googleMapUrls, setGoogleMapUrls] = useState("");
  const [popularReasons, setPopularReasons] = useState("");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  // RTK Query mutation hook
  const [addDoctor, { isLoading: isAddingDoctor }] = useAddDoctorMutation();

  const addQualification = () => {
    const newQualifications: Qualification[] = [
      ...qualifications,
      {
        id: qualifications.length + 1,
        degree: "",
        university: ""
      }
    ];
    setQualifications(newQualifications);
  };

  const updateQualification = (id: number, field: 'degree' | 'university', value: string) => {
    setQualifications(qualifications.map(q =>
      q.id === id ? { ...q, [field]: value } : q
    ));
  };

  const removeQualification = (id: number) => {
    const newQualifications = qualifications.filter(q => q.id !== id);
    setQualifications(newQualifications);
  };

  const handleSaveDoctor = async () => {
    try {
      // Build JSON payload to match API specification
      const doctorData: AddDoctorRequest = {
        fullName: name,
        email: email,
        mobile: phone,
        discipline: disciplines,
        clinicName: clinicName,
        officeLocation: officeLocations ? officeLocations.split('\n').filter(l => l.trim()) : [],
        googleMapUrl: googleMapUrls ? googleMapUrls.split('\n').filter(l => l.trim()) : [],
        popularReasonsToVisit: popularReasons ? popularReasons.split(',').map((r: string) => r.trim()).filter((r: string) => r) : [],
        qualifications: qualifications
          .filter(qual => qual.degree.trim())
          .map(qual => ({
            degree: qual.degree,
            university: qual.university || undefined
          })),
      };

      console.log("Doctor data being sent:", doctorData);

      const response = await addDoctor(doctorData).unwrap();

      console.log("Doctor added successfully:", response);
      alert(`Doctor added successfully! ID: ${response._id}`);

      // Reset form
      setName("");
      setEmail("");
      setPhone("");
      setDisciplines("");
      setClinicName("");
      setOfficeLocations("");
      setGoogleMapUrls("");
      setPopularReasons("");
      setQualifications([]);
      setProfilePicture(null);
    } catch (error: any) {
      console.error("Failed to add doctor:", error);
      console.error("Error details:", error.data);
      alert(`Failed to add doctor: ${error.data?.message || error.message || "Please try again."}`);
    }
  };

  return (
    <div className="max-w-2/3 mx-auto bg-white p-6 space-y-6">
      {/* Profile Photo */}
      <div className="flex justify-center">
        <div className="relative">
          <input
            type="file"
            id="profilePictureInput"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setProfilePicture(e.target.files[0]);
              }
            }}
            className="hidden"
          />
          <label htmlFor="profilePictureInput" className="cursor-pointer">
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden hover:bg-gray-300 transition-colors">
              {profilePicture ? (
                <Image
                  src={URL.createObjectURL(profilePicture)}
                  alt="Profile"
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-500 text-xs text-center px-2">Click to upload</span>
              )}
            </div>
          </label>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">ID</span>
          </div>
        </div>
      </div>

      {/* Name and Disciplines */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter doctor's full name"
            className="block w-full px-3 py-2 border border-gray-300 shadow-sm rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="disciplines" className="block text-sm font-medium text-gray-700">
            Discipline <span className="text-red-500">*</span>
          </label>
          <input
            id="disciplines"
            type="text"
            value={disciplines}
            onChange={(e) => setDisciplines(e.target.value)}
            placeholder="e.g., Cardiology"
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
        </div>
      </div>

      {/* Email and Phone */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="doctor@example.com"
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Mobile <span className="text-red-500">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="1234567890"
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
        </div>
      </div>

      {/* Clinic Name */}
      <div className="space-y-2">
        <label htmlFor="clinic" className="block text-sm font-medium text-gray-700">
          Clinic Name <span className="text-red-500">*</span>
        </label>
        <input
          id="clinic"
          type="text"
          value={clinicName}
          onChange={(e) => setClinicName(e.target.value)}
          placeholder="Enter clinic or hospital name"
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
        />
      </div>

      {/* Office Locations */}
      <div className="space-y-2">
        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
          Office Location(s) <span className="text-red-500">*</span>
        </label>
        <textarea
          id="location"
          value={officeLocations}
          onChange={(e) => setOfficeLocations(e.target.value)}
          placeholder="Enter office addresses (one per line)&#10;123 Main St, Anytown, USA&#10;456 Oak Ave, Another City, USA"
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm resize-none"
          rows={3}
        />
        <p className="text-xs text-gray-500">Enter multiple addresses, one per line</p>
      </div>

      {/* Google Map URLs */}
      <div className="space-y-2">
        <label htmlFor="googleMapUrls" className="block text-sm font-medium text-gray-700">
          Google Map URLs
        </label>
        <textarea
          id="googleMapUrls"
          value={googleMapUrls}
          onChange={(e) => setGoogleMapUrls(e.target.value)}
          placeholder="Enter Google Maps links (one per line)&#10;https://maps.google.com/?q=123+Main+St&#10;https://maps.google.com/?q=456+Oak+Ave"
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm resize-none"
          rows={3}
        />
        <p className="text-xs text-gray-500">Enter Google Maps URLs, one per line</p>
      </div>

      {/* Popular Reasons to Visit */}
      <div className="space-y-2">
        <label htmlFor="reasons" className="block text-sm font-medium text-gray-700">
          Popular Reasons to Visit
        </label>
        <input
          id="reasons"
          type="text"
          value={popularReasons}
          onChange={(e) => setPopularReasons(e.target.value)}
          placeholder="Chest pain, High blood pressure, Heart checkup"
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
        />
        <p className="text-xs text-gray-500">Enter reasons separated by commas</p>
      </div>

      {/* Qualifications */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          Qualifications <span className="text-red-500">*</span>
        </label>

        <div className="space-y-3">
          {qualifications.map((qualification) => (
            <div key={qualification.id} className="flex items-center gap-3 p-3 border border-gray-300 shadow-sm rounded-lg">
              <div className="flex-1 space-y-2">
                <input
                  type="text"
                  value={qualification.degree}
                  onChange={(e) => updateQualification(qualification.id, 'degree', e.target.value)}
                  placeholder="Degree (e.g., MD, MBBS, FACC)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
                <input
                  type="text"
                  value={qualification.university}
                  onChange={(e) => updateQualification(qualification.id, 'university', e.target.value)}
                  placeholder="University (optional)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
              <button
                onClick={() => removeQualification(qualification.id)}
                className="p-2 text-red-500 hover:text-red-700 rounded-md hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={addQualification}
          type="button"
          className="flex items-center border border-gray-300 shadow-sm justify-start text-blue-600 text-sm hover:text-blue-800 px-3 py-2 rounded-md hover:bg-blue-50"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Qualification
        </button>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSaveDoctor}
        disabled={isAddingDoctor}
        type="button"
        className="w-full flex items-center justify-center rounded-md bg-[#2E8BC9] px-4 py-3 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isAddingDoctor ? "Adding Doctor..." : "Add Doctor"}
      </button>
    </div>
  );
}
