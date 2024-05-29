import { Navbar } from "@/app/ui/Navbar";
import Image from "next/image";
import Link from "next/link";

//CECI EST LA FONCTION PRINCIPALE DU PROJET, C'EST AVEC ELLE QU'ON PEUT TOUT AFFICHER
function App() {
  return <>
    <Navbar/>
    <main>
      <Link href={'/dashboard'} className="text-2xl p-2">Dashboard</Link>
    </main>
    
  </>
}

export default App;