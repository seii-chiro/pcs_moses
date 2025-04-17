import React from 'react'
import hero from "../../assets/landing_hero.png"
import { NavLink } from 'react-router'

const Voter = () => {
    return (
        <div className='w-full h-full flex flex-col justify-center items-center'>
            <div className='h-screen flex flex-col items-center justify-center gap-10'>
                <img src={hero} alt={"moses screen"} className='w-[25rem]' />
                <div className='flex flex-col'>
                    <NavLink className='bg-[#301F66] text-white w-50 py-1.5 rounded-lg text-center' to={'/voter/vote'}>Vote</NavLink>
                </div>
                <div className='flex flex-col items-center justify-center gap-2'>
                    <NavLink
                        to={"/voter/track"}
                        className='text-center border border-[#301F66] text-[#301F66] w-50 py-1.5 rounded-lg hover:bg-[#301F66] hover:text-white transition-all ease-in-out duration-150 cursor-pointer'
                    >
                        Track My Vote
                    </NavLink>
                    {/* <button className='border border-[#301F66] text-[#301F66] w-50 py-1.5 rounded-lg hover:bg-[#301F66] hover:text-white transition-all ease-in-out duration-150 cursor-pointer'>Change My Password</button> */}
                </div>
            </div>
        </div>
    )
}

export default Voter