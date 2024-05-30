import { Card } from "../ui/Card"
import { fetchAllNotes } from "../../lib/data"
function DisplayCards() {
    return <>

    </>
}
export default function dashboard() {
    return <>
        <h1 className="text-3xl drop-shadow-md text-slate-800">My dashboard</h1>
        <Card content={<>testtest</>} height={"h-full"} width={"w-full"} color={"bg-blue-200"} />

    </>
}