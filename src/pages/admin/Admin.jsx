import React from 'react'
import hero from '../../assets/taras.png'

const Admin = () => {
    return (
        <div className='flex flex-col justify-center my-10 items-center'>
            <img src={hero} className='w-lg' alt="Moses Voting Mockup" />
            <div className='flex flex-col gap-5 items-center'>
                <button className='bg-[#301F66] shadow shadow-[#301F66] rounded-lg text-white py-1.5 w-56'>Test and Seal</button>
                <button className='border-[#301F66] border bg-white rounded-lg text-[#301f66] py-1.5 w-56 shadow'>Track My Vote</button>
                <button className='border-[#301F66] border bg-white rounded-lg text-[#301f66] py-1.5 w-56 shadow'>Change Password</button>
            </div>
        </div>
    )
}

export default Admin
