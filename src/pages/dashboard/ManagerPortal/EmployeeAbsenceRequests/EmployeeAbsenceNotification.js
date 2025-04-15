import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useNotification } from '../../../../components/notifications/NotificationDropDown';

const EmployeeAbsenceNotification = ({ absence, onClose, onStatusChange }) => {
    const modalRef = useRef(null);
    const [userImage, setUserImage] = useState(null);
    const { addNotification } = useNotification(); // Get the addNotification function

    useEffect(() => {
        if (absence?.employee) {
            try {
                const image = require(`../../../../assets/images/users/${absence.employee.replace(/\s+/g, '')}.png`);
                setUserImage(image);
            } catch (error) {
                setUserImage(null);
            }
        }
    }, [absence]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose?.();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);

    const handleApprove = (id) => {
        onStatusChange(id, 'Approved');
        addNotification(`📢 Absence request for ${absence.employee} approved.`);
        onClose?.();
    };

    const handleDecline = (id) => {
        onStatusChange(id, 'Declined');
        addNotification(`📢 Absence request for ${absence.employee} declined.`);
        onClose?.();
    };

    if (!absence) return null;

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div
                ref={modalRef}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-11/12 md:w-2/3 lg:w-1/2 overflow-hidden flex flex-col"
            >
                <div className="bg-gray-100 dark:bg-gray-700 border-b p-4 flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white">EMPLOYEE DETAILS</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 dark:text-white text-2xl"
                    >
                        &times;
                    </button>
                </div>
                <div className="p-6 flex-grow overflow-y-auto text-black dark:text-white">
                    <div className="flex items-center mb-4">
                        <div className="w-20 h-20 rounded-full bg-gray-200 flex justify-center items-center mr-4 overflow-hidden">
                            {userImage ? (
                                <img
                                    src={userImage}
                                    alt={absence.employee}
                                    className="w-full h-full object-cover rounded-full"
                                />
                            ) : (
                                <div className="text-gray-500 dark:text-gray-300">No Image</div>
                            )}
                        </div>
                        <div>
                            <p><strong>Name:</strong> {absence.employee}</p>
                            <p><strong>Department:</strong> {absence.department}</p>
                        </div>
                    </div>

                    <div className="mb-4">
                        <p><strong>Absence Reason:</strong> {absence.notes}</p>
                        <p><strong>Requested Dates:</strong> {absence.startDate} to {absence.endDate} ({absence.duration})</p>
                        <p><strong>Supporting Documents:</strong>
                            {absence.supportingDocuments ? (
                                <a
                                    href={absence.supportingDocuments}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:underline"
                                >
                                    View
                                </a>
                            ) : ' None'}
                        </p>
                    </div>

                    <div className="mb-4">
                        <textarea
                            className="w-full p-2 border rounded text-gray-700 dark:text-black"
                            placeholder="Insert Comment..."
                        />
                    </div>
                </div>

                <div className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-700 border-t">
                    {absence.status === 'Active' ? (
                        <>
                            <button
                                onClick={() => handleDecline(absence.id)}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Decline
                            </button>
                            <button
                                onClick={() => handleApprove(absence.id)}
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Approve
                            </button>
                        </>
                    ) : (
                        <span className="text-green-700 font-semibold">{absence.status}</span>
                    )}
                </div>
            </div>
        </div>
    );
};

EmployeeAbsenceNotification.propTypes = {
    absence: PropTypes.shape({
        id: PropTypes.number,
        employee: PropTypes.string,
        department: PropTypes.string,
        notes: PropTypes.string,
        startDate: PropTypes.string,
        endDate: PropTypes.string,
        duration: PropTypes.string,
        supportingDocuments: PropTypes.string,
        status: PropTypes.string,
    }).isRequired,
    onClose: PropTypes.func.isRequired,
    onStatusChange: PropTypes.func.isRequired,
};

export default EmployeeAbsenceNotification;