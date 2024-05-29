import { Card } from "@/app/ui/Card";
import { Sidebar } from "@/app/ui/SideBar";

 export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
        <h1 className="text-3xl drop-shadow-md text-slate-800">My notes</h1>
        <Card content={<></>} height={"h-full"} width={"w-full"} color={"bg-orange-200"}/>
    </>
    
  );
}