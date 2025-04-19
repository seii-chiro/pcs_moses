import { Input } from 'antd'
import hero from "../assets/login_hero.png"
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuthStore } from '../stores/useAuthStore'
import { useMutation } from '@tanstack/react-query'
import { useTokenStore } from '../stores/useTokenStore'
import { toast } from 'sonner'
import { FiEye, FiEyeOff } from "react-icons/fi";

async function loginUser(username, password) {
    const response = await fetch('http://localhost:8000/api/token-auth/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (!response.ok) {
        const errorMsg =
            data?.detail ||
            data?.non_field_errors?.[0] ||
            'Login failed';
        throw new Error(errorMsg);
    }

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
    const [showPassword, setShowPassword] = useState(false)
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
            toast.success(`Welcome ${res.first_name}!`)
        },
        onError: (error) => {
            console.log(error)
            toast.error(error.message)
        }
    })

    const handleLogin = (e) => {
        e.preventDefault()
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
        <form className='w-full' onSubmit={handleLogin}>
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
                            required
                            className='!p-2.5 !w-72'
                            onChange={e => setUserCredentials(prev => ({ ...prev, username: e.target.value }))}
                        />
                        <div className='relative flex items-center'>
                            <Input
                                value={userCredentials?.password}
                                placeholder='Password'
                                type={showPassword ? 'text' : 'password'}
                                required
                                className='!p-2.5 !w-72'
                                onChange={e => setUserCredentials(prev => ({ ...prev, password: e.target.value }))}
                            />
                            <button
                                type='button'
                                className='absolute right-3 z-[1000]'
                                onClick={() => setShowPassword(prev => !prev)}
                            >
                                {showPassword ? <FiEyeOff /> : <FiEye />}
                            </button>
                        </div>
                    </div>

                    <div className='flex flex-col gap-2 mt-10'>
                        <button
                            className='bg-[#301F66] text-white w-50 py-1.5 rounded-lg text-center'
                        >
                            {loginMutation.isPending ? 'Logging in...' : 'Login'}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default Login