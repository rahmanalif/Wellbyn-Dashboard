import { ReactNode } from "react";
import { ArrowUpIcon, ArrowDownIcon } from "./Icons";

interface StatCardProps {
  title: string;
  value: string;
  percentage: string;
  isPositive: boolean;
  icon: ReactNode;
}

export function StatCard({ title, value, percentage, isPositive, icon }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg p-3 shadow-md">
      <div className="mb-2">{icon}</div>
      <div className="pt-2">
        <h3 className="text-sm font-medium text-[#7C7C7C]">{title}</h3>
        <div className="mt-2 flex w-full justify-between">
          <div className="text-2xl font-bold">{value}</div>
          <div
            className={`flex items-center h-6 p-1 rounded-4xl text-sm ${
              isPositive ? 'bg-[#EEFEE7] text-green-600' : 'bg-[#FEF2F2] text-red-600'
            }`}
          >
            {isPositive ? <ArrowUpIcon className="h-3 w-3 mr-1" /> : <ArrowDownIcon className="h-3 w-3 mr-1" />}
            {percentage}
          </div>
        </div>
      </div>
    </div>
  );
}