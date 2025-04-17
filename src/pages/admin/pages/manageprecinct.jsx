import React, { useState } from 'react';
import { IoHome } from "react-icons/io5";
import { FaUserGroup } from "react-icons/fa6";
import { FaVoteYea } from "react-icons/fa";

import CanvassingSection from '../components/sections/CanvassingSection';
import PrecinctSection from '../components/sections/PrecinctSection';
import VotersSection from '../components/sections/VotersSection';

const Precinct = () => {
    const [activeTab, setActiveTab] = useState("canvassing");

    const renderTabContent = () => {
        switch (activeTab) {
            case "canvassing":
                return <CanvassingSection />;
            case "precinct":
                return <PrecinctSection />;
            case "voters":
                return <VotersSection />;
            default:
                return null;
        }
    };

    const tabs = [
        { key: 'canvassing', label: 'Canvassing', icon: <IoHome /> },
        { key: 'precinct', label: 'Precinct', icon: <FaUserGroup /> },
        { key: 'voters', label: 'Voters', icon: <FaVoteYea /> },
    ];

    return (
        <div className="h-[92vh] w-full flex flex-col overflow-hidden p-5">
            <div className='flex w-full justify-between items-center'>
                <h1 className='text-lg font-semibold'>Manage Precinct</h1>
                <nav className='flex gap-4'>
                    {tabs.map(({ key, label, icon }) => (
                        <li
                            key={key}
                            className={`list-none cursor-pointer px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 ${
                                activeTab === key
                                    ? 'bg-[#635CBB] text-white'
                                    : 'bg-white border border-[#AC94F4] hover:bg-[#dcd6ff]'
                            }`}
                            onClick={() => setActiveTab(key)}
                        >
                            {icon}
                            {label}
                        </li>
                    ))}
                </nav>
            </div>
            <div className="flex-1 mt-5 overflow-y-auto w-full">
                <div className="bg-white rounded-xl min-h-full">
                    {renderTabContent()}
                </div>
            </div>
            
        </div>
    );
};

export default Precinct;
