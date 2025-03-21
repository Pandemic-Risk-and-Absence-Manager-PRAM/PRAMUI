import React from 'react';
import NavigationBar from '../../../components/layout/NavigationBar';
import Header from '../../../components/layout/Header';
import { FaUser, FaCalendarAlt, FaUpload } from "react-icons/fa";
import { BsFillFileEarmarkPlusFill } from "react-icons/bs";
import { MdOutlineReport } from "react-icons/md";
import { IoBook } from "react-icons/io5";
import users from '../../../models/users.json';
import { useParams, Link } from 'react-router-dom';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const AbsencePortal = () => {
  const { dashboardType } = useParams();
  const user = users[dashboardType];
  const [isOpen, setIsOpen] = React.useState(true);

  const toggleNavigationBar = () => {
    setIsOpen(!isOpen);
  };

  const remainingDays = user.totalDays - user.usedDays;

  return (
    <div className="flex h-screen flex-col">
      <Header toggleNavigationBar={toggleNavigationBar} isOpen={isOpen} />

      <div className="flex flex-1">
        <NavigationBar isOpen={isOpen} toggleNavigationBar={toggleNavigationBar} />

        <div className="flex flex-col flex-1 p-10">
          {/* Welcome Back message */}
          <div className="flex justify-center items-center mt-8 p-5">
            <div className="text-4xl text-black" style={{ fontFamily: 'Kanit, sans-serif' }}>
              Welcome Back {user.name}!
            </div>
          </div>

          {/* Time Balances */}
          <div className="bg-blue-100 p-8 rounded-lg mb-8">
            <div className="text-xl text-black" style={{ fontFamily: 'Kanit, sans-serif' }}>
                  Time Balances
            </div>
            <div className="grid grid-cols-3 gap-4 p-5">
              {/* Days Remaining */}
              <div className="flex flex-col items-center">
                <div className="w-20 h-20">
                  <CircularProgressbar 
                    value={(remainingDays / user.totalDays) * 100} 
                    text={remainingDays} 
                    styles={buildStyles({
                      textSize: '20px',
                      pathColor: '#123352',
                      textColor: '#333',
                      trailColor: '#ddd'
                    })} 
                  />
                </div>
                <span className="mt-2" style={{ fontFamily: 'Kanit, sans-serif' }}>Days Remaining</span>
              </div>

              {/* Days Used */}
              <div className="flex flex-col items-center">
                <div className="w-20 h-20">
                  <CircularProgressbar 
                    value={(user.usedDays / user.totalDays) * 100} 
                    text={user.usedDays} 
                    styles={buildStyles({
                      textSize: '20px',
                      pathColor: '#123352',
                      textColor: '#333',
                      trailColor: '#ddd'
                    })} 
                  />
                </div>
                <span className="mt-2" style={{ fontFamily: 'Kanit, sans-serif' }}>Days Used</span>
              </div>

              {/* Sick Days */}
              <div className="flex flex-col items-center">
                <div className="w-20 h-20">
                  <CircularProgressbar 
                    value={(user.sickDays / user.totalDays) * 100} 
                    text={user.sickDays} 
                    styles={buildStyles({
                      textSize: '20px',
                      pathColor: '#123352',
                      textColor: '#333',
                      trailColor: '#ddd'
                    })} 
                  />
                </div>
                <span className="mt-2" style={{ fontFamily: 'Kanit, sans-serif' }}>Sick Days</span>
              </div>
            </div>
          </div>

          {/* Dashboard Icons */}
          <div className="grid grid-cols-3 gap-8 flex-grow">
            <Link to="/profile" className="bg-[#cce3c7] p-4 rounded-lg flex flex-col items-center">
              <span className="text-3xl mb-2"><FaUser /></span>
              <span style={{ fontFamily: 'Kanit, sans-serif' }}>PROFILE</span>
            </Link>
            <Link to="/requests" className="bg-[#cce3c7] p-4 rounded-lg flex flex-col items-center">
              <span className="text-3xl mb-2"><BsFillFileEarmarkPlusFill /></span>
              <span style={{ fontFamily: 'Kanit, sans-serif' }}>MY REQUESTS</span>
            </Link>
            <Link to="/calendar" className="bg-[#cce3c7] p-4 rounded-lg flex flex-col items-center">
              <span className="text-3xl mb-2"><FaCalendarAlt /></span>
              <span style={{ fontFamily: 'Kanit, sans-serif' }}>CALENDAR</span>
            </Link>
            <Link to="/report-absence" className="bg-[#cce3c7] p-4 rounded-lg flex flex-col items-center">
              <span className="text-3xl mb-2"><MdOutlineReport /></span>
              <span style={{ fontFamily: 'Kanit, sans-serif' }}>REPORT ABSENCE</span>
            </Link>
            <Link to="/upload-documents" className="bg-[#cce3c7] p-4 rounded-lg flex flex-col items-center">
              <span className="text-3xl mb-2"><FaUpload /></span>
              <span style={{ fontFamily: 'Kanit, sans-serif' }}>UPLOAD DOCUMENTS</span>
            </Link>
            <Link to="/resources" className="bg-[#cce3c7] p-4 rounded-lg flex flex-col items-center">
              <span className="text-3xl mb-2"><IoBook /></span>
              <span style={{ fontFamily: 'Kanit, sans-serif' }}>RESOURCES</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AbsencePortal;
