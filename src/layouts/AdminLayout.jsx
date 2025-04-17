import React from 'react'
import { Outlet } from 'react-router'
import Sidebar from '../pages/admin/components/Sidebar'
import { Breadcrumb } from '../general_components/Breadcrumb'
import { useLocation } from 'react-router'

const AdminLayout = () => {
    const location = useLocation();

    return (
        <div className="flex min-h-screen bg-[#F1F0FF]">
            <Sidebar />
            <main className='flex-grow flex-1 h-screen overflow-y-auto p-4'>
                <Breadcrumb url={location.pathname} />
                <Outlet />
            </main>

        </div>
    )
}

export default AdminLayout