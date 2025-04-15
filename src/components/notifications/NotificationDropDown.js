import React, { useState, useRef, useEffect, useContext } from "react";
import { FaBell } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const NotificationContext = React.createContext({
    notifications: [],
    addNotification: () => {},
    removeNotification: () => {},
});

const useNotification = () => useContext(NotificationContext);

const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    const addNotification = (message) => {
        setNotifications((prev) => [...prev, message]);
    };

    const removeNotification = (indexToDelete) => {
        setNotifications((prev) =>
            prev.filter((_, index) => index !== indexToDelete)
        );
    };

    return (
        <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
            {children}
        </NotificationContext.Provider>
    );
};

// Map user role to persona
const getPersonaFromRole = (role) => {
    if (role === "Team Lead") return "manager";
    if (role === "HR Manager") return "hr";
    return "employee";
};

const NotificationDropDown = ({ user }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { notifications: contextNotifications, addNotification, removeNotification } = useNotification();
    const [localNotifications, setLocalNotifications] = useState(contextNotifications);
    const dropdownRef = useRef(null);
    const bellRef = useRef(null);
    const hasInitializedNotifications = useRef(false); // Ref to track initialization

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };

    const handleClickOutside = (event) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target) &&
            bellRef.current &&
            !bellRef.current.contains(event.target)
        ) {
            setIsOpen(false);
        }
    };

    const handleDeleteNotification = (indexToDelete) => {
        removeNotification(indexToDelete);
    };

    useEffect(() => {
        setLocalNotifications(contextNotifications);
    }, [contextNotifications]);

    useEffect(() => {
        if (user?.role && !hasInitializedNotifications.current) { // Check if not initialized
            const persona = getPersonaFromRole(user.role);
            const initialNotifications = notificationsMap[persona] || [];
            initialNotifications.forEach(note => addNotification(note));

            hasInitializedNotifications.current = true; // Mark as initialized
        }
    }, [user?.role, contextNotifications, addNotification]);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Static notifications mapped to each persona
    const notificationsMap = {
        employee: [
            "📢 Your leave request was approved.",
            "📢 Your leave request was submitted.",
            "📅 Upcoming team meeting tomorrow at 10 AM.",
        ],
        manager: [
            "📢 You have a new leave request to approve.",
            "🛠 System maintenance scheduled for Friday.",
        ],
        hr: [
            "📝 New employee onboarding scheduled for next week.",
            "📢 Policy updates available in the HR portal.",
            "📢 Department 1 has at 40% team absences! Check team capacity across departments.",
        ],
    };

    return (
        <div className="relative">
            {/* Notification Bell Icon */}
            <div
                ref={bellRef}
                className="cursor-pointer relative"
                onClick={toggleDropdown}
            >
                <FaBell className="text-gray-600 dark:text-gray-300 text-2xl" />
                {localNotifications.length > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] rounded-full px-1">
                        {localNotifications.length}
                    </span>
                )}
            </div>

            {/* Notifications Dropdown */}
            {isOpen && (
                <div
                    ref={dropdownRef}
                    className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10"
                >
                    <div className="px-4 py-2 border-b dark:border-gray-700">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Notifications
                        </h3>
                    </div>
                    <div className="max-h-60 overflow-y-auto">
                        {localNotifications.length === 0 ? (
                            <p className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                                No new notifications.
                            </p>
                        ) : (
                            localNotifications.map((note, index) => (
                                <div
                                    key={index}
                                    className="flex justify-between items-start px-4 py-2 border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                    <p className="text-sm text-gray-700 dark:text-gray-300">
                                        {note}
                                    </p>
                                    <button
                                        onClick={() => handleDeleteNotification(index)}
                                        className="text-gray-400 hover:text-red-500"
                                        aria-label="Delete notification"
                                    >
                                        <IoMdClose />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationDropDown;

export { NotificationProvider, useNotification };
