import React, { useState, useEffect } from 'react';
import { BorderlessTableOutlined, PicCenterOutlined } from '@ant-design/icons';
import { useCandidateStore } from '../../stores/useCandidateStore';
import { Tabs } from 'antd';
import { CandidateCard } from './components/SelectedCandidates';
import { generatePdfFromSelectedCandidates } from './utils/generatePDF';
import { FaCircleCheck } from 'react-icons/fa6';
import { FaRegCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import useVotingStateStore from '../../stores/useVotingStateStore';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useAuthStore } from '../../stores/useAuthStore';
import { useTokenStore } from '../../stores/useTokenStore';

const castBallot = async (payload, token) => {
    const response = await fetch('http://localhost:8000/api/start-vote/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(payload),
    })

    const data = await response.json();

    if (!response.ok) {
        const errorMsg =
            data?.detail ||
            data?.error ||
            'Failed to cast your vote';
        throw new Error(errorMsg);
    }

    return data;
}

async function getMyProxiedUsers(token) {
    const response = await fetch('http://localhost:8000/api/get-my-proxied-user', {
        headers: {
            Authorization: `Token ${token}`,
        },
    });
    const myProxies = await response.json();
    return myProxies;
}

const ReviewPage = () => {
    const selectedCandidates = useCandidateStore(state => state.selectedCandidates);
    const { setPdfBallotCreatedInServer, setBallotCasted } = useVotingStateStore();
    const [pdfUrl, setPdfUrl] = useState(null);
    const navigate = useNavigate();
    const user = useAuthStore()?.user
    const token = useTokenStore()?.token

    const candidateIds = Object.keys(selectedCandidates)
        .filter((key) => !isNaN(key))
        .map((key) => Number(key));

    const { data: myProxiedUsers } = useQuery({
        queryKey: ['get-my-proxied-users'],
        queryFn: () => getMyProxiedUsers(token)
    })

    console.log(myProxiedUsers)

    const castBallotMutation = useMutation({
        mutationKey: ['cast-ballot'],
        mutationFn: ({ payload, token }) => castBallot(payload, token),
        onSuccess: () => {
            toast.success("Successfully casted your ballot.")
            navigate("/voter/vote/success")
        },
        onError: (error) => toast.error(error.message)
    })

    const handleCastVote = () => {
        if (myProxiedUsers) {
            myProxiedUsers?.map(proxy => {
                castBallotMutation.mutate({
                    payload: {
                        voter_id: proxy?.id,
                        candidate_id: candidateIds
                    },
                    token
                })
            })
        }

        castBallotMutation.mutate({
            payload: {
                voter_id: user?.id,
                candidate_id: candidateIds
            },
            token
        })
        setBallotCasted(true)
    }

    useEffect(() => {
        const fetchPdf = async () => {
            if (Object.keys(selectedCandidates).length > 0) {
                const url = await generatePdfFromSelectedCandidates();
                setPdfUrl(url);
                setPdfBallotCreatedInServer(true)
            }
        };

        fetchPdf();
    }, [selectedCandidates]);


    const items = [
        {
            key: '1',
            label: (
                <span>
                    <PicCenterOutlined style={{ fontSize: '20px' }} />
                </span>
            ),
            children: (
                <div className="flex flex-col gap-4 w-full mt-6">
                    <div className="w-full flex justify-center flex-col items-center gap-2">
                        <h1 className="text-lg font-bold lg:text-2xl">SELECTED CANDIDATES</h1>
                        <hr className="w-[30%] text-gray-300" />
                    </div>
                    <div className={`bg-[#DBD9EB] p-8 grid grid-cols-1 lg:grid-cols-2 gap-4 rounded-lg`}>
                        {Object.values(selectedCandidates).map((candidate, index) => (
                            <CandidateCard user={candidate} key={index} />
                        ))}
                    </div>
                </div>
            ),
        },
        {
            key: '2',
            label: (
                <span>
                    <BorderlessTableOutlined style={{ fontSize: '20px' }} />
                </span>
            ),
            children: (
                <div className="flex flex-col gap-4 w-full">
                    {pdfUrl ? (
                        <div className="w-full">
                            <iframe
                                src={pdfUrl}
                                title="PDF Preview"
                                style={{ height: '62vh', width: '50vw', border: '1px solid #ccc' }}
                            />
                        </div>
                    ) : (
                        <div className="flex justify-center items-center w-full h-[80vh]">
                            <p>Loading PDF Preview...</p>
                        </div>
                    )}
                </div>
            ),
        },
    ];

    return (
        <div className="p-4 w-full flex flex-col items-center justify-center">
            <h1 className="w-full text-xl font-bold mb-4">Review Page</h1>
            <Tabs defaultActiveKey="1" items={items} title='Review Page' />
            <div className='my-6 flex flex-col items-center justify-center gap-1'>
                <button onClick={handleCastVote}>
                    <FaCircleCheck fill='#52D49E' size={50} className='hover:scale-125 transition-all ease-in-out duration-150 cursor-pointer' />
                </button>
                <div>
                    <p className='flex items-center gap-1'>
                        Tap the <span> <FaRegCheckCircle className='text-[#52D49E]' /> </span> to <span className='font-semibold'>Cast your votes</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ReviewPage;
