import React, { useState, useRef, useEffect } from "react";
import { FaBell } from "react-icons/fa";

const NotificationDropDown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const bellRef = useRef(null);

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

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative">
            {/* Notification Bell Icon */}
            <div ref={bellRef} className="cursor-pointer relative" onClick={toggleDropdown}>
                <FaBell className="text-gray-600 dark:text-gray-300 text-2xl" />
                {/* Notification Badge (if needed) */}
                <span className="absolute top-0 right-0 bg-red-500 text-white text-[8px] rounded-full px-1">
                    2
                </span>
            </div>

            {/* Notifications Dropdown */}
            {isOpen && (
                <div
                    ref={dropdownRef}
                    className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 transition-all"
                >
                    <div className="py-2">
                        <div className="px-4 py-2 border-b dark:border-gray-700">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Notifications
                            </h3>
                        </div>
                        <div className="px-4 py-2">
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                                📢 You have a new leave request to approve.
                            </p>
                            <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                                🛠 System maintenance scheduled for Friday.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationDropDown;
