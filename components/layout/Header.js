import Link from "next/link";

function Header() {
    return (
        <header>
            <div className="container">
                <nav className="nav align-items-end justify-content-between">

                    <Link className="logo--text" href={'/'}>Accounter</Link>
                    <div className="header--inner">
                        <div className="d-flex gap-lg-5 gap-3">
                            <Link className="header--outlined" href={'/#howItWorks'}>როგორ მუშაობს?</Link>
                            <Link className="" href={'/#prices'}>ფასები</Link>
                        </div>

                        <div className="d-flex gap-lg-5 gap-3">
                            <Link className=" btn--green" href={'/signIn'}>შესვლა</Link>
                            <Link className="  btn--orange" href={'/signIn'}>სცადე უფასოდ</Link>
                        </div>
                    </div>


                </nav>
            </div>

        </header>
    );
}

export default Header;