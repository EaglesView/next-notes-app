interface ButtonProps {
    onClick: () => void;
}
function RoundPlusButton({ onClick }: ButtonProps) {
    return <>
        <button onClick={onClick} className="transition-all rounded-2xl bg-emerald-600 text-slate-100 shadow-md fixed bottom-4 right-4 md:bottom-8 md:right-8 w-6 h-6 md:w-8 md:h-8 lg:h-12 lg:w-12 lg:rounded-full text-3xl font-black drop-shadow-md hover:bg-emerald-200 hover:text-emerald-800 hover:shadow-2xl">+</button>
    </>
}
export default RoundPlusButton;