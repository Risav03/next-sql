"use server"


import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req:any){
    try{
        const taskData = await prisma.task.findMany();

        return new NextResponse(JSON.stringify({
            taskData
        }), { status: 200 });
    }
    catch(err){
        return new NextResponse(JSON.stringify(err), {
            status: 500,
        });
    }
}