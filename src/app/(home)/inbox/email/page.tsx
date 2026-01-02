"use client"

import { SetStateAction, useState } from "react"
import { Star, Mail, MessageSquare, Phone, Search, ChevronDown } from "lucide-react"
import Link from "next/link"

interface EmailItemProps {
  id: number
  sender: string
  subject: string
  time: string
  starred: boolean
}

const EmailItem = ({ sender, subject, time, starred }: EmailItemProps) => {
  const [isStarred, setIsStarred] = useState(starred)

  const toggleStar = () => {
    setIsStarred(!isStarred)
  }

  return (
    <div className={`flex items-center flex-row  shadow-sm border-1 border-[#DCDCDC] justify-between gap-4 p-4 ${isStarred ? "bg-[#F2F8FD]" : " bg-white"} hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer`}>
      
      <div className="flex gap-4"><button onClick={toggleStar} className="focus:outline-none">
        <Star
          className={`h-5 w-5 ${isStarred ? "fill-yellow-400 text-yellow-400" : "text-gray-400 dark:text-gray-600"}`}
        />
      </button>
        <div className="font-medium">{sender}</div>
       
      </div> <div className="text-sm text-gray-500 dark:text-gray-400">{subject}</div>
      <div className="text-sm text-gray-500 dark:text-gray-400">{time}</div>
    </div>
  )
}

const EmailList = () => {
  const emails = [
    {
      id: 1,
      sender: "Nelson lane",
      subject: "Lorem ipsum perspiciatis unde omnis iste natus",
      time: "12:30 PM",
      starred: false,
    },
    {
      id: 2,
      sender: "Nelson lane",
      subject: "Lorem ipsum perspiciatis unde omnis iste natus",
      time: "12:30 PM",
      starred: true,
    },
    // ... (rest of the email data remains the same)
    {
      id: 20,
      sender: "Nelson lane",
      subject: "Lorem ipsum perspiciatis unde omnis iste natus",
      time: "12:30 PM",
      starred: false,
    },
  ]

  return (
    <div className="flex-1 overflow-y-auto bg-white " >
      <div className="flex flex-col divide-y divide-gray-200 dark:divide-gray-800">
        {emails.map((email) => (
          <EmailItem key={email.id} {...email} />
        ))}
      </div>
    </div>
  )
}

const Sidebar = () => {

   const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionSelect = (value: string, label: SetStateAction<string>) => {
    setSelectedOption(label);
    setIsOpen(false);
    console.log('Selected:', value);
  }; 

  return (
    <div className="w-64 bg-white h-full rounded-md p-4 dark:bg-gray-900 flex flex-col gap-4">
      <h2 className="text-2xl font-bold mb-6">Inbox</h2>
      
      {/* Navigation */}
      <nav className="space-y-2 mb-6 bg-white">
        <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.72266 1.59961H17.2773C20.1121 1.59969 22.4101 3.89769 22.4102 6.73242V17.2871C22.4101 20.1218 20.1121 22.4198 17.2773 22.4199H6.72266C3.88792 22.4198 1.58993 20.1218 1.58984 17.2871V6.73242C1.58993 3.89769 3.88792 1.59969 6.72266 1.59961Z" fill="url(#paint0_linear_4005_55178)" stroke="white"/>
<path d="M12 4.58398C13.1036 4.5842 14.193 4.836 15.1846 5.32031C16.1761 5.80462 17.0441 6.50877 17.7227 7.37891C18.4013 8.24914 18.8725 9.26304 19.1006 10.3428C19.3286 11.4224 19.3077 12.5401 19.0391 13.6104C18.7704 14.6806 18.2608 15.6756 17.5498 16.5195C16.8388 17.3635 15.9447 18.034 14.9355 18.4805C13.9263 18.927 12.8284 19.1381 11.7256 19.0967C10.6229 19.0552 9.54404 18.7622 8.57129 18.2412L8.39746 18.1484L8.20703 18.1992L4.93066 19.0664L5.76953 15.8584L5.82227 15.6592L5.71875 15.4814C5.07986 14.3781 4.74247 13.1256 4.74121 11.8506C4.74 10.5757 5.07532 9.32327 5.71191 8.21875C6.34863 7.1141 7.26523 6.19658 8.36914 5.55859C9.40413 4.96046 10.5694 4.62726 11.7617 4.58789L12 4.58398ZM12.584 4.91406C11.2633 4.80271 9.93788 5.07092 8.76465 5.6875C7.59146 6.30412 6.6192 7.24363 5.96191 8.39453C5.30461 9.5455 4.98961 10.8607 5.05469 12.1846C5.11594 13.429 5.51108 14.6322 6.19531 15.6699L5.64355 17.7793L5.42676 18.6094L6.25586 18.3896L8.43262 17.8115C9.72754 18.5846 11.2406 18.9179 12.7441 18.7559C14.3217 18.5857 15.7937 17.8814 16.916 16.7598C17.8532 15.8226 18.5031 14.6369 18.7891 13.3428C19.075 12.0485 18.9855 10.6989 18.5303 9.4541C18.075 8.20939 17.2731 7.12078 16.2197 6.31641C15.1663 5.51201 13.9047 5.02546 12.584 4.91406Z" fill="#F2F8FD" stroke="white"/>
<path d="M15.8879 13.8755C15.8883 14.0031 15.8775 14.1305 15.8556 14.2562C15.835 14.3836 15.8036 14.509 15.7618 14.6312C15.6657 14.9026 15.1407 15.2349 15.1407 15.2349C14.7676 15.4833 14.3218 15.5988 13.8751 15.563C13.7703 15.5523 13.6663 15.5358 13.5634 15.5134C13.389 15.4745 13.3042 15.4496 13.3042 15.4496C13.2198 15.4248 13.0009 15.3559 13.0009 15.3559C12.782 15.2874 12.7327 15.2743 12.7327 15.2743C12.4002 15.1743 12.078 15.043 11.7704 14.8819C11.0612 14.4966 10.2887 13.8062 10.2887 13.8062C9.83131 13.3996 9.41781 12.9461 9.05494 12.4534C8.86192 12.1649 8.69561 11.8594 8.55806 11.5407C8.53931 11.4938 8.44697 11.2834 8.44697 11.2834C8.35322 11.0734 8.32041 10.9923 8.32041 10.9923C8.28666 10.9107 8.22666 10.7419 8.22666 10.7419C8.19242 10.6424 8.1644 10.5408 8.14275 10.4377C8.1255 10.3448 8.11392 10.2508 8.10806 10.1565C8.08087 9.66336 8.32603 9.14445 8.32603 9.14445C8.59556 8.58664 8.85712 8.45914 8.85712 8.45914C8.97411 8.40634 9.09473 8.36201 9.21806 8.32648C9.34014 8.28862 9.46581 8.26348 9.59306 8.25148C9.63116 8.24775 9.66962 8.25109 9.7065 8.26132C9.80494 8.28804 10.0135 8.65273 10.0135 8.65273C10.0782 8.75117 10.1902 8.93398 10.1902 8.93398C10.3027 9.11586 10.397 9.26211 10.397 9.26211C10.4907 9.40976 10.5788 9.53914 10.5788 9.53914C10.5962 9.55976 10.6801 9.66804 10.6801 9.66804C10.7262 9.7263 10.7682 9.7877 10.8057 9.85179C10.8315 9.89821 10.8474 9.94943 10.8526 10.0023C10.8582 10.1096 10.7148 10.2788 10.7148 10.2788C10.6173 10.3908 10.5117 10.4955 10.3988 10.5919C10.2874 10.6865 10.1817 10.7876 10.0824 10.8948C9.93806 11.0532 9.94181 11.1498 9.94181 11.1498C9.94746 11.1908 9.95865 11.2308 9.97509 11.2688C10.006 11.3396 10.0271 11.3762 10.0271 11.3762C10.0477 11.4123 10.1092 11.5004 10.1092 11.5004C10.1706 11.5885 10.1762 11.5988 10.1762 11.5988C10.4592 12.0411 10.796 12.4465 11.1788 12.8059C11.7334 13.3018 12.4913 13.6679 12.4913 13.6679C12.5026 13.6726 12.5968 13.7237 12.5968 13.7237C12.6906 13.7752 12.7295 13.7916 12.7295 13.7916C12.7679 13.8085 12.842 13.831 12.842 13.831C12.8812 13.8444 12.9224 13.8512 12.9638 13.8512C13.0604 13.846 13.202 13.6848 13.202 13.6848C13.2972 13.574 13.3858 13.4577 13.4673 13.3365C13.5507 13.2138 13.643 13.0974 13.7434 12.9882C13.8957 12.8265 14.0031 12.8204 14.0031 12.8204C14.056 12.8199 14.1086 12.8298 14.1577 12.8494C14.2252 12.8804 14.2908 12.9153 14.3542 12.954C14.4713 13.0252 14.4948 13.0402 14.4948 13.0402C14.6354 13.1134 14.791 13.1902 14.791 13.1902C14.9485 13.2676 15.1417 13.359 15.1417 13.359C15.3348 13.4504 15.4398 13.5034 15.4398 13.5034C15.8256 13.6702 15.8617 13.7649 15.8617 13.7649C15.8758 13.8003 15.8846 13.8376 15.8879 13.8755Z" fill="#F2F8FD"/>
<defs>
<linearGradient id="paint0_linear_4005_55178" x1="12" y1="22.9199" x2="12" y2="1.09961" gradientUnits="userSpaceOnUse">
<stop stop-color="#00D02D"/>
<stop offset="0.25" stop-color="#10D93A"/>
<stop offset="0.75" stop-color="#3AF15D"/>
<stop offset="1" stop-color="#51FE71"/>
</linearGradient>
</defs>
</svg>

          Whatsapp
        </div>
        <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 1.25C17.9046 1.25 22.7498 5.83823 22.75 11.5664C22.75 17.2948 17.9047 21.8828 12 21.8828C11.3041 21.8837 10.6099 21.8196 9.92676 21.6914C9.68967 21.6468 9.53881 21.6189 9.42676 21.6035C9.3819 21.5974 9.35301 21.5919 9.33594 21.5908C9.36238 21.5861 9.34271 21.584 9.22754 21.6387C9.11311 21.693 8.96086 21.7743 8.72754 21.8984C7.29581 22.6598 5.62475 22.9295 4.01367 22.6299C3.75368 22.5814 3.53849 22.3996 3.44727 22.1514C3.35611 21.903 3.40246 21.6252 3.56934 21.4199C4.03728 20.8443 4.35881 20.1507 4.50098 19.4043C4.53903 19.1992 4.45189 18.921 4.18457 18.6494C2.36977 16.8066 1.25 14.3141 1.25 11.5664C1.25017 5.83823 6.09533 1.25 12 1.25ZM8 11C7.44772 11 7 11.4477 7 12C7 12.5523 7.44772 13 8 13H8.00879C8.56107 13 9.00879 12.5523 9.00879 12C9.00879 11.4477 8.56107 11 8.00879 11H8ZM11.9951 11C11.443 11.0002 10.9951 11.4478 10.9951 12C10.9951 12.5522 11.443 12.9998 11.9951 13H12.0049L12.1064 12.9951C12.6109 12.9441 13.0049 12.5179 13.0049 12C13.0049 11.4821 12.6109 11.0559 12.1064 11.0049L12.0049 11H11.9951ZM15.9912 11C15.4389 11 14.9912 11.4477 14.9912 12C14.9912 12.5523 15.4389 13 15.9912 13H16C16.5523 13 17 12.5523 17 12C17 11.4477 16.5523 11 16 11H15.9912Z" fill="#2E8BC9"/>
</svg>

          SMS
        </div>
          {/* Email Dropdown */}
        <div className="relative">
          <div 
            className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="4" width="20" height="16" rx="2" fill="#FCD34D" stroke="none"/>
                  <path d="m2 6 10 7 10-7" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-gray-700">Email</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-red-500 text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
                10
              </div>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </div>
          </div>

          {isOpen && (
            <div className="mt-1 ml-9 bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
              <div 
                className="px-4 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100"
                onClick={() => handleOptionSelect('outlook', 'Connect With Outlook App')}
              >
                <span className="text-sm text-gray-700">Connect With Outlook App</span>
              </div>
              <div 
                className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
                onClick={() => handleOptionSelect('email', 'Connect With Email App')}
              >
                <span className="text-sm text-gray-700">Connect With Email App</span>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
        <input
          className="w-full rounded-lg bg-gray-100 pl-9 py-2 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search here ..."
          type="search"
        />
      </div>

      {/* Email categories */}
      <nav className="space-y-2">
        <div className="flex items-center gap-3 rounded-lg bg-blue-100 px-3 py-2 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">
          All
        </div>
        <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
          Draft
        </div>
        <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
          Important
        </div>
        <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
          Sent
        </div>
      </nav>
    </div>
  )
}

export default function EmailInbox() {
  return (
    <div className="relative flex h-screen bg-[#F6F8FA]  dark:bg-gray-900">
      <div className="bg-[#F6F8FA] p-4">
           <Sidebar />
      </div>
      <div className="bg-[#F6F8FA] w-full p-4 ">
   <EmailList />
      <Link href="/inbox/modal">
      <button className="p-5 m-5 flex text-white gap-2 items-center absolute right-0 bottom-0 px-6 py-2 bg-[#2E8BC9]"><svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.4072 3.88545C15.1524 3.07808 15.525 2.6744 15.9209 2.43893C16.8762 1.87076 18.0526 1.85309 19.0239 2.39232C19.4264 2.6158 19.8104 3.00812 20.5785 3.79276C21.3466 4.5774 21.7307 4.96972 21.9494 5.38093C22.4773 6.37312 22.46 7.57479 21.9038 8.5507C21.6733 8.95516 21.2781 9.33578 20.4878 10.097L11.0841 19.1543C9.58638 20.5969 8.8375 21.3182 7.90156 21.6837C6.96562 22.0493 5.9367 22.0224 3.87886 21.9686L3.59888 21.9613C2.97241 21.9449 2.65917 21.9367 2.47709 21.73C2.295 21.5234 2.31986 21.2043 2.36958 20.5662L2.39658 20.2197C2.53651 18.4235 2.60647 17.5255 2.95721 16.7182C3.30794 15.9109 3.91294 15.2555 5.12293 13.9445L14.4072 3.88545Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
<path d="M13.3335 4L20.3335 11" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
</svg>
Compose</button>
      </Link>

      </div>
   
   
      
    </div>
  )
}