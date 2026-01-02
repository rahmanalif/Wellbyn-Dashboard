"use client"

import { SetStateAction, useState } from "react"
import { Send, User, Search, MessageCircle, MessageSquare, Mail, ChevronDown } from "lucide-react"
import Link from "next/link"

interface Message {
  id: string
  sender: "user" | "other"
  text: string
  time: string
  date?: string
}

interface Contact {
  id: string
  name: string
  initial: string
  selected: boolean
}

interface ChatWindowProps {
  contactName: string
  messages: Message[]
}

interface InboxSidebarProps {
  contacts: Contact[]
}

const ChatWindow = ({ contactName, messages }: ChatWindowProps) => {
  const [message, setMessage] = useState("")

  const handleSendMessage = () => {
    if (message.trim()) {
      // Handle sending message logic here
      setMessage("")
    }
  }

  return (
    <div className="flex-1 flex flex-col  rounded-lg bg-white">
      {/* Chat header */}
      <div className="p-4 border-b border-[#F3F3F3] rounded-lg bg-[#DCDCDC]">
        <h2 className="text-xl font-semibold">{contactName}</h2>
      </div>

      {/* Messages area */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id}>
              {message.date && (
                <div className="text-center text-xs text-gray-500 my-4">
                  {message.date.toUpperCase()}
                </div>
              )}
              <div className={`flex items-end gap-2 ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                {message.sender === "other" && (
                  <div className="w-8 h-8 rounded-full bg-[#2E8BC9] flex items-center justify-center text-white">
                    {contactName.charAt(0)}
                  </div>
                )}
                <div
                  className={`max-w-[70%] p-3 rounded-lg ${
                    message.sender === "user"
                      ? "bg-gray-200 text-gray-800 rounded-br-none"
                      : "bg-[#2E8BC9] text-white rounded-bl-none"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <span
                    className={`block text-right text-xs mt-1 ${
                      message.sender === "user" ? "text-gray-600" : "text-blue-100"
                    }`}
                  >
                    {message.time}
                  </span>
                </div>
                {message.sender === "user" && (
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Message input */}
      <div className="p-4  bg-white flex items-center gap-2">
        <input
          type="text"
          placeholder="Type your message"
          className="flex-1 px-3 py-5 shadow-md rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button
          className="p-2 rounded-full bg-[#292929] text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={handleSendMessage}
        >
         <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M0.732427 4.41935C0.723882 3.09442 11.0712 -0.534539 12.4468 0.946875C13.7893 2.39261 10.0342 12.654 8.75437 12.5974C7.95144 12.562 7.59915 10.9748 6.89746 7.78384C6.84953 7.56585 6.79921 7.39681 6.73266 7.2617C6.73637 7.25822 6.74004 7.25467 6.74367 7.25104L8.9542 5.04051C9.13771 4.857 9.14005 4.55709 8.95942 4.37064C8.77879 4.1842 8.48358 4.18182 8.30007 4.36534L6.08954 6.57587C6.0452 6.62021 6.01144 6.67134 5.98828 6.72603C5.95694 6.71647 5.92442 6.70699 5.89066 6.69752C5.67494 6.63699 5.35059 6.57091 4.96754 6.49288C3.36661 6.16675 0.740245 5.63173 0.732427 4.41935Z" fill="white"/>
</svg>

        </button>
      </div>
    </div>
  )
}

const getAvatarColor = (initial: string) => {
  const colors = [
    "#F2F8FD",
   
  ]
  const charCode = initial.charCodeAt(0)
  return colors[charCode % colors.length]
}


const InboxSidebar = ({ contacts }: InboxSidebarProps) => {
   const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionSelect = (value: string, label: SetStateAction<string>) => {
    setSelectedOption(label);
    setIsOpen(false);
    console.log('Selected:', value);
  }; return (
    <div className="w-full rounded-lg p-2 md:w-1/3 lg:w-1/4  px-2 bg-white flex flex-col">
      {/* Sidebar header */}
      <div className="p-4 ">
        <h2 className="text-xl font-semibold">Inbox</h2>
      </div>

      {/* Message type tabs */}
      <div className="p-4 space-y-2 ">
        <div className="flex items-center gap-2 p-2 rounded-lg bg-blue-50 text-blue-700 font-medium">
         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.72266 1.59961H17.2773C20.1121 1.59969 22.4101 3.89769 22.4102 6.73242V17.2871C22.4101 20.1218 20.1121 22.4198 17.2773 22.4199H6.72266C3.88792 22.4198 1.58993 20.1218 1.58984 17.2871V6.73242C1.58993 3.89769 3.88792 1.59969 6.72266 1.59961Z" fill="url(#paint0_linear_3247_51400)" stroke="white"/>
<path d="M12 4.58398C13.1036 4.5842 14.193 4.836 15.1846 5.32031C16.1761 5.80462 17.0441 6.50877 17.7227 7.37891C18.4013 8.24914 18.8725 9.26304 19.1006 10.3428C19.3286 11.4224 19.3077 12.5401 19.0391 13.6104C18.7704 14.6806 18.2608 15.6756 17.5498 16.5195C16.8388 17.3635 15.9447 18.034 14.9355 18.4805C13.9263 18.927 12.8284 19.1381 11.7256 19.0967C10.6229 19.0552 9.54404 18.7622 8.57129 18.2412L8.39746 18.1484L8.20703 18.1992L4.93066 19.0664L5.76953 15.8584L5.82227 15.6592L5.71875 15.4814C5.07986 14.3781 4.74247 13.1256 4.74121 11.8506C4.74 10.5757 5.07532 9.32327 5.71191 8.21875C6.34863 7.1141 7.26523 6.19658 8.36914 5.55859C9.40413 4.96046 10.5694 4.62726 11.7617 4.58789L12 4.58398ZM12.584 4.91406C11.2633 4.80271 9.93788 5.07092 8.76465 5.6875C7.59146 6.30412 6.6192 7.24363 5.96191 8.39453C5.30461 9.5455 4.98961 10.8607 5.05469 12.1846C5.11594 13.429 5.51108 14.6322 6.19531 15.6699L5.64355 17.7793L5.42676 18.6094L6.25586 18.3896L8.43262 17.8115C9.72754 18.5846 11.2406 18.9179 12.7441 18.7559C14.3217 18.5857 15.7937 17.8814 16.916 16.7598C17.8532 15.8226 18.5031 14.6369 18.7891 13.3428C19.075 12.0485 18.9855 10.6989 18.5303 9.4541C18.075 8.20939 17.2731 7.12078 16.2197 6.31641C15.1663 5.51201 13.9047 5.02546 12.584 4.91406Z" fill="#F2F8FD" stroke="white"/>
<path d="M15.8879 13.8755C15.8883 14.0031 15.8775 14.1305 15.8556 14.2562C15.835 14.3836 15.8036 14.509 15.7618 14.6312C15.6657 14.9026 15.1407 15.2349 15.1407 15.2349C14.7676 15.4833 14.3218 15.5988 13.8751 15.563C13.7703 15.5523 13.6663 15.5358 13.5634 15.5134C13.389 15.4745 13.3042 15.4496 13.3042 15.4496C13.2198 15.4248 13.0009 15.3559 13.0009 15.3559C12.782 15.2874 12.7327 15.2743 12.7327 15.2743C12.4002 15.1743 12.078 15.043 11.7704 14.8819C11.0612 14.4966 10.2887 13.8062 10.2887 13.8062C9.83131 13.3996 9.41781 12.9461 9.05494 12.4534C8.86192 12.1649 8.69561 11.8594 8.55806 11.5407C8.53931 11.4938 8.44697 11.2834 8.44697 11.2834C8.35322 11.0734 8.32041 10.9923 8.32041 10.9923C8.28666 10.9107 8.22666 10.7419 8.22666 10.7419C8.19242 10.6424 8.1644 10.5408 8.14275 10.4377C8.1255 10.3448 8.11392 10.2508 8.10806 10.1565C8.08087 9.66336 8.32603 9.14445 8.32603 9.14445C8.59556 8.58664 8.85712 8.45914 8.85712 8.45914C8.97411 8.40634 9.09473 8.36201 9.21806 8.32648C9.34014 8.28862 9.46581 8.26348 9.59306 8.25148C9.63116 8.24775 9.66962 8.25109 9.7065 8.26132C9.80494 8.28804 10.0135 8.65273 10.0135 8.65273C10.0782 8.75117 10.1902 8.93398 10.1902 8.93398C10.3027 9.11586 10.397 9.26211 10.397 9.26211C10.4907 9.40976 10.5788 9.53914 10.5788 9.53914C10.5962 9.55976 10.6801 9.66804 10.6801 9.66804C10.7262 9.7263 10.7682 9.7877 10.8057 9.85179C10.8315 9.89821 10.8474 9.94943 10.8526 10.0023C10.8582 10.1096 10.7148 10.2788 10.7148 10.2788C10.6173 10.3908 10.5117 10.4955 10.3988 10.5919C10.2874 10.6865 10.1817 10.7876 10.0824 10.8948C9.93806 11.0532 9.94181 11.1498 9.94181 11.1498C9.94746 11.1908 9.95865 11.2308 9.97509 11.2688C10.006 11.3396 10.0271 11.3762 10.0271 11.3762C10.0477 11.4123 10.1092 11.5004 10.1092 11.5004C10.1706 11.5885 10.1762 11.5988 10.1762 11.5988C10.4592 12.0411 10.796 12.4465 11.1788 12.8059C11.7334 13.3018 12.4913 13.6679 12.4913 13.6679C12.5026 13.6726 12.5968 13.7237 12.5968 13.7237C12.6906 13.7752 12.7295 13.7916 12.7295 13.7916C12.7679 13.8085 12.842 13.831 12.842 13.831C12.8812 13.8444 12.9224 13.8512 12.9638 13.8512C13.0604 13.846 13.202 13.6848 13.202 13.6848C13.2972 13.574 13.3858 13.4577 13.4673 13.3365C13.5507 13.2138 13.643 13.0974 13.7434 12.9882C13.8957 12.8265 14.0031 12.8204 14.0031 12.8204C14.056 12.8199 14.1086 12.8298 14.1577 12.8494C14.2252 12.8804 14.2908 12.9153 14.3542 12.954C14.4713 13.0252 14.4948 13.0402 14.4948 13.0402C14.6354 13.1134 14.791 13.1902 14.791 13.1902C14.9485 13.2676 15.1417 13.359 15.1417 13.359C15.3348 13.4504 15.4398 13.5034 15.4398 13.5034C15.8256 13.6702 15.8617 13.7649 15.8617 13.7649C15.8758 13.8003 15.8846 13.8376 15.8879 13.8755Z" fill="#F2F8FD"/>
<defs>
<linearGradient id="paint0_linear_3247_51400" x1="12" y1="22.9199" x2="12" y2="1.09961" gradientUnits="userSpaceOnUse">
<stop stop-color="#00D02D"/>
<stop offset="0.25" stop-color="#10D93A"/>
<stop offset="0.75" stop-color="#3AF15D"/>
<stop offset="1" stop-color="#51FE71"/>
</linearGradient>
</defs>
</svg>

          <span>WhatsApp</span>
        </div>
   

        {/* SMS */}
        <div className="flex items-center gap-3 p-3 rounded-lg text-gray-600 hover:bg-gray-50 cursor-pointer transition-colors">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 1.25C17.9046 1.25 22.7498 5.83823 22.75 11.5664C22.75 17.2948 17.9047 21.8828 12 21.8828C11.3041 21.8837 10.6099 21.8196 9.92676 21.6914C9.68967 21.6468 9.53881 21.6189 9.42676 21.6035C9.3819 21.5974 9.35301 21.5919 9.33594 21.5908C9.36238 21.5861 9.34271 21.584 9.22754 21.6387C9.11311 21.693 8.96086 21.7743 8.72754 21.8984C7.29581 22.6598 5.62475 22.9295 4.01367 22.6299C3.75368 22.5814 3.53849 22.3996 3.44727 22.1514C3.35611 21.903 3.40246 21.6252 3.56934 21.4199C4.03728 20.8443 4.35881 20.1507 4.50098 19.4043C4.53903 19.1992 4.45189 18.921 4.18457 18.6494C2.36977 16.8066 1.25 14.3141 1.25 11.5664C1.25017 5.83823 6.09533 1.25 12 1.25ZM8 11C7.44772 11 7 11.4477 7 12C7 12.5523 7.44772 13 8 13H8.00879C8.56107 13 9.00879 12.5523 9.00879 12C9.00879 11.4477 8.56107 11 8.00879 11H8ZM11.9951 11C11.443 11.0002 10.9951 11.4478 10.9951 12C10.9951 12.5522 11.443 12.9998 11.9951 13H12.0049L12.1064 12.9951C12.6109 12.9441 13.0049 12.5179 13.0049 12C13.0049 11.4821 12.6109 11.0559 12.1064 11.0049L12.0049 11H11.9951ZM15.9912 11C15.4389 11 14.9912 11.4477 14.9912 12C14.9912 12.5523 15.4389 13 15.9912 13H16C16.5523 13 17 12.5523 17 12C17 11.4477 16.5523 11 16 11H15.9912Z" fill="#2E8BC9"/>
          </svg>
          <span>SMS</span>
        </div>

        {/* Email Dropdown */}
        <div className="relative">
          <div 
            className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
            
          >
            <Link href="/inbox/email">  <div className="flex items-center gap-3">
             
              
            
              <div className="w-6 h-6 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="4" width="20" height="16" rx="2" fill="#FCD34D" stroke="none"/>
                  <path d="m2 6 10 7 10-7" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            
                <span className="text-gray-700">Email</span>
          
            
            </div>
                </Link>
            </div>

         
        </div>
      </div>
      

      {/* Search bar */}
      <div className="p-4 ">
        <div className="flex items-center gap-2 p-2 rounded-lg bg-blue-50 text-blue-700 font-medium">
         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.72266 1.59961H17.2773C20.1121 1.59969 22.4101 3.89769 22.4102 6.73242V17.2871C22.4101 20.1218 20.1121 22.4198 17.2773 22.4199H6.72266C3.88792 22.4198 1.58993 20.1218 1.58984 17.2871V6.73242C1.58993 3.89769 3.88792 1.59969 6.72266 1.59961Z" fill="url(#paint0_linear_3247_51400)" stroke="white"/>
<path d="M12 4.58398C13.1036 4.5842 14.193 4.836 15.1846 5.32031C16.1761 5.80462 17.0441 6.50877 17.7227 7.37891C18.4013 8.24914 18.8725 9.26304 19.1006 10.3428C19.3286 11.4224 19.3077 12.5401 19.0391 13.6104C18.7704 14.6806 18.2608 15.6756 17.5498 16.5195C16.8388 17.3635 15.9447 18.034 14.9355 18.4805C13.9263 18.927 12.8284 19.1381 11.7256 19.0967C10.6229 19.0552 9.54404 18.7622 8.57129 18.2412L8.39746 18.1484L8.20703 18.1992L4.93066 19.0664L5.76953 15.8584L5.82227 15.6592L5.71875 15.4814C5.07986 14.3781 4.74247 13.1256 4.74121 11.8506C4.74 10.5757 5.07532 9.32327 5.71191 8.21875C6.34863 7.1141 7.26523 6.19658 8.36914 5.55859C9.40413 4.96046 10.5694 4.62726 11.7617 4.58789L12 4.58398ZM12.584 4.91406C11.2633 4.80271 9.93788 5.07092 8.76465 5.6875C7.59146 6.30412 6.6192 7.24363 5.96191 8.39453C5.30461 9.5455 4.98961 10.8607 5.05469 12.1846C5.11594 13.429 5.51108 14.6322 6.19531 15.6699L5.64355 17.7793L5.42676 18.6094L6.25586 18.3896L8.43262 17.8115C9.72754 18.5846 11.2406 18.9179 12.7441 18.7559C14.3217 18.5857 15.7937 17.8814 16.916 16.7598C17.8532 15.8226 18.5031 14.6369 18.7891 13.3428C19.075 12.0485 18.9855 10.6989 18.5303 9.4541C18.075 8.20939 17.2731 7.12078 16.2197 6.31641C15.1663 5.51201 13.9047 5.02546 12.584 4.91406Z" fill="#F2F8FD" stroke="white"/>
<path d="M15.8879 13.8755C15.8883 14.0031 15.8775 14.1305 15.8556 14.2562C15.835 14.3836 15.8036 14.509 15.7618 14.6312C15.6657 14.9026 15.1407 15.2349 15.1407 15.2349C14.7676 15.4833 14.3218 15.5988 13.8751 15.563C13.7703 15.5523 13.6663 15.5358 13.5634 15.5134C13.389 15.4745 13.3042 15.4496 13.3042 15.4496C13.2198 15.4248 13.0009 15.3559 13.0009 15.3559C12.782 15.2874 12.7327 15.2743 12.7327 15.2743C12.4002 15.1743 12.078 15.043 11.7704 14.8819C11.0612 14.4966 10.2887 13.8062 10.2887 13.8062C9.83131 13.3996 9.41781 12.9461 9.05494 12.4534C8.86192 12.1649 8.69561 11.8594 8.55806 11.5407C8.53931 11.4938 8.44697 11.2834 8.44697 11.2834C8.35322 11.0734 8.32041 10.9923 8.32041 10.9923C8.28666 10.9107 8.22666 10.7419 8.22666 10.7419C8.19242 10.6424 8.1644 10.5408 8.14275 10.4377C8.1255 10.3448 8.11392 10.2508 8.10806 10.1565C8.08087 9.66336 8.32603 9.14445 8.32603 9.14445C8.59556 8.58664 8.85712 8.45914 8.85712 8.45914C8.97411 8.40634 9.09473 8.36201 9.21806 8.32648C9.34014 8.28862 9.46581 8.26348 9.59306 8.25148C9.63116 8.24775 9.66962 8.25109 9.7065 8.26132C9.80494 8.28804 10.0135 8.65273 10.0135 8.65273C10.0782 8.75117 10.1902 8.93398 10.1902 8.93398C10.3027 9.11586 10.397 9.26211 10.397 9.26211C10.4907 9.40976 10.5788 9.53914 10.5788 9.53914C10.5962 9.55976 10.6801 9.66804 10.6801 9.66804C10.7262 9.7263 10.7682 9.7877 10.8057 9.85179C10.8315 9.89821 10.8474 9.94943 10.8526 10.0023C10.8582 10.1096 10.7148 10.2788 10.7148 10.2788C10.6173 10.3908 10.5117 10.4955 10.3988 10.5919C10.2874 10.6865 10.1817 10.7876 10.0824 10.8948C9.93806 11.0532 9.94181 11.1498 9.94181 11.1498C9.94746 11.1908 9.95865 11.2308 9.97509 11.2688C10.006 11.3396 10.0271 11.3762 10.0271 11.3762C10.0477 11.4123 10.1092 11.5004 10.1092 11.5004C10.1706 11.5885 10.1762 11.5988 10.1762 11.5988C10.4592 12.0411 10.796 12.4465 11.1788 12.8059C11.7334 13.3018 12.4913 13.6679 12.4913 13.6679C12.5026 13.6726 12.5968 13.7237 12.5968 13.7237C12.6906 13.7752 12.7295 13.7916 12.7295 13.7916C12.7679 13.8085 12.842 13.831 12.842 13.831C12.8812 13.8444 12.9224 13.8512 12.9638 13.8512C13.0604 13.846 13.202 13.6848 13.202 13.6848C13.2972 13.574 13.3858 13.4577 13.4673 13.3365C13.5507 13.2138 13.643 13.0974 13.7434 12.9882C13.8957 12.8265 14.0031 12.8204 14.0031 12.8204C14.056 12.8199 14.1086 12.8298 14.1577 12.8494C14.2252 12.8804 14.2908 12.9153 14.3542 12.954C14.4713 13.0252 14.4948 13.0402 14.4948 13.0402C14.6354 13.1134 14.791 13.1902 14.791 13.1902C14.9485 13.2676 15.1417 13.359 15.1417 13.359C15.3348 13.4504 15.4398 13.5034 15.4398 13.5034C15.8256 13.6702 15.8617 13.7649 15.8617 13.7649C15.8758 13.8003 15.8846 13.8376 15.8879 13.8755Z" fill="#F2F8FD"/>
<defs>
<linearGradient id="paint0_linear_3247_51400" x1="12" y1="22.9199" x2="12" y2="1.09961" gradientUnits="userSpaceOnUse">
<stop stop-color="#00D02D"/>
<stop offset="0.25" stop-color="#10D93A"/>
<stop offset="0.75" stop-color="#3AF15D"/>
<stop offset="1" stop-color="#51FE71"/>
</linearGradient>
</defs>
</svg>

          <span>WhatsApp</span>
        </div>
        <div className="relative pt-2 px-2">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17 17L21 21" stroke="#3D3D3D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z" stroke="#3D3D3D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
</div>
          <input
            type="text"
            placeholder="Search here ..."
            className="w-full pl-9 pr-3 py-2 shadow-md rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

      </div>

      {/* Contacts list */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-2">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-50 ${
                contact.selected ? "bg-blue-50 font-medium" : ""
              }`}
            >
              <div className={`w-9 h-9 rounded-full bg-[#F2F8FD] flex items-center justify-center text-[#2E8BC9]`}>
                {contact.initial}
              </div>
              <span className="text-sm">{contact.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Example usage in a parent component
export default function ChatApp() {
  const [activeContact, setActiveContact] = useState("John Doe")
  
  const contacts: Contact[] = [
    { id: "1", name: "John Doe", initial: "J", selected: true },
    { id: "2", name: "Jane Smith", initial: "J", selected: false },
    { id: "3", name: "Bob Johnson", initial: "B", selected: false },
    // Add more contacts as needed
  ]

  const messages: Message[] = [
    { id: "1", sender: "other", text: "Hello there!", time: "10:30 AM", date: "today" },
    { id: "2", sender: "user", text: "Hi! How are you?", time: "10:32 AM" },
    { id: "3", sender: "other", text: "I'm good, thanks for asking. How about you?", time: "10:33 AM" },
    // Add more messages as needed
  ]

  return (
    <div className="flex gap-4 p-5 h-screen bg-[#F6F8FA]">
      <InboxSidebar contacts={contacts} />
      <ChatWindow contactName={activeContact} messages={messages} />
    </div>
  )
}