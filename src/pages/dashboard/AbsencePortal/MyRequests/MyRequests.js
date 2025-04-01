import React, { useState } from "react";
import Header from "../../../../components/layout/Header";
import NavigationBar from "../../../../components/layout/NavigationBar";
import TimeBalances from "../../../../components/overview/TimeBalances";
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
    <div className="flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-all">
        <Header toggleNavigationBar={toggleNavigationBar} isOpen={isOpen} />
        <div className="flex flex-1">
            <NavigationBar isOpen={isOpen} toggleNavigationBar={toggleNavigationBar} />
            <div className="flex-1 min-h-screen">
            <div className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900"
                style={{ marginLeft: isOpen ? "280px" : "0px", transition: "margin-left 0.3s ease" }}>
            <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md transition-all">
                <div className="p-6 w-full overflow-x-auto">
                    <h1 className="text-3xl font-bold mb-6 text-black dark:text-white" style={{ fontFamily: 'Kanit, sans-serif' }}>MY REQUESTS</h1>
                                <div className="flex items-center mt-4">
                                    {/* Time Balances Section */}
                                    <div className="flex-1">
                                        <TimeBalances />
                                    </div>

                                    {/* Buttons */}
                                    <div className="flex flex-col gap-4 mb-6 p-10 font-bold" style={{ fontFamily: 'Kanit, sans-serif' }}>
                                        <Link to={`/dashboard/${dashboardType}/report-absence`}>
                                            <button className="bg-[#cce3c7] dark:bg-green-700 text-black dark:text-white px-4 py-2 rounded transition-colors">
                                                REPORT ABSENCE
                                            </button>
                                        </Link>
                                        <button 
                                            onClick={addRequest} 
                                            className="bg-gray-300 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded transition-colors"
                                        >
                                            REQUEST TIME OFF
                                        </button>
                                    </div>
                                </div>
                                
                                {/* Leave Request Table */}
                                <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md transition-colors">
                                    <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-white" style={{ fontFamily: 'Kanit, sans-serif' }}>
                                        LEAVE REQUEST
                                    </h2>
                                    <table className="w-full text-left border-collapse" style={{ fontFamily: 'Kanit, sans-serif' }}>
                                        <thead>
                                            <tr className="border-b dark:border-gray-900">
                                                <th className="py-2 text-gray-900 dark:text-gray-300">Duration</th>
                                                <th className="py-2 text-gray-900 dark:text-gray-300">Type</th>
                                                <th className="py-2 text-gray-900 dark:text-gray-300">Day(s)</th>
                                                <th className="py-2 text-gray-900 dark:text-gray-300">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {requests.map((request) => (
                                                <tr key={request.id} className="border-b dark:border-gray-900">
                                                    <td className="py-2 text-gray-900 dark:text-white">{request.duration}</td>
                                                    <td className="py-2 text-gray-900 dark:text-white">{request.type}</td>
                                                    <td className="py-2 text-gray-900 dark:text-white">{request.days}</td>
                                                    <td className="py-2 text-gray-900 dark:text-white">{request.status}</td>
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
