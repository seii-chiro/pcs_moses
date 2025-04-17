import { Input } from 'antd'
import hero from "../assets/login_hero.png"
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuthStore } from '../stores/useAuthStore'
import { useMutation } from '@tanstack/react-query'
import { useTokenStore } from '../stores/useTokenStore'

async function loginUser(username, password) {
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


const Login = () => {
    const navigate = useNavigate()
    const setToken = useTokenStore()?.setToken
    const { setIsAuthenticated, setUser, isAuthenticated, user } = useAuthStore()
    const [userCredentials, setUserCredentials] = useState({
        username: "",
        password: ""
    })

    const loginMutation = useMutation({
        mutationKey: ['login'],
        mutationFn: ({ username, password }) => loginUser(username, password),
        onSuccess: async (data) => {
            setToken(data.token)
            const res = await getMe(data.token);
            setUser(res);
            setIsAuthenticated(true)
        }
    })

    const handleLogin = () => {
        loginMutation.mutate({
            username: userCredentials.username,
            password: userCredentials.password
        });
    };

    useEffect(() => {
        if (isAuthenticated && user?.role === "voter") {
            navigate("/voter")
        }


        if (isAuthenticated && user?.role === "elecom") {
            navigate("/elecom")
        }


        if (isAuthenticated && user?.role === "admin") {
            navigate("/admin")
        }
    }, [user?.role, isAuthenticated, navigate])

    return (
        <div className='w-full h-screen flex items-center justify-center'>
            <div className='w-full flex flex-col items-center justify-center gap-4'>
                <div className='w-full flex flex-col items-center lg:-mt-[16rem]'>
                    <div className='w-full md:w-[40%] object-cover'>
                        <img src={hero} className='w-full h-full' />
                    </div>
                </div>

                <div className='flex flex-col items-center justify-center gap-2 mt-10'>
                    <h3 className='font-bold text-xl'>Login</h3>
                    <p>Please login to continue</p>
                </div>

                <div className='flex flex-col gap-2 mt-10'>
                    <Input
                        value={userCredentials?.username}
                        placeholder='Username/ Email'
                        className='!p-2.5 !w-72'
                        onChange={e => setUserCredentials(prev => ({ ...prev, username: e.target.value }))}
                    />
                    <Input
                        value={userCredentials?.password}
                        placeholder='Password'
                        className='!p-2.5 !w-72'
                        onChange={e => setUserCredentials(prev => ({ ...prev, password: e.target.value }))}
                    />
                </div>

                <div className='flex flex-col gap-2 mt-10'>
                    <button
                        onClick={handleLogin}
                        className='bg-[#301F66] text-white w-50 py-1.5 rounded-lg text-center'
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Login