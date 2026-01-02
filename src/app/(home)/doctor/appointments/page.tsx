"use client"
import { useState } from 'react';
import { Stethoscope, Mail, Phone, Edit, CalendarDays, Clock, Plus, X, Info, CheckCircle2, XCircle, Eye } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useGetDoctorByIdQuery, useGetAppointmentsQuery, useGetPatientsQuery, useUpdateAvailabilityMutation, AvailabilityDay, AvailabilitySlot } from '@/lib/store/services/doctorsApi';
import { getImageUrl } from '@/lib/api';
import { AppointmentCard } from '../../patients/appointment/components/patient/AppointmentCard';
import { AppointmentDetails } from '../../patients/appointment/components/patient/AppointmentDetails';


export default function DoctorDashboard() {
  const searchParams = useSearchParams();
  const doctorId = searchParams.get('doctorId');

  // Fetch doctor data by ID
  const { data: doctorData, isLoading: isDoctorLoading, error: doctorError } = useGetDoctorByIdQuery(
    doctorId || '',
    { skip: !doctorId }
  );

  // Fetch appointments
  const { data: appointmentsData, isLoading: isAppointmentsLoading } = useGetAppointmentsQuery(
    doctorId || '',
    { skip: !doctorId }
  );

  // Fetch patients
  const { data: patientsData, isLoading: isPatientsLoading } = useGetPatientsQuery(
    doctorId || '',
    { skip: !doctorId }
  );

  const [activeTab, setActiveTab] = useState('appointment');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState<number | null>(null);
  const [selectedFilter, setSelectedFilter] = useState('patients');
  const [statusFilter, setStatusFilter] = useState('upcoming');

  // Availability state
  const [selectedDay, setSelectedDay] = useState('Sunday');
  const [availabilitySchedule, setAvailabilitySchedule] = useState<AvailabilityDay[]>([
    {
      day: 'Sunday',
      office: { start: '11:45', end: '16:30' },
      slots: [
        { time: '11:45' },
        { time: '18:20' },
      ]
    }
  ]);

  // Update availability mutation
  const [updateAvailability, { isLoading: isUpdatingAvailability }] = useUpdateAvailabilityMutation();
  
  const availabilityData = [
    { day: "Sunday", start: "11:45 AM", end: "4:30 PM" },
    { day: "Monday", start: "Not Selected", end: "Not Selected" },
    { day: "Tuesday", start: "9:00 AM", end: "5:00 PM" },
    { day: "Wednesday", start: "10:00 AM", end: "6:00 PM" },
    { day: "Thursday", start: "8:30 AM", end: "4:30 PM" },
    { day: "Friday", start: "Not Selected", end: "Not Selected" },
    { day: "Saturday", start: "10:00 AM", end: "2:00 PM" }
  ];

  const patients = [
    {
      id: "P6Q7R8",
      initial: "R",
      name: "Rami Rahm...",
      contact: { email: "sarah_illustrates@gmail.com", phone: "(555) 123-4567" },
      gender: "Male",
      lastVisit: "04-30-2026",
      status: "In Care",
    },
    // ... rest of the patients data
  ];

  const availableSlotsSunday = [
    { start: "11:45 AM", end: "4:30 PM" },
    { start: "6:20 PM", end: "10:05 PM" },
    { start: "6:20 PM", end: "10:05 PM" }, 
    { start: "6:20 PM", end: "10:05 PM" }, 
    { start: "6:20 PM", end: "10:05 PM" },
  ];

  const getStatusClasses = (status: string) => {
    switch (status) {
      case "Upcoming":
        return "bg-orange-100 text-orange-600";
      case "Next Follow Up In 7 Days":
        return "bg-[#F0F5FE] text-[#2B4DCA]";
      case "Complete":
        return "bg-[#EEFEE7] text-[#237B10]";
      case "Canceled":
        return "bg-red-100 text-red-600";
      default:
        return "";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Complete":
        return <CheckCircle2 className="w-4 h-4 mr-1" />;
      case "Canceled":
        return <XCircle className="w-4 h-4 mr-1" />;
      default:
        return null;
    }
  };

  const handleViewDetails = (appointmentId: number) => {
    setSelectedAppointment(appointmentId);
    setActiveTab("details");
  };

  const handleSaveVitalSigns = (vitalSigns: {
    bloodPressure: string;
    heartRate: string;
    temperature: string;
  }) => {
    console.log("Saving vital signs:", vitalSigns);
    setSelectedAppointment(null);
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

  const handleViewCaregiver = (id: number) => {
    setActiveTab("caregiver_details");
  };

  // Helper function to convert 24-hour time to AM/PM format
  const convertTo12Hour = (time24: string): string => {
    const [hours, minutes] = time24.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  // Availability handlers
  const handleAddSlot = () => {
    if (!startTime || !endTime) return;

    const startTime12 = convertTo12Hour(startTime);
    const endTime12 = convertTo12Hour(endTime);

    setAvailabilitySchedule(prev => {
      const dayIndex = prev.findIndex(d => d.day === selectedDay);
      if (dayIndex >= 0) {
        const updatedSchedule = [...prev];
        updatedSchedule[dayIndex].slots.push({ time: `${startTime12} - ${endTime12}` });
        return updatedSchedule;
      } else {
        return [...prev, {
          day: selectedDay,
          office: { start: startTime12, end: endTime12 },
          slots: [{ time: `${startTime12} - ${endTime12}` }]
        }];
      }
    });

    setStartTime('');
    setEndTime('');
  };

  const handleRemoveSlot = (dayName: string, slotTime: string) => {
    setAvailabilitySchedule(prev => {
      const dayIndex = prev.findIndex(d => d.day === dayName);
      if (dayIndex >= 0) {
        const updatedSchedule = [...prev];
        updatedSchedule[dayIndex].slots = updatedSchedule[dayIndex].slots.filter(s => s.time !== slotTime);
        if (updatedSchedule[dayIndex].slots.length === 0) {
          return updatedSchedule.filter(d => d.day !== dayName);
        }
        return updatedSchedule;
      }
      return prev;
    });
  };

  const handleSaveAvailability = async () => {
    if (!doctorId) return;

    try {
      await updateAvailability({
        doctorId,
        availability: availabilitySchedule
      }).unwrap();
      alert('Availability updated successfully!');
    } catch (error) {
      console.error('Failed to update availability:', error);
      alert('Failed to update availability');
    }
  };

  const getCurrentDaySlots = () => {
    const day = availabilitySchedule.find(d => d.day === selectedDay);
    return day?.slots || [];
  };

  // Filter appointments based on status
  const filteredAppointments = (appointmentsData || []).filter(appointment => {
    const status = appointment.status.toLowerCase();
    if (statusFilter === 'upcoming') {
      return status === 'upcoming';
    } else if (statusFilter === 'completed') {
      return status === 'complete';
    } else if (statusFilter === 'cancelled') {
      return status === 'cancelled';
    }
    return true;
  });

  // Transform appointments for AppointmentCard
  const transformedAppointments = filteredAppointments.map((appointment, index) => ({
    id: index,
    time: new Date(appointment.appointmentTime).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).replace(',', ' ||'),
    doctor: appointment.patientName,
    status: appointment.status === 'Cancelled' ? 'Canceled' : appointment.status,
    isHighlighted: index === 0
  }));

  const appointment = appointments.find(a => a.id === selectedAppointment);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Main Content Area with controlled scrolling */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        {/* Top Section: Profile and Appointments */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-3">
            <div className="grid bg-white grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl ">
              {/* Doctor Profile Section */}
              <div className="border-r border-[#DCDCDC] p-6 lg:col-span-2">
                {isDoctorLoading ? (
                  <div className="flex justify-center items-center h-full">
                    <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : doctorError ? (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                    <p className="text-sm font-medium">Failed to load doctor data</p>
                  </div>
                ) : doctorData ? (
                  <>
                    <div className="w-24 h-24 mb-3 md:w-20 md:h-20 rounded-full overflow-hidden bg-teal-500 flex-shrink-0">
                      <img
                        src={getImageUrl(doctorData.profilePicture) || "/placeholder.svg"}
                        alt={doctorData.doctorName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                      <div className="flex-1 text-center md:text-left">
                        <h1 className="text-xl md:text-2xl text-[#3D3D3D] font-bold mb-4">{doctorData.doctorName}</h1>
                        <div className="space-y-3 text-sm text-gray-600">
                          <div className="flex items-center justify-center md:justify-start gap-3">
                            <Stethoscope className="w-4 h-4 text-gray-500" />
                            <span>Doctor ID : {doctorData.doctorId}</span>
                          </div>
                          <div className="flex items-center justify-center md:justify-start gap-3">
                            <Mail className="w-4 h-4 text-gray-500" />
                            <span>Email : {doctorData.email}</span>
                          </div>
                          <div className="flex items-center justify-center md:justify-start gap-3">
                            <Phone className="w-4 h-4 text-gray-500" />
                            <span>Mobile : {doctorData.mobile}</span>
                          </div>
                        </div>
                        <button className="mt-6 shadow-md flex gap-2 items-center justify-center md:justify-start text-[#2E8BC9] hover:text-blue-800 hover:bg-blue-50 px-3 py-1.5 rounded-md transition-colors">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.38246 2.58997C9.87926 2.05173 10.1277 1.78261 10.3916 1.62563C11.0285 1.24685 11.8127 1.23507 12.4603 1.59455C12.7286 1.74354 12.9846 2.00509 13.4967 2.52818C14.0087 3.05127 14.2648 3.31282 14.4106 3.58696C14.7625 4.24842 14.751 5.04953 14.3802 5.70014C14.2265 5.96978 13.9631 6.22353 13.4362 6.73101L7.16706 12.7692C6.16858 13.7309 6.66933 14.2118 5.04537 14.4555C4.42141 14.6992 3.73546 14.6813 2.36357 14.6454L2.17692 14.6405C1.75927 14.6296 1.55044 14.6241 1.42906 14.4863C1.30766 14.3486 1.32424 14.1359 1.35738 13.7105L1.37538 13.4795C1.46867 12.282 1.51531 11.6833 1.74914 11.1451C1.98296 10.6069 2.38629 10.17 3.19295 9.29601L9.38246 2.58997Z" stroke="#2E8BC9" strokeWidth="1.5" strokeLinejoin="round"/>
                            <path d="M8.66667 2.66699L13.3333 7.33366" stroke="#2E8BC9" strokeWidth="1.5" strokeLinejoin="round"/>
                            <path d="M9.33333 14.667H14.6667" stroke="#2E8BC9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          Edit
                        </button>
                      </div>
                    </div>
                  </>
                ) : null}
              </div>

              {/* Appointments Section */}
              <div className="bg-white rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-6 text-gray-800">Appointments</h2>
                {isDoctorLoading ? (
                  <div className="flex justify-center items-center h-24">
                    <div className="w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : doctorData ? (
                  <div className="grid grid-cols-2 gap-4">
                    {/* Today Appointments */}
                    <div className="text-start shadow-sm p-2 rounded-md">
                      <div className="mb-3">
                        <svg width="48" height="49" viewBox="0 0 48 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect y="0.5" width="48" height="48" rx="6" fill="#F0F5FE"/>
                          <path d="M28 14.5V18.5M20 14.5V18.5" stroke="#2E8BC9" strokeWidth="2.025" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M25 16.5H23C19.2288 16.5 17.3431 16.5 16.1716 17.6716C15 18.8431 15 20.7288 15 24.5V26.5C15 30.2712 15 32.1569 16.1716 33.3284C17.3431 34.5 19.2288 34.5 23 34.5H25C28.7712 34.5 30.6569 34.5 31.8284 33.3284C33 32.1569 33 30.2712 33 26.5V24.5C33 20.7288 33 18.8431 31.8284 17.6716C30.6569 16.5 28.7712 16.5 25 16.5Z" stroke="#2E8BC9" strokeWidth="2.025" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M15 22.5H33" stroke="#2E8BC9" strokeWidth="2.025" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M23 26.5H28M20 26.5H20.009M25 30.5H20M28 30.5H27.991" stroke="#2E8BC9" strokeWidth="2.025" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <h3 className="text-sm font-medium text-gray-600 mb-2">Today</h3>
                      <p className="text-3xl font-bold text-gray-900">{doctorData.todaysAppointmentCount}</p>
                    </div>

                    {/* Total Appointments */}
                    <div className="text-start shadow-sm p-2 rounded-md">
                      <div className="mb-3">
                        <svg width="48" height="49" viewBox="0 0 48 49" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect y="0.5" width="48" height="48" rx="6" fill="#FAF5FF"/>
<path d="M32 34.5V31.5C32 28.6716 32 27.2574 31.1213 26.3787C30.2426 25.5 28.8284 25.5 26 25.5L24 27.5L22 25.5C19.1716 25.5 17.7574 25.5 16.8787 26.3787C16 27.2574 16 28.6716 16 31.5V34.5" stroke="#8226CA" strokeWidth="2.025" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M28 25.5V31" stroke="#8226CA" strokeWidth="2.025" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M20.5 25.5V29.5M20.5 29.5C21.6046 29.5 22.5 30.3954 22.5 31.5V32.5M20.5 29.5C19.3954 29.5 18.5 30.3954 18.5 31.5V32.5" stroke="#8226CA" strokeWidth="2.025" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M27.5 19V18C27.5 16.067 25.933 14.5 24 14.5C22.067 14.5 20.5 16.067 20.5 18V19C20.5 20.933 22.067 22.5 24 22.5C25.933 22.5 27.5 20.933 27.5 19Z" stroke="#8226CA" strokeWidth="2.025" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M28.75 31.75C28.75 32.1642 28.4142 32.5 28 32.5C27.5858 32.5 27.25 32.1642 27.25 31.75C27.25 31.3358 27.5858 31 28 31C28.4142 31 28.75 31.3358 28.75 31.75Z" stroke="#8226CA" strokeWidth="1.5"/>
</svg>

                      </div>
                      <h3 className="text-sm font-medium text-gray-600 mb-2">Total</h3>
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-3xl font-bold text-gray-900">{doctorData.totalAppointment}</p>
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                          doctorData.appointmentPerformanceResult >= 0
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {doctorData.appointmentPerformanceResult >= 0 ? '+' : ''}{doctorData.appointmentPerformanceResult}%
                        </span>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Tabs and Content */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          {/* Tabs */}
          <div className="flex mb-6">
            <div className="flex space-x-1 rounded-lg bg-gray-100 p-3 max-w-md">
              <button
                onClick={() => setActiveTab('appointment')}
                className={`px-4 py-2 text-sm font-medium rounded-md ${activeTab === 'appointment' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600'}`}
              >
                All Appointment
              </button>
              <button
                onClick={() => setActiveTab('all-patients')}
                className={`px-4 py-2 text-sm font-medium rounded-md ${activeTab === 'all-patients' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600'}`}
              >
                All Patients
              </button>
              <button
                onClick={() => setActiveTab('availability')}
                className={`px-4 py-2 text-sm font-medium rounded-md ${activeTab === 'availability' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600'}`}
              >
                Availability
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="overflow-hidden">
            {activeTab === 'availability' && (
              <div>
                <h3 className="text-xl font-semibold mb-6">Manage Availability</h3>
                <div className="w-full flex flex-col lg:flex-row gap-8">
                  {/* Left Column: Availability Table */}
                  <div className="w-full lg:w-3/4 rounded-2xl overflow-hidden">
                    <div className="grid grid-cols-3 bg-[#F2F8FD] h-[40px] px-4 py-3 font-sm text-gray-700">
                      <div className='text-xs'>Day</div>
                      <div className='text-xs'>Start</div>
                      <div className='text-xs'>End</div>
                    </div>
                    {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day, index) => {
                      const daySchedule = availabilitySchedule.find(d => d.day === day);
                      return (
                        <div
                          key={day}
                          className={`grid grid-cols-3 p-4 text-sm ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                        >
                          <div className="font-medium">{day}</div>
                          <div>{daySchedule?.office.start || 'Not Selected'}</div>
                          <div>{daySchedule?.office.end || 'Not Selected'}</div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Right Column: Available Slot Management */}
                  <div className="w-full lg:w-1/4 space-y-2 p-4 rounded-lg bg-[#F5F7F9]">
                    <h4 className="text-sm">Available Slot</h4>
                    <div className="relative">
                      <select
                        value={selectedDay}
                        onChange={(e) => setSelectedDay(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Sunday">Sunday</option>
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                        <option value="Saturday">Saturday</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4 border-t border-[#DCDCDC]">
                      <div className='pt-2'>
                        <label htmlFor="start-time" className="block text-sm font-medium text-gray-700 mb-1">
                          Start Time
                        </label>
                        <div className="relative">
                          <input
                            id="start-time"
                            type="time"
                            className="block w-full pl-2 pr-2 py-2 bg-white rounded-md shadow-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className='pt-2'>
                        <label htmlFor="end-time" className="block text-sm font-medium text-gray-700 mb-1">
                          End Time
                        </label>
                        <div className="relative">
                          <input
                            id="end-time"
                            type="time"
                            className="block w-full pl-2 pr-2 py-2 bg-white rounded-md shadow-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 max-h-[200px] overflow-y-auto pt-2">
                      {getCurrentDaySlots().map((slot, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <button
                            onClick={() => handleRemoveSlot(selectedDay, slot.time)}
                            className="flex-1 flex justify-between items-center px-4 py-2 shadow-md rounded-md bg-white hover:bg-gray-50"
                          >
                            {slot.time} <X className="w-4 h-4 text-gray-500" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={handleAddSlot}
                      disabled={!startTime || !endTime}
                      className="flex items-center shadow-md bg-white text-[#3D3D3D] hover:text-blue-800 hover:bg-blue-50 px-4 py-2 rounded-md w-full disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add New
                    </button>
                    <button
                      onClick={handleSaveAvailability}
                      disabled={isUpdatingAvailability}
                      className="w-full bg-[#2E8BC9] hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isUpdatingAvailability ? 'Saving...' : 'Save Change'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "appointment" && (
              <div>
                <div className="flex flex-col md:flex-row items-center w-full gap-4 mb-6">
                  {/* Patients/Doctors Select */}
                  <div className="relative w-full md:w-1/2">
                    <select
                      value={selectedFilter}
                      onChange={(e) => setSelectedFilter(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                    >
                      <option value="patients">Patients</option>
                      <option value="doctors">Doctors</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>

                  {/* Status Select */}
                  <div className="relative w-full md:w-1/2">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                    >
                      <option value="upcoming">Upcoming</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>

                  {/* Clear Filter Button */}
                  <button
                    onClick={() => {
                      setSelectedFilter('patients');
                      setStatusFilter('upcoming');
                    }}
                    className="px-3 w-full md:w-30 py-2 text-sm font-medium text-[#2B4DCA] rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    Clear filter
                  </button>
                </div>

                {isAppointmentsLoading ? (
                  <div className="flex justify-center items-center h-32">
                    <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : transformedAppointments.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    No appointments found
                  </div>
                ) : (
                  <div className="space-y-4 max-h-[500px] overflow-y-auto">
                    {transformedAppointments.map((appointment) => (
                      <AppointmentCard
                        key={appointment.id}
                        appointment={appointment}
                        onViewDetails={() => handleViewDetails(appointment.id)}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "details" && appointment && (
              <div className="max-h-[600px] overflow-y-auto">
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
              </div>
            )}

            {activeTab === "all-patients" && (
              <div className="overflow-x-auto">
                {isPatientsLoading ? (
                  <div className="flex justify-center items-center h-32">
                    <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : !patientsData || patientsData.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    No patients found
                  </div>
                ) : (
                  <div className="min-w-full overflow-hidden rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">ID</th>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Patients Name</th>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Contact</th>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Gender</th>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Last Visit</th>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
                          <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {patientsData.map((patient) => (
                          <tr key={patient._id} className="hover:bg-gray-50">
                            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">{patient._id.slice(-6)}</td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                              <div className="flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-[#2E8BC9]">
                                  {patient.patientName.charAt(0)}
                                </div>
                                {patient.patientName}
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                              <div className="flex flex-col">
                                <span>{patient.email}</span>
                                <span className="text-xs text-gray-400">{patient.phone}</span>
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{patient.gender}</td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                              {new Date(patient.lastVisit).toLocaleDateString('en-US', {
                                month: '2-digit',
                                day: '2-digit',
                                year: 'numeric'
                              })}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                              <span
                                className={`inline-flex rounded-full px-4 py-1 text-xs font-semibold leading-5 ${
                                  patient.status.toLowerCase() === "in care"
                                    ? "bg-[#EEFEE7] text-[#237B10]"
                                    : patient.status.toLowerCase() === "cancelled"
                                    ? "bg-red-100 text-red-600"
                                    : "bg-[#F0F5FE] text-[#2B4DCA]"
                                }`}
                              >
                                {patient.status}
                              </span>
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                              <div className="flex items-center justify-end gap-2">
                                <Link href="/patients/appointment" className="rounded-md p-1 text-gray-400 hover:text-gray-500">
                                  <Eye className="h-4 w-4" />
                                  <span className="sr-only">View</span>
                                </Link>
                                <Link href="/patients/edit" className="rounded-md p-1 text-gray-400 hover:text-gray-500">
                                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20.4249 8.60509L21.4149 7.6151C22.2351 6.79497 23.5648 6.79497 24.3849 7.6151C25.205 8.43524 25.205 9.76493 24.3849 10.5851L23.3949 11.5751M20.4249 8.60509L13.7656 15.2644C13.2581 15.772 12.898 16.4078 12.724 17.1041L12 20L14.8959 19.276C15.5922 19.102 16.228 18.7419 16.7356 18.2344L23.3949 11.5751M20.4249 8.60509L23.3949 11.5751" stroke="#2B4DCA" strokeWidth="1.5" strokeLinejoin="round" />
                                    <path d="M22.9999 17.5C22.9999 20.7875 22.9999 22.4312 22.092 23.5376C21.9258 23.7401 21.7401 23.9258 21.5375 24.092C20.4312 25 18.7874 25 15.4999 25H15C11.2288 25 9.34316 25 8.17159 23.8284C7.00003 22.6569 7 20.7712 7 17V16.5C7 13.2125 7 11.5688 7.90794 10.4624C8.07417 10.2599 8.2599 10.0742 8.46244 9.90794C9.56879 9 11.2125 9 14.5 9" stroke="#2B4DCA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                  <span className="sr-only">Edit</span>
                                </Link>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}