import React from 'react';
import NavigationBar from '../../../components/layout/NavigationBar';
import Header from '../../../components/layout/Header';
import users from '../../../models/users.json';
import { useParams } from 'react-router-dom';

const AbsencePortal = () => {
  const { dashboardType } = useParams();
  const user = users[dashboardType];
  const [isOpen, setIsOpen] = React.useState(true);

  const toggleNavigationBar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-screen flex-col">
      <Header toggleNavigationBar={toggleNavigationBar} isOpen={isOpen} />

      <div className="flex flex-1">
        <NavigationBar isOpen={isOpen} toggleNavigationBar={toggleNavigationBar} />

        <div className="flex flex-col flex-1">
          {/* Welcome Back message */}
          <div className="flex justify-center items-center mt-8">
            <div className="text-4xl text-black" style={{ fontFamily: 'Kanit, sans-serif' }}>
              Welcome Back {user.name}!
            </div>
          </div>
          
          {/* TODO: Add the dashbaoard icons */}
        </div>
      </div>
    </div>
  );
};

export default AbsencePortal;
