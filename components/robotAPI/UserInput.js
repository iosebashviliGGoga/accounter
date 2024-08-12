// components/UserInput.js
'use client'; // This directive marks this file as a client component

import { useState } from 'react';

const UserInput = ({ token, uniqueID }) => {
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleCheck = async () => {
        const userCode = prompt('Please enter the code:');
        const itemData = { Reference: uniqueID };

        const body = JSON.stringify({
            itemData: {
                Name: 'UsersCode',
                Priority: 'High',
                SpecificContent: {
                    code: userCode,
                },
                Reference: itemData.Reference,
                Progress: 'new'
            }
        });

        try {
            const response = await fetch('/api/userSMScheck', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: body
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setResult(data);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <button onClick={handleCheck}>Check User SMS</button>
            {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        </div>
    );
};

export default UserInput;
