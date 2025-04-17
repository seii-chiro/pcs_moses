import circle from "../../assets/circle.png";
import { TbDeviceIpadHorizontalCancel } from "react-icons/tb";
import { PiDevicesThin } from "react-icons/pi";
import { PiUserCircleCheckThin } from "react-icons/pi";

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

const Elecom = () => {
    return (
        <div className="relative w-full h-full bg-[#F1F0FF] p-8">
            <img
                src={circle}
                alt="Decorative Circle"
                className="absolute top-0 left-0 w-full md:w-2xl h-auto z-0 pointer-events-none"
            />
            <h1 className="relative z-10 font-semibold text-xl mb-6">Dashboard</h1>
            <div className="flex text center">
                <div>29</div>
                <p>Casted Ballots</p>
            </div>
            <div className="relative z-10 flex justify-center md:justify-end w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    <Card icon={<PiUserCircleCheckThin size={28} />} count={200} title="Registered Voters" />
                    <Card icon={<TbDeviceIpadHorizontalCancel size={28} />} count={0} title="Cancelled Ballots" />
                    <Card icon={<PiDevicesThin size={28} />} count={1} title="Registered Devices" />
                    <Card icon={<PiUserCircleCheckThin size={28} />} count={2} title="Abandoned/Held Ballot" />
                    <Card icon={<TbDeviceIpadHorizontalCancel size={28} />} count={159} title="Available Ballots" />
                    <Card icon={<PiDevicesThin size={28} />} count={4} title="User Logged" />
                </div>
            </div>
            <div className="w-full z-10 grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
                <div className="rounded-[24px] p-5 bg-white z-10 relative">
                    <h1 className="text-lg text-center font-semibold">Bar Chart</h1>
                </div>
                <div className="rounded-[24px] p-5 bg-white z-10 relative">
                    <h1 className="text-lg text-center font-semibold">Ballot Details</h1>
                </div>
            </div>
        </div>
    )
}

export default Elecom
