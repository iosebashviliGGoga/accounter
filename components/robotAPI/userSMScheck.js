export async function userSMScheck(token, itemData,code) {
    // Retrieve the smsCode from localStorage
   

   

    const url = 'https://cloud.uipath.com/accouszyswvo/DefaultTenant/orchestrator_/odata/Queues/UiPathODataSvc.AddQueueItem';

    const body = JSON.stringify({
        "itemData": {
            "Name": "UsersCode",
            "Priority": "High",
            "SpecificContent": {
                "code": `${code}`, // Use smsCode from localStorage
            },
            "Reference": itemData.Reference,
            "Progress": "new"
        }
    });

    try {
        console.log(`body`, body);
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

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error adding queue item:', error);
        return null;
    }
}
