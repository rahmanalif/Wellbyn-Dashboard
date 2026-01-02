import React from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'
import { pieData, stats } from '../data'
import ArrowDownIcon from '@/components/UI/ArrowDownIcon'


const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}: any) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={14}
      fontWeight={700}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function PieChartComponent() {
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-100 p-6">
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6  rounded-xl">

                <div className="col-span-1 bg-white flex flex-col items-center mb-8 rounded-lg p-6 h-[100%] shadow-sm">
                    <h2 className="text-[18px] font-[700] mb-4 text-center pb-6 border-b-[1px] border-[#DCDCDC] w-[110%]">
                        New patients vs Old patients
                    </h2>
                    <ResponsiveContainer width="100%" height={400}>
                        <PieChart width={400} height={600}>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={150}
                                dataKey="value"
                                label={renderCustomizedLabel}
                                labelLine={false}
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>

                    <div className="bg-blue-50 mt-6 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 w-[304px]">
                        {pieData.map((item, i) => (
                            <div key={i} className="flex justify-between items-center mb-1">
                                <div className="flex items-center gap-2">
                                    <span
                                        className="w-2.5 h-2.5 rounded-full"
                                        style={{ backgroundColor: item.color }}
                                    ></span>
                                    {item.name}
                                </div>
                                <span className="font-semibold">{item.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    {
                        stats.map((card, index) => (
                            <div className='px-4 py-12 h-[90%] rounded-md shadow-md w-full bg-white' key={index}>
                                <div
                                    className={`w-13 h-13 flex items-center justify-center rounded-lg text-lg ${card.iconBg}`}
                                >
                                    {/* {card.icon} */}
                                    <img src={card.icon} alt={card.label} width="68" height="68" />
                                </div>
                                <div className='mt-8'>
                                    <div className="text-[18px] text-gray-500 font-[500]">
                                        {card.label}
                                    </div>
                                    
                                </div>
                                <div className='flex items-center justify-between mt-4'>
                                    <div className=" font-[700] text-[32px] w-full">
                                        {card.value}
                                    </div>
                                    <div
                                        className={`text-[12px] px-2 py-0.5 rounded-full font-medium ${card.positive
                                            ? "text-green-600 bg-green-100"
                                            : "text-red-600 bg-red-100"
                                        }`}
                                    >
                                        {card.change}
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
