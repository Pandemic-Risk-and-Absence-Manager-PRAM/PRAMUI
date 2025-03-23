import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaUser, FaCalendarAlt, FaUpload, FaQuestionCircle, FaCog, FaChartBar, FaSearch, FaTimes } from "react-icons/fa";
import { BsFillFileEarmarkPlusFill } from "react-icons/bs";
import { MdOutlineReport } from "react-icons/md";
import { IoBook } from "react-icons/io5";

const NavigationBar = ({ isOpen, toggleNavigationBar }) => {
  const { dashboardType } = useParams();
  const [searchQuery, setSearchQuery] = useState("");

  const menuItems = [
    { name: "Home", icon: <FaChartBar />, link: `/dashboard/${dashboardType}` },
    { name: "Profile", icon: <FaUser />, link: `/dashboard/${dashboardType}/profile` },
    { name: "My Requests", icon: <BsFillFileEarmarkPlusFill />, link: `/dashboard/${dashboardType}/requests` },
    { name: "Calendar", icon: <FaCalendarAlt />, link: `/dashboard/${dashboardType}/calendar` },
    { name: "Report Absence", icon: <MdOutlineReport />, link: `/dashboard/${dashboardType}/report-absence` },
    { name: "Upload Documents", icon: <FaUpload />, link: `/dashboard/${dashboardType}/upload-documents` },
    { name: "Resources", icon: <IoBook />, link: `/dashboard/${dashboardType}/resources` },
    { name: "Help", icon: <FaQuestionCircle />, link: `/dashboard/${dashboardType}/help` },
    { name: "Settings", icon: <FaCog />, link: `/dashboard/${dashboardType}/settings` },
  ];

  // Filter the menuItems based on the search query
  const filteredMenuItems = menuItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex">
      <div className={`fixed h-screen bg-[#1F3557] p-5 pt-8 ${isOpen ? "w-[280px]" : "w-15"} duration-300 flex flex-col`}>

        {/* Search Bar (Conditional Rendering) */}
        {isOpen && (
          <div className="mt-2 flex items-center bg-white rounded-full p-2" style={{ fontFamily: 'Kanit, sans-serif' }}>
            <FaSearch className="text-gray-700 ml-2 mr-1" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent text-gray-700 outline-none w-full text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaTimes className="text-gray-700 mr-2 cursor-pointer" onClick={() => setSearchQuery("")} />
          </div>
        )}

        {/* Menu Items */}
        <ul className="mt-6 flex-1 overflow-y-auto" style={{ fontFamily: 'Kanit, sans-serif' }}>
          {filteredMenuItems.map((item, index) => (
            <Link to={item.link} key={index} className="flex items-center gap-x-4 p-3 text-gray-300 hover:bg-custom-green-27 rounded-md cursor-pointer">
              <span className="text-lg">{item.icon}</span>
              {isOpen && <span className="text-base">{item.name}</span>}
            </Link>
          ))}
        </ul>

        {/* Help Section (Conditional Rendering) */}
        {isOpen && (
          <div className="p-4 bg-custom-green-27 text-white rounded-lg text-center cursor-pointer">
            <FaQuestionCircle className="text-3xl mx-auto mb-2" />
            <p className="mt-2 text-sm">Need Help with PRAM?</p>
            <button className="mt-2 bg-[#123352] py-2 px-4 rounded-md text-sm">Go to help center</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavigationBar;