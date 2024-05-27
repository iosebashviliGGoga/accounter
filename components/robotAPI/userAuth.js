export async function userAuth(token, itemData) {
    const url = 'https://cloud.uipath.com/accouszyswvo/DefaultTenant/orchestrator_/odata/Queues/UiPathODataSvc.AddQueueItem';
  
    const body = JSON.stringify({
      itemData: {
        Name: "RSUserPassword",
        Priority: "High",
        SpecificContent: {
          rsuser: "61006029224",
          rspassword: "25ko12ba",
          number: "55555"
        },
        Reference: itemData.Reference, // Ensure this is unique
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
  