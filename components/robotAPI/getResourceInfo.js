export async function getResourceInfo(token) {
    console.log('its here bitches', token)
    const url = "https://cloud.uipath.com/accouszyswvo/DefaultTenant/orchestrator_/odata/Jobs?%24filter=State%20eq%20'Running'";
  
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
      console.log('request succedd',data)
      return data;
    } catch (error) {
      console.error('Error fetching running jobs:', error);
      return null;
    }
  }