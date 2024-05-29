"use client"
import { useEffect, useState } from 'react';
import Link from "next/link";

function Header() {
    const [isSigned, setIsSigned] = useState(null);

    useEffect(() => {
        const storedIsSigned = localStorage.getItem('isSigned');
        setIsSigned(storedIsSigned);
    }, []);

    return (
        <header className="siteHeader">
            <div className="container">
                <nav className="nav align-items-end justify-content-between">

                    <Link className="logo--text" href={'/site'}>Accounter</Link>
                    <Link className=" btn--green d-lg-none d-grid" href={'/auth/login'}>შესვლა</Link>
                    <div className="header--inner collapse" id="navbarToggleExternalContent">
                        <div className="d-flex gap-lg-5 gap-3 flex-lg-row flex-column">
                            <Link className="header--outlined" href={'/site#howItWorks'}>როგორ მუშაობს?</Link>
                            <Link className="" href={'/site#choosePackage'}>ფასები</Link>
                        </div>
                        {isSigned === 'true' ? (
                            <Link href={'/user'} className="userHeader--name">
                                <img src="/assets/images/person.svg" alt="" />
                                <span>გიორგი ბერიძე</span>
                            </Link>
                        ) : (
                            <div className="d-flex gap-lg-5 gap-3 flex-lg-row flex-column">
                                <Link className=" btn--green d-lg-grid d-none" href={'/auth/login'}>შესვლა</Link>
                                <Link className="  btn--orange" href={'/auth/login'}>სცადე უფასოდ</Link>
                            </div>
                        )}
                    </div>

                    <button
                        className="navbar-toggler d-lg-none"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarToggleExternalContent"
                        aria-controls="navbarToggleExternalContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <img src="/assets/images/burger-menu.svg" alt="Toggle navigation" />
                    </button>
                </nav>
            </div>
        </header>
    );
}

export default Header;
