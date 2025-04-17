import React from 'react';
import { Steps } from 'antd';
import { CheckCircleOutlined, ClockCircleOutlined, LoadingOutlined, CloseCircleOutlined } from '@ant-design/icons';
import useVotingStateStore from '../../stores/useVotingStateStore';
import { IoArrowBack } from "react-icons/io5";
import { Link } from 'react-router';

const VoteTracker = () => {

    const {
        ballotGenerated,
        startedVoting,
        finalizedBallot,
        pdfBallotCreatedInServer,
        ballotCasted,
        countedByTheTARAS
    } = useVotingStateStore();


    const getStatus = (isCompleted, isNext) => {
        if (isCompleted) return 'finish';
        if (isNext) return 'process';
        return 'wait';
    };


    const getStatusColor = (status) => {
        switch (status) {
            case 'finish':
                return 'green';
            case 'process':
                return 'gray';
            case 'wait':
                return 'gray';
            case 'error':
                return 'red';
            default:
                return 'inherit';
        }
    };


    const getStatusWord = (status) => {
        switch (status) {
            case 'finish':
                return 'Success';
            case 'process':
                return 'Pending';
            case 'wait':
                return 'Pending';
            case 'error':
                return 'Failed';
            default:
                return '';
        }
    };


    const createStyledTitle = (baseTitle, status) => {
        const statusWord = getStatusWord(status);
        const statusColor = getStatusColor(status);


        if (!statusWord) return baseTitle;

        return (
            <>
                {baseTitle} (<span style={{
                    color: statusColor,
                    fontWeight: 600
                }}>{statusWord}</span>)
            </>
        );
    };


    const getStatusIcon = (status) => {
        switch (status) {
            case 'finish':
                return <CheckCircleOutlined style={{ color: getStatusColor(status) }} />;
            case 'process':
                return <LoadingOutlined style={{ color: getStatusColor(status) }} />;
            case 'wait':
                return <ClockCircleOutlined style={{ color: getStatusColor(status) }} />;
            case 'error':
                return <CloseCircleOutlined style={{ color: getStatusColor(status) }} />;
            default:
                return <ClockCircleOutlined style={{ color: getStatusColor(status) }} />;
        }
    };


    const getNextStep = () => {
        if (!ballotGenerated) return 0;
        if (!startedVoting) return 1;
        if (!finalizedBallot) return 2;
        if (!pdfBallotCreatedInServer) return 3;
        if (!ballotCasted) return 4;
        if (!countedByTheTARAS) return 5;
        return -1;
    };

    const nextStepIndex = getNextStep();


    const stepsData = [
        {
            baseTitle: 'Ballot Generated',
            state: ballotGenerated,
            isNext: nextStepIndex === 0
        },
        {
            baseTitle: 'Started Voting',
            state: startedVoting,
            isNext: nextStepIndex === 1
        },
        {
            baseTitle: 'Finalized Ballot',
            state: finalizedBallot,
            isNext: nextStepIndex === 2
        },
        {
            baseTitle: 'PDF Ballot Created in Server',
            state: pdfBallotCreatedInServer,
            isNext: nextStepIndex === 3
        },
        {
            baseTitle: 'Ballot Casted',
            state: ballotCasted,
            isNext: nextStepIndex === 4
        },
        {
            baseTitle: 'Counted by the TARAS',
            state: countedByTheTARAS,
            isNext: nextStepIndex === 5
        }
    ];


    const steps = stepsData.map(step => {
        const status = getStatus(step.state, step.isNext);
        return {
            title: createStyledTitle(step.baseTitle, status),
            status: status,
            icon: getStatusIcon(status)
        };
    });

    return (
        <div className='w-full flex flex-col mt-5 gap-4'>
            <div className='text-xl font-semibold flex items-center gap-4'>
                <Link to={"/voter"}><IoArrowBack /></Link>
                <span className='text-gray-600'>Vote Tracker</span>
            </div>
            <div className=''>
                <div className='font-semibold'>
                    <Steps direction="vertical" items={steps} />
                </div>
            </div>
        </div>
    );
};

export default VoteTracker;