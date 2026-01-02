import React from 'react';
import { FileText, Download } from 'lucide-react';

interface Document {
  name: string;
  size: string;
  status: 'downloading' | 'ready';
}

export const DocumentList: React.FC<{ documents: Document[] }> = ({ documents }) => (
  <div className="w-full max-w-2xl mx-auto p-4 md:p-6 lg:p-8">
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-xl font-semibold text-[#3D3D3D]">Files/Documents</h2>
      <button className="text-[#2E8BC9] flex items-center gap-2 hover:bg-blue-50">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14 21H12C7.28595 21 4.92893 21 3.46447 19.5355C2 18.0711 2 15.714 2 11V7.94427C2 6.1278 2 5.21956 2.38032 4.53806C2.65142 4.05227 3.05227 3.65142 3.53806 3.38032C4.21956 3 5.1278 3 6.94427 3C8.10802 3 8.6899 3 9.19926 3.19101C10.3622 3.62712 10.8418 4.68358 11.3666 5.73313L12 7M8 7H16.75C18.8567 7 19.91 7 20.6667 7.50559C20.9943 7.72447 21.2755 8.00572 21.4944 8.33329C22 9.08996 22 10.1433 22 12.25" stroke="#2E8BC9" stroke-width="1.5" stroke-linecap="round"/>
<path d="M16 18C16.5898 18.6068 18.1597 21 19 21C19.8403 21 21.4102 18.6068 22 18M19 20V13" stroke="#2E8BC9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  Download all
      </button>
    </div>
    <div className="space-y-4">
      {documents.map((doc, index) => (
        <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <FileText className="w-6 h-6 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-[#7C7C7C]">{doc.name}</p>
              <p className="text-xs text-[#7C7C7C]">{doc.size}</p>
            </div>
          </div>
          {doc.status === "downloading" ? (
            <div className="relative w-8 h-8 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-2 border-blue-200 border-t-blue-600 animate-spin" />
              <Download className="w-4 h-4 text-[#2E8BC9]" />
            </div>
          ) : (
            <button className="text-[#2E8BC9] hover:bg-blue-50">
              <Download className="w-5 h-5" />
            </button>
          )}
        </div>
      ))}
    </div>
  </div>
);