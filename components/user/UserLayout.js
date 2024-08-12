import User from "./User";
import { getAccessToken } from '@/components/robotAPI/getAccessToken';
import { getResourceInfo } from '@/components/robotAPI/getResourceInfo';
import { getQueueItem } from '@/components/robotAPI/getQueueItem';
import { userAuth } from '@/components/robotAPI/userAuth';
import { checkLoginStatus } from '@/components/robotAPI/checkLoginStatus';
import { isUserAuthSuccessful } from '@/components/robotAPI/isUserAuthSuccessful';
import { userSMScheck } from '@/components/robotAPI/userSMScheck';
import { checkSMSstatus } from '@/components/robotAPI/checkSMSstatus';

export const metadata = {
  title: "Accounter - მომხმარებელი",
  description: "Accounter",
};

export default async function UserLayout() {
  let token, resourceInfo, odataCount, queueItem, loginStatus, isRobotBusy, authStatus, smsCheckSent;
  let uniqueID = `UniqueID-${Date.now()}`;
  try {
    token = await getAccessToken(); // danarti 1
    console.log(`token ${token.split(0,20)[0]}...`);
    resourceInfo = await getResourceInfo(token); // danarti 2
    // isRobotBusy = resourceInfo["@odata.count"];
    isRobotBusy = resourceInfo?.value[0]?.Key;
    console.log(`isRobotBusy`, resourceInfo, isRobotBusy);
    console.log(isRobotBusy)


    if (!isRobotBusy) {
      queueItem = await userAuth(token, { Reference: uniqueID }); // danarti 3

      async function fetchLoginStatus() {
        loginStatus = await checkLoginStatus(token, uniqueID); // danarti 4
        console.log('Login Status sent:', loginStatus);

        if (loginStatus && loginStatus.value && loginStatus.value.length > 0) {
          const queueItemId = loginStatus.value[0].Id;
          console.log(`queueItemId ${queueItemId}`);

          async function checkAuthStatus() {
            authStatus = await isUserAuthSuccessful(token, queueItemId); // danarti 4 getqueueitem
            console.log('Auth Status:', authStatus);

            if (authStatus) {
           //   let uniqueIDforSMS = `UniqueIDforSMS-${Date.now()}`;
            //  console.log(uniqueIDforSMS);
             
             console.log('its time to move')
              
            }
          }

          // Delay 50 seconds before running checkAuthStatus
          setTimeout(checkAuthStatus, 60000);
        }
      }

      setTimeout(fetchLoginStatus, 1000);
    } else{console.log('robot is busy')}
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  return (
    <>
      <User userInfo={''} />
    </>
  );
}
