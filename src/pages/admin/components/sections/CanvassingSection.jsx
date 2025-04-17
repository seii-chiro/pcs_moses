import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Table } from 'antd';

const summaryData = [
    { title: 'Total Candidates', value: 6 },
    { title: 'Total Votes Cast', value: 12345 },
    { title: 'Precincts Counted', value: '85%' },
];

const voteData = [
    { name: 'Alice Ramos', votes: 3450 },
    { name: 'Ben Cruz', votes: 2980 },
    { name: 'Carlos Reyes', votes: 2765 },
    { name: 'Diana Lim', votes: 2025 },
    { name: 'Emil Santos', votes: 1820 },
    { name: 'Faith Dela Cruz', votes: 1305 },
];

const tableData = voteData.map((item, index) => ({
  key: index,
  candidate: item.name,
  votes: item.votes,
  status: item.votes > 2000 ? 'Leading' : 'Trailing',
}));

const columns = [
  {
    title: 'Candidate',
    dataIndex: 'candidate',
    key: 'candidate',
  },
  {
    title: 'Votes',
    dataIndex: 'votes',
    key: 'votes',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status) => (
      <span className={`font-semibold ${status === 'Leading' ? 'text-green-600' : 'text-gray-500'}`}>
        {status}
      </span>
    ),
  },
];

const CanvassingSection = () => {
    
    return (
        <div className="w-full px-4 sm:px-10 py-8 flex flex-col gap-10">
            <h1 className="text-3xl font-bold text-[#635CBB] text-center">Election Canvassing</h1>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {summaryData.map((card, idx) => (
                <div
                    key={idx}
                    className="bg-[#635CBB] text-white p-6 rounded-2xl shadow-md text-center"
                >
                    <p className="text-lg font-medium">{card.title}</p>
                    <p className="text-2xl font-bold mt-2">{card.value}</p>
                </div>
                ))}
            </div>
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Bar Chart */}
                <div className="bg-white border border-[#635CBB] rounded-2xl shadow-md p-6 w-full lg:w-1/2">
                    <h2 className="text-xl font-semibold text-[#635CBB] my-8">Votes per Candidate</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={voteData}>
                            <defs>
                            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#AC94F4" />
                                <stop offset="50%" stopColor="#635CBB" />
                                <stop offset="100%" stopColor="#301F66" />
                            </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="votes" fill="url(#barGradient)" barSize={50} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                {/* Table */}
                <div className="bg-white border border-[#635CBB] rounded-2xl shadow-md p-6 w-full lg:w-1/2">
                    <h2 className="text-xl font-semibold text-[#635CBB] mb-4">Detailed Results</h2>
                    <Table
                    columns={columns}
                    dataSource={tableData}
                    pagination={false}
                    scroll={{ x: true }}
                    />
                </div>
            </div>
        </div>
    )
};

export default CanvassingSection;
