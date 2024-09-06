"use server"

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: any){
    try{

        const body = await req.json();

        const {taskName, taskCategory} = body;

        const savedTask = await prisma.task.create({
            data:{
                taskName, taskCategory, status:"Pending"
            }
        })

        return new NextResponse(JSON.stringify({
            savedTask
        }), { status: 200 });
    }
    catch(err){
        return new NextResponse(JSON.stringify(err), {
            status: 500,
        });
    }
}