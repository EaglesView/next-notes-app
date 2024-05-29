import { Navbar } from "@/app/ui/Navbar";
import Image from "next/image";

//CECI EST LA FONCTION PRINCIPALE DU PROJET, C'EST AVEC ELLE QU'ON PEUT TOUT AFFICHER
function App() {
  return <>
    <Navbar/>
    <main>
      <h1 className="text-2xl p-2">Dashboard</h1>
    </main>
    
  </>
}

export default App;