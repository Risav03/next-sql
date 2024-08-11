import axios from 'axios';
import React from 'react'

interface PropTypes{
    id: String,
    taskName: String,
    status: String
}

export const TaskCard = ({taskName, status, id}:PropTypes) => {

    async function moveTask(id:String){
        try{
            await axios.patch("/api/moveTask", {id}).then((res)=>{
                window.location.reload();
            });
        }
        catch(err){
            console.log(err);
        }
    }

  return (
    <div className='border-[1px] border-[#0f223b] w-48 p-4 rounded-xl'>
        <h2 className='text-[#3e82db] font-bold text-lg' >{taskName}</h2>
        <div className='w-full mt-4 flex justify-end'>
            <button onClick={()=>{moveTask(id)}} className={`px-3 py-2 border-[1px] text-sm hover:brightness-110 rounded-xl hover:-translate-y-1 duration-200 font-semibold ${status == "Take up" && " text-gray-400 border-gray-400 bg-gray-400/30 "} ${status == "Finish" && "text-green-400 border-green-400 bg-green-400/30"} ${status == "Delete" && "text-red-400 border-red-400 bg-red-400/30"} `}>
                {status}
            </button>
        </div>
    </div>
  )
}
