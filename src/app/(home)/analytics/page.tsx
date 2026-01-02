"use client"

import React, { lazy, Suspense } from 'react'
const AreaChartComponent = lazy(() => import('./components/AreaChart'));
const PieChartComponent = lazy(() => import('./components/PieChart'));
const BarChartComponent = lazy(() => import('./components/BarChartComponent'));
import Loader from './components/Loader';
import { messageData } from './data';



export default function page() {
    return (
        <div className=''>
          
            <Suspense fallback={<Loader />}>
                <AreaChartComponent />
            </Suspense>
            <Suspense fallback={<Loader />}>
                <PieChartComponent />
            </Suspense>
            <Suspense fallback={<Loader />}>
                <BarChartComponent />
            </Suspense>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-6 rounded-b-lg">
                <div className="bg-blue-50 p-4 rounded-lg text-left">
                    <p className="text-sm text-gray-500">New users</p>
                    <p className="text-xl font-bold text-[#2E8BC9]">1,234</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg text-left">
                    <p className="text-sm text-gray-500">Old users</p>
                    <p className="text-xl font-bold text-[#1A588A]">1,234</p>
                </div>
            </div>
            <div className="bg-gray-50 mt-4  sm:w-[424px] w-full">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Message volume</h2>
                <div className="space-y-4">
                    {messageData.map((item, idx) => (
                        <div
                            key={idx}
                            className="bg-white rounded-xl p-4 flex items-center justify-between shadow-sm"
                        >
                            <div className="flex items-center gap-6">
                                <div
                                    className={`w-12 h-12 flex items-center justify-center rounded-md text-xl ${item.iconBg}`}
                                >
                                    {/* {item.icon} */}
                                    <img src={item.icon} alt={item.title} />
                                </div>
                                <div>
                                    <p className="text-[18px] font-[500] text-gray-500">{item.title}</p>
                                    <p className="text-[24px] font-[700] text-gray-800">{item.value}</p>
                                </div>
                            </div>
                            <div
                                className={`flex items-center gap-1 text-sm font-medium p-[4px] rounded-full ${item.changeBg} ${item.changeColor}`}
                            >
                                {item.direction === "up" ? "↑" : "↓"} {item.change}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
