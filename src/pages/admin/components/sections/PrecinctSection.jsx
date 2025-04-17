import React from 'react';
import { useNavigate } from 'react-router';
import position from '../../../../assets/seo.png';
import candidates from '../../../../assets/approved.png';
import location from '../../../../assets/destination.png';
import precincts from '../../../../assets/polling-station.png';
import translate from '../../../../assets/globe.png';
import printer from '../../../../assets/printer.png';

const Card = ({ title, img, path }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(path)}
            className='flex flex-col items-center justify-center gap-2 bg-[#635CBB] text-white w-72 h-40 p-4 rounded-lg shadow-md cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl'
        >
            <div className='w-20'><img src={img} alt={title} /></div>
            <p className='text-lg font-semibold'>{title}</p>
        </div>
    );
};

const PrecinctSection = () => {
    return (
        <div className='flex gap-8 px-5 py-10 w-full flex-wrap justify-center items-center'>
            <Card title='Positions' img={position} path='/admin/position' />
            <Card title='Candidates' img={candidates} path='/admin/candidates' />
            <Card title='Locations' img={location} path='/admin/locations' />
            <Card title='Precincts' img={precincts} path='/precincts' />
            <Card title='Translate MoSES' img={translate} path='/translate' />
            <Card title='Printer' img={printer} path='/printer' />
        </div>
    );
};

export default PrecinctSection;
