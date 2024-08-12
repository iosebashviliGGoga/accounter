export async function checkSMSstatus(token, uniqueId) {
    const url = `https://cloud.uipath.com/accouszyswvo/DefaultTenant/orchestrator_/odata/QueueItems(${uniqueId})`;
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'X-UIPATH-TenantName': 'DefaultTenant',
          'X-UIPATH-OrganizationUnitId': '5076052'
        }
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log('data0')
      console.log(data)
      console.log('data1')
      return data;
    } catch (error) {
      console.error('Error checking sms status:', error);
      return null;
    }
  }
  