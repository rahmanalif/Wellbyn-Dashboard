import React, { SetStateAction } from 'react'

export default function AddCode({showAddCode, setShowAddCode}: {showAddCode: boolean, setShowAddCode: React.Dispatch<SetStateAction<boolean>>}) {
  return (
    <div className='w-full absolute left-0 top-0 bg-white rounded-md h-full'>
        <h3 className='mt-4 text-xl'>Add Medication</h3>
        <br />
        <div className='flex items-center justify-center gap-4 flex-wrap md:flex-nowrap'>
            <div className='w-full'>
                <label htmlFor="code-type">Code Type </label>
                <select name="code-type" id="code-type" className='w-full px-2 text-lg border-none outline-none mt-3 shadow-md py-3 rounded-md focus-within:ring-2 focus-within:ring-[#2E8BC9] focus-within:outline-none'>
                    <option value="">Select type</option>
                    <option value="">Option 1</option>
                    <option value="">Option 2</option>
                </select>
            </div>
            <div className='w-full'>
                <label htmlFor="code">Code </label>
                <input type="text" name="code" id="code" placeholder='96541' className='w-full px-2 text-lg border-none outline-none mt-3 shadow-md py-3 rounded-md focus-within:ring-2 focus-within:ring-[#2E8BC9] focus-within:outline-none'/>
            </div>
        </div>
        <div className='mt-4'>
            <label htmlFor="description">Description </label>
            <textarea name="description" id="description" placeholder='Enter code description...' className='w-full px-2 text-lg border-none outline-none mt-3 shadow-md py-3 rounded-md focus-within:ring-2 focus-within:ring-[#2E8BC9] focus-within:outline-none'></textarea>
        </div>
        <div className='flex items-center justify-center gap-4 flex-wrap md:flex-nowrap mt-4'>
            <div className='w-full'>
                <label htmlFor="modifier">Modifier </label>
                <input type="text" name="modifier" id="modifier" placeholder='25,59, etc.' className='w-full px-2 text-lg border-none outline-none mt-3 shadow-md py-3 rounded-md focus-within:ring-2 focus-within:ring-[#2E8BC9] focus-within:outline-none'/>
            </div>
            <div className='w-full'>
                <label htmlFor="units">Units </label>
                <input type="text" name="units" id="units" placeholder='1' className='w-full px-2 text-lg border-none outline-none mt-3 shadow-md py-3 rounded-md focus-within:ring-2 focus-within:ring-[#2E8BC9] focus-within:outline-none '/>
            </div>
        </div>
        <div className='mt-4 flex gap-4'>
            <button onClick={() => setShowAddCode(false)} className='px-4 py-2 rounded-md border-[1px] border-[#777] text-[#777] outline-none text-center cursor-pointer'>Cancel</button>
            <button className='px-4 py-2 rounded-md border-none outline-none text-center bg-[#2E8BC9] text-white cursor-pointer hover:opacity-90'>Add Code</button>
        </div>
    </div>
  )
}
