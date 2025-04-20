import React, { useState, useEffect } from 'react'
import { Input, Modal } from 'antd'
import { toast } from 'sonner'
import { useMutation } from '@tanstack/react-query';
import { useTokenStore } from '../../../stores/useTokenStore';
import { useAuthStore } from '../../../stores/useAuthStore';
import { useCandidateStore } from '../../../stores/useCandidateStore';
import { useNavigate } from 'react-router';

const updateProfile = async ({ payload, token }) => {
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
            data?.current_password?.[0] ||
            'Failed to Update User';
        throw new Error(errorMsg);
    }

    return data;
}

const EditProfileForm = ({ userCredentials, setUserCredentials, setUserDetails, userDetails }) => {
    const [changeCred, setChangeCred] = useState(false)
    const [passwordMismatch, setPasswordMismatch] = useState(false)
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const token = useTokenStore()?.token
    const { logout, user } = useAuthStore()
    const clearSelectedCandidates = useCandidateStore()?.clearSelectedCandidates
    const navigate = useNavigate()

    const combinePayload = () => {
        if (changeCred) {
            return ({
                ...userDetails,
                ...userCredentials
            })
        } else {
            return ({ ...userDetails })
        }
    }

    const updateMutation = useMutation({
        mutationKey: ['update-profile'],
        mutationFn: () => updateProfile({ payload: combinePayload(), token }),
        onSuccess: () => {
            toast.success("Updated Successfully!")
            clearSelectedCandidates()
            logout()
            navigate('/login')
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const handleSave = (e) => {
        e.preventDefault()

        if (userCredentials?.new_password !== userCredentials?.confirm_password) {
            toast.error("New Password and Password Confirmation do not match!")
            setPasswordMismatch(true)
            return
        }

        setPasswordMismatch(false)
        updateMutation.mutate()
    }

    useEffect(() => {
        if (!changeCred) {
            setUserCredentials({
                username: '',
                current_password: '',
                new_password: '',
                confirm_password: '',
            });
        } else {
            setUserCredentials(prev => ({
                ...prev,
                username: user?.username
            }))
        }
    }, [changeCred]);

    return (
        <>
            <Modal
                centered
                footer={null}
                open={showConfirmModal}
                onCancel={() => setShowConfirmModal(false)}
                onClose={() => setShowConfirmModal(false)}
            >
                <div className='w-full flex flex-col gap-5 mt-10'>
                    <div className='flex flex-col'>
                        <p className='text-lg font-semibold text-orange-500'>You will be required to login again after saving.</p>
                        <p>
                            {`Are you sure that you want to update your profile ${changeCred ? "and login credentials?" : ""}?`}
                        </p>
                    </div>
                    <div className='flex gap-4 justify-end'>
                        <button
                            className='bg-[#301F66] text-white w-20 py-1.5 rounded-lg text-center cursor-pointer'
                        >
                            No
                        </button>
                        <button
                            onClick={handleSave}
                            className='bg-[#301F66] text-white w-20 py-1.5 rounded-lg text-center cursor-pointer'
                        >
                            Yes
                        </button>
                    </div>
                </div>
            </Modal>
            <form className='w-full flex flex-col justify-center'>
                <div className='flex flex-col gap-2'>
                    <h1 className='text-lg font-semibold'>Edit Profile</h1>

                    <div className='flex flex-col gap-2'>
                        <label>
                            <span className='font-semibold'>Last Name</span>
                            <Input
                                value={userDetails?.last_name}
                                placeholder='Last Name'
                                onChange={e => setUserDetails(prev => ({ ...prev, last_name: e.target.value }))}
                            />
                        </label>
                        <label>
                            <span className='font-semibold'>First Name</span>
                            <Input
                                value={userDetails?.first_name}
                                placeholder='First Name'
                                onChange={e => setUserDetails(prev => ({ ...prev, first_name: e.target.value }))}
                            />
                        </label>
                        <label>
                            <span className='font-semibold'>Middle Name</span>
                            <Input
                                value={userDetails?.middle_name}
                                placeholder='Middle Name'
                                onChange={e => setUserDetails(prev => ({ ...prev, middle_name: e.target.value }))}
                            />
                        </label>
                        <label>
                            <span className='font-semibold'>Email Address</span>
                            <Input
                                type='email'
                                value={userDetails?.email}
                                placeholder='Email Address'
                                onChange={e => setUserDetails(prev => ({ ...prev, email: e.target.value }))}
                            />
                        </label>
                    </div>

                    <div className='mt-5'>
                        <label className='flex items-center gap-2'>
                            <input
                                checked={changeCred}
                                className='w-4 h-4'
                                type='checkbox'
                                onChange={(e) => setChangeCred(e.target.checked)}
                            />
                            <span>Edit Login Credentials? <span className='text-gray-400'>(i. e., username and password)</span></span>
                        </label>
                    </div>

                    {
                        changeCred && (
                            <div className='flex flex-col gap-2'>
                                <label>
                                    <span className='font-semibold'>Username</span>
                                    <Input
                                        value={userCredentials?.username}
                                        placeholder='Username'
                                        onChange={e => setUserCredentials(prev => ({ ...prev, username: e.target.value }))}
                                    />
                                </label>
                                <label>
                                    <span className='font-semibold'>Current Password</span>
                                    <Input.Password
                                        value={userCredentials?.current_password}
                                        placeholder='Current Password'
                                        onChange={e => setUserCredentials(prev => ({ ...prev, current_password: e.target.value }))}
                                    />
                                </label>
                                <label>
                                    <span className='font-semibold'>New Password</span>
                                    <Input.Password
                                        value={userCredentials?.new_password}
                                        placeholder='New Password'
                                        onChange={e => setUserCredentials(prev => ({ ...prev, new_password: e.target.value }))}
                                        className={passwordMismatch ? '!border-red-500' : ''}
                                    />
                                </label>
                                <label>
                                    <span className='font-semibold'>Confirm New Password</span>
                                    <Input.Password
                                        value={userCredentials?.confirm_password}
                                        placeholder='Confirm New Password'
                                        onChange={e => setUserCredentials(prev => ({ ...prev, confirm_password: e.target.value }))}
                                        className={passwordMismatch ? '!border-red-500' : ''}
                                    />
                                </label>
                            </div>
                        )
                    }

                    <div className='w-full flex justify-center mt-5'>
                        <button
                            onClick={() => setShowConfirmModal(true)}
                            type='button'
                            className='bg-[#301F66] text-white w-35 py-1.5 rounded-lg text-center cursor-pointer'
                        >
                            Save
                        </button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default EditProfileForm