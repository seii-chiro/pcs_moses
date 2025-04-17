import React from 'react'
import placeholder from "../../../assets/img_placeholder.png"
import { useCandidateStore } from "../../../stores/useCandidateStore"

const CandidateCard = ({ user, candidateImg }) => {
    const isSelected = useCandidateStore(state => state.isSelected(user.id));
    const toggleCandidate = useCandidateStore(state => state.toggleCandidate);
    const number = user.id;

    const handleClick = () => {
        toggleCandidate(user);
    };

    const textColor = isSelected ? 'text-white' : 'text-black';
    const bgColor = isSelected ? 'bg-white' : 'bg-black';
    const name = `${user.surname}, ${user.first_name} ${user.middle_name}`;
    const description = user.member;

    return (
        <div
            onClick={handleClick}
            className={`cursor-pointer flex rounded-lg overflow-hidden items-center transition-colors duration-300 ${isSelected ? 'bg-[#635CBB]' : 'bg-white'
                }`}
        >
            <div className={`flex items-center gap-2 ${textColor}`}>
                <img
                    src={candidateImg ?? placeholder}
                    className='w-20 h-20'
                    alt={name}
                />
                <p className='font-bold lg:text-2xl'>
                    {String(number).padStart(2, '0')}
                </p>
            </div>
            <div className={`w-[3px] h-10 ${bgColor} mx-4`} />
            <div className={`px-4 ${textColor}`}>
                <h2 className='font-bold lg:text-xl'>{user.title ? `${user.title} ${name}` : name}</h2>
                <p className='text-sm'>({description})</p>
            </div>
        </div>
    );
};

export default CandidateCard;
