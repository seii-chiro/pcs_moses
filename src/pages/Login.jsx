import { Input } from 'antd'
import hero from "../assets/login_hero.png"
import React, { useState } from 'react'

const Login = () => {
    const [userCredentials, setUserCredentials] = useState({
        username: "",
        password: ""
    })

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