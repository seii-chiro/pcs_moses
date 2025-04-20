import React from 'react'
import { useCandidateStore } from '../../../stores/useCandidateStore'
import placeholder from '../../../assets/img_placeholder.png'
import { Modal } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import useVotingStateStore from '../../../stores/useVotingStateStore'
import { IoIosArrowDroprightCircle } from "react-icons/io";

export const CandidateCard = ({ candidateImg, user }) => {

    const name = `${user.last_name ?? ""}, ${user.first_name ?? ""} ${user.middle_name ?? ""}`;
    // const description = user.member;

    return (
        <div className='cursor-pointer flex rounded-lg overflow-hidden items-center transition-colors duration-300 bg-[#635CBB]'>
            <div className={`flex items-center gap-2 text-white`}>
                <img
                    src={candidateImg ?? placeholder}
                    className='w-20 h-20'
                    alt={name}
                />
                <p className='font-bold text-2xl'>
                    {String(user.id).padStart(2, '0')}
                </p>
            </div>
            <div className='w-[3px] h-10 bg-white mx-4 ' />
            <div className={`lg:px-4 text-white}`}>
                <h2 className='font-bold text-sm lg:text-xl text-white'>{user.title ? `${user.title} ${name}` : name}</h2>
                {/* <p className='text-sm text-white'>({description})</p> */}
            </div>
        </div >
    )
}

const SelectedCandidates = () => {
    const selectedCandidates = useCandidateStore(state => state.selectedCandidates);
    const [printModalOpen, setPrintModalOpen] = useState(false);
    const navigate = useNavigate()
    const setFinalizedBallot = useVotingStateStore()?.setFinalizedBallot

    const handlePrintConfirmModalOpen = () => {
        setPrintModalOpen(true)
    }

    return (
        <div className='flex flex-col gap-4 w-full mt-6'>
            <div className='w-full flex justify-center flex-col items-center gap-2'>
                <h1 className='text-lg font-bold lg:text-2xl'>SELECTED CANDIDATES</h1>
                <hr className='w-[30%] text-gray-300' />
            </div>

            {Object.values(selectedCandidates).map((candidate, index) => (
                <CandidateCard user={candidate} key={index} />
            ))}

            {
                Object.values(selectedCandidates).length < 1 && (
                    <div className='w-full flex items-center justify-center'>
                        <p className='text-xl text-red-500'>Please select at least one candidate to proceed.</p>
                    </div>
                )
            }

            <div className={`w-full flex justify-center flex-col items-center gap-2 ${Object.values(selectedCandidates).length < 1 && "opacity-20 cursor-not-allowed"}`}>
                <button
                    onClick={handlePrintConfirmModalOpen}
                    disabled={Object.values(selectedCandidates).length < 1}
                >
                    <IoIosArrowDroprightCircle size={60} fill='#52D49E' />
                </button>
                <p className='text-xs'>By clicking print, a hard copy of your ballot will be printed.</p>
            </div>

            <Modal
                open={printModalOpen}
                onCancel={() => setPrintModalOpen(false)}
                footer={null}
                centered
            >
                <div className='flex flex-col gap-2'>
                    <p className='text-lg'>Are you sure you want to proceed?</p>
                    <p className='text-sm'>Important: Once confirmed, your votes are considered final and your ballot will be printed.</p>

                    <div className='flex items-center justify-end gap-2'>
                        <button
                            onClick={() => {
                                navigate("/voter/vote/review")
                                setFinalizedBallot(true)
                            }}
                            className='border border-[#301F66] text-[#301F66] w-14 py-1 rounded-lg hover:text-white hover:bg-[#301F66] ease-in-out duration-200 cursor-pointer'
                        >
                            Yes
                        </button>
                        <button
                            className='border border-[#301F66] text-[#301F66] w-14 py-1 rounded-lg hover:text-white hover:bg-[#301F66] ease-in-out duration-200 cursor-pointer'
                            onClick={() => setPrintModalOpen(false)}
                        >
                            No
                        </button>
                    </div>
                </div>
            </Modal>

        </div>
    );
};

export default SelectedCandidates;