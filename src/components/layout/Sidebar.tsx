// src/components/layout/Sidebar.tsx

"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/utils/cn";
import Logo from "@/assets/logo";
import WellbynLogo from "@/assets/wellbynlogo";
import Link from "next/link";

// Define sidebar menu items based on the image
const mainMenuItems = [
  {
    id: "Dashboard",
    label: "Dashboard",
    href: "/dashboard",
    onDesktop: true,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.5 8.75V6.75C10.5 5.10626 10.5 4.28439 10.046 3.73121C9.96291 3.62995 9.87005 3.53709 9.76879 3.45398C9.21561 3 8.39374 3 6.75 3C5.10626 3 4.28439 3 3.73121 3.45398C3.62995 3.53709 3.53709 3.62995 3.45398 3.73121C3 4.28439 3 5.10626 3 6.75V8.75C3 10.3937 3 11.2156 3.45398 11.7688C3.53709 11.8701 3.62995 11.9629 3.73121 12.046C4.28439 12.5 5.10626 12.5 6.75 12.5C8.39374 12.5 9.21561 12.5 9.76879 12.046C9.87005 11.9629 9.96291 11.8701 10.046 11.7688C10.5 11.2156 10.5 10.3937 10.5 8.75Z" strokeLinejoin="round"/>
        <path d="M7.75 15.5H5.75C5.05222 15.5 4.70333 15.5 4.41943 15.5861C3.78023 15.78 3.28002 16.2802 3.08612 16.9194C3 17.2033 3 17.5522 3 18.25C3 18.9478 3 19.2967 3.08612 19.5806C3.28002 20.2198 3.78023 20.72 4.41943 20.9139C4.70333 21 5.05222 21 5.75 21H7.75C8.44778 21 8.79667 21 9.08057 20.9139C9.71977 20.72 10.22 20.2198 10.4139 19.5806C10.5 19.2967 10.5 18.9478 10.5 18.25C10.5 17.5522 10.5 17.2033 10.4139 16.9194C10.22 16.2802 9.71977 15.78 9.08057 15.5861C8.79667 15.5 8.44778 15.5 7.75 15.5Z" strokeLinejoin="round"/>
        <path d="M21 17.25V15.25C21 13.6063 21 12.7844 20.546 12.2312C20.4629 12.1299 20.3701 12.0371 20.2688 11.954C19.7156 11.5 18.8937 11.5 17.25 11.5C15.6063 11.5 14.7844 11.5 14.2312 11.954C14.1299 12.0371 14.0371 12.1299 13.954 12.2312C13.5 12.7844 13.5 13.6063 13.5 15.25V17.25C13.5 18.8937 13.5 19.7156 13.954 20.2688C14.0371 20.3701 14.1299 20.4629 14.2312 20.546C14.7844 21 15.6063 21 17.25 21C18.8937 21 19.7156 21 20.2688 20.546C20.3701 20.4629 20.4629 20.3701 20.546 20.2688C21 19.7156 21 18.8937 21 17.25Z" strokeLinejoin="round"/>
        <path d="M18.25 3H16.25C15.5522 3 15.2033 3 14.9194 3.08612C14.2802 3.28002 13.78 3.78023 13.5861 4.41943C13.5 4.70333 13.5 5.05222 13.5 5.75C13.5 6.44778 13.5 6.79667 13.5861 7.08057C13.78 7.71977 14.2802 8.21998 14.9194 8.41388C15.2033 8.5 15.5522 8.5 16.25 8.5H18.25C18.9478 8.5 19.2967 8.5 19.5806 8.41388C20.2198 8.21998 20.72 7.71977 20.9139 7.08057C21 6.79667 21 6.44778 21 5.75C21 5.05222 21 4.70333 20.9139 4.41943C20.72 3.78023 20.2198 3.28002 19.5806 3.08612C19.2967 3 18.9478 3 18.25 3Z" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: "Patients",
    label: "Patients",
    href: "/patients",
    onDesktop: true,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 22V19C20 16.1716 20 14.7573 19.1213 13.8787C18.2426 13 16.8284 13 14 13H10C7.17157 13 5.75736 13 4.87868 13.8787C4 14.7573 4 16.1716 4 19C4 19.9319 4 20.3978 4.15224 20.7653C4.35523 21.2554 4.74458 21.6447 5.23463 21.8477C5.60218 22 6.06812 22 7 22" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9.5 13L12.5 22M7 13.5V22" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 19H14.5C15.3284 19 16 19.6716 16 20.5C16 21.3284 15.3284 22 14.5 22H12.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M15.5 6.5V5.5C15.5 3.567 13.933 2 12 2C10.067 2 8.5 3.567 8.5 5.5V6.5C8.5 8.433 10.067 10 12 10C13.933 10 15.5 8.433 15.5 6.5Z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: "doctor",
    label: "Doctor",
    href: "/doctor",
    onDesktop: true,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.5 3.5H4.5C3.94772 3.5 3.5 3.94772 3.5 4.5V8C3.5 11.0376 5.96243 13.5 9 13.5C12.0376 13.5 14.5 11.0376 14.5 8V4.5C14.5 3.94772 14.0523 3.5 13.5 3.5H11.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M18.5 15.5V16.75C18.5 19.3734 16.3734 21.5 13.75 21.5C11.1266 21.5 9 19.3734 9 16.75V13.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M11.5 2.5V4.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6.5 2.5V4.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M20.5 13.5C20.5 14.6046 19.6046 15.5 18.5 15.5C17.3954 15.5 16.5 14.6046 16.5 13.5C16.5 12.3954 17.3954 11.5 18.5 11.5C19.6046 11.5 20.5 12.3954 20.5 13.5Z"/>
      </svg>
    ),
    activeIcon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.5 3.5H4.5C3.94772 3.5 3.5 3.94772 3.5 4.5V8C3.5 11.0376 5.96243 13.5 9 13.5C12.0376 13.5 14.5 11.0376 14.5 8V4.5C14.5 3.94772 14.0523 3.5 13.5 3.5H11.5" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M18.5 15.5V16.75C18.5 19.3734 16.3734 21.5 13.75 21.5C11.1266 21.5 9 19.3734 9 16.75V13.5" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M11.5 2.5V4.5" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6.5 2.5V4.5" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M20.5 13.5C20.5 14.6046 19.6046 15.5 18.5 15.5C17.3954 15.5 16.5 14.6046 16.5 13.5C16.5 12.3954 17.3954 11.5 18.5 11.5C19.6046 11.5 20.5 12.3954 20.5 13.5Z" strokeWidth="2.2"/>
      </svg>
    ),
  },
  {
    id: "appointment",
    label: "Appointment",
    href: "/appointment",
    onDesktop: true,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 2V6M8 2V6" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M13 4H11C7.22876 4 5.34315 4 4.17157 5.17157C3 6.34315 3 8.22876 3 12V14C3 17.7712 3 19.6569 4.17157 20.8284C5.34315 22 7.22876 22 11 22H13C16.7712 22 18.6569 22 19.8284 20.8284C21 19.6569 21 17.7712 21 14V12C21 8.22876 21 6.34315 19.8284 5.17157C18.6569 4 16.7712 4 13 4Z" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 10H21" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M11 14H16M8 14H8.00898M13 18H8M16 18H15.991" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: "Calendar",
    label: "Calendar",
    href: "/calendar",
    onDesktop: true,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 2V6M8 2V6" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M13 4H11C7.22876 4 5.34315 4 4.17157 5.17157C3 6.34315 3 8.22876 3 12V14C3 17.7712 3 19.6569 4.17157 20.8284C5.34315 22 7.22876 22 11 22H13C16.7712 22 18.6569 22 19.8284 20.8284C21 19.6569 21 17.7712 21 14V12C21 8.22876 21 6.34315 19.8284 5.17157C18.6569 4 16.7712 4 13 4Z" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 10H21" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: "Staff",
    label: "Staff",
    href: "/staff",
    onDesktop: true,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13C13.6569 13 15 11.6569 15 10Z" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M17 18C17 15.2386 14.7614 13 12 13C9.23858 13 7 15.2386 7 18" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M21 13V11C21 7.22876 21 5.34315 19.8284 4.17157C18.6569 3 16.7712 3 13 3H11C7.22876 3 5.34315 3 4.17157 4.17157C3 5.34315 3 7.22876 3 11V13C3 16.7712 3 18.6569 4.17157 19.8284C5.34315 21 7.22876 21 11 21H13C16.7712 21 18.6569 21 19.8284 19.8284C21 18.6569 21 16.7712 21 13Z" strokeLinecap="square" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: "Inbox",
    label: "Inbox",
    href: "/inbox",
    onDesktop: true,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.922 4.79004C16.6963 3.16245 19.0834 2.34866 20.3674 3.63261C21.6513 4.91656 20.8375 7.30371 19.21 12.078L18.1016 15.3292C16.8517 18.9958 16.2267 20.8291 15.1964 20.9808C14.9195 21.0216 14.6328 20.9971 14.3587 20.9091C13.3395 20.5819 12.8007 18.6489 11.7231 14.783C11.4841 13.9255 11.3646 13.4967 11.0924 13.1692C11.0134 13.0742 10.9258 12.9866 10.8308 12.9076C10.5033 12.6354 10.0745 12.5159 9.21705 12.2769C5.35111 11.1993 3.41814 10.6605 3.0909 9.64127C3.00292 9.36724 2.97837 9.08053 3.01916 8.80355C3.17088 7.77332 5.00419 7.14834 8.6708 5.89838L11.922 4.79004Z"/>
      </svg>
    ),
  },
  {
    id: "Reminder",
    label: "Reminder",
    href: "/reminder",
    onDesktop: true,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.9094 18.9994C12.8346 20.021 12.6486 20.6893 12.1866 21.1793C11.4134 21.9994 10.1689 21.9994 7.6799 21.9994C5.19089 21.9994 3.94638 21.9994 3.17314 21.1793C2.3999 20.3592 2.3999 19.0392 2.3999 16.3994V11.5994C2.3999 8.95956 2.3999 7.63963 3.17314 6.81952C3.64327 6.32091 4.28759 6.12545 5.2799 6.04883" strokeLinecap="round"/>
        <path d="M7.67236 19H7.68135" strokeWidth="1.92" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M15.9155 2H13.8448C11.0601 2 9.66783 2 8.84136 2.90325C8.01491 3.8065 8.10176 5.23328 8.27546 8.08683L8.39627 10.0715C8.43619 10.7273 8.45615 11.0552 8.52682 11.3287C8.79973 12.3849 9.63404 13.1898 10.6778 13.4036C10.948 13.4589 11.268 13.4588 11.908 13.4588C12.7996 13.4588 12.7875 14.226 12.7875 14.9853C12.7875 15.5744 12.7875 15.869 12.9718 15.9703C13.156 16.0715 13.3947 15.9081 13.8721 15.5813L16.7131 13.6367C16.8989 13.5094 17.066 13.4588 17.2848 13.4588C18.4581 13.4588 19.0447 13.4589 19.5201 13.2751C21.1674 12.638 21.3043 11.0526 21.3994 9.48995L21.4849 8.08683C21.6585 5.23328 21.7454 3.8065 20.9189 2.90325C20.0925 2 18.7002 2 15.9155 2Z" strokeLinejoin="round"/>
        <path d="M13.7606 8.42857C11.4486 6.71429 14.8791 5 14.8791 5C14.8791 5 18.3114 6.71429 15.9995 8.42857M13.7606 8.42857H15.9995M13.7606 8.42857L13.2005 10.9999M15.9995 8.42857L16.7826 10.9999" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: "Analytics",
    label: "Analytics",
    href: "/analytics",
    onDesktop: true,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 17V13" strokeLinecap="round"/>
        <path d="M12 17V7" strokeLinecap="round"/>
        <path d="M17 17V11" strokeLinecap="round"/>
        <path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

const mobileMenuItems = [
  {
    id: "home",
    label: "Home",
    href: "/home",
    onDesktop: true,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 17C14.2005 17.6224 13.1502 18 12 18C10.8497 18 9.79953 17.6224 9 17" strokeLinecap="round"/>
        <path d="M2.35139 13.2135C1.99837 10.9162 1.82186 9.76763 2.25617 8.74938C2.69047 7.73112 3.65403 7.03443 5.58114 5.64106L7.02099 4.6C9.41829 2.86667 10.6169 2 12 2C13.383 2 14.5817 2.86667 16.979 4.6L18.4188 5.64106C20.346 7.03443 21.3095 7.73112 21.7438 8.74938C22.1781 9.76763 22.0016 10.9162 21.6486 13.2135L21.3476 15.1724C20.8471 18.4289 20.5969 20.0572 19.429 21.0286C18.2611 22 16.5536 22 13.1388 22H10.8612C7.44634 22 5.73891 22 4.571 21.0286C3.40309 20.0572 3.15287 18.4289 2.65243 15.1724L2.35139 13.2135Z" strokeLinejoin="round"/>
      </svg>
    ),
    activeIcon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C13.383 2 14.5822 2.86628 16.9795 4.59961L18.419 5.64062C20.346 7.03389 21.3098 7.73089 21.7441 8.74902C22.1784 9.76727 22.0014 10.9166 21.6484 13.2139L21.3477 15.1729C20.8472 18.429 20.5966 20.057 19.4287 21.0283C18.2608 21.9996 16.5534 22 13.1387 22H10.8613C7.44647 22 5.7392 21.9997 4.5713 21.0283C3.40347 20.057 3.15274 18.429 2.65235 15.1729L2.35157 13.2139C1.99855 10.9166 1.82156 9.76727 2.25587 8.74902C2.6902 7.73084 3.65404 7.03393 5.58106 5.64062L7.02149 4.59961C9.41842 2.86655 10.6171 2.00006 12 2ZM9.39747 16.3643C9.07553 16.1625 8.6467 16.2329 8.40821 16.5391C8.16965 16.8456 8.20641 17.2794 8.48145 17.542L8.53907 17.5918L8.71778 17.7246C9.62507 18.3708 10.7681 18.75 12 18.75C13.314 18.75 14.5274 18.3186 15.4609 17.5918C15.7877 17.3373 15.8462 16.8659 15.5918 16.5391C15.3373 16.2124 14.8658 16.1538 14.5391 16.4082C13.8737 16.9261 12.9863 17.25 12 17.25C11.1369 17.25 10.3498 17.0017 9.72071 16.5928L9.46094 16.4082L9.39747 16.3643Z" fill="currentColor" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: "doctor",
    label: "Doctor",
    href: "/doctor",
    onDesktop: true,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.5 3.5H4.5C3.94772 3.5 3.5 3.94772 3.5 4.5V8C3.5 11.0376 5.96243 13.5 9 13.5C12.0376 13.5 14.5 11.0376 14.5 8V4.5C14.5 3.94772 14.0523 3.5 13.5 3.5H11.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M18.5 15.5V16.75C18.5 19.3734 16.3734 21.5 13.75 21.5C11.1266 21.5 9 19.3734 9 16.75V13.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M11.5 2.5V4.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6.5 2.5V4.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M20.5 13.5C20.5 14.6046 19.6046 15.5 18.5 15.5C17.3954 15.5 16.5 14.6046 16.5 13.5C16.5 12.3954 17.3954 11.5 18.5 11.5C19.6046 11.5 20.5 12.3954 20.5 13.5Z"/>
      </svg>
    ),
    activeIcon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.5 3.5H4.5C3.94772 3.5 3.5 3.94772 3.5 4.5V8C3.5 11.0376 5.96243 13.5 9 13.5C12.0376 13.5 14.5 11.0376 14.5 8V4.5C14.5 3.94772 14.0523 3.5 13.5 3.5H11.5" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M18.5 15.5V16.75C18.5 19.3734 16.3734 21.5 13.75 21.5C11.1266 21.5 9 19.3734 9 16.75V13.5" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M11.5 2.5V4.5" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6.5 2.5V4.5" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M20.5 13.5C20.5 14.6046 19.6046 15.5 18.5 15.5C17.3954 15.5 16.5 14.6046 16.5 13.5C16.5 12.3954 17.3954 11.5 18.5 11.5C19.6046 11.5 20.5 12.3954 20.5 13.5Z" strokeWidth="2.2"/>
      </svg>
    ),
  },
  {
    id: "appointment",
    label: "Appointment",
    href: "/appointment",
    onDesktop: true,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 2V6M8 2V6" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M13 4H11C7.22876 4 5.34315 4 4.17157 5.17157C3 6.34315 3 8.22876 3 12V14C3 17.7712 3 19.6569 4.17157 20.8284C5.34315 22 7.22876 22 11 22H13C16.7712 22 18.6569 22 19.8284 20.8284C21 19.6569 21 17.7712 21 14V12C21 8.22876 21 6.34315 19.8284 5.17157C18.6569 4 16.7712 4 13 4Z" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 10H21" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    activeIcon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 12V14C21 17.7712 20.9997 19.6566 19.8281 20.8281C18.6566 21.9997 16.7712 22 13 22H11C7.22878 22 5.34346 21.9997 4.17188 20.8281C3.00031 19.6566 3 17.7712 3 14V12C3 11.5581 3.00007 11.142 3.00195 10.75H20.998C20.9999 11.142 21 11.5581 21 12ZM13 4C13.7355 4 14.3993 4.00203 15 4.01074V6C15 6.55228 15.4477 7 16 7C16.5523 7 17 6.55228 17 6V4.10254C18.2999 4.23052 19.175 4.51873 19.8281 5.17188C20.6717 6.01541 20.9065 7.22887 20.9727 9.25H3.02734C3.09348 7.22885 3.32834 6.01541 4.17188 5.17188C4.82502 4.51873 5.70009 4.23052 7 4.10254V6C7 6.55228 7.44772 7 8 7C8.55228 7 9 6.55228 9 6V4.01074C9.60074 4.00203 10.2645 4 11 4H13Z" fill="currentColor"/>
        <path d="M16 2V6M8 2V6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: "profile",
    label: "Profile",
    href: "/profile",
    onDesktop: false,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 8.5C17 5.73858 14.7614 3.5 12 3.5C9.23858 3.5 7 5.73858 7 8.5C7 11.2614 9.23858 13.5 12 13.5C14.7614 13.5 17 11.2614 17 8.5Z" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M19 20.5C19 16.634 15.866 13.5 12 13.5C8.13401 13.5 5 16.634 5 20.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    activeIcon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 8.5C17 5.73858 14.7614 3.5 12 3.5C9.23858 3.5 7 5.73858 7 8.5C7 11.2614 9.23858 13.5 12 13.5C14.7614 13.5 17 11.2614 17 8.5Z" fill="currentColor"/>
        <path d="M20 22C20 17.5817 16.4183 14 12 14C7.58173 14 4 17.5817 4 22" fill="currentColor"/>
        <path d="M20 22C20 17.5817 16.4183 14 12 14C7.58173 14 4 17.5817 4 22H12H20Z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

const otherItems = [
  {
    id: "Coding & Billing",
    label: "Coding & Billing",
    href: "/billing_and_coding",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 18.6458V8.05426C4 5.20025 4 3.77325 4.87868 2.88663C5.75736 2 7.17157 2 10 2H14C16.8284 2 18.2426 2 19.1213 2.88663C20 3.77325 20 5.20025 20 8.05426V18.6458C20 20.1575 20 20.9133 19.538 21.2108C18.7831 21.6971 17.6161 20.6774 17.0291 20.3073C16.5441 20.0014 16.3017 19.8485 16.0325 19.8397C15.7417 19.8301 15.4949 19.9768 14.9709 20.3073L13.06 21.5124C12.5445 21.8374 12.2868 22 12 22C11.7132 22 11.4555 21.8374 10.94 21.5124L9.02913 20.3073C8.54415 20.0014 8.30166 19.8485 8.03253 19.8397C7.74172 19.8301 7.49493 19.9768 6.97087 20.3073C6.38395 20.6774 5.21687 21.6971 4.46195 21.2108C4 20.9133 4 20.1575 4 18.6458Z" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 6H8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10 10H8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14.5 9.875C13.6716 9.875 13 10.4626 13 11.1875C13 11.9124 13.6716 12.5 14.5 12.5C15.3284 12.5 16 13.0876 16 13.8125C16 14.5374 15.3284 15.125 14.5 15.125M14.5 9.875C15.1531 9.875 15.7087 10.2402 15.9146 10.75M14.5 9.875V9M14.5 15.125C13.8469 15.125 13.2913 14.7598 13.0854 14.25M14.5 15.125V16" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "hipaa-consent",
    label: "HIPAA Consent",
    href: "/hipaa-consent",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
      </svg>
    ),
  },
  {
    id: "support",
    label: "Support",
    href: "/support",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    ),
  },
];








interface SidebarItemProps {
  item: {
    id: string;
    label: string;
    href: string;
    icon: React.ReactNode;
  };
  isActive: boolean;
  onClick: () => void;
}

function SidebarItem({ item, isActive, onClick }: SidebarItemProps) {
  return (
    <>
      {/* <div className="w-0 h-5 outline-[6px] outline-primary-500 absolute rounded-3xl" /> */}
      <button
        onClick={onClick}
        className={cn(
          "w-full flex relative items-center gap-3 px-4 py-3 text-left rounded-lg transition-all duration-500 group",
          isActive
            ? " text-primary-500   shadow-[0px_3px_4px_0px_rgba(26,64,96,0.10)]  before:w-1 before:h-8 before:-left-1 z-0 before:absolute  before:rounded-l-3xl"
            : "text-Text-secondary hover:bg-[#F3F3F3] hover:text-text-primary hover:shadow-[0px_3px_4px_0px_rgba(26,64,96,0.10)]"
        )}
      >{isActive && (
    <span className="absolute left-[-3px] top-6 h-6 w-1  bg-[#2E8BC9]  transform -translate-y-2" />
  )}
        <div
  className={cn(
    "flex-shrink-0 transition-colors",
    isActive
      ? "text-[#2E8BC9]"
      : "text-text-primary group-hover:text-gray-700"
  )}
>
  {item.icon}
</div>
        <span className="text-lg font-medium">{item.label}</span>
      </button>
    </>
  );
}

interface SidebarSectionProps {
  title?: string;
  onDesktop?: boolean;
  items: Array<{
    id: string;
    label: string;
    href: string;
    icon: React.ReactNode;
  }>;
  activeItem: string;
  onItemClick: (item: any) => void;
}

function SidebarSection({
  title,
  items,
  activeItem,
  onItemClick,
  onDesktop,
}: SidebarSectionProps) {
  return (
    <div className="space-y-2">
      {title && (
        <h3 className="px-4 text-lg font-normal text-gray-500 tracking-wider">
          {title}
        </h3>
      )}
      <div className="space-y-4">
        {items.map((item) => (
          <SidebarItem
            key={item.id}
            item={item}
            isActive={activeItem === item.id}
            onClick={() => onItemClick(item)}
          />
        ))}
      </div>
    </div>
  );
}
export function useScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
}
export function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  
  // Initialize scroll to top functionality
  useScrollToTop();

  // Get active item from current pathname
  const getActiveItem = () => {
    const allItems = [
      ...mainMenuItems,
      ...mobileMenuItems,
      ...otherItems,
    ];
    const currentItem = allItems.find((item) => item.href === pathname);
    return currentItem?.id || "home";
  };

  const [activeItem, setActiveItem] = useState(getActiveItem());

  // Enhanced item click handler with scroll to top
  const handleItemClick = (item: any) => {
    // Update active state immediately for visual feedback
    setActiveItem(item.id);
    
    // Navigate to the new route
    router.push(item.href);
    
    // Force scroll to top after a short delay to ensure navigation is complete
    setTimeout(() => {
      try {
        // Try multiple scroll targets
        const targets = [
          document.querySelector('main'),
          document.querySelector('[data-main-content]'),
          document.querySelector('#main-content'),
          document.body,
          document.documentElement
        ];
        
        targets.forEach(target => {
          if (target && target.scrollTo) {
            target.scrollTo({ top: 0, behavior: 'smooth' });
          }
        });
        
        // Also scroll window as fallback
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (error) {
        // Silent fallback to instant scroll
        window.scrollTo(0, 0);
      }
    }, 100);
  };

  // Update active item when pathname changes (for browser back/forward)
  useEffect(() => {
    const newActiveItem = getActiveItem();
    if (newActiveItem !== activeItem) {
      setActiveItem(newActiveItem);
    }
  }, [pathname]);

  return (
    <>
      <div className="w-78 bg-white border-r border-gray-200 h-full md:flex flex-col hidden z-50">
        {/* Logo */}
        <div className="p-6">
          <div
            className="flex items-center"
            onClick={() => {
              setActiveItem("home");
              router.push("/");
            }}
          >
            <svg
              width="152"
              height="48"
              viewBox="0 0 152 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M47.1725 12.4394C45.6989 11.6591 43.8459 11.9342 42.4454 13.1359C41.5173 13.9084 40.7277 15.0199 40.0312 16.5355C39.2431 18.2501 38.3011 19.9336 37.3902 21.5612C37.2705 21.7741 37.1523 21.9886 37.0311 22.2047L35.2108 19.0211C34.6932 18.1149 34.1056 17.0889 33.162 16.3241C32.3739 15.6837 31.4878 15.379 30.6328 15.3976H30.6297C29.7748 15.379 28.8887 15.6837 28.1006 16.3241C27.157 17.0889 26.5694 18.1149 26.0518 19.0211L24.2315 22.2047C24.1102 21.9886 23.9921 21.7741 23.8724 21.5612C22.9615 19.9336 22.0195 18.2501 21.2313 16.5355C20.5349 15.0199 19.7453 13.91 18.8172 13.1359C17.4151 11.9342 15.5621 11.6591 14.09 12.4394C12.7034 13.1732 11.9076 14.7401 12.0086 16.5277C12.091 17.9579 12.6786 19.2434 13.1978 20.3797L17.1943 29.1128C17.4244 29.6134 18.0167 29.8341 18.5188 29.6056C19.0193 29.3755 19.24 28.7833 19.0115 28.2827L15.015 19.5497C14.5471 18.5284 14.0636 17.4698 14.003 16.4143C13.9812 16.035 13.9906 14.7525 15.0243 14.2038C15.9259 13.7266 16.9316 14.1494 17.5192 14.6546L17.5348 14.6686C18.2312 15.2453 18.8468 16.1282 19.4188 17.3687C20.2396 19.1548 21.2018 20.8741 22.1314 22.5358C22.4407 23.0908 22.7594 23.6597 23.0718 24.2318L21.4427 27.0811C19.795 29.5465 18.8576 32.9135 21.1474 35.0012C22.0847 35.8546 23.2708 36.1764 24.4895 35.9075C25.8435 35.6075 27.0327 34.5908 27.5907 33.2555C28.2871 31.5938 27.8565 29.9414 27.2876 28.4055C26.7451 26.9366 26.0394 25.5453 25.3569 24.2582L27.7866 20.0129C28.2389 19.2217 28.7068 18.404 29.3582 17.8755C29.7157 17.5863 30.1681 17.3811 30.6297 17.4014H30.6328C31.0945 17.3811 31.5469 17.5848 31.9044 17.8755C32.5573 18.404 33.0236 19.2201 33.476 20.0129L35.9056 24.2582C35.2232 25.5437 34.5175 26.935 33.975 28.4055C33.406 29.9414 32.9754 31.5938 33.6719 33.2555C34.2299 34.5908 35.4191 35.6075 36.7731 35.9075C37.9918 36.1764 39.1794 35.8546 40.1152 35.0012C42.4049 32.9135 41.4691 29.5465 39.8198 27.0811L38.1907 24.2318C38.5016 23.6597 38.8203 23.0908 39.1312 22.5358C40.0608 20.8741 41.023 19.1548 41.8438 17.3687C42.4158 16.1267 43.0314 15.2453 43.7278 14.6686L43.7433 14.6546C44.3309 14.1494 45.3367 13.7266 46.2383 14.2038C47.272 14.7525 47.2829 16.035 47.2596 16.4143C47.2005 17.4698 46.7171 18.5284 46.2476 19.5497L42.251 28.2827C42.021 28.7833 42.2433 29.3755 42.7438 29.6056C43.2459 29.8357 43.8382 29.6134 44.0682 29.1128L48.0648 20.3797C48.584 19.2434 49.1716 17.9579 49.254 16.5277C49.3566 14.7401 48.5591 13.1732 47.1725 12.4394ZM25.4113 29.0988C25.9181 30.4699 26.1528 31.5129 25.7456 32.4845C25.4393 33.2198 24.7756 33.798 24.0543 33.9582C23.6548 34.0452 23.0563 34.0436 22.4889 33.526C20.6935 31.8907 22.8635 28.5408 23.1169 28.1646L24.174 26.3225C24.6248 27.2164 25.0585 28.1475 25.4098 29.1004L25.4113 29.0988ZM38.7706 33.5244C38.2032 34.0421 37.6063 34.0436 37.2052 33.9566C36.4855 33.7965 35.8202 33.2198 35.5139 32.4829C35.1066 31.513 35.3398 30.4683 35.8481 29.0973C36.201 28.1459 36.6331 27.2132 37.0839 26.3194L38.141 28.1615C38.3944 28.5377 40.5644 31.8876 38.769 33.5229L38.7706 33.5244Z"
                fill="#2E8BC9"
              />
              <path
                d="M66.1062 32.0778L61.7881 17.3086H64.3834L67.3274 27.9762L70.261 17.3293L72.8563 17.3086L75.8003 27.9762L78.7339 17.3086H81.3292L77.0214 32.0778H74.5804L71.5547 21.5749L68.5498 32.0778H66.1088H66.1062Z"
                fill="#292929"
              />
              <path
                d="M86.8054 32.3857C85.684 32.3857 84.6988 32.1433 83.851 31.6572C83.0032 31.1723 82.3421 30.4982 81.8663 29.6362C81.3906 28.7741 81.1533 27.7837 81.1533 26.6611C81.1533 25.4503 81.3854 24.3989 81.8508 23.5071C82.3161 22.6152 82.9617 21.9229 83.7888 21.4303C84.6158 20.9377 85.5738 20.6914 86.6602 20.6914C87.8087 20.6914 88.7849 20.9597 89.5886 21.4964C90.3924 22.0331 90.9887 22.7902 91.3789 23.7676C91.7691 24.7451 91.9156 25.8975 91.8196 27.2237H89.3682V26.3214C89.3618 25.1184 89.1492 24.2395 88.7317 23.686C88.3143 23.1324 87.6584 22.855 86.7626 22.855C85.7501 22.855 84.9983 23.1674 84.5057 23.7936C84.0131 24.4197 83.7667 25.3336 83.7667 26.5379C83.7667 27.6593 84.0131 28.5278 84.5057 29.1436C84.9983 29.7593 85.7164 30.0666 86.6602 30.0666C87.2682 30.0666 87.7932 29.9317 88.2352 29.6621C88.676 29.3925 89.0169 29.001 89.2555 28.4876L91.6965 29.2265C91.2726 30.2247 90.6179 31.0012 89.7325 31.5548C88.8471 32.1083 87.871 32.3857 86.8041 32.3857H86.8054ZM82.9889 27.2263V25.3595H90.6101V27.2263H82.9889Z"
                fill="#292929"
              />
              <path
                d="M94.3223 32.0778V17H96.7944V32.0778H94.3223Z"
                fill="#292929"
              />
              <path
                d="M100.077 32.0778V17H102.549V32.0778H100.077Z"
                fill="#292929"
              />
              <path
                d="M105.605 32.0778V17.3086H108.098V24.3037H107.791V32.0778H105.607H105.605ZM110.949 32.3851C109.869 32.3851 108.963 32.1284 108.231 31.6163C107.498 31.103 106.948 30.4043 106.579 29.5189C106.21 28.6335 106.025 27.6405 106.025 26.5399C106.025 25.4393 106.21 24.4268 106.579 23.5453C106.948 22.6638 107.49 21.9676 108.205 21.4582C108.919 20.9487 109.803 20.6946 110.856 20.6946C111.908 20.6946 112.809 20.95 113.579 21.4582C114.348 21.9676 114.946 22.6612 115.37 23.5401C115.793 24.419 116.006 25.4185 116.006 26.5399C116.006 27.6612 115.797 28.6425 115.38 29.524C114.962 30.4056 114.375 31.103 113.616 31.6163C112.856 32.1297 111.968 32.3851 110.949 32.3851ZM110.569 30.1696C111.212 30.1696 111.742 30.0089 112.158 29.6874C112.576 29.3659 112.884 28.9303 113.087 28.3794C113.289 27.8284 113.389 27.2152 113.389 26.5386C113.389 25.8619 113.286 25.2578 113.081 24.7081C112.877 24.1572 112.558 23.7203 112.127 23.3949C111.697 23.0708 111.15 22.9075 110.486 22.9075C109.822 22.9075 109.344 23.0592 108.947 23.3638C108.551 23.6685 108.259 24.0924 108.071 24.6355C107.883 25.1787 107.789 25.8139 107.789 26.5386C107.789 27.2632 107.882 27.8893 108.071 28.4364C108.259 28.9835 108.556 29.4087 108.963 29.7133C109.37 30.0179 109.904 30.1696 110.568 30.1696H110.569Z"
                fill="#292929"
              />
              <path
                d="M118.97 37.0008L121.103 31.1439L121.145 32.8667L116.313 21H118.888L122.314 29.7801H121.658L124.991 21H127.463L121.289 37.0008H118.971H118.97Z"
                fill="#292929"
              />
              <path
                d="M128.97 32.0784V21.0012H131.175V24.4378H131.472V32.0784H128.97ZM136.652 32.0784V26.7453C136.652 26.3966 136.627 26.0103 136.581 25.5864C136.533 25.1625 136.421 24.7541 136.247 24.3613C136.074 23.9685 135.813 23.6457 135.468 23.3917C135.123 23.1389 134.657 23.0118 134.068 23.0118C133.753 23.0118 133.442 23.0637 133.135 23.1661C132.828 23.2685 132.549 23.4448 132.299 23.6937C132.049 23.9439 131.849 24.2848 131.699 24.7191C131.548 25.1534 131.473 25.7095 131.473 26.3862L130.007 25.7601C130.007 24.8163 130.19 23.962 130.555 23.1959C130.921 22.4298 131.46 21.8205 132.17 21.3655C132.882 20.9105 133.757 20.6836 134.795 20.6836C135.616 20.6836 136.293 20.821 136.827 21.0945C137.36 21.3681 137.784 21.7168 138.099 22.1407C138.414 22.5646 138.646 23.0157 138.796 23.4941C138.946 23.9724 139.044 24.4261 139.089 24.8526C139.133 25.2804 139.155 25.6266 139.155 25.8936V32.0784H136.652Z"
                fill="#292929"
              />
            </svg>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 py-4 p-6 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-white h-10 overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
          <div className="space-y-6">
            {/* Main Menu */}
            <SidebarSection
              items={mainMenuItems}
              activeItem={activeItem}
              onItemClick={handleItemClick}
            />
    

            {/* Quick Section */}
     

          

            {/* Other Section */}
            <SidebarSection
              title="Other"
              items={otherItems}
              activeItem={activeItem}
              onItemClick={handleItemClick}
            />
          </div>
        </div>

        {/* User Profile Section */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-sm">Ma</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-lg font-medium text-gray-900 truncate">
                Mahmudur Rahman
              </p>
              <p className="text-base text-gray-500 truncate">
                Personal account
              </p>
            </div>
            <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
              <Link href="/switch-account">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="32" height="32" rx="4" fill="#F3F3F3" />
                <path
                  d="M21 21C19.6193 21 18.5 19.8807 18.5 18.5C18.5 17.1193 19.6193 16 21 16C22.3807 16 23.5 17.1193 23.5 18.5C23.5 19.8807 22.3807 21 21 21ZM21 21C23.4853 21 25.5 23.0147 25.5 25.5M21 21C18.5147 21 16.5 23.0147 16.5 25.5"
                  stroke="#2E8BC9"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11 11.5C9.61929 11.5 8.5 10.3807 8.5 9C8.5 7.61929 9.61929 6.5 11 6.5C12.3807 6.5 13.5 7.61929 13.5 9C13.5 10.3807 12.3807 11.5 11 11.5ZM11 11.5C13.4853 11.5 15.5 13.5147 15.5 16M11 11.5C8.51472 11.5 6.5 13.5147 6.5 16"
                  stroke="#2E8BC9"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7.5 19.5C7.5 22.2643 9.73571 24.5 12.5 24.5L12 22.5"
                  stroke="#2E8BC9"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M22.5 12.5C22.5 9.73571 20.2643 7.5 17.5 7.5L18 9.5"
                  stroke="#2E8BC9"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              </Link>
              
            </div>
          </div>

          <button className="w-full font-medium leading-normal tracking-tight text-lg flex items-center gap-2 px-3 py-2 text-left text-Text-error hover:bg-red-50 rounded-lg transition-colors" onClick={() => {router.push("/login")}}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 17.625C14.9264 19.4769 13.3831 21.0494 11.3156 20.9988C10.8346 20.987 10.2401 20.8194 9.05112 20.484C6.18961 19.6768 3.70555 18.3203 3.10956 15.2815C3 14.723 3 14.0944 3 12.8373V11.1627C3 9.90561 3 9.27705 3.10956 8.71846C3.70555 5.67965 6.18961 4.32316 9.05112 3.51603C10.2401 3.18064 10.8346 3.01295 11.3156 3.00119C13.3831 2.95061 14.9264 4.52307 15 6.37501"
                stroke="#B42121"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M21 12H10M21 12C21 11.2998 19.0057 9.99153 18.5 9.5M21 12C21 12.7002 19.0057 14.0085 18.5 14.5"
                stroke="#B42121"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Log Out
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="pb-2.5 bg-Surface-primary rounded-tl-[36px] rounded-tr-[36px] shadow-[0px_-4px_12px_-1px_rgba(26,64,96,0.20)] inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden absolute bottom-0 max-w-[768px] w-full md:hidden z-50">
        <div className="w-full px-6 py-3 bg-Surface-primary rounded-tl-[36px] rounded-tr-[36px] border-Border-tertiary flex justify-between items-baseline overflow-hidden">
          {mobileMenuItems.map((item) => (
            <Link key={item.id} href={item.href}>
              <div
                className={`w-11 h-11 inline-flex flex-col justify-start items-center ${
                  activeItem === item.id
                    ? "text-primary-500"
                    : "text-Text-action"
                }`}
                onClick={() => handleItemClick(item)}
              >
                {/* Icon */}
                <div
                  className={`${
                    activeItem === item.id
                      ? "text-primary-500 "
                      : "text-text-primary"
                  }`}
                >
                  {activeItem === item.id ? item.activeIcon : item.icon}
                </div>
                {/* Menu Title */}
                <div className="text-center text-xs font-bold font-['Satoshi'] ">
                  {item.label}
                </div>
                {/* Active Indicator */}
                {activeItem === item.id && (
                  <div className="w-3 h-1 bg-Border-focus rounded-2xl" />
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
