"use client"

import axios from "axios";
import { useState } from "react";
import React from 'react'
import { ImCross } from "react-icons/im";

export const Navbar = () => {

    const[modal, setModal] = useState<boolean>(false);
    const[taskName, setTaskName] = useState<string>("");
    const[taskCategory, setTaskCategory] = useState<string>("")

    async function createTask(){
        try{
            await axios.post("/api/createTask", {taskName, taskCategory}).then((res)=>{
                console.log(res);
                setModal(false);
            })
        }
        catch(err){
            console.log(err);
        }
    }

  return (
    <div className='w-screen fixed top-0 left-0 border-b-[1px] border-[#0f223b] flex items-center bg-[#06111f] py-4 px-6'>
        <h2 className='text-2xl text-white font-bold w-[30%]'>Risav's Task Panel</h2>
        <div className='w-[70%] flex justify-end'>
            <button onClick={()=>{setModal(true)}} className='bg-green-500/40 border-2 border-green-500 px-4 py-2 rounded-xl text-green-400 font-semibold hover:brightness-110 duration-200 hover:-translate-y-1'> + Create Task</button>
        </div>

        <div className={`w-screen h-screen ${modal ? " translate-y-0 opacity-100 ":" -translate-y-[100rem] opacity-50 "} duration-200 backdrop-blur-xl fixed top-0 left-0 flex items-center justify-center`}>
            <div className="bg-black p-6 rounded-xl border-[#224068] w-80">

                <div className=" flex">
                    <h2 className="w-full text-start text-xl font-bold text-white">New Task</h2>
                    <button onClick={()=>{setModal(false)}} className="text-[#0f223b] hover:text-red-500 duration-200 " ><ImCross/></button>
                </div>

                <div className="w-full text-start flex flex-col mb-5">
                    <input placeholder="Enter Task Name..." onChange={(e) => { setTaskName(e.target.value) }} value={taskName} className="p-2 placeholder:text-[#1c2e46] bg-transparent w-full peer focus:outline-none focus:border-[#3d68a0] focus:border-2  rounded-xl border-[1px] duration-200 border-[#274367]"></input>
                    <h2 className="text-sm text-semibold text-[#274367] order-first mt-4 peer-focus:text-[#3d68a0] peer-focus:font-semibold duration-200">Task Name</h2>
                </div>

                <div className="w-full text-start flex flex-col mb-5">
                    <input placeholder="Enter Task Category..." onChange={(e) => { setTaskCategory(e.target.value) }} value={taskCategory} className="p-2 placeholder:text-[#1c2e46] bg-transparent w-full peer focus:outline-none focus:border-[#3d68a0] focus:border-2  rounded-xl border-[1px] duration-200 border-[#274367]"></input>
                    <h2 className="text-sm text-semibold text-[#274367] order-first mt-4 peer-focus:text-[#3d68a0] peer-focus:font-semibold duration-200">Task Category</h2>
                </div>

                <div className='w-full flex justify-end'>
                    <button onClick={()=>{createTask()}} className='bg-green-500/40 border-2 border-green-500 px-4 py-2 rounded-xl text-green-400 font-semibold hover:brightness-110 duration-200 hover:-translate-y-1'>Set</button>
        </div>            
        </div>
        </div>


    </div>
  )
}
