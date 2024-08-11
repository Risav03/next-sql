"use client"

import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { TaskCard } from './taskCard';

interface DataType{
    id:String,
    taskName: String,
    taskCategory: String,
    status: String
}

export default function TaskDisplay () {

    const[tasks, setTasks] = useState<Array<DataType>>([]);
    const[categories, setCategores] = useState<Array<string>>([""]);

    const[pending, setPending] = useState<number>(0);
    const[started, setStarted] = useState<number>(0);
    const[ended, setEnded] = useState<number>(0);


   async function fetchTasks(){
    try{
        await axios.get("/api/getTasks").then((res)=>{
            console.log(res);


            const response = res.data.taskData;
            const arr = []

            for(let i = 0; i<response.length; i++){

                if(response[i].status == "Pending"){
                    setPending((prev)=>(prev+1));
                }
                else if(response[i].status == "Started"){
                    setStarted((prev)=>(prev+1));
                }
                else if(response[i].status == "Ended"){
                    setEnded((prev)=>(prev+1));
                }
                if(i == 0){
                    arr.push(response[i].taskCategory);
                }
                else{
                    for(let j = 0; j<=i; j++){
                        if(arr[j] == undefined){
                            arr.push(response[i].taskCategory);
                            break;
                        }
                        if(response[i].taskCategory.toUpperCase() == arr[j].toUpperCase()){
                            break;
                        }
                    }
                }

            }


            setTasks(res.data.taskData);
            setCategores(arr);
        });
    }
    catch(err){
        console.log(err);
    }
   }
   
    useEffect(()=>{
        fetchTasks()
    },[])

  return (
    <div className='w-screen grid grid-flow-col grid-cols-3 px-10'>
        <div className='border-r-[1px] border-[#0f223b] px-4'>
            <h3 className='text-xl font-semibold text-gray-300' >Pending</h3>
            <div className='mt-10'>
                {pending > 0 && categories.map((category:string)=>(
                    <div className='my-10'>
                        <h2 className='text-md text-gray-400 font-semibold'>{category}</h2>
                        <div className='flex gap-2 my-4 flex-wrap'>

                        {tasks.map((item:DataType, i)=>(
                        <>
                            {item.status == "Pending" && item.taskCategory == category && <TaskCard id={item.id} status={"Take up"} taskName={item.taskName} />}
                        </>
                ))}
                </div>
                    </div>  
                ))}
                
            </div>
        </div>
        <div className='border-r-[1px] border-[#0f223b] px-4' >
            <h3 className='text-xl font-semibold text-gray-300' >Working</h3>
            <div className='mt-10'>
                {started > 0 && categories.map((category:string)=>(
                    <div className='my-10'>
                        <h2 className='text-md text-gray-400 font-semibold'>{category}</h2>
                        <div className='flex gap-2 my-4 flex-wrap'>

                        {tasks.map((item:DataType, i)=>(
                        <>
                            {item.status == "Started" && item.taskCategory == category && <TaskCard id={item.id} status={"Finish"} taskName={item.taskName} />}
                        </>
                ))}
                </div>
                    </div>  
                ))}
                
            </div>
        </div>
        <div className=' px-4' >
            <h3 className='text-xl font-semibold text-gray-300' >Completed</h3>
            <div className='mt-10'>
                {ended > 0 && categories.map((category:string)=>(
                    <div className='my-10'>
                        <h2 className='text-md text-gray-400 font-semibold'>{category}</h2>
                        <div className='flex gap-2 my-4 flex-wrap'>

                        {tasks.map((item:DataType, i)=>(
                        <>
                            {item.status == "Ended" && item.taskCategory == category && <TaskCard id={item.id} status={"Delete"} taskName={item.taskName} />}
                        </>
                ))}
                </div>
                    </div>  
                ))}
                
            </div>
        </div>
    </div>
  )
}
