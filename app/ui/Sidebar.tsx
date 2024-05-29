import { Logo } from "../Logo";
import { averiaSerif } from "../fonts";
export default function sidebar() {
    return <>
        <div className="w-full h-full flex flex-col">
            <div 
            className={'w-full h-56 rounded-md bg bg-orange-400 shadow-md flex flex-row justify-between items-center'}
            >
                <Logo/>
                <h1 className="text-2xl">NextNotes</h1>
            </div>

        </div>
    </>;
}