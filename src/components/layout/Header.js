import { FaBars, FaUser } from "react-icons/fa";
import logo from '../../assets/images/logo.png';
import PRAM from '../../assets/images/PRAM.png';

const Header = ({ toggleNavigationBar, isOpen }) => {
  return (
    <div className="flex-1 flex flex-col">
      <header className="bg-white p-2 flex items-center justify-between">
        <div className="flex items-center">
          <button className="text-gray-600 mr-4" onClick={toggleNavigationBar}>
            <FaBars />
          </button>
          <div className="border-r pr-4 mr-4" style={{ fontFamily: 'Kanit, sans-serif' }}>MENU</div>
          <img src={logo} alt="Logo" className="w-[50px] mr-2" />
          <img src={PRAM} alt="PRAM" className="w-[110px] mr-2" />
        </div>
        {/* TODO: Add Content */}
        <div>
          <FaUser className="text-gray-600" />
        </div>
      </header>
    </div>
  );
};

export default Header;