import users from '../../models/users.json';
import { useParams, Link } from 'react-router-dom';
import { FaBars } from "react-icons/fa";
import logo from '../../assets/images/logo.png';
import PRAM from '../../assets/images/PRAM.png';
import NotificationDropDown from "../notifications/NotificationDropDown";
import ProfileDropDown from "../profile/ProfileDropDown";

const Header = ({ toggleNavigationBar, isOpen }) => {
  const { dashboardType } = useParams();
  const user = users[dashboardType];

  return (
    <div className="flex-1 flex flex-col">
      <header className="bg-white p-0.5 border-b flex items-center justify-between fixed top-0 left-0 w-full z-40">
        {/* Toggle Navigation Bar */}
        <div className="flex items-center">
          <button className="text-gray-600 mr-2 pl-2" onClick={toggleNavigationBar}>
            <FaBars />
          </button>
          <div className="border-r pr-4 mr-3" style={{ fontFamily: 'Kanit, sans-serif' }}>MENU</div>
          <Link to={`/dashboard/${dashboardType}`} className="flex">
          <img src={logo} alt="Logo" className="w-[50px] mr-2" />
          <img src={PRAM} alt="PRAM" className="w-[120px] mr-2" />
          </Link>
        </div>
        <div className="flex items-center">
          <div className="border-gray-300 h-6 mx-4"></div>

          {/* Notifications */}
          <NotificationDropDown />

          {/* User Profile */}
          <ProfileDropDown user={user} />
        </div>
      </header>
      <div className="pt-[49px]"></div>
    </div>
  );
};

export default Header;