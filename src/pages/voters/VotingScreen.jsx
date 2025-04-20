import React, { useState } from 'react'
import CandidateCard from './components/CandidateCard'
import { useCandidateStore } from "../../stores/useCandidateStore"
import { Modal } from 'antd';
import SelectedCandidates from './components/SelectedCandidates';

const VotingScreen = ({ voters }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const selectedCount = useCandidateStore(
        (state) => Object.keys(state.selectedCandidates).length
    );

    const handleNextClick = () => {
        setModalOpen(true);
    };

    return (
        <div className='w-full h-full p-2 mt-52 md:mt-5 lg:mt-0'>
            <div className='w-full h-full flex flex-col items-center justify-center'>
                <div className='flex h-full flex-col items-center justify-center gap-4'>
                    <div className='flex w-full justify-between items-end'>
                        <h1 className='text-3xl font-semibold'>Candidates</h1>
                        <div className='flex flex-col p-1 items-center border-2 border-[#635CBB] rounded-lg'>
                            <p className='bg-[#635CBB] text-white px-5 rounded'>Selection Page</p>
                            <p className='text-[#635CBB] text-xl font-bold'>Vote: {selectedCount}/11</p>
                        </div>
                    </div>
                    <div className='w-full flex items-center justify-center rounded-lg'>
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 bg-[#DBD9EB] p-2 md:p-10 lg:p-14 rounded-lg'>
                            {voters?.map((user) => (
                                <CandidateCard
                                    user={user}
                                    key={user.id}
                                />
                            ))}
                        </div>
                    </div>
                    <div>
                        <button
                            onClick={handleNextClick}
                            className='border border-[#301F66] text-[#301F66] w-50 py-1.5 px-8 rounded-lg hover:text-white hover:bg-[#301F66] ease-in-out duration-200 cursor-pointer'
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>

            <Modal
                footer={null}
                centered
                width="100%"
                onCancel={() => setModalOpen(false)}
                open={modalOpen}
                modalRender={(modal) => (
                    <div
                        className="max-h-[80vh] overflow-y-auto w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%] xxl:w-[40%] mx-auto"
                    >
                        {modal}
                    </div>
                )}
            >
                <SelectedCandidates />
            </Modal>


        </div>
    );
};

export default VotingScreen;