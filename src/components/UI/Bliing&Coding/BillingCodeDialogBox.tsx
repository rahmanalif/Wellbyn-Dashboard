"use client"
import Image from "next/image";
import CodeReview from "./CodeReview";
import CMS100Data from "./CMS100Data";
import { SetStateAction, useState } from "react";
import Assessment from "./Assessment";

export default function BillingCodeDialogBox({showDialogBox, setShowDialogBox}: {showDialogBox: boolean, setShowDialogBox: React.Dispatch<SetStateAction<boolean>>}) {
  const [showAssessment, setShowAssessment] = useState<number>(1)
  return (
    <div
      className={`fixed top-0 w-screen h-screen z-50 flex justify-end ${showDialogBox ? "left-0" : "left-[110%]"} transition-all duration-500`}
      style={showDialogBox ? { background: "rgba(0, 0, 0, 0.5)" } : {}}
    >
      <div className="bg-white md:w-1/2 w-full h-full flex flex-col relative">
      
        <div className="flex-1 overflow-y-auto md:p-4 p-1">
          <h1 className="text-[24px] font-[500] text-[#3D3D3D]">Code Review</h1>
          <br />
          <div className="bg-slate-100 flex items-center justify-between p-2 md:p-4 rounded-md">
            <div>
              <p className="text-[#7C7C7C]">Patient</p>
              <p className="text-[18px] font-[500] text-[#3D3D3D]">John Smith</p>
            </div>
            <div>
              <p className="text-[#7C7C7C]">Appointment time</p>
              <p className="text-[18px] font-[500] text-[#3D3D3D]">09:00 AM</p>
            </div>
            <div>
              <p className="text-[#7C7C7C]">Doctor</p>
              <p className="text-[18px] font-[500] text-[#3D3D3D]">Dr. Sarah Chen</p>
            </div>
          </div>

          <div className="bg-slate-100 flex items-center justify-between p-2 md:p-4 rounded-md mt-8">
            <button onClick={() => setShowAssessment(1)} className={`cursor-pointer text-[#3D3D3D] font-[500] text-[16px] ${showAssessment === 1 ? "shadow-md bg-white p-2 rounded-md" : ""}`}>Assessment</button>
            <button onClick={() => setShowAssessment(2)} className={`cursor-pointer text-[#3D3D3D] font-[500] text-[16px] ${showAssessment === 2 ? "shadow-md bg-white p-2 rounded-md" : ""}`}>Code Review</button>
            <button onClick={() => setShowAssessment(3)} className={`cursor-pointer text-[#3D3D3D] font-[500] text-[16px] ${showAssessment === 3 ? "shadow-md bg-white p-2 rounded-md" : ""}`}>CMS-1500 Data</button>
            <button className="cursor-pointer text-[#3D3D3D] font-[500] text-[16px]">Form Preview</button>
          </div>
          {
            showAssessment === 1 ? <Assessment /> :
            showAssessment === 2 ? <CodeReview /> :
            showAssessment === 3 ? <CMS100Data /> : <></>
          }
        </div>

        <div
         
          className="bg-white p-4 flex items-center justify-center gap-4"
        >
          <button onClick={() => setShowDialogBox(false)} className="hover:opacity-90 shadow-md text-[#2E8BC9]  rounded-md w-full py-2 text-center cursor-pointer text-[18px] font-[500]">
            Close
          </button>
          <button className="hover:opacity-90 bg-[#2E8BC9] rounded-md w-full py-2 text-center flex items-center justify-center gap-2 text-white cursor-pointer text-[18px] font-[500]">
            <Image
              src="/checkmark-circle-02.svg"
              alt="checkmark"
              width="24"
              height="24"
            />
            Finalize
          </button>
        </div>
      </div>
    </div>
  );
}
