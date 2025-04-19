import React, { useEffect, useState } from 'react';

const Settings = () => {
    const [initData, setInitData] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [form, setForm] = useState({});

    // Fetch from localStorage
    useEffect(() => {
        const saved = localStorage.getItem("electionInit");
        if (saved) {
            const parsed = JSON.parse(saved);
            setInitData(parsed);
            setForm(parsed);
        }
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        localStorage.setItem("electionInit", JSON.stringify(form));
        setInitData(form);
        setEditMode(false);
    };

    return (
        <div className="p-5">
            <h1 className='text-3xl font-bold mb-6'>Settings</h1>
            <div className='bg-white shadow-md rounded-lg p-5 w-full'>
                {initData ? (
                    <>
                        <h2 
                            className="text-xl font-semibold text-[#635cbb] cursor-pointer"
                            onClick={() => setEditMode(!editMode)}
                        >
                            {initData.organization}
                        </h2>

                        {editMode && (
                            <div className="mt-4 space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block mb-1 font-medium text-gray-600">Start of Voting</label>
                                        <input
                                            type="datetime-local"
                                            name="votingStart"
                                            value={form.votingStart}
                                            onChange={handleChange}
                                            className="w-full border border-[#AC94F4] p-2 rounded-md"
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-1 font-medium text-gray-600">End of Voting</label>
                                        <input
                                            type="datetime-local"
                                            name="votingEnd"
                                            value={form.votingEnd}
                                            onChange={handleChange}
                                            className="w-full border border-[#AC94F4] p-2 rounded-md"
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-1 font-medium text-gray-600">No. of Ballots</label>
                                        <input
                                            type="number"
                                            name="numBallots"
                                            value={form.numBallots}
                                            onChange={handleChange}
                                            className="w-full border border-[#AC94F4] p-2 rounded-md"
                                        />
                                    </div>
                                </div>
                                <button
                                    onClick={handleSave}
                                    className="bg-[#635cbb] text-white px-4 py-2 rounded-lg hover:bg-[#4a4da3]"
                                >
                                    Save Changes
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <p className="text-gray-400 italic">No initialization data found.</p>
                )}
            </div>
        </div>
    );
};

export default Settings;
