import { Navbar } from "@/components/navbar";
import  TaskDisplay from "@/components/taskDisplay";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex bg-[#06111f] min-h-screen flex-col items-center justify-between px-24 pt-24 pb-10">
     <Navbar/>
     <TaskDisplay/>
    </main>
  );
}
