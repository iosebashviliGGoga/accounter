export async function userAuth(token, itemData) {
  // console.log(`token`,token)

    const url = 'https://cloud.uipath.com/accouszyswvo/DefaultTenant/orchestrator_/odata/Queues/UiPathODataSvc.AddQueueItem';
  
    const body = JSON.stringify({
      itemData: {
        Name: "RSUserPassword",
        Priority: "High",
        SpecificContent: {
          rsuser: "22001007719",
          rspassword: "557449",
          number: "55555"
        },
        Reference: itemData.Reference, 
        Progress: "new"
      }
    });
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'X-UIPATH-TenantName': 'DefaultTenant',
          'X-UIPATH-OrganizationUnitId': '5076052'
        },
        body: body
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
     // console.log(response)
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error adding queue item:', error);
      return null;
    }
  }
  