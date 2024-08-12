import Link from "next/link";

export const metadata = {
  // title: "Accounter -ავტორიზაცია",
  description: "",
};
export default function Layout({ children }) {
    return (
      <>
        <section className="auth">
          <Link className="auth--top" href={`/site`}>
             <span> Accounter</span>
          </Link>
            {children}

            <div className="auth--bottom auth--bottom__orange"></div>
            <div className="auth--bottom auth--bottom__green"></div>
        </section>
  
      </>
    )
  }