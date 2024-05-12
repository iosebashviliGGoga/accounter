import Link from "next/link";

function Header() {
    return (
        <header className="userHeader">
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