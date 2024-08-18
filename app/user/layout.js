
import User from "@/components/user/User";
import Header from "../../components/user/Header";
import Sidebar from "../../components/user/Sidebar";
import { getAccessToken } from '@/components/robotAPI/getAccessToken';
import { getResourceInfo } from '@/components/robotAPI/getResourceInfo';
import { getQueueItem } from '@/components/robotAPI/getQueueItem';
import { userAuth } from '@/components/robotAPI/userAuth';
export const metadata = {
  title: "Accounter - მომხმარებელი",
  description: "Accounter",
};




export default async function Layout({ children }) {
 


  
 // console.log(queueItem)
  return (
    <>

      <section className="user">
        <div className="d-flex">
          <Sidebar />
          <div className="w-100">
            <Header />
            {/* <div>resourceInfo {odataCount}</div> */}
            {children}
            {/* <User/> */}
          </div>
        </div>


      </section>

    </>
  )
}