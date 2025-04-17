import React from 'react'
import { IoRefresh, IoAdd } from 'react-icons/io5'

const Candidates = () => {
    return (
        <div className='bg-white rounded-lg p-5 my-5'>
            <div className='flex justify-between items-center'>
                <div>
                    <input 
                        type="search" 
                        placeholder='Search' 
                        className='bg-gray-100 outline-none border border-[#635CBB]/50 rounded-lg px-6 py-2' 
                    />
                </div>
                <div className='flex items-center gap-3'>
                    <button className='bg-[#635CBb] hover:bg-[#4f47a8] items-center hover:shadow-xl shadow-md transition-all duration-300 text-white inline-flex gap-2 rounded-lg px-6 py-2'>
                        <IoRefresh className='text-xl' />
                        Refresh
                    </button>
                    <button className='bg-[#635CBb] hover:bg-[#4f47a8] items-center hover:shadow-xl shadow-md transition-all duration-300 text-white inline-flex gap-2 rounded-lg px-6 py-2'>
                        <IoAdd className='text-xl' />
                        Add Candidates
                    </button>
                </div>
            </div>
            <table className="w-full my-10 rounded-lg bg-white table-auto text-sm text-left">
                <thead className="bg-[#F3F0FF] text-[#635CBB]">
                    <tr>
                        <th className="p-2">ID</th>
                        <th className="p-2">Desciption</th>
                        <th className="p-2">Email</th>
                        <th className="p-2">Member</th>
                    </tr>
                </thead>
                <tbody>
                        <tr className="cursor-pointer hover:bg-gray-100">
                            <td className="p-2"></td>
                            <td className="p-2"></td>
                            <td className="p-2"></td>
                            <td className="p-2"></td>
                        </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Candidates
