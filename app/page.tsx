import { Navbar } from "@/app/ui/Navbar";
import Image from "next/image";
import Link from "next/link";
import { averiaSerif, inter } from "./ui/fonts";
import { Logo } from "./ui/Logo";

//CECI EST LA FONCTION PRINCIPALE DU PROJET, C'EST AVEC ELLE QU'ON PEUT TOUT AFFICHER
function App() {
  return <>
    <main className={`${averiaSerif.className} bg-slate-700 h-screen overflow-hidden text-slate-100 flex flex-col justify-start items-center`}>
      <div className=" w-full h-12 flex flex-row justify-between items-center md:justify-start">
        <Logo />
        <Link href={'/dashboard'} className="text-3xl p-2 drop-shadow-lg">Next notes</Link>
      </div>
      {/*This is gonna be a component by itself later, is is just a login div*/}
      <section className={`${inter.className} rounded-md bg-slate-100 text-slate-600 p-2 my-20 min-w-64 w-2/3 md:w-96 h-96 md:h-2/3 flex flex-col justify-start items-center`}>
        <h1 className={`${averiaSerif.className} text-3xl drop-shadow-md font-black`}>Welcome to NextNotes!</h1>
        <h2 className={`font-black text-slate-800`}>Log In</h2>
      </section>
    </main>


  </>
}

export default App;