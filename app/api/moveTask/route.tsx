import { PrismaClient } from "@prisma/client";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PATCH(req: any){
    try{

        const body = await req.json();

        const {id} = body;
        var newStatus;

        const task = await prisma.task.findUnique({where:{id}})

        if(!task){
            return new NextResponse(JSON.stringify("No task found with matching ID"), {
                status: 405,
            });
        }

        if(task.status == "Pending"){
            newStatus = "Started";
        }
        else if(task.status == "Started"){
            newStatus = "Ended";
        }
        else{
            await prisma.task.delete({where:{id}});
            return new NextResponse(JSON.stringify(
                "DELETED"
            ), { status: 200 });
        }
        
        const updatedTask = await prisma.task.update({
            where: {id},
            data:{status: newStatus}
        })


        return new NextResponse(JSON.stringify({
            updatedTask
        }), { status: 200 });
    }
    catch(err){
        return new NextResponse(JSON.stringify(err), {
            status: 500,
        });
    }
}