import Link from "next/link";
import SidebarBtn from "./SidebarBtn"
import { Logo } from "../Logo";
import { averiaSerif } from "../fonts";

import { FaNoteSticky } from "react-icons/fa6";
import { MdSpaceDashboard } from "react-icons/md";
import { HiMiniPaintBrush } from "react-icons/hi2";

interface props{
    color:string;

}

export default function Sidebar({color}:props) {
    return <>
        <div className={averiaSerif.className}>
            <div className={`w-full h-24 rounded-md bg  shadow-md flex flex-row justify-between items-center ${color}` }>
                <Logo/>
                <h1 className="text-3xl p-3 text-slate-100 drop-shadow-xl">NextNotes</h1>
            </div>
            <SidebarBtn linkto={"/dashboard"} btnIco={<MdSpaceDashboard/>} name={"Dashboard"} colorbg={"bg-fuchsia-300"}/>
            <SidebarBtn linkto={"/dashboard/notes"} btnIco={<FaNoteSticky/>} name={"My Notes"} colorbg={"bg-orange-300"}/>
            <SidebarBtn linkto={"/dashboard/notes"} btnIco={<HiMiniPaintBrush/>} name={"Themes"} colorbg={"bg-cyan-300"}/>
        </div>
    </>;
}