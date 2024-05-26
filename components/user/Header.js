"use client"
import { useEffect, useState } from 'react'
import Link from "next/link";

function Header() {

    // const [result, setResult] = useState(null);

    // const addQueueItem = async () => {
    //     const url = 'https://cloud.uipath.com/accouszyswvo/DefaultTenant/orchestrator_/odata/Queues/UiPathODataSvc.AddQueueItem';
    //     const accessToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlJUTkVOMEl5T1RWQk1UZEVRVEEzUlRZNE16UkJPVU00UVRRM016TXlSalUzUmpnMk4wSTBPQSJ9.eyJodHRwczovL3VpcGF0aC9lbWFpbCI6ImFwcGxpY2F0aW9uLmFjLnJvYm90MUBnbWFpbC5jb20iLCJodHRwczovL3VpcGF0aC9lbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6Ly9hY2NvdW50LnVpcGF0aC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMDkyNjQyMTY3Njg2NDI5NDM5OTUiLCJhdWQiOlsiaHR0cHM6Ly9vcmNoZXN0cmF0b3IuY2xvdWQudWlwYXRoLmNvbSIsImh0dHBzOi8vdWlwYXRoLmV1LmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE3MDYwODc2NzMsImV4cCI6MTcwNjE3NDA3MywiYXpwIjoiOERFdjFBTU5YY3pXM3k0VTE1TEwzallmNjJqSzkzbjUiLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIG9mZmxpbmVfYWNjZXNzIn0.N3HXEdmCOQEI7S2EY5LQ9pz80C1ltXc9x4h4pdweNXFyVvvstpCC3LTjbRxspif2JDA9BLYJ8OHfu1H3TpfFnUOTYXKWnDZql4QvD4o-1PDQXy69cV4STr4N6BNrmpYZjGwNh6dpNpM6cjmB_gcHaumMdOxoHf5hD2pSa6VZkLGB5yWyq2yOeR-3TYEOKqcgLyB267Bk2V7md2EtGrKEbiEorZ3GckH8qOO4_FoYfLuTxY_LTsXnPn4qHKt4cUXTgHM-RVGOITcYA-iEjQe3m-xLWMgZVWe677lbmoC7R1wQqDDRIblmIEwS7KdByz0U8-i8xerbwjyetqb1berG7w'; // Replace with your actual access token

    //     const body = {
    //         "itemData": {
    //             "Name": "RSUserPassword",
    //             "Priority": "High",
    //             "SpecificContent": {
    //                 "rsuser": "user",
    //                 "rspassword": "password",
    //                 "number": "55555"
    //             },
    //             "Reference": "UniqueID",
    //             "Progress": "new"
    //         }
    //     };

    //     try {
    //         const response = await fetch(url, {
    //             method: 'POST',
    //             headers: {
    //                 'Authorization': `Bearer ${accessToken}`,
    //                 'Content-Type': 'application/json',
    //                 'X-UIPATH-TenantName': 'DefaultTenant',
    //                 'X-UIPATH-OrganizationUnitId': '5076052'
    //             },
    //             body: JSON.stringify(body)
    //         });

    //         if (!response.ok) {
    //             const errorData = await response.json();
    //             setResult({ error: errorData });
    //             return;
    //         }

    //         const data = await response.json();
    //         console.log(data)
    //         setResult({ data });
    //     } catch (error) {
    //         setResult({ error: 'Internal Server Error' });
    //     }
    // };


    // addQueueItem()

    const handleSidebarToggle = () => {
        document.querySelector('.userSidebar').classList.add('userSidebar--active')
    };

    return (
        <header className="userHeader">
            <img src="/assets/images/burger-menu.svg" alt="Toggle navigation" className="d-lg-none cursor-pointer" onClick={handleSidebarToggle} />
            <Link href={'/user'} className="userHeader--name">
                <img src="/assets/images/person.svg" alt="" />
                <span>გიორგი ბერიძე</span>
            </Link>


            <button className="userHeader--logout">
                <img src="/assets/images/logout.svg" alt="" />
                <span>გასვლა</span>
            </button>
        </header>
    );
}

export default Header;