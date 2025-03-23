import React from 'react';
import users from '../../../models/users.json';
import { useParams } from 'react-router-dom';

const DirectReports = () => {
  const { dashboardType } = useParams();
  const user = users[dashboardType];
  const managerName = user.lineManager;

  // Function to get an image or fallback to a gray circle
  const getImage = (name) => {
    try {
      return require(`../../../assets/images/users/${name.replace(/\s+/g, '')}.png`);
    } catch {
      return null;
    }
  };

  const managerImage = getImage(managerName);
  const userImage = getImage(user.name);

  // Find direct reports of the current user
  const directReports = Object.values(users).filter((u) => u.lineManager === user.name);

  return (
    <div className="ml-10 w-72"> {/* Fixed width for consistency */}
      <h2 className="text-lg font-semibold mb-4" style={{ fontFamily: 'Kanit, sans-serif' }}>Reporting Line:</h2>

      <div className="flex flex-col items-center">
        {/* Manager */}
        <div className="flex items-center mb-2">
          {managerImage ? (
            <img src={managerImage} alt={`${managerName}'s profile`} className="w-20 h-20 rounded-full" />
          ) : (
            <div className="w-20 h-20 bg-gray-400 rounded-full flex items-center justify-center text-white text-sm">No Image</div>
          )}
          <span className="ml-2" style={{ fontFamily: 'Kanit, sans-serif' }}>{managerName}</span>
        </div>

        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
        </svg>

        {/* Current User */}
        <div className="flex items-center mt-2 mb-4">
          {userImage ? (
            <img src={userImage} alt={`${user.name}'s profile`} className="w-16 h-16 rounded-full" />
          ) : (
            <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center text-white text-sm">No Image</div>
          )}
          <span className="ml-2" style={{ fontFamily: 'Kanit, sans-serif' }}>{user.name}</span>
        </div>

        {/* Direct Reports Section */}
        <div className="w-full min-h-[120px] flex flex-col items-center border-t border-gray-300 pt-2">
          <h3 className="text-md font-semibold mb-2" style={{ fontFamily: 'Kanit, sans-serif' }}>Direct Reports:</h3>
          {directReports.length > 0 ? (
            directReports.map((report) => {
              const reportImage = getImage(report.name);
              return (
                <div key={report.name} className="flex items-center mt-2">
                  {reportImage ? (
                    <img src={reportImage} alt={`${report.name}'s profile`} className="w-14 h-14 rounded-full" />
                  ) : (
                    <div className="w-14 h-14 bg-gray-400 rounded-full flex items-center justify-center text-white text-sm">No Image</div>
                  )}
                  <span className="ml-2" style={{ fontFamily: 'Kanit, sans-serif' }}>{report.name}</span>
                </div>
              );
            })
          ) : (
            <p className="text-gray-500 text-sm">No direct reports</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DirectReports;
