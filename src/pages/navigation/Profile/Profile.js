import React from 'react';
import users from '../../../models/users.json';
import { useParams } from 'react-router-dom';
import NavigationBar from '../../../components/layout/NavigationBar';
import Header from '../../../components/layout/Header';
import DirectReports from './DirectReports';

const Profile = () => {
  const { dashboardType } = useParams();
  const user = users[dashboardType];
  const [isOpen, setIsOpen] = React.useState(true);
  const image = require(`../../../assets/images/users/${user.name.replace(/\s+/g, '')}.png`);

  // Current Time for the profile including Time Zone
  const now = new Date();
  const currentTime = now.toLocaleTimeString();

  const timezoneOffset = now.getTimezoneOffset();
  const timezoneOffsetHours = Math.abs(Math.floor(timezoneOffset / 60));
  const timezoneOffsetMinutes = Math.abs(timezoneOffset % 60);
  const gmtOffset = `GMT${timezoneOffset > 0 ? '-' : '+'}${String(timezoneOffsetHours).padStart(2, '0')}:${String(timezoneOffsetMinutes).padStart(2, '0')}`;
  const formattedTime = `${currentTime} (${gmtOffset})`;

  const toggleNavigationBar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-screen flex-col">
      <Header toggleNavigationBar={toggleNavigationBar} isOpen={isOpen} />

      <div className="flex flex-1">
        <NavigationBar isOpen={isOpen} toggleNavigationBar={toggleNavigationBar} />
        <div className="flex-1 min-h-screen" style={{ paddingLeft: isOpen ? "280px" : "15px", transition: "padding-left 0.3s ease" }}>
          <div className="p-6 bg-gray-100">
            <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-md">
              <h1 className="text-4xl font-bold" style={{ fontFamily: 'Kanit, sans-serif' }}>{user.name}</h1>
              <div className="flex items-center mt-4">
                <div className="flex items-start">
                  <img src={image} alt={`${user.name}'s profile`} className="w-40 h-40 rounded-full" />
                  <div className="ml-10 flex-1">
                    <div className="p-4 border rounded-md shadow-sm" style={{ fontFamily: 'Kanit, sans-serif' }}>
                      <p><strong>Job Title:</strong> {user.role}</p>
                      <p><strong>ID:</strong> {user.id}</p>
                      <p><strong>Line Manager:</strong> {user.lineManager}</p>
                      <p><strong>Direct Reports:</strong> {user.directReports[1]}</p>
                      <p><strong>Teams:</strong> {user.teams}</p>
                      <p><strong>Location:</strong> {user.location}</p>
                      <p><strong>Status:</strong> {user.status}</p>
                    </div>
                  </div>
                </div>
                <DirectReports />
              </div>
              <div className="mt-6 p-4 border rounded-md shadow-sm" style={{ fontFamily: 'Kanit, sans-serif' }}>
                <h2 className="text-lg font-semibold">Contact Details:</h2>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Mobile Phone:</strong> {user.mobile}</p>
                <p><strong>Emergency Contact:</strong> {user.emergencyContact}</p>
                <p><strong>Current Time:</strong> {formattedTime}</p>
                <p><strong>Start Date:</strong> {user.startDate}</p>
              </div>
              <div className="mt-6 p-4 border rounded-md shadow-sm" style={{ fontFamily: 'Kanit, sans-serif' }}>
                <h2 className="text-lg font-semibold">Personal Bio:</h2>
                <p>{user.bio}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;