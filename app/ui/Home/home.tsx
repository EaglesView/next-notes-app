
"use client";

import Link from "next/link";
import { averiaSerif, inter } from '@/app/ui/fonts';
import { Logo } from '@/app/ui/Logo'
import { Session } from "next-auth";
import { ButtonStatus } from "@/components/buttons";
interface HomeScreenProps {
    session: Session | null;
    status: "loading" | "authenticated" | "unauthenticated";
}

export default function HomeScreen({ session, status }: HomeScreenProps) {
    return (
        <main className={`${averiaSerif.className} bg-slate-700 h-screen overflow-hidden text-slate-100 flex flex-col justify-start items-center`}>
            <div className="w-full h-12 flex flex-row justify-between items-center md:justify-start">
                <Logo />
                <Link href="/dashboard" className="text-3xl p-2 drop-shadow-lg">Next notes</Link>
            </div>
            <section className={`${inter.className} rounded-md bg-slate-100 text-slate-600 p-2 my-20 min-w-64 w-2/3 md:w-96 h-96 md:h-2/3 flex flex-col justify-start items-center`}>
                <h1 className={`${averiaSerif.className} text-3xl drop-shadow-md font-black`}>Welcome to NextNotes!</h1>
                <h2 className="font-black text-slate-800">Log In</h2>
                {(status === "authenticated" && session != null) ? (

                    <Link href="/dashboard" className={`${averiaSerif.className} text-2xl drop-shadow-md font-black p-2 bg-slate-800 text-slate-50 rounded-md`}>
                        Go to dashboard
                    </Link>
                ) : (
                    <>
                        <p>Please log in to access your notes.</p>
                        <ButtonStatus routerPathName="/" />
                    </>
                )}
            </section>
        </main>
    );
}