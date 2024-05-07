import Link from "next/link";
function Footer() {
    return (
        <footer>
            <div className="container">
                <nav>
                    <Link className="logo--text" href={'/'}>Accounter</Link>
                    <ul>
                        <li>
                            <Link href={'/'}>როგორ მუშაობს?</Link>
                        </li>
                        <li>
                            <Link href={'/'}>მომხმარებლის კაბინეტი</Link>
                        </li>
                        <li>
                            <Link href={'/'}>ფასები</Link>
                        </li>
                        <li>
                            <Link href={'/terms'}>წესები და პირობები</Link>
                        </li>
                        <li>
                            <Link href={'/about'}>ჩვენს შესახებ</Link>
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