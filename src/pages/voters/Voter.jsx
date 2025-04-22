import React, { useState } from 'react'
import hero from "../../assets/landing_hero.png"
import { NavLink } from 'react-router'
import useVotingStateStore from '../../stores/useVotingStateStore'
import { Modal } from 'antd'
import Ballot from './components/Ballot'
import { useAuthStore } from '../../stores/useAuthStore'
import { useMutation } from '@tanstack/react-query'
import { BASE_URL } from './utils/url'
import { useTokenStore } from '../../stores/useTokenStore'

const setStartVote = async (payload, token) => {
    const response = await fetch(`${BASE_URL}/api/vote/set-started-voting/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
        },
        body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
        const errorMsg =
            data?.detail ||
            data?.error ||
            'Failed to start voting';
        throw new Error(errorMsg);
    }

    return data;
}

const Voter = () => {
    const user = useAuthStore()?.user
    const token = useTokenStore()?.token
    const [openBallotModal, setopenBallotModal] = useState(false)
    const { setStartedVoting, startedVoting, finalizedBallot, ballotCasted } = useVotingStateStore()

    const setStartVoteMutation = useMutation({
        mutationKey: ['set-start-vote'],
        mutationFn: () => setStartVote({ voter_id: user?.id }, token),
        onSuccess: () => setStartedVoting(true)
    })

    let voteText = "Vote"
    let voteLink = "/voter/vote"
    let handleClick = () => {
        setStartVoteMutation.mutate()
    }

    if (startedVoting && !finalizedBallot && user?.vote_status?.status !== "Voted") {
        voteText = "Continue Voting"
    } else if (startedVoting && finalizedBallot && user?.vote_status?.status !== "Voted") {
        voteText = "Cast Vote"
        voteLink = "/voter/vote/review"
        handleClick = () => { } // No need to call setStartedVoting again
    }

    if (ballotCasted || user?.vote_status?.status === "Voted") {
        voteText = "Show My Ballot"
    }

    return (
        <div className='w-full h-full flex flex-col justify-center items-center'>
            <div className='h-screen flex flex-col items-center justify-center gap-2'>
                <img src={hero} alt={"moses screen"} className='w-[25rem]' />
                <div className='flex flex-col'>
                    {
                        user?.vote_status?.status !== "Voted" ? (
                            <NavLink
                                className={`bg-[#301F66] text-white w-50 py-2 rounded-lg text-center`}
                                to={voteLink}
                                onClick={handleClick}
                            >
                                {voteText}
                            </NavLink>
                        ) : (
                            <button
                                className={`bg-[#301F66] text-white w-50 py-2 rounded-lg text-center opacity-50 pointer-events-none`}
                                onClick={() => setopenBallotModal(true)}
                            >
                                {voteText}
                            </button>
                        )
                    }
                </div>
                <div className='flex flex-col items-center justify-center gap-2'>
                    <NavLink
                        to={"/voter/track"}
                        className='text-center border border-[#301F66] text-[#301F66] w-50 py-1.5 rounded-lg hover:bg-[#301F66] hover:text-white transition-all ease-in-out duration-150 cursor-pointer'
                    >
                        Track My Vote
                    </NavLink>
                    {/* <button className='border border-[#301F66] text-[#301F66] w-50 py-1.5 rounded-lg hover:bg-[#301F66] 
                    hover:text-white transition-all ease-in-out duration-150 cursor-pointer'>Change My Password</button> */}
                </div>
            </div>

            <Modal
                width={'55%'}
                footer={null}
                centered
                open={openBallotModal}
                onCancel={() => setopenBallotModal(false)}
            >
                <Ballot />
            </Modal>
        </div>
    )
}

export default Voter
