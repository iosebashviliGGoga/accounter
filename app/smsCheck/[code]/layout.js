// Server Component

import { getAccessToken } from '@/components/robotAPI/getAccessToken';
import { userSMScheck } from '@/components/robotAPI/userSMScheck';
import { checkSMSstatus } from '@/components/robotAPI/checkSMSstatus';

export default async function Layout({ children, params }) {
  const { code } = params; // Retrieve the code from the route
  let token, smsCheckSent, smsStatus;
  let uniqueID = `UniqueID-${Date.now()}`;

  try {
    // Fetch access token
    token = await getAccessToken();

    // Execute the smsChecker function asynchronously
    smsCheckSent = await userSMScheck(token, { Reference: uniqueID }, code);

    if (smsCheckSent) {
      console.log(smsCheckSent.Id);
      console.log('SMS sent');

      // Delay simulation using Promise
      smsStatus = await new Promise((resolve) => {
        setTimeout(async () => {
          // Fetch SMS status
          let status = await checkSMSstatus(token, smsCheckSent.Id);
          resolve(status);
        }, 50000); // Delay 50 seconds before checking SMS status
      });

      console.log(`smsStatus: ${JSON.stringify(smsStatus, null, 2)}`);
    }
  } catch (error) {
    console.error('Error:', error);
  }

  return (
    <>
      <header>
        <h1>SMS Check for Code: {code}</h1>
      </header>
      <main className="about">{children}</main>
      <footer>
        <p>All rights reserved &copy; 2024</p>
      </footer>
    </>
  );
}
