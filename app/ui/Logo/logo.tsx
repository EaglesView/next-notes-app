import Logoimg from "@/public/logo.svg"
import Image from "next/image"

export default function logo() {
    return <>
        <Image
            src={Logoimg}
            width={54} height={54}
            alt="NextNotes"
        />
    </>
    
}