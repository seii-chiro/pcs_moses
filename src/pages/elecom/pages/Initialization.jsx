import React, { useState } from 'react';
import PrintModal from '../components/PrintModal';

const Input = ({ label, type = "text", value = "", onChange, placeholder, disabled = false }) => (
    <div className="flex flex-col w-full">
        <label className="text-gray-600 font-medium mb-1">{label}</label>
        <input
            type={type}
            value={value || ''}
            onChange={onChange}
            placeholder={placeholder}
            required
            disabled={disabled}
            className="p-2 border border-[#AC94F4] rounded-md outline-none bg-white disabled:bg-gray-100"
        />
    </div>
);

const Initialization = () => {
    const [printOpen, setPrintOpen] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const [orgName, setOrgName] = useState('');
    const [electionTitle, setElectionTitle] = useState('');
    const [votingStart, setVotingStart] = useState('');
    const [votingEnd, setVotingEnd] = useState('');
    const [numBallots, setNumBallots] = useState(570);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
    };

    const handleInitialize = () => {
        console.log("Election Initialized:", {
            organization: orgName,
            electionTitle,
            votingStart,
            votingEnd,
            numBallots
        });
        alert("Election Initialized Successfully!");
    };

    const formatDateTime = (value) => {
        if (!value) return '';
        const date = new Date(value);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        }).replace(',', '');
    };

    return (
        <div className="p-6 w-full mt-10 max-w-7xl mx-auto">
            <h1 className='text-3xl font-bold mb-6'>Initialization</h1>
            <div className='flex flex-col md:flex-row gap-6 w-full'>
                <form onSubmit={handleSubmit} className='flex-1 bg-white border border-[#AC94F4] shadow-sm rounded-xl p-6 space-y-6'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <Input
                            label="Organization:"
                            type="text"
                            value={orgName}
                            onChange={(e) => setOrgName(e.target.value)}
                            placeholder="PCS"
                            disabled={isSubmitted}
                        />
                        <Input
                            label="Election Title:"
                            value={electionTitle}
                            onChange={(e) => setElectionTitle(e.target.value)}
                            placeholder="Board of Trustees Election"
                            disabled={isSubmitted}
                        />
                        <Input
                            label="Voting Start:"
                            type="datetime-local"
                            value={votingStart}
                            onChange={(e) => setVotingStart(e.target.value)}
                            disabled={isSubmitted}
                        />
                        <Input
                            label="Voting End:"
                            type="datetime-local"
                            value={votingEnd}
                            onChange={(e) => setVotingEnd(e.target.value)}
                            disabled={isSubmitted}
                        />
                        <div className='flex flex-col w-full'>
                            <label className="text-gray-600 font-medium mb-1">No. of Ballots:</label>
                            <input
                                type="number"
                                min={1}
                                value={numBallots}
                                onChange={(e) => setNumBallots(e.target.value)}
                                disabled={isSubmitted}
                                className="p-2 border border-[#AC94F4] rounded-md outline-none bg-white disabled:bg-gray-100"
                            />
                        </div>
                    </div>

                    <div className='flex gap-3 justify-end'>
                        <button
                            type="submit"
                            className='bg-[#635cbb] hover:bg-[#4a4da3] transition text-white rounded-lg px-4 py-2'
                            disabled={isSubmitted}
                        >
                            Submit
                        </button>
                        <button
                            type="button"
                            onClick={() => setPrintOpen(true)}
                            className='bg-[#635cbb] hover:bg-[#4a4da3] transition text-white rounded-lg px-4 py-2'
                        >
                            Print
                        </button>
                    </div>
                    <p className='text-[#635cbb] underline cursor-pointer font-medium text-sm mt-3'>See Layout</p>
                </form>
                <div className='flex-1 bg-white border border-[#AC94F4] shadow-sm rounded-xl p-6 space-y-4'>
                    <h2 className='text-xl font-semibold text-gray-700 mb-2'>Summary</h2>
                    {isSubmitted ? (
                        <>
                            <div>
                                <p className="text-gray-500">Voting Start:</p>
                                <p className="text-[#635cbb] font-medium">{formatDateTime(votingStart)}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Voting End:</p>
                                <p className="text-[#635cbb] font-medium">{formatDateTime(votingEnd)}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">No. of Ballots:</p>
                                <p className="text-[#635cbb] font-medium">{numBallots}</p>
                            </div>
                            <div className='flex gap-3 justify-end mt-4'>
                                <button
                                    type="button"
                                    onClick={handleInitialize}
                                    className='bg-[#635cbb] hover:bg-[#4a4da3] transition text-white rounded-lg px-4 py-2'
                                >
                                    Initialize
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setPrintOpen(true)}
                                    className='bg-[#635cbb] hover:bg-[#4a4da3] transition text-white rounded-lg px-4 py-2'
                                >
                                    Print
                                </button>
                            </div>
                        </>
                    ) : (
                        <p className="text-gray-400 italic text-center">Form not yet submitted</p>
                    )}
                </div>
            </div>

            <PrintModal
                open={printOpen}
                onClose={() => setPrintOpen(false)}
                organization={orgName}
                electionTitle={electionTitle}
            />
        </div>
    );
};

export default Initialization;
