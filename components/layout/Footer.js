import Link from "next/link";
function Footer() {
    return (
        <footer>
            <div className="container">
                <nav>
                    <Link className="logo--text" href={'/site'}>Accounter</Link>
                    <ul>
                        <li>
                            <Link href={'/site#howItWorks'}>როგორ მუშაობს?</Link>
                        </li>
                        <li>
                            <Link href={'/user'}>მომხმარებლის კაბინეტი</Link>
                        </li>
                        <li>
                            <Link href={'/site#choosePackage'}>ფასები</Link>
                        </li>
                        <li>
                            <Link href={'/site/terms'}>წესები და პირობები</Link>
                        </li>
                        <li>
                            <Link href={'/site/about'}>ჩვენს შესახებ</Link>
                        </li>
                    </ul>
                    <div className="footer--contact">
                        <h2 >კონტაქტი </h2>
                        <a href="tel:+995599222222" className="mb-2">599 22 22 22</a>
                        <a href="mailto:accounter@gmail.com">accounter@gmail.com</a>

                    </div>
                </nav>
            </div>

        </footer>
    );
}

export default Footer;