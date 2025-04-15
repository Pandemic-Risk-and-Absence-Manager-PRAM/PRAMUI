import { useParams, Link } from "react-router-dom";
import { FaBars, FaSun, FaMoon } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import users from "../../models/users.json";
import logoLight from "../../assets/images/logo.png";
import logoDark from "../../assets/images/logoDark.png";
import PRAMLight from "../../assets/images/PRAM.png";
import PRAMDark from "../../assets/images/PRAMDark.png";
import NotificationDropDown from "../notifications/NotificationDropDown";
import ProfileDropDown from "../profile/ProfileDropDown";

const Header = ({ toggleNavigationBar }) => {
  const { dashboardType } = useParams();
  const user = users[dashboardType];

  // Load dark mode from local storage
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");
  const dragStartX = useRef(null);
  const hasToggled = useRef(false);

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", newMode);
      document.documentElement.classList.toggle("dark", newMode);
      document.body.classList.toggle("dark", newMode); // <-- important
      return newMode;
    });
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    document.body.classList.toggle("dark", darkMode); // <-- add this
  }, [darkMode]);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const isDark = document.body.classList.contains('dark');
      setDarkMode(isDark);
    });
  
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class'],
    });
  
    return () => observer.disconnect();
  }, []);

  // Ensure dark mode persists on reload
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // Handle Drag Start
  const handleDragStart = (event) => {
    dragStartX.current = event.clientX || event.touches[0].clientX;
    hasToggled.current = false;
  };

  // Handle Drag Move
  const handleDragMove = (event) => {
    if (dragStartX.current === null || hasToggled.current) return;

    let currentX = event.clientX || event.touches[0].clientX;
    let deltaX = currentX - dragStartX.current;

    if (deltaX > 20 && !darkMode) {
      toggleDarkMode();
      hasToggled.current = true;
    } else if (deltaX < -20 && darkMode) {
      toggleDarkMode();
      hasToggled.current = true;
    }
  };

  // Handle Drag End
  const handleDragEnd = () => {
    dragStartX.current = null;
  };

  return (
    <div className="flex-1 flex flex-col">
      <header className="bg-white dark:bg-gray-900 dark:text-white p-2 border-b dark:border-gray-700 flex items-center justify-between fixed top-0 left-0 w-full z-40 transition-all">
        {/* Toggle Navigation Bar */}
        <div className="flex items-center">
          <button className="text-gray-600 dark:text-white mr-2 pl-2" onClick={toggleNavigationBar}>
            <FaBars />
          </button>
          <div className="border-r pr-4 mr-3 text-gray-700 dark:text-white" style={{ fontFamily: "Kanit, sans-serif" }}>
            MENU
          </div>
          <Link to={`/dashboard/${dashboardType}`} className="flex">
            <img src={darkMode ? logoDark : logoLight} alt="Logo" className="w-[40px] mr-2" />
            <img src={darkMode ? PRAMDark : PRAMLight} alt="PRAM" className="w-[100px] mr-2" />
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <div
            onMouseDown={handleDragStart}
            onTouchStart={handleDragStart}
            onMouseMove={handleDragMove}
            onTouchMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onTouchEnd={handleDragEnd}
            onClick={toggleDarkMode}
            className="relative w-16 h-6 bg-gray-300 dark:bg-gray-700 rounded-full flex items-center p-1 cursor-pointer transition-all"
          >
            <FaSun className="text-yellow-500 absolute left-1.5 text-sm z-10" />
            <div
              className={`w-5 h-5 bg-white dark:bg-gray-900 rounded-full shadow-md transform transition-transform ${
                darkMode ? "translate-x-9" : "translate-x-0"
              }`}
            />
            <FaMoon className="text-blue-500 absolute right-1.5 text-sm" />
          </div>

          <div className="flex items-center border-r border-gray-300 dark:border-white-700 pr-4">
            <NotificationDropDown user={user}/>
          </div>

          {/* User Profile */}
          <ProfileDropDown user={user} />
        </div>
      </header>

      <div className="pt-[49px]"></div>
    </div>
  );
};

export default Header;