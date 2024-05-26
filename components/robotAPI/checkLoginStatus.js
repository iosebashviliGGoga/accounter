export async function checkLoginStatus(token, uniqueId) {
    const url = `https://cloud.uipath.com/accouszyswvo/DefaultTenant/orchestrator_/odata/QueueItems?%24filter=QueueDefinitionId%20eq%20893645%20AND%20reference%20eq%20'${uniqueId}'`;

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
      console.error('Error checking login status:', error);
      return null;
    }
  }
  