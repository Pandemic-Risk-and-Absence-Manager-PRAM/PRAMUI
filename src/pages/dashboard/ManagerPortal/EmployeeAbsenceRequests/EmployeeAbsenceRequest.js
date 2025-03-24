import React from 'react';
import Header from '../../../../components/layout/Header';
import NavigationBar from "../../../../components/layout/NavigationBar";
import './EmployeeAbsenceRequest.css';
import Calendar from "../../../../components/calendar/Calendar";

const EmployeeAbsenceRequest = () => {
    const [isOpen, setIsOpen] = React.useState(true);

    const toggleNavigationBar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-800 transition-colors">
            <Header toggleNavigationBar={toggleNavigationBar} isOpen={isOpen} />

            <div className="flex flex-1">
                <NavigationBar isOpen={isOpen} toggleNavigationBar={toggleNavigationBar} />

                <div className="flex-1 min-h-screen transition-all" style={{ paddingLeft: isOpen ? "280px" : "100px" }}>
                    <div className="p-6 h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
                        <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md transition-colors">
                            <div className="p-6 w-full overflow-x-auto">
                                <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white" style={{ fontFamily: 'Kanit, sans-serif' }}>
                                    MY REQUESTS
                                </h1>
                                <div className="flex space-x-4">
                                {/*upper banner*/}
                                    <div className="out-sick">
                                        <div className="out-sick-title">Employees Out Sick</div>
                                        <div className="out-sick-count">
                                            2 <br/> Employees
                                        </div>
                                    </div>
                                    <div className="pandemic-leave">
                                        <div className="pandemic-leave-title">Pandemic Leave</div>
                                        <div className="pandemic-leave-count">
                                            14 <br/> Days
                                        </div>
                                    </div>
                                    <div className="last-completed">
                                        <div className="last-completed-title">Last Completed Absence</div>
                                        <div className="last-completed-count">
                                            15 Jan, 2022
                                        </div>
                                    </div>
                                    <div className="remaining">
                                        <div className="remaining-title">No Incoming Absences Left to Approve</div>
                                    </div>
                                </div>
                                {/*calendar*/}
                                <div className="flex space-x-4 flex-col">
                                    <Calendar />
                                </div>
                                {/*report absence requests*/}
                                <div className="absence-table-container flex-col">
                                    <h2 className="absence-table-title">Recent Absence Requests</h2>
                                    <div className="absence-table-wrapper">
                                        <table className="absence-table">
                                            <thead>
                                            <tr>
                                                <th>Type</th>
                                                <th>Start Date</th>
                                                <th>End Date</th>
                                                <th>Duration</th>
                                                <th>Status</th>
                                                <th>Documentation</th>
                                                <th>Notes</th>
                                                <th>Actions</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td>
                                                    <span className="badge badge-red">COVID-19</span>
                                                </td>
                                                <td>Mar 7, 2025</td>
                                                <td>Mar 21, 2025</td>
                                                <td>14 days</td>
                                                <td>
                                                    <span className="link">Active</span>
                                                </td>
                                                <td>
                                                    <span className="badge badge-green">Submitted</span>
                                                </td>
                                                <td>Tested positive for COVID-19</td>
                                                <td>
                                                    <span className="link">View</span>
                                                </td>
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
        </div>
    );
};

export default EmployeeAbsenceRequest;