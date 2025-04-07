import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaUser, FaCalendarAlt, FaUpload, FaQuestionCircle, FaCog, FaChartBar, FaEye, FaMapMarkedAlt, FaSearch, FaTimes } from "react-icons/fa";
import { BsFillFileEarmarkPlusFill } from "react-icons/bs";
import { MdOutlineReport } from "react-icons/md";
import { IoBook } from "react-icons/io5";
import { FaBookAtlas } from "react-icons/fa6";

const NavigationBar = ({ isOpen, toggleNavigationBar }) => {
  const { dashboardType } = useParams();
  const [searchQuery, setSearchQuery] = useState("");

  let menuItems = () => {
    switch (dashboardType) {
      case 'employee':
        return [
          { name: "Home", icon: <FaChartBar />, link: `/dashboard/${dashboardType}` },
          { name: "Profile", icon: <FaUser />, link: `/dashboard/${dashboardType}/profile` },
          { name: "My Requests", icon: <BsFillFileEarmarkPlusFill />, link: `/dashboard/${dashboardType}/my-requests` },
          { name: "Calendar", icon: <FaCalendarAlt />, link: `/dashboard/${dashboardType}/calendar` },
          { name: "Report Absence", icon: <MdOutlineReport />, link: `/dashboard/${dashboardType}/report-absence` },
          { name: "Upload Documents", icon: <FaUpload />, link: `/dashboard/${dashboardType}/upload-documents` },
          { name: "Resources", icon: <IoBook />, link: `/dashboard/${dashboardType}/resources` },
          { name: "Settings", icon: <FaCog />, link: `/dashboard/${dashboardType}/settings` }
        ];
      case 'manager':
        return [
          { name: "Home", icon: <FaChartBar />, link: `/dashboard/${dashboardType}` },
          { name: "Profile", icon: <FaUser />, link: `/dashboard/${dashboardType}/profile` },
          { name: "Employee Absence Requests", icon: <BsFillFileEarmarkPlusFill />, link: `/dashboard/${dashboardType}/employee-absence-requests` },
          { name: "Shared Calendar", icon: <FaCalendarAlt />, link: `/dashboard/${dashboardType}/shared-calendar` },
          { name: "View Documents", icon: <FaUpload />, link: `/dashboard/${dashboardType}/view-documents` },
          { name: "Predictive Insights", icon: <FaEye />, link: `/dashboard/${dashboardType}/predictive-insights` },
          { name: "Resources", icon: <IoBook />, link: `/dashboard/${dashboardType}/resources` },
          { name: "Settings", icon: <FaCog />, link: `/dashboard/${dashboardType}/settings` }
        ];
      case 'hr':
        return [
          { name: "Home", icon: <FaChartBar />, link: `/dashboard/${dashboardType}` },
          { name: "Profile", icon: <FaUser />, link: `/dashboard/${dashboardType}/profile` },
          { name: "Heatmap", icon: <FaMapMarkedAlt />, link: `/dashboard/${dashboardType}/heatmap` },
          { name: "View Documents", icon: <FaUpload />, link: `/dashboard/${dashboardType}/view-documents` },
          { name: "Predictive Insights", icon: <FaEye />, link: `/dashboard/${dashboardType}/predictive-insights` },
          { name: "Previous Reports", icon: <FaBookAtlas />, link: `/dashboard/${dashboardType}/previous-reports` },
          { name: "Resources", icon: <IoBook />, link: `/dashboard/${dashboardType}/resources` },
          { name: "Settings", icon: <FaCog />, link: `/dashboard/${dashboardType}/settings` }
        ];
      default:
        return <div>Invalid Dashboard Type</div>;
    }
  };

  // Filter the menuItems based on the search query
  const filteredMenuItems = menuItems().filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div 
      className={`fixed left-0 top-0 bg-[#1F3557] dark:bg-gray-800 p-5 pt-[80px] transition-all duration-300 ${
        isOpen ? "h-screen" : "h-screen"
      } flex flex-col overflow-y-hidden max-h-screen`}
    >
        {/* Search Bar */}
        {isOpen && (
          <div className="mt-2 flex items-center bg-white dark:bg-gray-700 rounded-full p-2 transition-all">
            <FaSearch className="text-gray-700 dark:text-gray-300 ml-2 mr-1" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent text-gray-700 dark:text-gray-200 outline-none w-full text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaTimes className="text-gray-700 dark:text-gray-300 mr-2 cursor-pointer" onClick={() => setSearchQuery("")} />
          </div>
        )}

        {/* Menu Items */}
        <ul className="mt-6 flex-grow overflow-hidden" style={{ fontFamily: 'Kanit, sans-serif', minHeight: isOpen ? '430px' : '630px'  }}>
          {filteredMenuItems.map((item, index) => (
            <Link 
              to={item.link} 
              key={index} 
              className="flex items-center gap-x-4 p-3 text-gray-300 dark:text-gray-200 hover:bg-custom-green-27 dark:hover:bg-custom-green-27 rounded-md cursor-pointer transition-all duration-300"
            >
              <span className="text-lg">{item.icon}</span>
              {isOpen && <span className="text-base">{item.name}</span>}
            </Link>
          ))}
        </ul>

        {/* Help Section */}
        {isOpen && (
        <div className="p-3 bg-custom-green-27 text-white rounded-lg text-center transition-all duration-300">
          <FaQuestionCircle className="text-3xl mx-auto mb-2" />
          <p className="mt-2 text-sm">Need Help with PRAM?</p>
          <Link to={`/dashboard/${dashboardType}/help`}>
            <button className="mt-2 bg-[#123352] dark:bg-gray-800 py-2 px-4 rounded-md text-sm transition-all duration-300">
              Go to Help Centre
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default NavigationBar;
