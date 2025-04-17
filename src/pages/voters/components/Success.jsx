import React from 'react'
import hero from "../../../assets/success_hero.png"
import { NavLink } from 'react-router'

const Success = () => {
    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <div className='flex flex-col items-center justify-center gap-5'>
                <img src={hero} className='w-[25rem]' />

                <h3 className='text-xl font-bold text-[#635CBB]'>Congratulations!</h3>
                <p>Your vote has been successfully casted.</p>

                <div className='flex flex-col'>
                    <NavLink className='bg-[#301F66] text-white w-50 py-1.5 rounded-lg text-center' to={'/voter'}>Continue</NavLink>
                </div>
            </div>
        </div>
    )
}

export default Success