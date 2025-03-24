import React from 'react';
import { useParams, Link } from 'react-router-dom';
import users from '../../../models/users.json';
import NavigationBar from '../../../components/layout/NavigationBar';
import Header from '../../../components/layout/Header';
import ManagerOverview from '../../../components/overview/ManagerOverview';
import { FaUser, FaCalendarAlt, FaUpload, FaEye } from "react-icons/fa";
import { BsFillFileEarmarkPlusFill } from "react-icons/bs";
import { IoBook } from "react-icons/io5";

const ManagerPortal = () => {
  const { dashboardType } = useParams();
  const user = users[dashboardType];
  const [isOpen, setIsOpen] = React.useState(true);

  const toggleNavigationBar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-all">
      <Header toggleNavigationBar={toggleNavigationBar} isOpen={isOpen} />

      <div className="flex flex-1 overflow-hidden">
        <NavigationBar isOpen={isOpen} toggleNavigationBar={toggleNavigationBar} />

        <div
          className="flex-1 min-h-screen p-6"
          style={{ paddingLeft: isOpen ? "280px" : "100px", transition: "padding-left 0.3s ease" }}
        >
          <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col flex-grow">
            <div className="flex flex-col overflow-hidden flex-grow">
              
              {/* Welcome Back message */}
              <div className="flex justify-center items-center mt-8 pb-5">
                <h1 className="text-4xl text-black dark:text-white font-bold" style={{ fontFamily: 'Kanit, sans-serif' }}>
                  Welcome Back {user.name}!
                </h1>
              </div>

              {/* Team Capacity + Requests Overview */}
              <ManagerOverview />

              {/* Dashboard Icons */}
              <div className="grid grid-cols-3 gap-8 flex-grow h-full" style={{ fontFamily: 'Kanit, sans-serif' }}>
                {[
                  { path: "profile", icon: <FaUser />, label: "PROFILE" },
                  { path: "employee-absence-requests", icon: <BsFillFileEarmarkPlusFill />, label: "EMPLOYEE ABSENCE REQUESTS" },
                  { path: "shared-calendar", icon: <FaCalendarAlt />, label: " SHARED CALENDAR" },
                  { path: "view-documents", icon: <FaUpload />, label: "VIEW DOCUMENTS" },
                  { path: "predictive-insights", icon: <FaEye />, label: "PREDICTIVE INSIGHTS" },
                  { path: "resources", icon: <IoBook />, label: "RESOURCES" },
                ].map(({ path, icon, label }) => (
                  <Link
                    key={path}
                    to={`/dashboard/${dashboardType}/${path}`}
                    className="bg-[#cce3c7] dark:bg-custom-green-27 p-4 rounded-lg flex flex-col items-center
                                      transition-colors duration-300 hover:bg-[#b2d1a8] dark:hover:bg-gray-600"
                  >
                    <span className="text-3xl mb-2">{icon}</span>
                    <span className="font-kanit">{label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerPortal;