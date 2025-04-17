import React from 'react'
import { Outlet } from 'react-router'
import Sidebar from '../pages/voters/components/Sidebar'
import { Breadcrumb } from '../general_components/Breadcrumb'
import { useLocation } from 'react-router'

const VotersLayout = () => {
    const location = useLocation();

    return (
        <div className='w-full h-screen flex gap-4'>
            <Sidebar />
            <main className='flex-grow overflow-y-auto'>
                <header className='sticky top-0 bg-white z-[1000]'>
                    <Breadcrumb url={location.pathname} />
                </header>
                <div className='w-full'>
                    <Outlet />
                </div>
            </main>
        </div>
    )
}

export default VotersLayout