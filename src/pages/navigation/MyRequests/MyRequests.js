import React from "react";
import Header from "../../../components/layout/Header";
import NavigationBar from "../../../components/layout/NavigationBar";
import TimeBalances from "../../../components/time-balances/TimeBalances";
import { useParams, Link } from "react-router-dom";

const MyRequests = () => {
    const { dashboardType } = useParams();
    const [isOpen, setIsOpen] = React.useState(true);

    const toggleNavigationBar = () => {
    setIsOpen(!isOpen);
    };

    return (
        <div className="flex flex-col h-screen">
        <Header toggleNavigationBar={toggleNavigationBar} isOpen={isOpen} />

        <div className="flex flex-1">
            <NavigationBar isOpen={isOpen} toggleNavigationBar={toggleNavigationBar} />

            <div className="flex-1 min-h-screen" style={{ paddingLeft: isOpen ? "280px" : "100px", transition: "padding-left 0.3s ease" }}>
            <div className="p-6 h-screen bg-gray-100">
            <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md">
            <div className="p-6 w-full overflow-x-auto">
            <h1 className="text-3xl font-bold mb-6" style={{ fontFamily: 'Kanit, sans-serif' }}>MY REQUESTS</h1>
            <div className="flex items-center mt-4">
            <div className="flex items-start"></div>
            {/* Time Balances Section */}
            <div className="flex-1">
                <TimeBalances />
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-4 mb-6 p-10 font-bold" style={{ fontFamily: 'Kanit, sans-serif' }}>
                <Link to={`/dashboard/${dashboardType}/report-absence`}>
                    <button className="bg-[#cce3c7] text-black px-4 py-2 rounded">REPORT ABSENCE</button>
                </Link>
                <button className="bg-gray-300 text-black px-4 py-2 rounded">REQUEST TIME OFF</button>
            </div>
            </div>
            
            {/* Leave Request Table */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-bold mb-4" style={{ fontFamily: 'Kanit, sans-serif' }}>LEAVE REQUEST</h2>
                <table className="w-full text-left border-collapse" style={{ fontFamily: 'Kanit, sans-serif' }}>
                <thead>
                    <tr className="border-b">
                    <th className="py-2">Duration</th>
                    <th className="py-2">Type</th>
                    <th className="py-2">Day(s)</th>
                    <th className="py-2">Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-b">
                    <td className="py-2">Dec 2 - Dec 5 2025</td>
                    <td className="py-2">Annual Leave</td>
                    <td className="py-2">4</td>
                    <td className="py-2 text-green-600">Approved ✅</td>
                    </tr>
                    <tr className="border-b">
                    <td className="py-2">Dec 15 2025</td>
                    <td className="py-2">Sick Leave</td>
                    <td className="py-2">1</td>
                    <td className="py-2 text-green-600">Approved ✅</td>
                    </tr>
                    <tr>
                    <td className="py-2">Jan 2 2026</td>
                    <td className="py-2">Annual Leave</td>
                    <td className="py-2">1</td>
                    <td className="py-2 text-gray-600">Pending ⏳</td>
                    </tr>
                </tbody>
                </table>
            </div>
            </div>
        </div>
        </div>
        </div>
        </div>
        </div>
    );
};

export default MyRequests;