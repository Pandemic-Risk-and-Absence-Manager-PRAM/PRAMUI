import React from 'react';
import NavigationBar from '../../../components/layout/NavigationBar';
import Header from '../../../components/layout/Header';
import { FaUser, FaCalendarAlt, FaUpload } from "react-icons/fa";
import { BsFillFileEarmarkPlusFill } from "react-icons/bs";
import { MdOutlineReport } from "react-icons/md";
import { IoBook } from "react-icons/io5";
import users from '../../../models/users.json';
import { useParams, Link } from 'react-router-dom';
import TimeBalances from '../../../components/time-balances/TimeBalances';

const AbsencePortal = () => {
  const { dashboardType } = useParams();
  const user = users[dashboardType];
  const [isOpen, setIsOpen] = React.useState(true);

  const toggleNavigationBar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header toggleNavigationBar={toggleNavigationBar} isOpen={isOpen} />

      <div className="flex flex-1">
        <NavigationBar isOpen={isOpen} toggleNavigationBar={toggleNavigationBar} />

        <div className="flex-1 min-h-screen" style={{ paddingLeft: isOpen ? "280px" : "100px", transition: "padding-left 0.3s ease" }}>
          <div className="p-6 h-screen bg-gray-100">
            <div className="max-w-5xl mx-auto bg-white p-0 rounded-lg shadow-md">
              <div className="flex flex-col overflow-y-auto p-10">
                {/* Welcome Back message */}
                <div className="flex justify-center items-center mt-8 pb-5">
                  <div className="text-4xl text-black" style={{ fontFamily: 'Kanit, sans-serif' }}>
                    Welcome Back {user.name}!
                  </div>
                </div>

                {/* Time Balances */}
                <TimeBalances />

                {/* Dashboard Icons */}
                <div className="grid grid-cols-3 gap-8 flex-grow">
                  <Link
                    to={`/dashboard/${dashboardType}/profile`}
                    className="bg-[#cce3c7] p-4 rounded-lg flex flex-col items-center transition-colors duration-300 hover:bg-[#b2d1a8]" 
                  >
                    <span className="text-3xl mb-2"><FaUser /></span>
                    <span style={{ fontFamily: 'Kanit, sans-serif' }}>PROFILE</span>
                  </Link>
                  <Link
                    to={`/dashboard/${dashboardType}/my-requests`}
                    className="bg-[#cce3c7] p-4 rounded-lg flex flex-col items-center transition-colors duration-300 hover:bg-[#b2d1a8]"
                  >
                    <span className="text-3xl mb-2"><BsFillFileEarmarkPlusFill /></span>
                    <span style={{ fontFamily: 'Kanit, sans-serif' }}>MY REQUESTS</span>
                  </Link>
                  <Link
                    to={`/dashboard/${dashboardType}/calendar`}
                    className="bg-[#cce3c7] p-4 rounded-lg flex flex-col items-center transition-colors duration-300 hover:bg-[#b2d1a8]"
                  >
                    <span className="text-3xl mb-2"><FaCalendarAlt /></span>
                    <span style={{ fontFamily: 'Kanit, sans-serif' }}>CALENDAR</span>
                  </Link>
                  <Link
                    to={`/dashboard/${dashboardType}/report-absence`}
                    className="bg-[#cce3c7] p-4 rounded-lg flex flex-col items-center transition-colors duration-300 hover:bg-[#b2d1a8]" 
                  >
                    <span className="text-3xl mb-2"><MdOutlineReport /></span>
                    <span style={{ fontFamily: 'Kanit, sans-serif' }}>REPORT ABSENCE</span>
                  </Link>
                  <Link
                    to={`/dashboard/${dashboardType}/upload-documents`}
                    className="bg-[#cce3c7] p-4 rounded-lg flex flex-col items-center transition-colors duration-300 hover:bg-[#b2d1a8]" 
                  >
                    <span className="text-3xl mb-2"><FaUpload /></span>
                    <span style={{ fontFamily: 'Kanit, sans-serif' }}>UPLOAD DOCUMENTS</span>
                  </Link>
                  <Link
                    to={`/dashboard/${dashboardType}/resources`}
                    className="bg-[#cce3c7] p-4 rounded-lg flex flex-col items-center transition-colors duration-300 hover:bg-[#b2d1a8]" 
                  >
                    <span className="text-3xl mb-2"><IoBook /></span>
                    <span style={{ fontFamily: 'Kanit, sans-serif' }}>RESOURCES</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AbsencePortal;