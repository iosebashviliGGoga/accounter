"use client"
import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import Link from "next/link";
function Sidebar() {
    const pathname = usePathname()

    useEffect(() => {

     

        console.log(pathname)
        // You can now use the current URL
        // ...
      }, [pathname])
    return <>
        <nav className="userSidebar">

            <Link className="logo--text" href={'/site'}>Accounter</Link>


            <ul>    
                <li >
                    <Link href={'/user'} className={pathname == '/user' ? "active" : ""}>შემოსავლების ჟურნალი</Link>
                </li>
                <li>
                    <Link href={'/user/messages'} className={pathname == '/user/messages' ? "active" : ""}>RS შეტყობინებები</Link>
                </li>
                <li>
                    <Link href={'/user/profile'} className={pathname == '/user/profile' ? "active" : ""}>პირადი მონაცემები</Link>
                </li>
            </ul>
        </nav>
    </>

}

export default Sidebar