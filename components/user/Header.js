"use client"
import { useEffect, useState } from 'react'
import Link from "next/link";

function Header() {

    const handleSidebarToggle = () => {
        document.querySelector('.userSidebar').classList.add('userSidebar--active')
    };

    return (
        <header className="userHeader">
            <img src="/assets/images/burger-menu.svg" alt="Toggle navigation" className="d-lg-none cursor-pointer" onClick={handleSidebarToggle} />
            <Link href={'/user'} className="userHeader--name">
                <img src="/assets/images/person.svg" alt="" />
                <span>გიორგი ბერიძე</span>
            </Link>


            <button className="userHeader--logout">
                <img src="/assets/images/logout.svg" alt="" />
                <span>გასვლა</span>
            </button>
        </header>
    );
}

export default Header;