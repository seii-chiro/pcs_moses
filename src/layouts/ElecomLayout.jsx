import React from 'react'
import { Outlet } from 'react-router'
import Sidebar from '../pages/elecom/components/Sidebar'
import { Breadcrumb } from '../general_components/Breadcrumb'
import { useLocation } from 'react-router'

const ElecomLayout = () => {
    const location = useLocation();
    
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <main className='flex-grow'>
                 <Breadcrumb url={location.pathname} />
                <Outlet />
            </main>

        </div>
    )
}

export default ElecomLayout