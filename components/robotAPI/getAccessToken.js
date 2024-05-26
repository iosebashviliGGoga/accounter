export async function getAccessToken() {
    const url = 'https://account.uipath.com/oauth/token';
    const body = {
      "grant_type": "refresh_token",
      "client_id": "8DEv1AMNXczW3y4U15LL3jYf62jK93n5",
      "refresh_token": "PqCqIr729HuNPbpZRxmtMPZe0y7qHpTynQQLafHRy2Ol6"
    };
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      return data.access_token;
    } catch (error) {
      console.error('Error fetching access token:', error);
      return null;
    }
  }
  