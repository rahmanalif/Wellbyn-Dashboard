import Image from "next/image"
import { Calendar, Users, Eye, Edit, Search, TrendingUp, User, Mail, Phone, Stethoscope } from "lucide-react"

const appointmentsData = [
  {
    id: "P60768",
    patientName: "Rani Rahman",
    initial: "R",
    contact: "sarah_illustrates@gmail.com\n(555) 123-4567",
    gender: "Male",
    lastVisit: "04-30-2026",
    status: "In Care",
  },
  {
    id: "JOKIL2",
    patientName: "Tariq Rahman",
    initial: "T",
    contact: "sarah_illustrates@gmail.com\n(555) 123-4567",
    gender: "Male",
    lastVisit: "03-15-2027",
    status: "Recovered",
  },
  {
    id: "V2W3X4",
    patientName: "Maya Rahman",
    initial: "M",
    contact: "sarah_illustrates@gmail.com\n(555) 123-4567",
    gender: "Male",
    lastVisit: "01-01-2028",
    status: "In Care",
  },
  {
    id: "DEF5G8",
    patientName: "Sami Rahman",
    initial: "S",
    contact: "sarah_illustrates@gmail.com\n(555) 123-4567",
    gender: "Female",
    lastVisit: "06-14-2027",
    status: "Recovered",
  },
  {
    id: "M3N4O5",
    patientName: "Zara Rahman",
    initial: "Z",
    contact: "sarah_illustrates@gmail.com\n(555) 123-4567",
    gender: "Male",
    lastVisit: "10-10-2025",
    status: "In Care",
  },
  {
    id: "S9T0U1",
    patientName: "Nashit Rahman",
    initial: "N",
    contact: "sarah_illustrates@gmail.com\n(555) 123-4567",
    gender: "Female",
    lastVisit: "02-20-2027",
    status: "In Care",
  },
  {
    id: "B8C9D0",
    patientName: "Fahim Rahman",
    initial: "F",
    contact: "sarah_illustrates@gmail.com\n(555) 123-4567",
    gender: "Female",
    lastVisit: "09-10-2028",
    status: "Recovered",
  },
  {
    id: "G7H8I9",
    patientName: "Riya Rahman",
    initial: "R",
    contact: "sarah_illustrates@gmail.com\n(555) 123-4567",
    gender: "Male",
    lastVisit: "11-22-2025",
    status: "Recovered",
  },
]

export default function Component() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className=" space-y-6">
        {/* Header Section */}

    <div className="w-full  p-2 bg-gray-50">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-3">
       <div className="grid bg-white grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl">
            {/* Doctor Profile Section */}
          <div className=" border-r  border-[#DCDCDC]  p-6 lg:col-span-2">
        <div className="w-24   h-24 md:w-20 md:h-20 rounded-full overflow-hidden bg-teal-500 flex-shrink-0">
              <img
                src="/placeholder.svg"
                alt="Dr. Mahmudur Rahman"
                className="w-full h-full object-cover"
              />
            </div>  
            <div  className="flex pt-2  flex-col md:flex-row items-center md:items-start gap-6">
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-xl md:text-2xl text-[#3D3D3D] font-semibold mb-4">Dr. Mahmudur Rahman</h1>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <Stethoscope className="w-4 h-4 text-gray-500" />
                  <span>Doctor ID : P6Q7R8</span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span>Email : omahmuudur9@gmail.com</span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span>Mobile : +8801770504877</span>
                </div>
              </div>
              <button className="mt-6 shadow-md flex gap-2 items-center justify-center md:justify-start text-[#2E8BC9] hover:text-blue-800 hover:bg-blue-50 px-3 py-1.5 rounded-md transition-colors">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.38246 2.58997C9.87926 2.05173 10.1277 1.78261 10.3916 1.62563C11.0285 1.24685 11.8127 1.23507 12.4603 1.59455C12.7286 1.74354 12.9846 2.00509 13.4967 2.52818C14.0087 3.05127 14.2648 3.31282 14.4106 3.58696C14.7625 4.24842 14.751 5.04953 14.3802 5.70014C14.2265 5.96978 13.9631 6.22353 13.4362 6.73101L7.16706 12.7692C6.16858 13.7309 5.66933 14.2118 5.04537 14.4555C4.42141 14.6992 3.73546 14.6813 2.36357 14.6454L2.17692 14.6405C1.75927 14.6296 1.55044 14.6241 1.42906 14.4863C1.30766 14.3486 1.32424 14.1359 1.35738 13.7105L1.37538 13.4795C1.46867 12.282 1.51531 11.6833 1.74914 11.1451C1.98296 10.6069 2.38629 10.17 3.19295 9.29601L9.38246 2.58997Z" stroke="#2E8BC9" strokeWidth="1.5" strokeLinejoin="round"/>
<path d="M8.66667 2.66699L13.3333 7.33366" stroke="#2E8BC9" strokeWidth="1.5" strokeLinejoin="round"/>
<path d="M9.33333 14.667H14.6667" stroke="#2E8BC9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

                Edit
              </button>
            </div>
          </div>
        </div>

        {/* Appointments Section */}
        <div className="bg-white rounded-lg  p-6">
          <h2 className="text-lg font-semibold mb-6 text-[#3D3D3D]">Appointments</h2>
          
          <div className="grid grid-cols-2 gap-6">
            {/* Today Appointments */}
            <div className="text-start shadow-sm  p-2 rounded-md">
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
              <p className="text-3xl font-bold text-gray-900">10</p>
            </div>

            {/* Total Appointments */}
        <div className="text-start shadow-sm  p-2 rounded-md">
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
              <div className="flex items-center justify-between  gap-2">
                <p className="text-3xl font-bold text-gray-900">7</p>
                <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full">
                  +12%
                </span>
              </div>
            </div>
          </div>
        </div>
          </div>
        </div>
      </div>
  <div className="bg-white rounded-lg shadow-sm overflow-hidden mt-5">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Appointment</h3>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="absolute left-2 top-4 transform -translate-y-1/2 text-gray-400 h-4 w-4" ><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17 17L21 21" stroke="#3D3D3D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z" stroke="#3D3D3D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
</div>
                  <input
                    type="text"
                    placeholder="Search here..."
                    className="pl-10 w-64 py-2 px-3 shadow-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <select
                  defaultValue="all"
                  className="w-32 py-2 px-3 shadow-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="in-care">In Care</option>
                  <option value="recovered">Recovered</option>
                </select>
                <select
                  defaultValue="today"
                  className="w-24 py-2 px-3 shadow-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Patients Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Gender
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Visit
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {appointmentsData.map((appointment) => (
                    <tr key={appointment.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {appointment.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-[#2E8BC9] font-medium text-sm">
                            {appointment.initial}
                          </div>
                          <span className="text-sm text-gray-900">{appointment.patientName}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm">
                          {appointment.contact.split("\n").map((line, index) => (
                            <div key={index} className={index === 0 ? "text-gray-600" : "text-gray-600"}>
                              {line}
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {appointment.gender}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {appointment.lastVisit}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-4 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            appointment.status === "In Care"
                              ? "bg-[#EEFEE7] text-[#237B10]"
            : "bg-[#F0F5FE] text-[#2B4DCA]"
                          }`}
                        >
                          {appointment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center space-x-2">
                          <button className="p-1 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21.544 11.045C21.848 11.4713 22 11.6845 22 12C22 12.3155 21.848 12.5287 21.544 12.955C20.1779 14.8706 16.6892 19 12 19C7.31078 19 3.8221 14.8706 2.45604 12.955C2.15201 12.5287 2 12.3155 2 12C2 11.6845 2.15201 11.4713 2.45604 11.045C3.8221 9.12944 7.31078 5 12 5C16.6892 5 20.1779 9.12944 21.544 11.045Z" stroke="#3D3D3D" strokeWidth="1.5"/>
<path d="M15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12Z" stroke="#3D3D3D" strokeWidth="1.5"/>
</svg>

                          </button>
                          <button className="p-1 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
                           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.4249 4.60509L17.4149 3.6151C18.2351 2.79497 19.5648 2.79497 20.3849 3.6151C21.205 4.43524 21.205 5.76493 20.3849 6.58507L19.3949 7.57506M16.4249 4.60509L9.76558 11.2644C9.25807 11.772 8.89804 12.4078 8.72397 13.1041L8 16L10.8959 15.276C11.5922 15.102 12.228 14.7419 12.7356 14.2344L19.3949 7.57506M16.4249 4.60509L19.3949 7.57506" stroke="#2B4DCA" strokeWidth="1.5" strokeLinejoin="round"/>
<path d="M18.9999 13.5C18.9999 16.7875 18.9999 18.4312 18.092 19.5376C17.9258 19.7401 17.7401 19.9258 17.5375 20.092C16.4312 21 14.7874 21 11.4999 21H11C7.22876 21 5.34316 21 4.17159 19.8284C3.00003 18.6569 3 16.7712 3 13V12.5C3 9.21252 3 7.56879 3.90794 6.46244C4.07417 6.2599 4.2599 6.07417 4.46244 5.90794C5.56879 5 7.21252 5 10.5 5" stroke="#2B4DCA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>  </div>


        {/* Appointments Table */}
        
      </div>
    </div>
  )
}