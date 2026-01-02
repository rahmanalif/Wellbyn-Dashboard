import React from 'react'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { barData } from '../data'
import ArrowDownIcon from '@/components/UI/ArrowDownIcon'

export default function BarChartComponent() {
    return (
        <div>
            <div className="flex justify-between items-center mt-8 bg-white rounded-lg p-6">
                            <div>
                                <h2 className="text-[32px] font-[700] text-gray-800">Patient Flow</h2>
                                <p className="text-[16px] font-[500] text-[#7C7C7C]">
                                    This graph displays the number of Patient in Wellbyn.
                                </p>
                            </div>
                            <div className="relative inline-block gap-8 focus-within:ring-2 focus-within:ring-[#2E8BC9] focus-within:border-none rounded-lg">
                                <select className="text-[16px] border border-[#DCDCDC] rounded-lg p-[12px] text-gray-700 appearance-none w-[134px] outline-none">
                             
                                    <option>Yearly</option>
                                    <option>Monthly</option>
                                </select>
                                <ArrowDownIcon />
                            </div>
                        </div>
            <div className="w-full h-[286px] bg-white rounded-b-md">
                <ResponsiveContainer width="100%" height="100%" className="p-0" style={{padding: "0 24px 0 0"}}>
                    <BarChart data={barData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis   axisLine={false}  // Hide X-axis line
      tickLine={false} dataKey="year" />
                        <YAxis   axisLine={false}  // Hide X-axis line
      tickLine={false} />
                        
                        <Tooltip />
                        <Legend
                            verticalAlign="bottom"
                            align="center"
                            iconType="circle"
                            wrapperStyle={{ paddingTop: 10 }}
                        />
                        <Bar dataKey="newUser" name="New User" fill="#3498db" radius={[4, 4, 0, 0]} barSize={25} />
                        <Bar dataKey="oldUser" name="Old User" fill="#195A8A" radius={[4, 4, 0, 0]} barSize={25} />
                    </BarChart>

                </ResponsiveContainer>
            </div>
        </div>
    )
}
