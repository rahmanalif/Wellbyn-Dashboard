"use client";

import { useState } from "react";
import { StatCard } from "../../components/dashboard-page/StatCard";
import { AppointmentsTable } from "../../components/dashboard-page/AppointmentsTable";
import { ActivityList } from "../../components/dashboard-page/ActivityList";
import { PeakHoursChart } from "../../components/dashboard-page/PeakHoursChart";
import AppointmentStatusChart from "../../components/dashboard-page/DonutChart";

export default function Dashboard() {
  const [stats] = useState([
    {
      title: "Today's Appointments",
      value: "10",
      percentage: "+12%",
      isPositive: true,
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="48" height="48" rx="6" fill="#F0F5FE"/>
          <path d="M28 14V18M20 14V18" stroke="#2E8BC9" strokeWidth="2.025" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M25 16H23C19.2288 16 17.3431 16 16.1716 17.1716C15 18.3431 15 20.2288 15 24V26C15 29.7712 15 31.6569 16.1716 32.8284C17.3431 34 19.2288 34 23 34H25C28.7712 34 30.6569 34 31.8284 32.8284C33 31.6569 33 29.7712 33 26V24C33 20.2288 33 18.3431 31.8284 17.1716C30.6569 16 28.7712 16 25 16Z" stroke="#2E8BC9" strokeWidth="2.025" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M15 22H33" stroke="#2E8BC9" strokeWidth="2.025" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M23 26H28M20 26H20.009M25 30H20M28 30H27.991" stroke="#2E8BC9" strokeWidth="2.025" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      title: "Avg. Appointment Duration",
      value: "3h 20m",
      percentage: "-13%",
      isPositive: false,
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="48" height="48" rx="6" fill="#FEF2F2"/>
          <path d="M24 34C29.5228 34 34 29.5228 34 24C34 18.4772 29.5228 14 24 14C18.4772 14 14 18.4772 14 24C14 29.5228 18.4772 34 24 34Z" stroke="#93531F" strokeWidth="2.25"/>
          <path d="M24 20V24L26 26" stroke="#93531F" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      title: "Missed Appointments",
      value: "7",
      percentage: "+5%",
      isPositive: true,
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="48" height="48" rx="6" fill="#FAF5FF"/>
          <path d="M34 20C34 20 30 26 24 26C18 26 14 20 14 20" stroke="#8226CA" strokeWidth="2.25" strokeLinecap="round"/>
          <path d="M27 25.5L28.5 28" stroke="#8226CA" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M32 23L34 25" stroke="#8226CA" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M14 25L16 23" stroke="#8226CA" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M21 25.5L19.5 28" stroke="#8226CA" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      title: "Time Saved with AI",
      value: "20m",
      percentage: "+110%",
      isPositive: true,
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="48" height="48" rx="6" fill="#FAF5FF"/>
          <path d="M17.1429 26C16.4173 24.8082 16 23.4118 16 21.9189C16 17.5454 19.5817 14 24 14C28.4183 14 32 17.5454 32 21.9189C32 23.4118 31.5827 24.8082 30.8571 26" stroke="#BA1C44" strokeWidth="1.875" strokeLinecap="round"/>
          <path d="M19.3829 29.0982C19.291 28.8216 19.2451 28.6833 19.2504 28.5713C19.2617 28.3343 19.4111 28.1262 19.6316 28.0405C19.7358 28 19.881 28 20.1716 28H27.8284C28.119 28 28.2642 28 28.3684 28.0405C28.5889 28.1262 28.7383 28.3343 28.7496 28.5713C28.7549 28.6833 28.709 28.8216 28.6171 29.0982C28.4473 29.6094 28.3624 29.8651 28.2315 30.072C27.9572 30.5056 27.5272 30.8167 27.0306 30.9408C26.7935 31 26.525 31 25.9881 31H22.0119C21.4749 31 21.2065 31 20.9694 30.9408C20.4728 30.8167 20.0428 30.5056 19.7685 30.072C19.6375 29.8651 19.5527 29.6094 19.3829 29.0982Z" stroke="#BA1C44" strokeWidth="1.875"/>
          <path d="M27 31L26.8707 31.6466C26.7293 32.3537 26.6586 32.7072 26.5001 32.9866C26.2552 33.4185 25.8582 33.7439 25.3866 33.8994C25.0816 34 24.7211 34 24 34C23.2789 34 22.9184 34 22.6134 33.8994C22.1418 33.7439 21.7448 33.4185 21.4999 32.9866C21.3414 32.7072 21.2707 32.3537 21.1293 31.6466L21 31" stroke="#BA1C44" strokeWidth="1.875"/>
          <path d="M24.3077 24L22.847 19.4789C22.7552 19.1947 22.4734 19 22.1538 19C21.8343 19 21.5525 19.1947 21.4607 19.4789L20 24M27 19V24M20.5385 22.5H23.7692" stroke="#BA1C44" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
  ]);

  const [appointments] = useState([
    {
      name: "Mahmud Rahman Talukder",
      email: "mahmud.uiuxdesign@gamil.com",
      gender: "Male",
      reason: "Fever",
      lastVisit: "07-01-2024",
    },
    {
      name: "Mahmud",
      email: "mahmud.uiuxdesign@gamil.com",
      gender: "Female",
      reason: "Cholera",
      lastVisit: "07-01-2024",
    },
    {
      name: "Mahmud",
      email: "mahmud.uiuxdesign@gamil.com",
      gender: "Female",
      reason: "Jaundice",
      lastVisit: "07-01-2024",
    },
    {
      name: "Mahmud",
      email: "mahmud.uiuxdesign@gamil.com",
      gender: "Male",
      reason: "Typhoid",
      lastVisit: "07-01-2024",
    },
  ]);

  const [activities] = useState([
    {
      name: "Emma Wilson",
      time: "09:00 PM",
      doctor: "Dr. Moule Marrk",
      status: "check-in",
    },
    {
      name: "Emma Wilson",
      time: "09:00 PM",
      doctor: "Dr. Moule Marrk",
      status: "details",
    },
    {
      name: "Emma Wilson",
      time: "09:00 PM",
      doctor: "Dr. Moule Marrk",
      status: "details",
    },
  ]);

  const [peakHoursData] = useState([
    { name: "10 AM", appointments: 17 },
    { name: "11 AM", appointments: 21 },
    { name: "12 PM", appointments: 30 },
    { name: "1 PM", appointments: 14 },
    { name: "2 PM", appointments: 12 },
    { name: "3 PM", appointments: 9 },
    { name: "4 PM", appointments: 25 },
    { name: "5 PM", appointments: 5 },
    { name: "6 PM", appointments: 2 },
    { name: "7 PM", appointments: 1 },
  ]);

  return (
    <div className="min-h-screen bg-[#F6F9FC] p-3 md:p-5 lg:p-7">
      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        <AppointmentsTable appointments={appointments} />
        <ActivityList activities={activities} />
        <PeakHoursChart data={peakHoursData} />
        <AppointmentStatusChart />
      </div>
    </div>
  );
}