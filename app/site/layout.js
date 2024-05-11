
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";


export const metadata = {
  title: "Accounter",
  description: "Accounter helps you for declaring",
};

export default function Layout({ children }) {

  return (
    <>

      <section className="site">
        <Header />
        {children}
        <Footer />
      </section>

    </>
  )
}