import React from "react";
import Link from "next/link";
import { signOut, useSession } from 'next-auth/react';
interface BTNStat {
    routerPathName: string;
}
const ButtonStatus = ({ routerPathName }: BTNStat) => {

    const isActive: (pathname: string) => boolean = (pathname) =>
        routerPathName === pathname;
    const { data: session, status } = useSession();
    let button = (
        <Link href="/api/auth/signin">
            <a className="font-black p-8 text-xl drop-shadow-md" data-active={isActive('/')}>
                My Dashboard
            </a>)
        </Link>)
    if (status === 'loading') {
        button = (
            <a className="font-black p-8 text-xl drop-shadow-md" data-active={isActive('/')}>
                Loading
            </a>)
    }
    if (status === 'unauthenticated' || session === null) {
        button = (
            <a className="font-black p-8 text-xl drop-shadow-md" data-active={isActive('/')}>
                Log In
            </a>)
    }
    return <>
        <div className={`rounded-md bg-emerald-700 text-slate-100 mt-6 md:mt-8 w-full h-12 flex items-center justify-center`}>
            {button}
        </div>
    </>
}

export default ButtonStatus;