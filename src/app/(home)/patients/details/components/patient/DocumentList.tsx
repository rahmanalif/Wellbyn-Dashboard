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