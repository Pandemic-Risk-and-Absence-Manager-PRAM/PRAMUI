import React, { useState } from "react";
import Header from "../../../../components/layout/Header";
import NavigationBar from "../../../../components/layout/NavigationBar";
import TimeBalances from "../../../../components/time-balances/TimeBalances";
import { useParams, Link } from "react-router-dom";

const MyRequests = () => {
    const { dashboardType } = useParams();
    const [isOpen, setIsOpen] = useState(true);

    // State for leave requests
    const [requests, setRequests] = useState([
        { id: 1, duration: "Dec 2 - Dec 5 2025", type: "Annual Leave", days: 4, status: "Approved ✅" },
        { id: 2, duration: "Dec 15 2025", type: "Sick Leave", days: 1, status: "Approved ✅" },
        { id: 3, duration: "Jan 2 2026", type: "Annual Leave", days: 1, status: "Pending ⏳" },
    ]);

    // Function to add a new request
    const addRequest = () => {
        const newRequest = {
            id: requests.length + 1,
            duration: "Feb 10 - Feb 12 2026",
            type: "Annual Leave",
            days: 3,
            status: "Pending ⏳"
        };
        setRequests([...requests, newRequest]);
    };

    const toggleNavigationBar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="flex flex-col h-screen">
            <Header toggleNavigationBar={toggleNavigationBar} isOpen={isOpen} />

            <div className="flex flex-1">
                <NavigationBar isOpen={isOpen} toggleNavigationBar={toggleNavigationBar} />

                <div className="flex-1 min-h-screen">
                    <div className="p-6 h-screen bg-gray-100" style={{ paddingLeft: isOpen ? "280px" : "100px", transition: "padding-left 0.3s ease" }}>
                        <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md">
                            <div className="p-6 w-full overflow-x-auto">
                                <h1 className="text-3xl font-bold mb-6" style={{ fontFamily: 'Kanit, sans-serif' }}>MY REQUESTS</h1>

                                <div className="flex items-center mt-4">
                                    {/* Time Balances Section */}
                                    <div className="flex-1">
                                        <TimeBalances />
                                    </div>

                                    {/* Buttons */}
                                    <div className="flex flex-col gap-4 mb-6 p-10 font-bold" style={{ fontFamily: 'Kanit, sans-serif' }}>
                                        <Link to={`/dashboard/${dashboardType}/report-absence`}>
                                            <button className="bg-[#cce3c7] text-black px-4 py-2 rounded">REPORT ABSENCE</button>
                                        </Link>
                                        <button onClick={addRequest} className="bg-gray-300 text-black px-4 py-2 rounded">REQUEST TIME OFF</button>
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
                                            {requests.map((request) => (
                                                <tr key={request.id} className="border-b">
                                                    <td className="py-2">{request.duration}</td>
                                                    <td className="py-2">{request.type}</td>
                                                    <td className="py-2">{request.days}</td>
                                                    <td className="py-2">{request.status}</td>
                                                </tr>
                                            ))}
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
