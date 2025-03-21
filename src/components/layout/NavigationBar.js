import { useState } from "react";
import { Link } from "react-router-dom";  // Import Link from react-router-dom
import { FaUser, FaCalendarAlt, FaUpload, FaQuestionCircle, FaCog, FaChartBar, FaSearch, FaTimes } from "react-icons/fa";
import { BsFillFileEarmarkPlusFill } from "react-icons/bs";
import { MdOutlineReport } from "react-icons/md";
import { IoBook } from "react-icons/io5";

const NavigationBar = ({ isOpen, toggleNavigationBar }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const menuItems = [
    { name: "Home", icon: <FaChartBar />, link: "/dashboard/employee" },
    { name: "Profile", icon: <FaUser />, link: "/profile" },
    { name: "My Requests", icon: <BsFillFileEarmarkPlusFill />, link: "/requests" },
    { name: "Calendar", icon: <FaCalendarAlt />, link: "/calendar" },
    { name: "Report Absence", icon: <MdOutlineReport />, link: "/report-absence" },
    { name: "Upload Documents", icon: <FaUpload />, link: "/upload" },
    { name: "Resources", icon: <IoBook />, link: "/resources" },
    { name: "Help", icon: <FaQuestionCircle />, link: "/help" },
    { name: "Settings", icon: <FaCog />, link: "/settings" },
  ];

  // Filter the menuItems based on the search query
  const filteredMenuItems = menuItems.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen"> 
      <div className={`bg-[#1F3557] h-screen p-5 pt-8 ${isOpen ? "w-[280px]" : "w-15"} duration-300 flex flex-col overflow-hidden`}>
        
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
        <ul className="mt-6 flex-1 overflow-y-hidden" style={{ fontFamily: 'Kanit, sans-serif' }}>
          {filteredMenuItems.map((item, index) => (
            <li key={index} className="flex items-center gap-x-4 p-3 text-gray-300 hover:bg-custom-green-27 rounded-md cursor-pointer">
              <span className="text-lg">{item.icon}</span>
              {isOpen && <Link to={item.link} className="text-base">{item.name}</Link>} {/* Use Link for navigation */}
            </li>
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
