import { useParams, Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import users from "../../models/users.json";
import logo from "../../assets/images/logo.png";
import PRAM from "../../assets/images/PRAM.png";
import NotificationDropDown from "../notifications/NotificationDropDown";
import ProfileDropDown from "../profile/ProfileDropDown";

const Header = ({ toggleNavigationBar }) => {
  const { dashboardType } = useParams();
  const user = users[dashboardType];

  // Load dark mode from local storage or default to false
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");
  const toggleRef = useRef(null);

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);

    // Apply dark mode class to <html> element
    if (newMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Ensure dark mode persists on page reload
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Handle drag toggle
  const handleDrag = (event) => {
    event.preventDefault();
    let startX = event.clientX || event.touches[0].clientX;

    const onMove = (moveEvent) => {
      let currentX = moveEvent.clientX || moveEvent.touches[0].clientX;
      let delta = currentX - startX;
      if (delta > 10 && !darkMode) {
        toggleDarkMode();
      } else if (delta < -10 && darkMode) {
        toggleDarkMode();
      }
    };

    const onEnd = () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onEnd);
      document.removeEventListener("touchmove", onMove);
      document.removeEventListener("touchend", onEnd);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onEnd);
    document.addEventListener("touchmove", onMove);
    document.addEventListener("touchend", onEnd);
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
            <img src={logo} alt="Logo" className="w-[40px] mr-2" />
            <img src={PRAM} alt="PRAM" className="w-[100px] mr-2" />
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {/* Dark Mode Toggle (Draggable with Icons) */}
          <div
            ref={toggleRef}
            onMouseDown={handleDrag}
            onTouchStart={handleDrag}
            className="relative w-16 h-6 bg-gray-300 dark:bg-gray-700 rounded-full flex items-center p-1 cursor-pointer transition-all"
          >
            {/* Sun (Light Mode) */}
            <FaSun className="text-yellow-500 absolute left-1 text-sm" />

            {/* Toggle Ball */}
            <div
              className={`w-5 h-5 bg-white dark:bg-gray-900 rounded-full shadow-md transform transition-transform ${
                darkMode ? "translate-x-9" : "translate-x-0"
              }`}
            />

            {/* Moon (Dark Mode) */}
            <FaMoon className="text-blue-500 absolute right-1 text-sm" />
          </div>

          {/* Notifications */}
          <NotificationDropDown />

          {/* User Profile */}
          <ProfileDropDown user={user} />
        </div>
      </header>

      {/* Push content down to prevent overlap */}
      <div className="pt-[49px]"></div>
    </div>
  );
};

export default Header;
