import User from "./User";
import { getAccessToken } from '@/components/robotAPI/getAccessToken';
import { getResourceInfo } from '@/components/robotAPI/getResourceInfo';
import { getQueueItem } from '@/components/robotAPI/getQueueItem';
import { userAuth } from '@/components/robotAPI/userAuth';
import { checkLoginStatus } from '@/components/robotAPI/checkLoginStatus';
import { isUserAuthSuccessful } from '@/components/robotAPI/isUserAuthSuccessful';

export const metadata = {
  title: "Accounter - მომხმარებელი",
  description: "Accounter",
};

export default async function UserLayout() {
  let token, resourceInfo, odataCount, queueItem, loginStatus, isRobotBusy, authStatus;
  let uniqueID = `UniqueID-${Date.now()}`;

  try {
    token = await getAccessToken(); // danarti 1
    resourceInfo = await getResourceInfo(token); // danarti 2
    isRobotBusy = resourceInfo["@odata.count"];
    // console.log(isRobotBusy)

    if (!isRobotBusy) {
      // queueItem = await getQueueItem(token, 420570372);
      queueItem = await userAuth(token, { Reference: uniqueID }); // danarti 3

      // Define an async function to use await inside setTimeout
      async function fetchLoginStatus() {
        loginStatus = await checkLoginStatus(token, uniqueID); // danarti 4
       // console.log('Login Status:', loginStatus);

        if (loginStatus && loginStatus.value && loginStatus.value.length > 0) {
          const queueItemId = loginStatus.value[0].Id;
          authStatus = await isUserAuthSuccessful(token, queueItemId); // danarti 4 getqueueitem
          console.log('Auth Status:', authStatus);
        }
      }

      // Use setTimeout to call the async function
      setTimeout(fetchLoginStatus, 1000); // 1000ms delay for example

      console.log(queueItem.Reference);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  return (
    <>
      <User userInfo={''} />
    </>
  );
}
