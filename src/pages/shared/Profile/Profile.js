import React, { useState, useEffect } from 'react';
import users from '../../../models/users.json';
import { useParams } from 'react-router-dom';
import NavigationBar from '../../../components/layout/NavigationBar';
import Header from '../../../components/layout/Header';
import DirectReports from './DirectReports';
import AccessibilityWidget from '../../../components/accessibility/AccessibilityWidget';

const Profile = () => {
  const { dashboardType } = useParams();
  const user = users[dashboardType];
  const [isOpen, setIsOpen] = useState(true);
  const image = require(`../../../assets/images/users/${user.name.replace(/\s+/g, '')}.png`);

  // State for updating the current time
  const [currentTime, setCurrentTime] = useState(() => {
    const now = new Date();
    return formatTime(now);
  });

  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(formatTime(new Date()));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Function to format time with GMT offset
  function formatTime(date) {
    const time = date.toLocaleTimeString();
    const timezoneOffset = date.getTimezoneOffset();
    const timezoneOffsetHours = Math.abs(Math.floor(timezoneOffset / 60));
    const timezoneOffsetMinutes = Math.abs(timezoneOffset % 60);
    const gmtOffset = `GMT${timezoneOffset > 0 ? '-' : '+'}${String(timezoneOffsetHours).padStart(2, '0')}:${String(timezoneOffsetMinutes).padStart(2, '0')}`;
    return `${time} (${gmtOffset})`;
  }

  const toggleNavigationBar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-all">
      <Header toggleNavigationBar={toggleNavigationBar} isOpen={isOpen} />
      <div className="flex flex-1">
        <NavigationBar isOpen={isOpen} toggleNavigationBar={toggleNavigationBar} />
        <div className="flex-1 min-h-screen">
          <div
            className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900"
            style={{ marginLeft: isOpen ? '280px' : '0px', transition: 'margin-left 0.3s ease' }}
          >
            <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md transition-all">
              <div className="p-6 w-full overflow-x-auto">
                <h1
                  className="text-3xl font-bold mb-6 text-black dark:text-white"
                  style={{ fontFamily: 'Kanit, sans-serif' }}
                >
                  {user.name}
                </h1>

                <div className="flex items-center mt-4">
                  <div className="flex items-start">
                    <img src={image} alt={`${user.name}'s profile`} className="w-40 h-40 dark:border-gray-700" />
                    <div className="ml-10 flex-1">
                      <div
                        className="p-4 border dark:border-gray-700 rounded-md shadow-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                        style={{ fontFamily: 'Kanit, sans-serif', display: 'inline-block', minWidth: '350px' }}
                      >
                        <p>
                          <strong>Job Title:</strong> {user.role}
                        </p>
                        <p>
                          <strong>ID:</strong> {user.id}
                        </p>
                        <p>
                          <strong>Line Manager:</strong> {user.lineManager}
                        </p>
                        <p>
                          <strong>Direct Reports:</strong> {user.directReports[1]}
                        </p>
                        <p>
                          <strong>Teams:</strong> {user.teams}
                        </p>
                        <p>
                          <strong>Location:</strong> {user.location}
                        </p>
                        <p>
                          <strong>Status:</strong> {user.status}
                        </p>
                      </div>
                    </div>
                  </div>
                  <DirectReports />
                </div>

                <div
                  className="mt-1 p-4 border dark:border-gray-700 rounded-md shadow-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                  style={{ fontFamily: 'Kanit, sans-serif' }}
                >
                  <h2 className="text-lg font-semibold">Contact Details:</h2>
                  <p>
                    <strong>Email:</strong> {user.email}
                  </p>
                  <p>
                    <strong>Mobile Phone:</strong> {user.mobile}
                  </p>
                  <p>
                    <strong>Emergency Contact:</strong> {user.emergencyContact}
                  </p>
                  <p>
                    <strong>Current Time:</strong> {currentTime}
                  </p>
                  <p>
                    <strong>Start Date:</strong> {user.startDate}
                  </p>
                </div>

                <div
                  className="mt-6 p-4 border dark:border-gray-700 rounded-md shadow-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                  style={{ fontFamily: 'Kanit, sans-serif' }}
                >
                  <h2 className="text-lg font-semibold">Personal Bio:</h2>
                  <p>{user.bio}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AccessibilityWidget />
    </div>
  );
};

export default Profile;