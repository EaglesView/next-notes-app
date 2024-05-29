import Link from "next/link";
import { CgColorBucket } from "react-icons/cg";

interface SidebarBtnProps {
    linkto: string;
    btnIco: React.ReactNode;
    name: string;
    colorbg:string;
}

export default function SidebarBtn({ linkto, btnIco, name, colorbg }: SidebarBtnProps) {
    return (
        <Link href={linkto} className={`transition-all rounded-md  text-slate-900 ${colorbg} hover:bg-slate-100 hover:text-orange-900 shadow-md p-3 my-2 flex flex-row justify-between items-center`}>
            {btnIco}
            {name}
        </Link>
    );
}
