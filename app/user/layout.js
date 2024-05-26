
import Header from "../../components/user/Header";
import Sidebar from "../../components/user/Sidebar";
import { getAccessToken } from '@/components/robotAPI/getAccessToken';
import { getResourceInfo } from '@/components/robotAPI/getResourceInfo';
export const metadata = {
  title: "Accounter - მომხმარებელი",
  description: "Accounter",
};




export default async function Layout({ children }) {
  let token, resourceInfo;

  try {
    token = await getAccessToken();
    resourceInfo = await getResourceInfo(token);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
 
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