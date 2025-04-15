import React, { useState, useRef, useEffect } from "react";
import { FaBell } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

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

// Map user role to persona
const getPersonaFromRole = (role) => {
  if (role === "Team Lead") return "manager";
  if (role === "HR Manager") return "hr";
  return "employee";
};

const NotificationDropDown = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
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

  const handleDeleteNotification = (indexToDelete) => {
    setNotifications((prev) =>
      prev.filter((_, index) => index !== indexToDelete)
    );
  };

  // Update notifications based on user role
  useEffect(() => {
    if (user?.role) {
      const persona = getPersonaFromRole(user.role);
      setNotifications(notificationsMap[persona] || []);
    }
  }, [user]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      {/* Notification Bell Icon */}
      <div
        ref={bellRef}
        className="cursor-pointer relative"
        onClick={toggleDropdown}
      >
        <FaBell className="text-gray-600 dark:text-gray-300 text-2xl" />
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] rounded-full px-1">
            {notifications.length}
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
            {notifications.length === 0 ? (
              <p className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                No notifications.
              </p>
            ) : (
              notifications.map((note, index) => (
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
