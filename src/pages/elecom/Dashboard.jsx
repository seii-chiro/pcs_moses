import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { useEffect, useState } from "react";
import circle from "../../assets/circle.svg";
import { PiDevicesThin, PiUserCircleCheckThin } from "react-icons/pi";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { AiOutlineFileSync } from "react-icons/ai";
import { AiOutlineFileDone } from "react-icons/ai";
import { AiOutlineFileExclamation } from "react-icons/ai";
import { TbUserShield } from "react-icons/tb";

const Card = ({ icon, title, count }) => {
    return (
        <div className="bg-[#635CBB] flex items-center rounded-xl p-5 w-80 gap-5 h-40 text-white shadow-md">
            <div className="mb-2 bg-white/20 p-3 rounded-full">{icon}</div>
            <div>
                <div className="font-semibold text-[40px]">{count}</div>
                <span>{title}</span>
            </div>
        </div>
    );
};

const barData = [
    { name: "Registered", value: 569 },
    { name: "Cancelled", value: 0 },
    { name: "Devices", value: 3 },
    { name: "Abandoned", value: 1 },
    { name: "Available", value: 998 },
    { name: "Logged", value: 3 },
];

const pieData = [
    { name: "Available", value: 998 },
    { name: "Abandoned", value: 1 },
    { name: "Cancelled", value: 0 },
    { name: "Casted", value: 29 },
    
];

const COLORS = ["#635CBB", "#AC94F4", "#6C4BB6", "#301F66"];

const Elecom = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize(); // set initially
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return (
        <div className="relative w-full md:h-[100vh] overflow-y-auto p-8">
            <div className="flex items-center justify-between mb-8">
                <h1 className="relative z-10 font-semibold text-xl">Dashboard</h1>
                <div className="flex items-center gap-4">
                    <h1>Admin</h1>
                    <div className="rounded-full p-3 border-2 border-[#A095F9]"></div>
                    <div className="text-2xl"><IoChatbubbleEllipsesOutline /></div>
                </div>
            </div>
            <div className="relative flex flex-col items-center justify-center mt-8 gap-4 md:absolute md:top-0 md:left-0 md:z-0 md:pointer-events-none">
    <img
        src={circle}
        alt="Decorative Circle"
        className="w-full max-w-lg md:w-4xl md:ml-20 h-auto"
    />
    {/* Text centered over image on both mobile and desktop */}
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center gap-2 md:top-[13rem] md:left-[5.5rem] md:transform-none">
        <div className="font-extrabold text-[#635CBB] text-5xl md:text-7xl">29</div>
        <p className="text-[#333] font-medium text-lg md:text-xl">Casted Ballots</p>
    </div>
</div>

            <div className="relative z-10 flex justify-center top-0 md:justify-end w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    <Card icon={<PiUserCircleCheckThin size={28} />} count={569} title="Registered Voters" />
                    <Card icon={<AiOutlineFileExclamation size={28} />} count={0} title="Cancelled Ballots" />
                    <Card icon={<PiDevicesThin size={28} />} count={0} title="Registered Devices" />
                    <Card icon={<AiOutlineFileSync size={28} />} count={1} title="Abandoned/Held Ballot" />
                    <Card icon={<AiOutlineFileDone size={28} />} count={998} title="Available Ballots" />
                    <Card icon={<TbUserShield size={28} />} count={3} title="User Logged" />
                </div>
            </div>

            <div className="w-full z-10 grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="rounded-[24px] p-5 bg-white z-10 relative shadow">
                    <h1 className="text-lg text-center font-semibold mb-4">Bar Chart</h1>
                    <ResponsiveContainer width="100%" height={320}>
                        <BarChart data={barData}>
                            <defs>
                                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#AC94F4" />
                                    <stop offset="50%" stopColor="#635CBB" />
                                    <stop offset="100%" stopColor="#301F66" />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="url(#barGradient)" barSize={50}/>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="rounded-[24px] p-5 bg-white z-10 relative shadow">
                    <h1 className="text-lg text-center font-semibold mb-4">Ballot Details</h1>
                    <ResponsiveContainer width="100%" height={320}>
            <PieChart>
                <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={isMobile ? 90 : 120}
                    innerRadius={isMobile ? 40 : 60}
                    label
                    labelLine={false}
                    paddingAngle={1}
                    stroke="#fff"
                    strokeWidth={2}
                >
                    {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Legend
                    layout="vertical"
                    verticalAlign="middle"
                    align="right"
                    wrapperStyle={{
                        right: isMobile ? 0 : 90,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        lineHeight: '24px',
                    }}
                />
                <Tooltip />
            </PieChart>
        </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Elecom;
