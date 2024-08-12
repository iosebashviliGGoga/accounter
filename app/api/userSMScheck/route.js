// app/api/userSMScheck/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
    const token = request.headers.get('authorization').split(' ')[1];
    const { itemData } = await request.json();

    const url = 'https://cloud.uipath.com/accouszyswvo/DefaultTenant/orchestrator_/odata/Queues/UiPathODataSvc.AddQueueItem';

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'X-UIPATH-TenantName': 'DefaultTenant',
                'X-UIPATH-OrganizationUnitId': '5076052'
            },
            body: JSON.stringify({ itemData })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
