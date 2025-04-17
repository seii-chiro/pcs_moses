import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react'

async function loginUser(username = "admin3", password = "admin100") {
    const response = await fetch('http://localhost:8000/api/token-auth/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.detail || 'Login failed');

    localStorage.setItem('token', data.token);
    return data;
}

async function getMe(token) {
    const response = await fetch('http://localhost:8000/api/me/', {
        headers: {
            Authorization: `Token ${token}`,
        },
    });
    const userData = await response.json();
    return userData;
}

const Test = () => {
    const [userData, setUserData] = useState(null);

    const loginMutation = useMutation({
        mutationKey: ['login'],
        mutationFn: loginUser,
        onSuccess: async (data) => {
            const res = await getMe(data.token); // Wait for getMe to resolve
            setUserData(res); // Set user data after getMe resolves
        }
    });

    return (
        <div>
            <div>Test</div>
            <button onClick={() => loginMutation.mutate()}>Login</button>

            {userData && (
                <div>
                    <h2>User Data:</h2>
                    <pre>{JSON.stringify(userData, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default Test;
