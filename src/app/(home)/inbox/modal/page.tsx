"use client"

import { useState } from "react"
import {
  Minus,
  Maximize,
  X,
  ChevronDown,
  Bold,
  Italic,
  Link,
  Paperclip,
  Smile,
  Image as ImageIcon,
  Folder,
  Pencil,
  Trash,
  EllipsisVertical,
} from "lucide-react"

export default function NewMessageDialog() {
  const [isOpen, setIsOpen] = useState(true)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="w-3/4 h-3/4 bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gray-100 p-3 flex justify-between items-center border-[#EDEFF1] border-b">
          <span className="font-semibold text-sm">New Message</span>
          <div className="flex gap-2">
            <button className="w-6 h-6 rounded-md hover:bg-gray-200 flex items-center justify-center">
              <Minus className="w-4 h-4 text-gray-600" aria-label="Minimize" />
            </button>
            <button className="w-6 h-6 rounded-md hover:bg-gray-200 flex items-center justify-center">
              <Maximize className="w-4 h-4 text-gray-600" aria-label="Maximize" />
            </button>
            <button 
              className="w-6 h-6 rounded-md hover:bg-gray-200 flex items-center justify-center"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-4 h-4 text-gray-600" aria-label="Close" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-grow p-4 space-y-2">
          <div className="flex items-center border-b border-[#EDEFF1] pb-2">
            <label htmlFor="recipients" className="text-sm text-gray-600 w-20 flex-shrink-0">
              Recipients
            </label>
            <input
              id="recipients"
              type="text"
              placeholder=""
              className="flex-1 border-none focus:outline-none px-2 py-0 h-auto"
              aria-label="Recipients"
            />
            <span className="text-xs text-[#7C7C7C] cursor-pointer ml-auto">Cc Bcc</span>
          </div>
          <div className="flex items-center border-b border-[#EDEFF1] pb-2">
            <label htmlFor="subject" className="text-sm text-gray-600 w-20 flex-shrink-0">
              Subject
            </label>
            <input
              id="subject"
              type="text"
              placeholder=""
              className="flex-1 border-none focus:outline-none px-2 py-0 h-auto"
              aria-label="Subject"
            />
          </div>
          <div className="flex-grow pt-2">
            <textarea
              placeholder="Body Text"
              className="w-full min-h-[200px] border-none focus:outline-none resize-none"
              aria-label="Body Text"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-100 p-3 flex justify-between items-center border-t">
          <div className="flex items-center gap-2">
            <button className="bg-[#1A73E8] hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-1">
              Send <ChevronDown className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-3 ml-4 text-gray-600">
              <button className="w-8 h-8 rounded-md hover:bg-gray-200 flex items-center justify-center" aria-label="Bold">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.58337 18.5827V20.416H20.4167V18.5827H7.58337ZM11.7084 14.7327H16.2917L17.1167 16.7493H19.0417L14.6875 6.66602H13.3125L8.95837 16.7493H10.8834L11.7084 14.7327ZM14 8.48102L15.7142 13.0827H12.2859L14 8.48102Z" fill="#7C7C7C"/>
</svg>

              </button>
              <button className="w-8 h-8 rounded-md hover:bg-gray-200 flex items-center justify-center" aria-label="Italic">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.125 6.49935V17.041C16.125 19.0668 14.4841 20.7077 12.4583 20.7077C10.4325 20.7077 8.79163 19.0668 8.79163 17.041V5.58268C8.79163 4.31768 9.81829 3.29102 11.0833 3.29102C12.3483 3.29102 13.375 4.31768 13.375 5.58268V15.2077C13.375 15.7118 12.9625 16.1243 12.4583 16.1243C11.9541 16.1243 11.5416 15.7118 11.5416 15.2077V6.49935H10.1666V15.2077C10.1666 16.4727 11.1933 17.4993 12.4583 17.4993C13.7233 17.4993 14.75 16.4727 14.75 15.2077V5.58268C14.75 3.55685 13.1091 1.91602 11.0833 1.91602C9.05746 1.91602 7.41663 3.55685 7.41663 5.58268V17.041C7.41663 19.8277 9.67163 22.0827 12.4583 22.0827C15.245 22.0827 17.5 19.8277 17.5 17.041V6.49935H16.125Z" fill="#7C7C7C"/>
</svg>

              </button>
              <button className="w-8 h-8 rounded-md hover:bg-gray-200 flex items-center justify-center" aria-label="Link">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.57504 11.9993C4.57504 10.4318 5.84921 9.15768 7.41671 9.15768H11.0834V7.41602H7.41671C4.88671 7.41602 2.83337 9.46935 2.83337 11.9993C2.83337 14.5293 4.88671 16.5827 7.41671 16.5827H11.0834V14.841H7.41671C5.84921 14.841 4.57504 13.5668 4.57504 11.9993ZM8.33337 12.916H15.6667V11.0827H8.33337V12.916ZM16.5834 7.41602H12.9167V9.15768H16.5834C18.1509 9.15768 19.425 10.4318 19.425 11.9993C19.425 13.5668 18.1509 14.841 16.5834 14.841H12.9167V16.5827H16.5834C19.1134 16.5827 21.1667 14.5293 21.1667 11.9993C21.1667 9.46935 19.1134 7.41602 16.5834 7.41602Z" fill="#7C7C7C"/>
</svg>

              </button>
              <button className="w-8 h-8 rounded-md hover:bg-gray-200 flex items-center justify-center" aria-label="Attach file">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.9909 2.83398C6.93087 2.83398 2.83337 6.94065 2.83337 12.0007C2.83337 17.0607 6.93087 21.1673 11.9909 21.1673C17.06 21.1673 21.1667 17.0607 21.1667 12.0007C21.1667 6.94065 17.06 2.83398 11.9909 2.83398ZM12 19.334C7.94837 19.334 4.66671 16.0523 4.66671 12.0007C4.66671 7.94898 7.94837 4.66732 12 4.66732C16.0517 4.66732 19.3334 7.94898 19.3334 12.0007C19.3334 16.0523 16.0517 19.334 12 19.334ZM15.2084 11.084C15.9692 11.084 16.5834 10.4698 16.5834 9.70898C16.5834 8.94815 15.9692 8.33398 15.2084 8.33398C14.4475 8.33398 13.8334 8.94815 13.8334 9.70898C13.8334 10.4698 14.4475 11.084 15.2084 11.084ZM8.79171 11.084C9.55254 11.084 10.1667 10.4698 10.1667 9.70898C10.1667 8.94815 9.55254 8.33398 8.79171 8.33398C8.03087 8.33398 7.41671 8.94815 7.41671 9.70898C7.41671 10.4698 8.03087 11.084 8.79171 11.084ZM12 17.0423C14.1359 17.0423 15.9509 15.704 16.6842 13.834H7.31587C8.04921 15.704 9.86421 17.0423 12 17.0423Z" fill="#7C7C7C"/>
</svg>

              </button>
              <button className="w-8 h-8 rounded-md hover:bg-gray-200 flex items-center justify-center" aria-label="Insert emoji">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.1454 3.29102C14.7961 3.29109 15.4014 3.63917 15.7314 4.19824L21.5429 14.1992C21.8728 14.7675 21.8815 15.4639 21.5517 16.0322L19.3886 19.791C19.0677 20.3593 18.4626 20.708 17.8026 20.708H11.9999L11.9911 20.6748V20.708H6.18839C5.52839 20.708 4.92328 20.3593 4.60245 19.791L2.43936 16.0322C2.10951 15.4639 2.1182 14.7675 2.44815 14.1992L8.25968 4.19824C8.58965 3.63917 9.19489 3.29109 9.84561 3.29102H14.1454ZM11.9911 5.12402H9.84561L4.03409 15.125L6.18839 18.874H17.8026L19.9569 15.125L14.1454 5.12402H11.9999L11.9911 5.0918V5.12402ZM12.8163 8.10352L17.0146 15.4189L16.3456 16.583H7.64542L6.97647 15.4189L11.1747 8.10352H12.8163ZM11.9911 10.3398L9.4794 14.749H14.5116L11.9999 10.3398L11.9911 10.2998V10.3398Z" fill="#7C7C7C"/>
</svg>

              </button>
              <button className="w-8 h-8 rounded-md hover:bg-gray-200 flex items-center justify-center" aria-label="Insert image">
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20.25 18.4167V5.58333C20.25 4.575 19.425 3.75 18.4167 3.75H5.58333C4.575 3.75 3.75 4.575 3.75 5.58333V18.4167C3.75 19.425 4.575 20.25 5.58333 20.25H18.4167C19.425 20.25 20.25 19.425 20.25 18.4167ZM8.79167 13.375L11.0833 16.1342L14.2917 12L18.4167 17.5H5.58333L8.79167 13.375Z" fill="#7C7C7C"/>
</svg>

              </button>
              <button className="w-8 h-8 rounded-md hover:bg-gray-200 flex items-center justify-center" aria-label="Insert from Drive">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.2917 14.0173L16.95 15.5757L16.2167 16.7673L12.9167 14.7507V10.1673H14.2917V14.0173ZM21.1667 13.834C21.1667 17.8765 17.8759 21.1673 13.8334 21.1673C11.9817 21.1673 10.295 20.4707 9.00254 19.334H4.66671C3.61254 19.334 2.83337 18.5548 2.83337 17.5007V9.25065C2.83337 8.22398 3.64921 7.45398 4.66671 7.41732V6.95898C4.66671 4.67648 6.50921 2.83398 8.79171 2.83398C10.9367 2.83398 12.6784 4.47482 12.88 6.57398C13.1917 6.52815 13.5125 6.50065 13.8334 6.50065C17.8759 6.50065 21.1667 9.79148 21.1667 13.834ZM6.50004 7.41732H11.0834V6.73898C10.9734 5.57482 9.98337 4.66732 8.79171 4.66732C7.52671 4.66732 6.50004 5.69398 6.50004 6.95898V7.41732ZM19.3334 13.834C19.3334 10.7998 16.8675 8.33398 13.8334 8.33398C10.7992 8.33398 8.33337 10.7998 8.33337 13.834C8.33337 16.8682 10.7992 19.334 13.8334 19.334C16.8675 19.334 19.3334 16.8682 19.3334 13.834Z" fill="#7C7C7C"/>
</svg>

              </button>
              <button className="w-8 h-8 rounded-md hover:bg-gray-200 flex items-center justify-center" aria-label="Drawing">
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.5 13.4999L7.4375 20.5019H4V17.0644L11.0625 10.0624L14.5 13.4999ZM12.4697 3.96967C12.7626 3.67678 13.2374 3.67678 13.5303 3.96967L15.3213 5.76069L16.7969 4.2685C17.1544 3.911 17.7314 3.911 18.0889 4.2685L20.2344 6.41303C20.5918 6.77054 20.5918 7.34853 20.2344 7.706L15.4805 12.5195L12.043 9.08197L14.2676 6.82807L13 5.56049L8.53027 10.0302C8.23738 10.3231 7.76262 10.3231 7.46973 10.0302C7.17683 9.73732 7.17683 9.26256 7.46973 8.96967L12.4697 3.96967Z" fill="#7C7C7C"/>
</svg>

              </button>
            </div>
          </div>
          <div className="flex items-center gap-3 text-gray-600">
          
            <button className="w-8 h-8 rounded-md hover:bg-gray-200 flex items-center justify-center" aria-label="More options">
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.0002 8.66732C12.9168 8.66732 13.6668 7.91732 13.6668 7.00065C13.6668 6.08398 12.9168 5.33398 12.0002 5.33398C11.0835 5.33398 10.3335 6.08398 10.3335 7.00065C10.3335 7.91732 11.0835 8.66732 12.0002 8.66732ZM12.0002 10.334C11.0835 10.334 10.3335 11.084 10.3335 12.0007C10.3335 12.9173 11.0835 13.6673 12.0002 13.6673C12.9168 13.6673 13.6668 12.9173 13.6668 12.0007C13.6668 11.084 12.9168 10.334 12.0002 10.334ZM12.0002 15.334C11.0835 15.334 10.3335 16.084 10.3335 17.0007C10.3335 17.9173 11.0835 18.6673 12.0002 18.6673C12.9168 18.6673 13.6668 17.9173 13.6668 17.0007C13.6668 16.084 12.9168 15.334 12.0002 15.334Z" fill="#767676"/>
</svg>

            </button>  <button className="w-8 h-8 rounded-md hover:bg-gray-200 flex items-center justify-center" aria-label="Discard draft">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.49998 18.4167C6.49998 19.425 7.32498 20.25 8.33331 20.25H15.6666C16.675 20.25 17.5 19.425 17.5 18.4167V7.41667H6.49998V18.4167ZM18.4166 4.66667H15.2083L14.2916 3.75H9.70831L8.79165 4.66667H5.58331V6.5H18.4166V4.66667Z" fill="#7C7C7C"/>
</svg>

            </button>
          </div>
        </div>
      </div>
    </div>
  )
}