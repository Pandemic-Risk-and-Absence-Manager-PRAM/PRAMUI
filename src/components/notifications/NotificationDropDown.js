import React, { useState, useRef, useEffect } from 'react';
import { MdNotificationImportant } from "react-icons/md";

const NotificationDropDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <div className="flex items-center cursor-pointer border-r h-6 pr-2 mr-2" onClick={toggleDropdown}>
        <MdNotificationImportant  className="text-gray-600 mr-2" />
      </div>

      {/* User Notifications */}
      {isOpen && (
        <div ref={dropdownRef} className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg z-10">
          <div className="py-2">
            <div className="px-4 py-2 border-b">
              <h3 className="text-lg font-semibold">Notifications</h3>
            </div>
            <div className="px-4 py-2">
                {/* TODO: Add functioning notifications */}
              <p className="text-sm text-gray-700">You have a new message from Michael</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropDown;