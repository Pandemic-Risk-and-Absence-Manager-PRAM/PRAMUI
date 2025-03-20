import React, { useState, useRef, useEffect } from 'react';
import { FaCaretUp, FaCaretDown, FaUser } from 'react-icons/fa';

const ProfileDropDown = ({ user }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [userImage, setUserImage] = useState(null);

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

    useEffect(() => {
        try {
            const image = require(`../../assets/images/users/${user.name.replace(/\s+/g, '')}.png`);
            setUserImage(image);
        } catch (error) {
            setUserImage(null); 
        }
      }, [user.name]);

    return (
        <div className="relative">
        <div className="flex items-center cursor-pointer" onClick={toggleDropdown}>
        {userImage ? (
          <img src={userImage} alt="User" className="w-[45px] mr-2" />
        ) : (
          <FaUser className="w-[45px] mr-2 text-gray-600" />
        )}
        <div className="pr-4 mr-0" style={{ fontFamily: 'Kanit, sans-serif' }}>{user.name}</div>
        {isOpen ? <FaCaretUp className="text-gray-600" /> : <FaCaretDown className="text-gray-600" />}
        </div>

        {/* User Profile Summary */}
        {isOpen && (
            <div ref={dropdownRef} className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg z-10">
            <div className="py-2">
                <div className="px-4 py-2 border-b">
                <h3 className="text-lg font-semibold">Profile Summary</h3>
                </div>
                <div className="px-4 py-2">
                <p className="text-sm text-gray-700"><strong>Name:</strong> {user.name}</p>
                <p className="text-sm text-gray-700"><strong>Email:</strong> {user.email}</p>
                <p className="text-sm text-gray-700"><strong>Department:</strong> {user.department}</p>
                <p className="text-sm text-gray-700"><strong>Role:</strong> {user.role}</p>
                </div>
            </div>
            </div>
        )}
        </div>
    );
    };

export default ProfileDropDown;