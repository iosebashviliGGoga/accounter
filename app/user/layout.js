
import Header from "../../components/user/Header";
import Sidebar from "../../components/user/Sidebar";

export const metadata = {
  title: "Accounter - მომხმარებელი",
  description: "Accounter",
};

export default function Layout({ children }) {

  return (
    <>

      <section className="user">
        <div className="d-flex">
          <Sidebar />
          <div className="w-100">
            <Header />
            {children}
          </div>
        </div>


      </section>

    </>
  )
}