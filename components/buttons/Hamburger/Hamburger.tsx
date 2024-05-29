import Image from 'next/image';
import MenuImg from '/public/menu.svg'
function Hamburger() {
    return <>
        <button className='w-12 h-12 flex items-center justify-center'>
            <Image 
                src={MenuImg}
                width={24}
                height={24}
                alt='Main Menu'
            />
        </button>
    </>
}
export default Hamburger;