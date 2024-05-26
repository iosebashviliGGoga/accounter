export async function isUserAuthSuccessful(token, queueItemId) {
    const url = `https://cloud.uipath.com/accouszyswvo/DefaultTenant/orchestrator_/odata/QueueItems(${queueItemId})`;
  
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
      return data;
    } catch (error) {
      console.error('Error checking user auth status:', error);
      return null;
    }
  }
  