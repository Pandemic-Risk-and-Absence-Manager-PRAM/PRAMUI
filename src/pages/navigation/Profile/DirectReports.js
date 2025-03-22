import React from 'react';
import users from '../../../models/users.json';
import { useParams } from 'react-router-dom';

const DirectReports = () => {
  const { dashboardType } = useParams();
  const user = users[dashboardType];
  const managerName = users.manager.name;
  const image = require(`../../../assets/images/users/${user.name.replace(/\s+/g, '')}.png`);
  const managerImage = require(`../../../assets/images/users/${managerName.replace(/\s+/g, '')}.png`);

  return (
    <div className="ml-10">
      <h2 className="text-lg font-semibold mb-2" style={{ fontFamily: 'Kanit, sans-serif' }}>Reporting Line:</h2>
      <div className="flex flex-col items-center">
        <div className="flex items-center mb-2">
          <img src={managerImage} alt={`${managerName}'s profile`} className="w-20 h-20 rounded-full" />
          <span className="ml-2" style={{ fontFamily: 'Kanit, sans-serif' }}>{managerName}</span>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
        </svg>
        <div className="flex items-center mt-2">
          <img src={image} alt={`${user.name}'s profile`} className="w-16 h-15 rounded-full" />
          <span className="ml-2" style={{ fontFamily: 'Kanit, sans-serif' }}>{user.name}</span>
        </div>
      </div>
    </div>
  );
};

export default DirectReports;