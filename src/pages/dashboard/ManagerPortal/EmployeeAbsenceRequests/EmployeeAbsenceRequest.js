import React, { useState, useEffect } from 'react';
import Header from '../../../../components/layout/Header';
import NavigationBar from "../../../../components/layout/NavigationBar";
import AccessibilityWidget from '../../../../components/accessibility/AccessibilityWidget';
import SharedCalendar from "../../../shared/SharedCalendar/SharedCalendar";
import EmployeeAbsenceNotification from "./EmployeeAbsenceNotification";
import './EmployeeAbsenceRequest.css';

const EmployeeAbsenceRequest = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [selectedNotification, setSelectedNotification] = useState(null);
    const [absenceRequests, setAbsenceRequests] = useState([
        {
            id: 1,
            employee: 'Alex Johnson',
            department: 'IT & Software Development',
            type: 'COVID-19',
            startDate: 'Mar 7, 2025',
            endDate: 'Mar 21, 2025',
            duration: '14 days',
            status: 'Active',
            documentation: 'Submitted',
            notes: 'Tested positive for COVID-19',
            supportingDocuments: '/documents/view-documents/COVID_PCR_Test_Result.pdf',
        },
        {
            id: 2,
            employee: 'Sarah Kim',
            department: 'Human Resources',
            type: 'Sick Leave',
            startDate: 'Apr 3, 2025',
            endDate: 'Apr 5, 2025',
            duration: '3 days',
            status: 'Approved',
            documentation: 'Submitted',
            notes: 'Fever and cold',
            supportingDocuments: '/documents/view-documents/COVID_PCR_Test_Result.pdf',
        },
    ]);

    const toggleNavigationBar = () => {
        setIsOpen(!isOpen);
    };

    const handleViewClick = (absenceRequest) => {
        setSelectedNotification(absenceRequest);
    };

    const handleCloseNotification = () => {
        setSelectedNotification(null);
    };

    const handleStatusUpdate = (id, newStatus) => {
        setAbsenceRequests(prev =>
            prev.map(request =>
                request.id === id ? { ...request, status: newStatus } : request
            )
        );
        setSelectedNotification(null);
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-800 transition-colors" style={{ fontFamily: 'Kanit, sans-serif' }}>
            <Header toggleNavigationBar={toggleNavigationBar} isOpen={isOpen} />
            <div className="flex flex-1">
                <NavigationBar isOpen={isOpen} toggleNavigationBar={toggleNavigationBar} />
                <div className="flex-1 min-h-screen transition-all" style={{ paddingLeft: isOpen ? "280px" : "100px" }}>
                    <div className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
                        <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md transition-colors">
                            <div className="p-6 w-full overflow-x-auto">
                                <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">EMPLOYEE ABSENCE REQUESTS</h1>

                                <div className="calendar-wrapper">
                                    <SharedCalendar embedMode={true} dashboardTypeOverride="manager" />
                                    <div className="absence-table-container mt-6">
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
                                                    {absenceRequests.map((request) => (
                                                        <tr key={request.id}>
                                                            <td>
                                                                <span className={`badge ${request.type === 'COVID-19' ? 'badge-red' : 'badge-blue'}`}>
                                                                    {request.type}
                                                                </span>
                                                            </td>
                                                            <td>{request.startDate}</td>
                                                            <td>{request.endDate}</td>
                                                            <td>{request.duration}</td>
                                                            <td>
                                                                <span className="link">{request.status}</span>
                                                            </td>
                                                            <td>
                                                                <span className="badge badge-green">{request.documentation}</span>
                                                            </td>
                                                            <td>{request.notes}</td>
                                                            <td>
                                                                <button className="link" onClick={() => handleViewClick(request)}>View</button>
                                                            </td>
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
            </div>
            {selectedNotification && (
                <EmployeeAbsenceNotification
                    absence={selectedNotification}
                    onClose={handleCloseNotification}
                    onStatusChange={handleStatusUpdate}
                />
            )}
            <AccessibilityWidget />
        </div>
    );
};

export default EmployeeAbsenceRequest;
