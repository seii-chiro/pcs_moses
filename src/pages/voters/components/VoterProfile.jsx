import { Input, Select, Modal } from 'antd'
import React, { useEffect } from 'react'
import { Table, Tag } from "antd"
import { useState } from 'react'
import EditProfileForm from './EditProfileForm'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useTokenStore } from '../../../stores/useTokenStore'
import { toast } from 'sonner'

async function getMe(token) {
    const response = await fetch('http://localhost:8000/api/me/', {
        headers: {
            Authorization: `Token ${token}`,
        },
    });
    const userData = await response.json();
    return userData;
}

// const requestProxy = async (payload, token) => {
//     const response = await fetch('http://localhost:8000/api/me/request-proxy/', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Token ${token}`,
//         },
//         body: JSON.stringify(payload),
//     });

//     const data = await response.json();

//     if (!response.ok) {
//         const errorMsg =
//             data?.detail ||
//             data?.error ||
//             'Failed to request proxy';
//         throw new Error(errorMsg);
//     }

//     return data;
// }

const acceptProxyRequest = async (payload, token) => {
    const response = await fetch('http://localhost:8000/api/me/accept-proxy/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
        },
        body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
        const errorMsg =
            data?.detail ||
            data?.error ||
            'Failed to request proxy';
        throw new Error(errorMsg);
    }

    return data;
}

const updateProxyId = async ({ payload, token }) => {
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
            'Failed to send a proxy request.';
        throw new Error(errorMsg);
    }

    return data;
}

const rejectProxyRequest = async (payload, token) => {
    const response = await fetch('http://localhost:8000/api/me/reject-proxy/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
        },
        body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
        const errorMsg =
            data?.detail ||
            data?.error ||
            'Failed to request proxy';
        throw new Error(errorMsg);
    }

    return data;
}

const VoterProfile = ({ voters, votersLoading }) => {
    const token = useTokenStore()?.token
    const [editProfileModalOpen, setEditProfileModalOpen] = useState(false)
    const [acceptProxyConfirm, setAcceptProxyConfirm] = useState(false)
    const [rejectProxyConfirm, setRejectProxyConfirm] = useState(false)
    const [selectedRequestedId, setSelectedRequestedId] = useState(null)
    const [userDetails, setUserDetails] = useState({
        member_id: null,
        last_name: "",
        first_name: "",
        middle_name: "",
        email: "",
    })

    const [userCredentials, setUserCredentials] = useState({
        username: null,
        current_password: null,
        new_password: null,
        confirm_password: null,
    })

    const [assignProxy, setAssignProxy] = useState({
        proxy_id: null,
    })

    const updateProxyIdMutation = useMutation({
        mutationKey: ['update-proxy_id'],
        mutationFn: ({ payload, token }) => updateProxyId({ payload, token }),
        onSuccess: () => toast.success("Successfully sent a proxy request."),
        onError: (error) => toast.error(error.message)
    })

    const acceptProxyRequestMutation = useMutation({
        mutationKey: ['request-proxy-mutation'],
        mutationFn: ({ payload, token }) => acceptProxyRequest(payload, token),
        onSuccess: (data) => {
            toast.success(data.message)
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const rejectProxyRequestMutation = useMutation({
        mutationKey: ['request-proxy-mutation'],
        mutationFn: ({ payload, token }) => rejectProxyRequest(payload, token),
        onSuccess: (data) => {
            toast.success(data.message)
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    // const requestProxyMutation = useMutation({
    //     mutationKey: ['request-proxy-mutation'],
    //     mutationFn: ({ payload, token }) => requestProxy(payload, token),
    //     onSuccess: (data) => {
    //         toast.success(data.message)
    //     },
    //     onError: (error) => {
    //         toast.error(error.message)
    //     }
    // })

    const { data: user, refetch } = useQuery({
        queryKey: ['get-profile'],
        queryFn: () => getMe(token),
    })

    const dataSource = user?.received_proxy_requests
        ?.map(user => {
            const dateOnly = new Date(user?.date_assigned).toISOString().split("T")[0];
            return ({
                key: user?.user_id,
                name: `${user?.last_name ?? ""}, ${user?.first_name ?? ""} ${user?.middle_name ?? ""}`,
                reason: user?.reason,
                dateAssigned: dateOnly,
                action: (
                    <div className={`w-full justify-center flex gap-2`}>
                        <button
                            className='bg-[#301F66] text-white px-2 py-1.5 rounded-lg text-center cursor-pointer'
                            onClick={() => {
                                setAcceptProxyConfirm(true)
                                setSelectedRequestedId(user?.user_id)
                            }}
                        >
                            Accept
                        </button>
                        <button
                            className='bg-[#301F66] text-white px-2 py-1.5 rounded-lg text-center cursor-pointer'
                            onClick={() => {
                                setRejectProxyConfirm(true)
                                setSelectedRequestedId(user?.user_id)
                            }}
                        >
                            Reject
                        </button>
                    </div>
                ),
                status: user?.status
            })
        })

    const columns = [
        {
            title: "Voter's Name",
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Reason',
            dataIndex: 'reason',
            key: 'reason',
        },
        {
            title: 'Date Assinged',
            dataIndex: 'dateAssigned',
            key: 'dateAssigned',
        },
        {
            title: 'Action',
            align: 'center',
            dataIndex: 'action',
            key: 'action',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                let color = '';
                if (status === 'pending') {
                    color = 'orange';
                } else if (status === 'accepted') {
                    color = 'green';
                } else if (status === 'not accepted') {
                    color = 'red';
                }

                return (
                    <Tag color={color} className="px-3 py-1 font-medium">
                        {status.toUpperCase()}
                    </Tag>
                );
            }
        },
    ];

    useEffect(() => {
        setUserDetails(prev => ({
            ...prev,
            member_id: user?.id,
            last_name: user?.last_name,
            first_name: user?.first_name,
            middle_name: user?.middle_name,
            email: user?.email
        }))

        setUserCredentials(prev => ({
            ...prev,
            username: user?.username
        }))
    }, [user])

    return (
        <div className='w-full h-full flex flex-col gap-5 items-center my-10'>
            <div className='w-[95%] bg-white rounded-md shadow-[0_0_20px_rgba(0,0,0,0.1)] p-5 flex flex-col gap-4'>
                <div>
                    <h1 className='font-semibold text-2xl'>Voter Profile</h1>
                </div>
                <div className='flex flex-col gap-2'>
                    <label className='flex flex-col'>
                        <span>Member ID</span>
                        <Input
                            value={userDetails?.member_id}
                            placeholder='Enter Member ID'
                            readOnly
                            disabled
                        />
                    </label>
                    <label className='flex flex-col'>
                        <span>Last Name</span>
                        <Input
                            value={userDetails?.last_name}
                            placeholder='Enter Last Name'
                            onChange={e => setUserDetails(prev => ({ ...prev, last_name: e.target.value }))}
                            readOnly
                        />
                    </label>
                    <label className='flex flex-col'>
                        <span>First Name</span>
                        <Input
                            value={userDetails?.first_name}
                            placeholder='Enter First Name'
                            onChange={e => setUserDetails(prev => ({ ...prev, first_name: e.target.value }))}
                            readOnly
                        />
                    </label>
                    <label className='flex flex-col'>
                        <span>Middle Name</span>
                        <Input
                            value={userDetails?.middle_name}
                            placeholder='Enter Middle Name'
                            onChange={e => setUserDetails(prev => ({ ...prev, middle_name: e.target.value }))}
                            readOnly
                        />
                    </label>
                    <label className='flex flex-col'>
                        <span>Email Address</span>
                        <Input
                            type='email'
                            value={userDetails?.email}
                            placeholder='Enter Email Address'
                            onChange={e => setUserDetails(prev => ({ ...prev, email: e.target.value }))}
                            readOnly
                        />
                    </label>
                    <label className='flex flex-col'>
                        <span>Allowed to have proxy?</span>
                        <Input
                            value={user?.allow_proxy ? "Yes" : "No"}
                            placeholder='Enter Member ID'
                            readOnly
                            disabled
                        />
                    </label>
                </div>
                <div className='w-full flex gap-1 justify-between'>
                    <button
                        className='bg-[#301F66] text-white w-35 py-1.5 rounded-lg text-center cursor-pointer'
                        onClick={() => setEditProfileModalOpen(true)}
                    >
                        Edit Profile
                    </button>
                </div>
            </div>

            <div className={`w-[95%] bg-white rounded-md shadow-[0_0_20px_rgba(0,0,0,0.1)] p-5 flex flex-col gap-4 ${!user?.allow_proxy || user?.proxy_id !== null || user?.received_proxy_requests?.some(request => request.status === "accepted") ? "pointer-events-none opacity-20" : ""}`}>
                <div>
                    <h1 className='font-semibold text-2xl'>I Want to Appoint a Proxy</h1>
                </div>
                <div className='flex flex-col gap-2'>
                    <label className='flex flex-col'>
                        <span>Member ID</span>
                        <Select
                            showSearch
                            optionFilterProp='label'
                            loading={votersLoading}
                            placeholder="--Choose a Voter--"
                            value={assignProxy?.proxy_id}
                            options={voters?.filter(voter => voter?.id !== user?.id || !voter?.allow_proxy)?.map(user => ({
                                label: `${user?.title} ${user?.last_name ?? ""}, ${user?.first_name ?? ""} ${user?.middle_name ?? ""}`,
                                value: user?.id
                            }))}
                            onChange={value => {
                                setAssignProxy(prev => ({
                                    ...prev,
                                    proxy_id: value
                                }))
                            }}
                        />
                    </label>
                    <label className='flex flex-col'>
                        <span>Reason (Optional)</span>
                        <Input
                            value={assignProxy?.reason}
                            placeholder='Enter reason'
                            onChange={e => setAssignProxy(prev => ({ ...prev, reason: e.target.value }))}
                        />
                    </label>
                    <label className='flex flex-col'>
                        <span>Status</span>
                        <Input
                            disabled
                            readOnly
                            value={"Pending"}
                            placeholder='Enter status'
                            style={{ color: 'orange', fontWeight: '500' }}
                        />
                    </label>
                </div>
                <button
                    className='bg-[#301F66] text-white w-35 py-1.5 rounded-lg text-center cursor-pointer'
                    onClick={() => {
                        // requestProxyMutation.mutate({ payload: assignProxy, token })
                        updateProxyIdMutation.mutate({ payload: assignProxy, token: token })
                        setAssignProxy({
                            proxy_id: null
                        })
                    }}
                >
                    Assign Proxy
                </button>
            </div>

            <div className={`w-[95%] bg-white rounded-md shadow-[0_0_20px_rgba(0,0,0,0.1)] p-5 flex flex-col gap-4 ${!user?.allow_proxy || user?.proxy_id !== null ? "pointer-events-none opacity-20" : ""}`}>
                <div>
                    <h1 className='font-semibold text-2xl'>List of Voters Who Appointed Me as Proxy(Max: 2 Acceptable)</h1>
                </div>
                <div>
                    <Table
                        dataSource={dataSource}
                        columns={columns}
                        pagination={false}
                        rowClassName={(record) => record.status !== 'pending' ? 'pointer-events-none opacity-50' : ''}
                    />
                </div>
            </div>

            <Modal
                centered
                footer={null}
                open={editProfileModalOpen}
                onCancel={() => setEditProfileModalOpen(false)}
                onClose={() => setEditProfileModalOpen(false)}
            >
                <EditProfileForm
                    setUserCredentials={setUserCredentials}
                    userCredentials={userCredentials}
                    setUserDetails={setUserDetails}
                    userDetails={userDetails}
                />
            </Modal>

            <Modal
                centered
                footer={null}
                open={acceptProxyConfirm}
                onCancel={() => setAcceptProxyConfirm(false)}
                onClose={() => setAcceptProxyConfirm(false)}
            >
                <div className='w-full mt-6 flex flex-col'>
                    <h1 className='text-lg font-semibold'>Are you sure that you want to accept this request?</h1>
                    <p>This action is irreversible.</p>

                    <div className='w-full flex gap-2 justify-end mt-5'>
                        <button
                            className='bg-[#301F66] text-white px-2 py-1.5 rounded-lg text-center cursor-pointer'
                            onClick={() => {
                                acceptProxyRequestMutation.mutate({ payload: { requester_id: selectedRequestedId }, token })
                                setAcceptProxyConfirm(false)
                                refetch()
                            }}
                        >
                            Accept
                        </button>
                        <button
                            onClick={() => setAcceptProxyConfirm(false)}
                            className='bg-[#301F66] text-white px-2 py-1.5 rounded-lg text-center cursor-pointer'
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </Modal>

            <Modal
                centered
                footer={null}
                open={rejectProxyConfirm}
                onCancel={() => setRejectProxyConfirm(false)}
                onClose={() => setRejectProxyConfirm(false)}
            >
                <div className='w-full mt-6 flex flex-col'>
                    <h1 className='text-lg font-semibold'>Are you sure that you want to reject this request?</h1>
                    <p>This action is irreversible.</p>

                    <div className='w-full flex gap-2 justify-end mt-5'>
                        <button
                            className='bg-[#301F66] text-white px-2 py-1.5 rounded-lg text-center cursor-pointer'
                            onClick={() => {
                                rejectProxyRequestMutation.mutate({ payload: { requester_id: selectedRequestedId }, token })
                                setRejectProxyConfirm(false)
                                refetch()
                            }}
                        >
                            Reject
                        </button>
                        <button
                            onClick={() => setRejectProxyConfirm(false)}
                            className='bg-[#301F66] text-white px-2 py-1.5 rounded-lg text-center cursor-pointer'
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default VoterProfile