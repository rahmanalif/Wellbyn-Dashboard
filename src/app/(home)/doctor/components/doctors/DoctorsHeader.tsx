import Link from 'next/link';
import { Download, Plus } from 'lucide-react';

interface DoctorsHeaderProps {
  title: string;
  description: string;
}

export const DoctorsHeader = ({ title, description }: DoctorsHeaderProps) => (
  <div className="flex bg-white p-6 rounded-lg shadow-sm flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
    <div className="mb-4 sm:mb-0">
      <h1 className="text-2xl font-bold text-[#3D3D3D]">{title}</h1>
      <p className="text-sm text-[#737373]">{description}</p>
    </div>
    <div className="flex flex-col sm:flex-row gap-3">
      <button className="inline-flex items-center text-[#2E8BC9] justify-center rounded-md shadow-md bg-transparent px-4 py-2 text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
        <Download className="w-4 h-4 mr-2" />
        Export Data
      </button>
      <Link href="/doctor/new">
        <button className="inline-flex items-center justify-center rounded-md border border-transparent bg-[#2E8BC9] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          <Plus className="w-4 h-4 mr-2" />
          Add New
        </button>
      </Link>
    </div>
  </div>
);