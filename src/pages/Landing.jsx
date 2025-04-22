import React from 'react'
import hero from "../assets/landing_hero.png"

const Landing = () => {
    return (
        <div className='w-full h-screen flex items-center justify-center'>
            <div className='w-full flex flex-col items-center justify-center gap-4'>
                <div className='w-full flex flex-col items-center'>
                    <img src={hero} className='w-96' />
                    <div className='text-2xl lg:text-4xl font-bold'>
                        <span className='text-[#301F66]'>MoSES</span> &nbsp;
                        <span className='text-[#635CBB]'>Internet Voting</span>
                    </div>
                </div>

                <div className='flex flex-col items-center justify-center gap-2 mt-10'>
                    <h3 className='font-bold text-xl'>Mabuhay</h3>
                    <pre className='font-[Poppins] text-center tracking-wider text-xs lg:text-sm'>
                        Welcome to <span className='text-[#301F66] font-bold'>MoSES</span>, a 100% Filipino-designed <br />
                        and developed election system modified to suit <br />
                        the nuances of Philippine elections.
                    </pre>
                </div>

                <div className='flex flex-col gap-2 mt-10'>
                    <a className='bg-[#301F66] text-white w-50 py-1.5 rounded-lg text-center' href='/login'>Login</a>
                    <button className='border border-[#301F66] text-[#301F66] w-50 py-1.5 rounded-lg'>Verify My Vote</button>
                </div>
            </div>
        </div>
    )
}

export default Landing