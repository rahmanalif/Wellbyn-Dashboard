import { Plus, Download, SquarePen, Trash2 } from "lucide-react";
import Link from "next/link";

const staffData = [
  {
    id: "P6Q7R8",
    avatar: "/placeholder.svg?height=32&width=32",
    name: "Rami Rahman Chowdhury",
    email: "sarah_illustrates@gmail.com",
    number: "(555) 123-4567",
  },
  {
    id: "J0K1L2",
    avatar: "/placeholder.svg?height=32&width=32",
    name: "Tariq Rahman Chowdhury",
    email: "ajay.creative@gmail.com",
    number: "(555) 456-7890",
  },
  {
    id: "V2W3X4",
    avatar: "/placeholder.svg?height=32&width=32",
    name: "Maya Rahman Chowdhury",
    email: "stephanie.codes@gmail.com",
    number: "(555) 789-0123",
  },
  {
    id: "D4E5F6",
    avatar: "/placeholder.svg?height=32&width=32",
    name: "Sami Rahman Chowdhury",
    email: "michael.dev@icloud.com",
    number: "(555) 012-3456",
  },
  {
    id: "M3N4O5",
    avatar: "/placeholder.svg?height=32&width=32",
    name: "Zara Rahman Chowdhury",
    email: "peter_works@outlook.com",
    number: "(555) 345-6780",
  },
  {
    id: "S9T0U1",
    avatar: "/placeholder.svg?height=32&width=32",
    name: "Nashit Rahman Chowdhury",
    email: "oliver.uiuxdesign@gmail.com",
    number: "(555) 678-9013",
  },
  {
    id: "B8C9D0",
    avatar: "/placeholder.svg?height=32&width=32",
    name: "Fahim Rahman Chowdhury",
    email: "linda_graphics@yahoo.com",
    number: "(555) 901-2346",
  },
  {
    id: "G7H8I9",
    avatar: "/placeholder.svg?height=32&width=32",
    name: "Riya Rahman Chowdhury",
    email: "roberto_ux@outlook.com",
    number: "(555) 234-5680",
  },
  {
    id: "Y5Z6A7",
    avatar: "/placeholder.svg?height=32&width=32",
    name: "Ayaan Rahman Chowdhury",
    email: "jessica.designs@example.com",
    number: "(555) 567-8903",
  },
  {
    id: "E1F2G3",
    avatar: "/placeholder.svg?height=32&width=32",
    name: "Hadi Rahman Chowdhury",
    email: "emily_dev@live.com",
    number: "(555) 890-1236",
  },
  {
    id: "A1B2C3",
    avatar: "/placeholder.svg?height=32&width=32",
    name: "Sofia Elham Rahman",
    email: "nina.creates@example.com",
    number: "(555) 123-4570",
  },
  {
    id: "H4I5J6",
    avatar: "/placeholder.svg?height=32&width=32",
    name: "Lina Rahman Chowdhury",
    email: "david_graphics@hotmail.com",
    number: "(555) 456-7893",
  },
];

export default function StaffTable() {
  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-10 bg-[#F6F9FC] min-h-screen">
      {/* Header Section */}
      <div className="p-6 bg-white shadow-md rounded-2xl mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#3D3D3D]">Staff</h1>
          <p className="text-sm text-[#737373] pt-1">Manage all the staff</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <button className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors w-full sm:w-auto">
            <Download className="h-4 w-4" />
            Export Data
          </button>
          <Link href="/staff/add" className="w-full sm:w-auto">
            <button className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md bg-[#2E8BC9] text-white  transition-colors w-full">
              <Plus className="h-4 w-4" />
              Add New
            </button>
          </Link>
        </div>
      </div>

      {/* Table Section */}
      <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#F2F8FD]">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Doctor
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Number
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {staffData.map((staff) => (
                <tr key={staff.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#3D3D3D]">
                    {staff.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 mr-3">
                        <img
                          className="h-8 w-8 rounded-full object-cover"
                          src={staff.avatar || "/placeholder.svg"}
                          alt={`${staff.name}'s avatar`}
                          
                        />
                      </div>
                      <div className="text-sm font-medium text-[#3D3D3D] ">
                        {staff.name}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#3D3D3D] truncate max-w-[180px]">
                    {staff.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#3D3D3D]">
                    {staff.number}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <Link href="/staff/info">
                        <button 
                          className="p-2 text-blue-600 hover:text-blue-800 rounded-full hover:bg-blue-50 transition-colors"
                          aria-label="Edit staff"
                        >
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M25.544 15.045C25.848 15.4713 26 15.6845 26 16C26 16.3155 25.848 16.5287 25.544 16.955C24.1779 18.8706 20.6892 23 16 23C11.3108 23 7.8221 18.8706 6.45604 16.955C6.15201 16.5287 6 16.3155 6 16C6 15.6845 6.15201 15.4713 6.45604 15.045C7.8221 13.1294 11.3108 9 16 9C20.6892 9 24.1779 13.1294 25.544 15.045Z" stroke="#3D3D3D" stroke-width="1.5"/>
<path d="M19 16C19 14.3431 17.6569 13 16 13C14.3431 13 13 14.3431 13 16C13 17.6569 14.3431 19 16 19C17.6569 19 19 17.6569 19 16Z" stroke="#3D3D3D" stroke-width="1.5"/>
</svg>

                        </button>
                      </Link>
                      <button 
                        className="p-2 rounded-full hover:bg-red-50 transition-colors"
                        aria-label="Delete staff"
                      >
                     <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20.4249 8.60509L21.4149 7.6151C22.2351 6.79497 23.5648 6.79497 24.3849 7.6151C25.205 8.43524 25.205 9.76493 24.3849 10.5851L23.3949 11.5751M20.4249 8.60509L13.7656 15.2644C13.2581 15.772 12.898 16.4078 12.724 17.1041L12 20L14.8959 19.276C15.5922 19.102 16.228 18.7419 16.7356 18.2344L23.3949 11.5751M20.4249 8.60509L23.3949 11.5751" stroke="#2B4DCA" stroke-width="1.5" stroke-linejoin="round"/>
<path d="M22.9999 17.5C22.9999 20.7875 22.9999 22.4312 22.092 23.5376C21.9258 23.7401 21.7401 23.9258 21.5375 24.092C20.4312 25 18.7874 25 15.4999 25H15C11.2288 25 9.34316 25 8.17159 23.8284C7.00003 22.6569 7 20.7712 7 17V16.5C7 13.2125 7 11.5688 7.90794 10.4624C8.07417 10.2599 8.2599 10.0742 8.46244 9.90794C9.56879 9 11.2125 9 14.5 9" stroke="#2B4DCA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
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
    </div>
  );
}