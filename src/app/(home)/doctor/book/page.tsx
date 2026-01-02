import Image from "next/image";
export default function DoctorAppointmentBooking() {
  return (
    <div className="max-w-sm mx-auto bg-gray-50 min-h-screen p-4">
      {/* Doctor Profile Section */}
      <div className="bg-white text-black rounded-xl p-4 mb-6">
        <div className="flex items-start gap-4">
          {/* Doctor Image */}
          <div className="bg-white flex justify-between rounded-xl w-20 h-20  items-center ">
           <Image
                          src="/maleDoctor.png"
                          alt="img"
                          width={320}
                          height={176}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      
          </div>
          
          {/* Doctor Info */}
          <div className="flex-1 bg-white">
          
              <div className="flex justify-between items-start">  <h1 className="text-xl font-bold">Dr. Moule Marrk</h1>
           <svg width="48" height="49" viewBox="0 0 48 49" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_965_18190)">
<rect x="4" y="1.5" width="40" height="40" rx="8" fill="#2E8BC9"/>
<path d="M24 11.5C29.5221 11.5 33.9998 15.7834 34 21.0664C34 26.3496 29.5222 30.6338 24 30.6338C23.3507 30.6347 22.7032 30.5738 22.0654 30.4541C21.6066 30.3679 21.377 30.3252 21.2168 30.3496C21.0565 30.3741 20.8292 30.4947 20.375 30.7363C19.0902 31.4196 17.5922 31.6605 16.1514 31.3926C16.6988 30.7191 17.0723 29.9111 17.2373 29.0449C17.3373 28.5149 17.0899 27.9999 16.7188 27.623C15.0332 25.9115 14 23.6048 14 21.0664C14.0002 15.7834 18.4779 11.5 24 11.5ZM20 20.5C19.4477 20.5 19 20.9477 19 21.5C19 22.0523 19.4477 22.5 20 22.5H20.0088C20.5611 22.5 21.0088 22.0523 21.0088 21.5C21.0088 20.9477 20.5611 20.5 20.0088 20.5H20ZM23.9951 20.5C23.443 20.5002 22.9951 20.9478 22.9951 21.5C22.9951 22.0522 23.443 22.4998 23.9951 22.5H24.0049L24.1064 22.4951C24.6109 22.4441 25.0049 22.0179 25.0049 21.5C25.0049 20.9821 24.6109 20.5559 24.1064 20.5049L24.0049 20.5H23.9951ZM27.9912 20.5C27.4389 20.5 26.9912 20.9477 26.9912 21.5C26.9912 22.0523 27.4389 22.5 27.9912 22.5H28C28.5523 22.5 29 22.0523 29 21.5C29 20.9477 28.5523 20.5 28 20.5H27.9912Z" fill="white"/>
</g>
<defs>
<filter id="filter0_d_965_18190" x="0" y="0.5" width="48" height="48" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="3"/>
<feGaussianBlur stdDeviation="2"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.101961 0 0 0 0 0.25098 0 0 0 0 0.376471 0 0 0 0.1 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_965_18190"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_965_18190" result="shape"/>
</filter>
</defs>
</svg>

</div> <p className="text-[#7C7C7C] text-sm mb-2">Cardiology</p>
            <div className="flex items-start gap-1 mb-1">
              <span className="text-teal-100">📍</span>
              <span className="text-sm font-medium">Sylhet Health Center</span>
            </div>
            
            <p className="text-xs text-teal-100">
              Calle Ciela #142, Ufb. Alunza de Monte Vende,<br />
              Trujillo Alto, PR 00926
            </p>
          </div>
        </div>
           {/* Date Selection Section */}
      <div className="mb-8 bg-white border-t-2 border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Select your date</h2>
          <div className="flex items-center gap-2 text-gray-500">
            <button className="p-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <span className="text-sm">Feb 2025</span>
            <button className="p-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>

        {/* Calendar */}
        <div className="mb-6">
          {/* Days of Week */}
          <div className="grid grid-cols-7 gap-2 mb-3">
            {['Fr', 'Sa', 'Mo', 'Tu', 'Sa', 'We', 'Th'].map((day, index) => (
              <div key={index} className="text-center text-xs text-gray-500 font-medium">
                {day}
              </div>
            ))}
          </div>
          
          {/* Dates */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {[1, 2, 3, 4, 5, 6, 7].map((date) => (
              <button 
                key={date} 
                className={`w-10 h-10 rounded-lg text-sm font-medium ${date === 4 ? 'bg-[#2E8BC9] text-white' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                {date}
              </button>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-2">
            {[8, 9, 10, 11, 12, 13, 14].map((date) => (
              <button 
                key={date} 
                className="w-10 h-10 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                {date}
              </button>
            ))}
          </div>
        </div>
      </div>{/* Time Slots */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {[
          "11:45 AM", "2:15 PM", "4:30 AM",
          "6:20 PM", "10:05 PM", "10:05 PM",
          "7:00 PM", "1:55 AM"
        ].map((time, index) => (
          <button
            key={index}
            className={`py-2 px-1 rounded-lg text-sm font-medium border ${
              time === "2:15 PM" 
                ? "bg-[#2E8BC9] text-white border-blue-500" 
                : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
            }`}
          >
            {time}
          </button>
        ))}
      </div>  <div className="flex gap-3">
        <button className="flex-1 py-3 px-4 bg-white border border-blue-300 text-blue-500 rounded-xl font-medium flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          Waitlist
        </button>
        <button className="flex-1 py-3 px-4 bg-blue-500 text-white rounded-xl font-medium">
          Next
        </button>
      </div></div>

 

      

      {/* Action Buttons */}
    
    </div>
  );
}