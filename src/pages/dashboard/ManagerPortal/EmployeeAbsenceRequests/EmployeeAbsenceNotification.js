import React, { useState, useEffect } from 'react';

const EmployeeAbsenceNotification = ({ notification, onClose }) => {
    if (!notification) return null;

    const { employee, department, absenceType, requestedDates, reason, supportingDocuments } = notification;
    const [userImage, setUserImage] = useState(null);

    useEffect(() => {
        try {
            const image = require(`../../../../assets/images/users/${employee.replace(/\s+/g, '')}.png`);
            setUserImage(image);
        } catch (error) {
            setUserImage(null);
        }
    }, [employee]);

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-11/12 md:w-2/3 lg:w-1/2 overflow-hidden">
                <div className="bg-gray-100 border-b p-4 flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-800">ACTION: EMPLOYEE ABSENCE NOTIFICATION</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 focus:outline-none">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="p-6">
                    <div className="flex items-center mb-4">
                        <div className="w-20 h-20 rounded-full bg-gray-200 flex justify-center items-center mr-4 overflow-hidden">
                            {userImage ? (
                                <img src={userImage} alt="User" className="w-full h-full object-cover rounded-full" />
                            ) : (
                                <div className="text-gray-500">No Image</div>
                            )}
                        </div>
                        <div>
                            <p><strong className="text-gray-700">Employee:</strong> {employee}</p>
                            <p><strong className="text-gray-700">Department:</strong> {department}</p>
                            <p><strong className="text-gray-700">Absence Type:</strong> {absenceType}</p>
                            <p><strong className="text-gray-700">Requested Dates:</strong> {requestedDates}</p>
                            <p><strong className="text-gray-700">Reason:</strong> {reason}</p>
                            <p><strong className="text-gray-700">Supporting Documents:</strong>
                                {supportingDocuments ? (
                                    <a href={supportingDocuments} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline"> View</a>
                                ) : (
                                    'None'
                                )}
                            </p>
                        </div>
                    </div>

                    <div className="mb-4">
                        <textarea
                            className="w-full p-2 border rounded text-gray-700 focus:outline-none focus:ring focus:ring-blue-300"
                            placeholder="Insert Comment ..."
                        />
                    </div>

                    <div className="flex justify-end gap-2">
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Decline
                        </button>
                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Approve
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeAbsenceNotification;
