import users from '../../models/users.json';
import { useParams } from 'react-router-dom';
import { FaBars } from "react-icons/fa";
import logo from '../../assets/images/logo.png';
import PRAM from '../../assets/images/PRAM.png';
import NotificationDropDown from "../notifications/NotificationDropDown";
import ProfileDropDown from "../profile/ProfileDropDown";

const Header = ({ toggleNavigationBar, isOpen }) => {
    const { dashboardType } = useParams();
    const user = users[dashboardType];
    
  return (
    <div className="flex-1 flex flex-col pl-2 pr-2 pt-1">
      <header className="bg-white p-0.5 border-b flex items-center justify-between">

        {/* Toggle Navigation Bar */}
        <div className="flex items-center">
          <button className="text-gray-600 mr-2" onClick={toggleNavigationBar}>
            <FaBars />
          </button>
          <div className="border-r pr-4 mr-3" style={{ fontFamily: 'Kanit, sans-serif' }}>MENU</div>
          <img src={logo} alt="Logo" className="w-[50px] mr-2" />
          <img src={PRAM} alt="PRAM" className="w-[120px] mr-2" />
        </div>
        <div className="flex items-center">
        <div className="border-gray-300 h-6 mx-4"></div>

        {/* Notifications */}
        <NotificationDropDown />

        {/* User Profile */}
        < ProfileDropDown user={user}/>
        </div>
      </header>
    </div>
  );
};

export default Header;