import { Hamburger, RegButton } from "../../../components/buttons";

function Navbar() {
    return <>
        <header className="w-full h-16 p-2 sticky">
            <nav className=" w-full h-full bg-blue-300 flex flex-row justify-between rounded-md shadow-md items-center px-1.5">
                <Hamburger/>
                <RegButton title={"Log in"}/>
            </nav>
        </header>

    </>
}
export default Navbar;