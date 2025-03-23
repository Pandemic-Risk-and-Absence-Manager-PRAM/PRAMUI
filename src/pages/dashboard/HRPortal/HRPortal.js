import React from 'react';
import NavigationBar from '../../../components/layout/NavigationBar';
import Header from '../../../components/layout/Header';
import { FaUser, FaUpload, FaEye, FaMapMarkedAlt } from "react-icons/fa";
import { IoBook } from "react-icons/io5";
import users from '../../../models/users.json';
import { useParams, Link } from 'react-router-dom';
import { FaBookAtlas } from 'react-icons/fa6';

const HRPortal = () => {
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
                    to={`/dashboard/${dashboardType}/heatmap`}
                    className="bg-[#cce3c7] p-4 rounded-lg flex flex-col items-center transition-colors duration-300 hover:bg-[#b2d1a8]"
                  >
                    <span className="text-3xl mb-2"><FaMapMarkedAlt /></span>
                    <span style={{ fontFamily: 'Kanit, sans-serif' }}>HEATMAP</span>
                  </Link>
                  <Link
                    to={`/dashboard/${dashboardType}/view-documents`}
                    className="bg-[#cce3c7] p-4 rounded-lg flex flex-col items-center transition-colors duration-300 hover:bg-[#b2d1a8]" 
                  >
                    <span className="text-3xl mb-2"><FaUpload /></span>
                    <span style={{ fontFamily: 'Kanit, sans-serif' }}>VIEW DOCUMENTS</span>
                  </Link>
                  <Link
                    to={`/dashboard/${dashboardType}/predictive-insights`}
                    className="bg-[#cce3c7] p-4 rounded-lg flex flex-col items-center transition-colors duration-300 hover:bg-[#b2d1a8]" 
                  >
                    <span className="text-3xl mb-2"><FaEye /></span>
                    <span style={{ fontFamily: 'Kanit, sans-serif' }}>PREDICTIVE INSIGHTS</span>
                  </Link>
                  <Link
                    to={`/dashboard/${dashboardType}/previous-reports`}
                    className="bg-[#cce3c7] p-4 rounded-lg flex flex-col items-center transition-colors duration-300 hover:bg-[#b2d1a8]" 
                  >
                    <span className="text-3xl mb-2"><FaBookAtlas /></span>
                    <span style={{ fontFamily: 'Kanit, sans-serif' }}>PREVIOUS REPORTS</span>
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

export default HRPortal;