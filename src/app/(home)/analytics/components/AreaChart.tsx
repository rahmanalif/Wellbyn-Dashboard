import React from 'react'
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";
import { data } from '../data'
import ArrowDownIcon from '@/components/UI/ArrowDownIcon';

export default function AreaChartComponent() {
    return (
        <div className="bg-white shadow-md  rounded-lg p-6 w-full mx-auto ">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h2 className="text-[32px] font-[700] text-gray-900">Appointment</h2>
                    <p className="text-sm font-[500] text-[16px] text-[#7C7C7C]">
                        This graph displays the number of appointment in Wellbyn.
                    </p>
                </div>
                <div className="relative inline-block gap-8 focus-within:ring-2 focus-within:ring-[#2E8BC9] focus-within:border-none rounded-lg">
                    <select className="text-[16px] border border-[#DCDCDC] rounded-lg p-[12px] text-gray-700 appearance-none w-[134px] outline-none">
                             <option>Weekly</option>
                        <option>Yearly</option>
                        <option>Monthly</option>
                    </select>
                    <ArrowDownIcon />
                </div>
            </div>
            <ResponsiveContainer width="100%" height={286}>
  <AreaChart data={data}>
    <defs>
      <linearGradient id="colorBlue" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.4} />
        <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.05} />
      </linearGradient>
    </defs>
    <CartesianGrid strokeDasharray="3 3" vertical={false} />
    <XAxis 
      dataKey="day"  tick={{ dy: 10 }} 
      axisLine={false}  // Hide X-axis line
      tickLine={false} // Hide tick lines
    />
    <YAxis 
      domain={[0, 400]} 
      tickFormatter={(val) => `${val}%`} 
      axisLine={false}  // Hide Y-axis line
      tickLine={false} // Hide tick lines
    />
    <Tooltip formatter={(value) => `${value}%`} />
    <Area
      type="monotone"
      dataKey="value"
      stroke="#3B82F6"
      fillOpacity={1}
      fill="url(#colorBlue)"
      dot={{ r: 8, stroke: "#fff", strokeWidth: 2, fill: "#2E8BC9" }}
    />
  </AreaChart>
</ResponsiveContainer>
        </div>
    )
}
