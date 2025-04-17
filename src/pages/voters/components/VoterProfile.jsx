import { Input, Select } from 'antd'
import React from 'react'
import users from "../../../../sample_data/users.json"
import { Table, Tag } from "antd"

const VoterProfile = () => {
    const dataSource = users?.slice(0, 2)?.map(user => {
        // For demonstration, let's randomize statuses
        const statuses = ["Pending", "Accepted", "Not Accepted"];
        const status = statuses[Math.floor(Math.random() * statuses.length)];

        return ({
            name: `${user?.surname}, ${user?.first_name} ${user?.middle_name}`,
            reason: "No Reason",
            dateAssigned: "2025-04-17",
            action: (
                <div className='w-full justify-center flex gap-2'>
                    <button className='bg-[#301F66] text-white px-2 py-1.5 rounded-lg text-center cursor-pointer'>Accept</button>
                    <button className='bg-[#301F66] text-white px-2 py-1.5 rounded-lg text-center cursor-pointer'>Unable to Accept</button>
                </div>
            ),
            status: status
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
                if (status === 'Pending') {
                    color = 'orange';
                } else if (status === 'Accepted') {
                    color = 'green';
                } else if (status === 'Not Accepted') {
                    color = 'red';
                }

                return (
                    <Tag color={color} className="px-3 py-1 font-medium">
                        {status}
                    </Tag>
                );
            }
        },
    ];

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
                            placeholder='Enter Member ID'
                        />
                    </label>
                    <label className='flex flex-col'>
                        <span>Last Name</span>
                        <Input
                            placeholder='Enter Last Name'
                        />
                    </label>
                    <label className='flex flex-col'>
                        <span>First Name</span>
                        <Input
                            placeholder='Enter First Name'
                        />
                    </label>
                    <label className='flex flex-col'>
                        <span>Middle Name</span>
                        <Input
                            placeholder='Enter Middle Name'
                        />
                    </label>
                    <label className='flex flex-col'>
                        <span>Email Address</span>
                        <Input
                            placeholder='Enter Email Address'
                        />
                    </label>
                </div>
                <button className='bg-[#301F66] text-white w-50 py-1.5 rounded-lg text-center cursor-pointer'>Save</button>
            </div>

            <div className='w-[95%] bg-white rounded-md shadow-[0_0_20px_rgba(0,0,0,0.1)] p-5 flex flex-col gap-4'>
                <div>
                    <h1 className='font-semibold text-2xl'>I Want to Appoint a Proxy</h1>
                </div>
                <div className='flex flex-col gap-2'>
                    <label className='flex flex-col'>
                        <span>Member ID</span>
                        <Select
                            placeholder="--Choose a Voter--"
                            options={users?.map(user => ({
                                label: `${user?.surname}, ${user?.first_name} ${user?.middle_name}`,
                                value: user?.id
                            }))}
                        />
                    </label>
                    <label className='flex flex-col'>
                        <span>Reason (Optional)</span>
                        <Input
                            placeholder='Enter reason'
                        />
                    </label>
                    <label className='flex flex-col'>
                        <span>Status</span>
                        <Input
                            value={"Pending"}
                            placeholder='Enter status'
                            style={{ color: 'orange', fontWeight: '500' }}
                        />
                    </label>
                </div>
                <button className='bg-[#301F66] text-white w-50 py-1.5 rounded-lg text-center cursor-pointer'>Assign Proxy</button>
            </div>

            <div className='w-[95%] bg-white rounded-md shadow-[0_0_20px_rgba(0,0,0,0.1)] p-5 flex flex-col gap-4'>
                <div>
                    <h1 className='font-semibold text-2xl'>List of Voters Who Appointed Me as Proxy(Max: 2 Acceptable)</h1>
                </div>
                <div>
                    <Table dataSource={dataSource} columns={columns} pagination={false} />
                </div>
                <div className='w-full flex justify-end'>
                    <button>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default VoterProfile