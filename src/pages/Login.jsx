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

const updateUserLocation = async ({ payload, token }) => {
    const response = await fetch('http://localhost:8000/api/me/', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
        const errorMsg =
            data?.detail ||
            data?.non_field_errors?.[0] ||
            'Failed to set user location';
        throw new Error(errorMsg);
    }

    return data;
}


const Login = () => {
    const navigate = useNavigate()
    const setToken = useTokenStore()?.setToken
    const { setIsAuthenticated, setUser, isAuthenticated, user } = useAuthStore()
    const [showPassword, setShowPassword] = useState(false)
    const [location, setLocation] = useState({ voted_latitude: null, voted_longitude: null })
    const [userCredentials, setUserCredentials] = useState({
        username: "",
        password: ""
    })

    const updateUserLocationMutation = useMutation({
        mutationKey: ['update voter location'],
        mutationFn: ({ payload, token }) => updateUserLocation({payload, token}),
        onSuccess: () => {
            toast.success("Successfully updated user's location.")
        },
        onError: (error) => toast.error(error.message)
    })

    const loginMutation = useMutation({
        mutationKey: ['login'],
        mutationFn: ({ username, password }) => loginUser(username, password),
        onSuccess: async (data) => {
            setToken(data.token)
            updateUserLocationMutation.mutate({
                payload: location,
                token: data.token
            })
            const res = await getMe(data.token);
            setUser(res);
            setIsAuthenticated(true)
            res.role && toast.success(`Welcome ${res.first_name}!`)
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
        if (!isAuthenticated) return;

        if (user?.role === 1) {
            navigate("/admin");
        } else if (user?.role === 2) {
            navigate("/elecom");
        } else if ([3, 4, 5, 6].includes(user?.role)) {
            navigate("/voter");
        } else {
            toast.error("No role provided for this user. Please contact your system admin.");
        }
    }, [isAuthenticated, user?.role, navigate]);

    useEffect(() => {
        if (!navigator.geolocation) {
            toast.error("Geolocation is not supported by your browser");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setLocation({ voted_latitude: latitude, voted_longitude: longitude });
            },
            (error) => {
                console.error("Geolocation error:", error);
                toast.error("Failed to get your location");
            }
        );
    }, []);

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