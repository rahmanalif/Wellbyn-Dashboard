"use client"

import { ChevronDown, X } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';

const dummyTasks = [
    { id: 1, name: 'Task name is the task name', status: 'new', priority: 'high', date: 'Feb 25, 2025', completed: false },
    { id: 2, name: 'Task name is the task name', status: 'normal', priority: 'normal', date: 'Feb 25, 2025', completed: false },
    { id: 3, name: 'Task name is the task name', status: 'complete', priority: 'none', date: 'Feb 25, 2025', completed: true },
    { id: 4, name: 'Task name is the task name', status: 'default', priority: 'high', date: 'Feb 25, 2025', completed: false },
    { id: 5, name: 'Task name is the task name', status: 'complete', priority: 'none', date: 'Feb 25, 2025', completed: true },
    { id: 6, name: 'Task name is the task name', status: 'complete', priority: 'none', date: 'Feb 25, 2025', completed: true }
];
interface SelectedPerson {
  id: string;
  name: string;
  avatar: string;
}

const Reminder = () => {
    const [tasks, setTasks] = useState(dummyTasks);
    const [showTaskform, setTaskForm] = useState<boolean>(false)

    const toggleComplete = (id: number) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const deleteTask = (id: number) => {
        setTasks((prev) => prev.filter((task) => task.id !== id));
    };
  const [selectedPeople, setSelectedPeople] = useState<SelectedPerson[]>([
    {
      id: "1",
      name: "Mahmudur Rahman taluk...",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
    },
    {
      id: "2", 
      name: "Mahmudur Rahman taluk...",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b789?w=32&h=32&fit=crop&crop=face",
    },
    {
      id: "3",
      name: "Mahmudur Rahman taluk...",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
    },
  ]);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const availableNames = [
    "Mahmudur Rahman talukder", 
    "Sarah Johnson", 
    "Michael Chen", 
    "Emily Davis", 
    "David Wilson"
  ];

  const handleRemovePerson = (id: string) => {
    setSelectedPeople((prev) => prev.filter((person) => person.id !== id));
  };

  const handleAddPerson = (name: string) => {
    const avatars = [
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1494790108755-2616b612b789?w=32&h=32&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face"
    ];
    
    const newPerson: SelectedPerson = {
      id: Date.now().toString(),
      name: name.length > 20 ? name.substring(0, 20) + "..." : name,
      avatar: avatars[Math.floor(Math.random() * avatars.length)],
    };
    
    setSelectedPeople((prev) => [...prev, newPerson]);
    setIsDropdownOpen(false);
    setSelectedValue("");
  };
    return (
        <div className="p-2 md:p-8">
        
            <div className=" rounded-xl  ">
                <div className="flex justify-between items-center mb-4 bg-white p-6 rounded-md shadow-md">
                    <div>
                        <h2 className="text-xl font-semibold">Reminder</h2>
                        <p className="text-sm text-gray-500">Manage all the task reminder</p>
                    </div>
                    <button onClick={() => setTaskForm(true)} className="bg-[#2E8BC9] hover:opacity-90 text-white px-4 py-2 rounded-md cursor-pointer">
                        + Add Task
                    </button>
                </div>
                <div className="mt-6 bg-white flex gap-4 justify-between overflow-x-auto items-start shadow-md rounded-md">
                    <div className='w-full rounded-l-lg relative min-w-[600px] md:w-full p-2'>
                        {tasks.map((task) => (
                            <div
                                key={task.id}
                                className="flex flex-wrap md:flex-nowrap items-center justify-between border-b border-[#e9e9e9] rounded-md p-3 py-4"
                            >
                                <div className="flex items-center gap-6 flex-1 min-w-0">
                                    <input
                                        type="checkbox"
                                        checked={task.completed}
                                        onChange={() => toggleComplete(task.id)}
                                        className="min-w-6 min-h-6 before:bg-[#F2F8FD]  appearance-none text-[#F2F8FD] border-none outline-none bg-[#F2F8FD] rounded-sm shadow-md checked:bg-[#2E8BC9] checked:ring-[#2E8BC9] transition-all checkmarkInput"
                                    />
                                    <span
                                        className={`text-base truncate ${task.completed ? 'line-through text-gray-400' : 'text-black'}`}
                                    >
                                        {task.name}
                                    </span>
                                    {task.status === 'new' && (
                                        <span className="bg-[#2E8BC9] text-[#FFFFFF] px-2 py-0.5 text-xs rounded-full whitespace-nowrap">
                                            New
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-center gap-2 flex-1 justify-center -ml-6">
                                    {task.status === 'complete' ? (
                                        <div className="text-green-600 text-sm bg-green-100 px-2 py-0.5 rounded-full flex items-center justify-center gap-1">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M14.6668 8.00065C14.6668 4.31875 11.682 1.33398 8.00016 1.33398C4.31826 1.33398 1.3335 4.31875 1.3335 8.00065C1.3335 11.6825 4.31826 14.6673 8.00016 14.6673C11.682 14.6673 14.6668 11.6825 14.6668 8.00065Z" stroke="#237B10" strokeWidth="1.5"/>
                                                <path d="M5.3335 8.33333L7.00016 10L10.6668 6" stroke="#237B10" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            Complete
                                        </div>
                                    ) : task.priority === 'high' ? (
                                        <span className="text-red-600 text-sm bg-red-100 px-2 py-0.5 rounded-full">
                                            ↑ High
                                        </span>
                                    ) : task.priority === 'normal' ? (
                                        <span className="text-blue-600 text-sm bg-blue-100 px-2 py-0.5 rounded-full">
                                            Normal
                                        </span>
                                    ) : null}
                                </div>
                                <div className="flex items-center gap-6 flex-2 justify-between min-w-0 ">
                                    <div className="flex items-center w-[7rem]  pl-12">
                                        {[1, 2, 3].map((_, i) => (
                                            <img
                                                key={i}
                                                src={`https://i.pravatar.cc/150?img=${i + 1}`}
                                                alt="Avatar"
                                                className="min-w-9 min-h-9 rounded-full -ml-2 border-2 border-white"
                                            />
                                        ))}
                                        <div className="bg-[#2E8BC9] min-w-9 min-h-9 text-white text-xs rounded-full border-2 -ml-2 border-white flex items-center justify-center">
                                            <span>+5</span>
                                        </div>
                                    </div>
                                    <span className="text-sm text-gray-500 -ml-2">{task.date}</span>
                                    <div className='flex items-center justify-center gap-6'>
                                        <Image
                                        src="/Frame 2147226750.svg"
                                        alt="update"
                                        width="30"
                                        height="30"
                                        className="text-blue-500 hover:text-blue-700 cursor-pointer"
                                    />
                                    <Image
                                        src="/delete-02.svg"
                                        alt="delete"
                                        width="20"
                                        height="20"
                                        className="text-blue-500 hover:text-blue-700 cursor-pointer -ml-2"
                                    />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {
                        showTaskform ? <div className='p-3 md:w-[30%] w-full md:static absolute top-0 left-0 min-h-full bg-slate-100'>
                            <form method="post" className=' w-full'>
                                <div className='w-full'>
                                    <label htmlFor="title" className='text-[20px] font-[500]'>Title</label>
                                    <input type="text" name="title" id="title" className='border-none outline-none p-2 text-lg rounded-md shadow-md w-full bg-white focus-within:ring-2 focus-within:ring-[#2E8BC9] focus-within:outline-none' placeholder='Write...' />
                                </div>
                                <p className='text-[20px] font-[500] pt-8'>Priority</p>
                                <div className='flex items-center justify-start gap-8 mt-4'>
                                    <div className='flex items-center justify-center gap-3'>
                                        <input type="radio" name="priority" className='w-5 h-5' id="high" />
                                        <label htmlFor="high" className='text-md'>High</label>
                                    </div>
                                    <div className='flex items-center justify-center gap-3'>
                                        <input type="radio" name="priority" className='w-5 h-5' id="normal" />
                                        <label htmlFor="normal" className='text-md'>Normal</label>
                                    </div>
                                </div>
              
                                        <div className='pt-3'>
                                            <label className="block text-lg  font-medium text-[#3D3D3D] mb-1">Choose name </label>
                                            <div className="relative">
                                                <button
                                                    type="button"
                                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                                    className="w-full flex justify-between items-center px-3 py-2 shadow-md bg-white rounded-md  focus:outline-none focus:ring-[#2E8BC9] focus:border-[#2E8BC9]"
                                                >
                                                    <span className={selectedValue ? "text-gray-900" : "text-gray-500"}>
                                                        {selectedValue || "Select name"}
                                                    </span>
                                                    <ChevronDown className="h-5 w-5 text-gray-400" />
                                                </button>
                                                
                                                {isDropdownOpen && (
                                                    <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 ring-1 ring-black ring-opacity-5 overflow-auto">
                                                        {availableNames.map((name) => (
                                                            <button
                                                                key={name}
                                                                type="button"
                                                                onClick={() => handleAddPerson(name)}
                                                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                            >
                                                                {name}
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Selected People */}
                                            <div className="mt-3 space-y-2 ">
                                                {selectedPeople.map((person) => (
                                                    <div key={person.id} className="flex items-center justify-between rounded-4xl bg-gray-50  p-2">
                                                        <div className="flex items-center space-x-3 ">
                                                            <Image
                                                                src={person.avatar}
                                                                alt={person.name}
                                                                width={32}
                                                                height={32}
                                                                className="w-8 h-8 rounded-full"
                                                            />
                                                            <span className="text-sm font-medium text-gray-700">{person.name}</span>
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemovePerson(person.id)}
                                                            className="text-gray-400 bg-[#FFFFFF] rounded-full p-1 hover:text-gray-600"
                                                        >
                                                           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<mask id="mask0_2166_55854"  maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
<rect width="24" height="24" fill="#D9D9D9"/>
</mask>
<g mask="url(#mask0_2166_55854)">
<path d="M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z" fill="#3D3D3D"/>
</g>
</svg>

                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

     
                                <div className='mt-8'>
                                    <label htmlFor="note" className='text-[20px] font-[500]'>Note</label>
                                    <textarea name="note" id="note" placeholder='Type note' className='border-none outline-none p-2 text-lg rounded-md shadow-md w-full bg-white focus-within:ring-2 focus-within:ring-[#2E8BC9] focus-within:outline-none'></textarea>
                                </div>
                                <div className='mt-8'>
                                    <label htmlFor="due-date" className='text-[20px] font-[500]'>Due date</label>
                                    <input type='date' name="due-date" id="due-date" placeholder='Type note' className='border-none outline-none p-2 text-lg rounded-md shadow-md w-full bg-white focus-within:ring-2 focus-within:ring-[#2E8BC9] focus-within:outline-none' />
                                </div>
                                <div className='mt-8 flex items-center justify-center gap-4'>
                                    <button className='w-full hover:opacity-80 bg-[#2E8BC9] text-white text-center py-2 rounded-md cursor-pointer'>Save</button>
                                    <button onClick={() => setTaskForm(false)} className='w-full hover:opacity-80 text-red-600 border-[1px] border-red-600 text-center py-2 rounded-md cursor-pointer'>Cancel</button>
                                </div>
                            </form>
                        </div> : <></>
                    }
                </div>
            </div>
        </div>
    );
};

export default Reminder;
