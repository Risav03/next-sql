import React from 'react'

interface PropTypes{
    id: String,
    taskName: String,
    status: String
}

export const TaskCard = ({taskName, status, id}:PropTypes) => {
  return (
    <div className='border-[1px] border-[#0f223b] w-48 p-4 rounded-xl'>
        <h2 className='text-[#3e82db] font-bold text-lg' >{taskName}</h2>
        <div className='w-full mt-4 flex justify-end'>
            <button className=' px-3 py-2 border-[1px] text-sm rounded-xl text-gray-400 hover:-translate-y-1 duration-200 font-semibold border-gray-400 bg-gray-400/30'>
                {status}
            </button>
        </div>
    </div>
  )
}
