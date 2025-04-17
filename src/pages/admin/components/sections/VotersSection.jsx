import React, { useState, useEffect } from 'react';
import { IoMdRefresh } from "react-icons/io";
import { BsFillShareFill } from "react-icons/bs";
import { IoCloseOutline } from "react-icons/io5";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import { downloadVoterPDF } from '../../utils/downloadVoterPDF';
import { downloadVoterExcel } from '../../utils/downloadVoterExcel';
import { handlePrint } from '../../utils/PrintReport';

const Input = ({ label, type = "text", value = "", onChange }) => (
    <div className="flex flex-col w-full">
        <label className="text-sm text-gray-500 font-medium mb-1">{label}</label>
        <input
            type={type}
            value={value || ''}
            onChange={onChange}
            placeholder={label}
            className="p-2 border border-[#AC94F4] rounded-md outline-none bg-white"
        />
    </div>
);

const VotersSection = () => {
    const [voters, setVoters] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedVoter, setSelectedVoter] = useState(null);
    const [allowProxy, setAllowProxy] = useState(false); 
    const [isSharing, setIsSharing] = useState(false);

    const fetchVoters = () => {
        fetch('../../../../../sample_data/users.json')
            .then(response => response.json())
            .then(data => {
                setVoters(data);
            })
            .catch(error => console.error('Error loading voter data:', error));
    };

    useEffect(() => {
        fetchVoters();
    }, []);

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const handleSelectVoter = (voter) => {
        setSelectedVoter(voter);
        setAllowProxy(voter.allow_proxy === "true"); 
    };

    const handleVoterChange = (field, value) => {
        setSelectedVoter(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const filteredVoters = voters.filter(v =>
        `${v.first_name} ${v.middle_name} ${v.surname}`.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className='p-5 grid grid-cols-1 md:grid-cols-2 gap-5 overflow-hidden'>
            <div className='border flex flex-col justify-between border-[#AC94F4] py-2 rounded-lg'>
                <div>
                    <div className='p-2 flex flex-col md:flex-row justify-between gap-4 md:items-center'>
                        <input
                            type="search"
                            value={search}
                            onChange={handleSearch}
                            className='outline-none w-full bg-gray-100 p-2 rounded-lg md:w-56'
                            placeholder='Search Fullname'
                        />
                        <div className='flex items-center gap-2'> 
                            <div className='flex gap-2 items-center cursor-pointer' onClick={fetchVoters}>
                                <IoMdRefresh className='text-[#635CBB] text-xl' />
                            </div>
                            <div>
                                <button onClick={handlePrint} className='bg-[#635cbb]/80 text-white px-4 py-1.5 shadow-lg rounded-lg'>Summary Report</button>
                            </div>
                        </div>
                    </div>
                    <div className="p-2 max-h-[500px] overflow-y-auto">
                        <table id="voter-table" className="w-full table-auto text-sm text-left">
                            <thead className="bg-[#F3F0FF] text-[#635CBB]">
                                <tr>
                                    <th className="p-2">Title</th>
                                    <th className="p-2">Name</th>
                                    <th className="p-2">Email</th>
                                    <th className="p-2">Member</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredVoters.map((voter) => (
                                    <tr key={voter.id} onClick={() => handleSelectVoter(voter)} className="cursor-pointer hover:bg-gray-100">
                                        <td className="p-2">{voter.title}</td>
                                        <td className="p-2">{voter.first_name} {voter.middle_name} {voter.surname}</td>
                                        <td className="p-2">{voter.email}</td>
                                        <td className="p-2">{voter.member}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="relative flex justify-end py-2">
                    <div className="relative w-16 h-28">
                        <button
                            onClick={() => setIsSharing(prev => !prev)}
                            className="bg-[#635cbb]/80 text-white p-4 shadow-lg rounded-full absolute bottom-0 left-0 z-10 transition-transform duration-300"
                        >
                            {isSharing ? <IoCloseOutline size={20} /> : <BsFillShareFill size={20} />}
                        </button>
                        <button
                            onClick={() => downloadVoterPDF(filteredVoters)}
                            className={`bg-[#635cbb]/80 text-white p-4 shadow-lg hover:shadow-xl rounded-full absolute bottom-0 left-0 transition-all duration-300 ease-out ${
                                isSharing ? '-translate-x-[70px] translate-y-[0px] opacity-100' : 'opacity-0 translate-x-0 translate-y-0 pointer-events-none'
                            }`}
                        >
                            <BsFileEarmarkPdf size={18} />
                        </button>
                        <button
                            onClick={() => downloadVoterExcel(filteredVoters)} 
                            className={`bg-[#635cbb]/80 text-white p-4 shadow-lg rounded-full absolute bottom-0 left-0 transition-all duration-300 ease-out ${isSharing ? '-translate-x-[45px] -translate-y-[50px] opacity-100' : 'opacity-0 translate-x-0 translate-y-0 pointer-events-none'}`}
                        >
                            <PiMicrosoftExcelLogoFill size={18} />
                        </button>
                    </div>
                </div>
            </div>
            <div className='border border-[#AC94F4] px-3 py-5 flex flex-col justify-between rounded-lg'>
                <div className='flex justify-between items-center'>
                    <h1 className='font-medium text-lg'>Selected Voter</h1>
                    <div className='flex items-center gap-2'>
                        <span>Active Voter:</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={selectedVoter?.active ?? false}
                                onChange={() => handleVoterChange('active', !selectedVoter.active)}
                                className="sr-only peer"
                            />
                            <div className={`w-11 h-6 bg-[#635cbb] peer-checked:bg-[#635CBB] rounded-full peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}>
                            </div>
                        </label>
                    </div>
                </div>
                <div>
                    {selectedVoter ? (
                        <div>
                            <h1 className='font-semibold text-center text-lg my-5'>Voter Information</h1>
                            <div className='flex flex-col md:flex-row w-full justify-between items-start gap-4'>
                                <div className='flex flex-col w-full md:w-56 gap-2'>
                                    <div className='border border-[#AC94F4] bg-white p-2 w-full rounded-md'>
                                        <img
                                            src={selectedVoter?.profileImage || '/default-avatar.png'}
                                            alt="Voter Profile"
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (file) {
                                                const imageUrl = URL.createObjectURL(file);
                                                handleVoterChange('profileImage', imageUrl);
                                            }
                                        }}
                                        className="hidden"
                                        id="profile-upload"
                                    />
                                    <label htmlFor="profile-upload">
                                        <button className='bg-[#635cbb] text-white rounded-lg px-2 py-1 w-fit mt-2'>Change</button>
                                    </label>
                                </div>
                                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 w-full md:w-2/3'>
                                    <Input label='Title' value={selectedVoter.title} onChange={(e) => handleVoterChange('title', e.target.value)} />
                                    <Input label='Email / Username' value={selectedVoter.email} onChange={(e) => handleVoterChange('email', e.target.value)} />
                                    <Input label='First Name' value={selectedVoter.first_name} onChange={(e) => handleVoterChange('first_name', e.target.value)} />
                                    <Input label='Middle Name' value={selectedVoter.middle_name} onChange={(e) => handleVoterChange('middle_name', e.target.value)} />
                                    <Input label='Last Name' value={selectedVoter.surname} onChange={(e) => handleVoterChange('surname', e.target.value)} />
                                    <Input label='Member' value={selectedVoter.member} onChange={(e) => handleVoterChange('member', e.target.value)} />
                                    <Input label='Organization' value={selectedVoter.organization || ''} onChange={(e) => handleVoterChange('organization', e.target.value)} />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p className="text-center mt-20 text-gray-400 italic">No voter selected</p>
                    )}
                    <div className='border my-8 border-[#AC94F4]/30 w-full h-[1px]'></div>
                    <h1 className='font-semibold text-center text-lg mb-4'>Other Information</h1>
                    <div className='flex justify-end w-full my-2 gap-2 px-4'>
                        <span className='flex'>Allow Proxy:</span>
                        <label className="relative inline-flex cursor-pointer">
                            <input
                                type="checkbox"
                                checked={allowProxy}
                                onChange={() => setAllowProxy(prev => !prev)}
                                className="sr-only peer"
                            />
                            <div className={`w-11 h-6 ${allowProxy ? 'bg-[#635CBB]' : 'bg-gray-200'} rounded-full peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}></div>
                        </label>
                    </div>
                    <div className='flex flex-col md:flex-row w-full gap-2 mb-3 px-4'>
                        <Input label='Create' type='text' />
                        <Input label='Verified' type='text' value={selectedVoter?.verified ? 'Yes' : 'No'} onChange={() => {}} />
                    </div>
                    {allowProxy && (
                        <div className='space-y-2 px-4 w-full rounded-md'>
                            <h1 className='font-medium mb-4'>Appointed Proxy</h1>
                            <Input label='Name of Proxy' type='text' />
                            <Input label='Reason (Optional)' type='text' />
                            <Input label='Status' type='text' />
                        </div>
                    )}
                    
                </div>
                <div className='flex justify-end p-4'>
                    <button className='bg-[#635cbb] text-white rounded-lg px-4 py-2'>submit</button>
                    <button className='bg-[#635cbb] text-white rounded-lg px-4 py-2 ml-2'>Unverify</button>
                </div>
            </div>
        </div>
    );
};

export default VotersSection;
