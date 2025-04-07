import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../components/accessibility/DarkModeContext';
import { FaWheelchair } from "react-icons/fa";

const profiles = [
    { name: "Seizure Safe Profile", desc: "Clear flashes & reduces color", icon: "⚡", className: "seizure-safe" },
    { name: "Vision Impaired Profile", desc: "Enhances website's visuals", icon: "👁️", className: "vision-impaired" },
    { name: "ADHD Friendly Profile", desc: "More focus & fewer distractions", icon: "🧠", className: "adhd-friendly" },
    { name: "Cognitive Disability Profile", desc: "Assists with reading & focusing", icon: "🧩", className: "cognitive-friendly" },
    { name: "Dark Mode", desc: "High contrast dark mode", icon: "🌙", className: "dark" },
    { name: "Dyslexic Filter", desc: "Boost color contrast", icon: "🌈", className: "high-contrast" },
  ];

export default function AccessibilityWidget() {
    const [open, setOpen] = useState(false);
    const [toggles, setToggles] = useState({});
    const popupRef = useRef(null);
    const buttonRef = useRef(null);


    const toggleProfile = (name, className) => {
    setToggles(prev => {
        const updated = { ...prev, [name]: !prev[name] };
        if (updated[name]) {
            document.body.classList.add(className);
            document.documentElement.classList.add(className);
          } else {
            document.body.classList.remove(className);
            document.documentElement.classList.remove(className);
          }
        return updated;
    });
    };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  return (
    <>
      {/* Floating Accessibility Button */}
      <button
        ref={buttonRef}
        className="fixed bottom-5 right-3 transform -translate-y-1/2 bg-[#cce3c7] dark:bg-custom-green-27 hover:bg-[#b2d1a8] dark:hover:bg-gray-600 text-white p-3 rounded-full shadow-lg z-50"
        onClick={() => setOpen(!open)}
        >
        <FaWheelchair />
      </button>

      {/* Side Popup */}
      {open && (
        <div
          ref={popupRef}
          className="fixed top-[60px] right-0 w-100 rounded-lg h-full bg-[#1F3557] dark:bg-gray-800 shadow-lg z-40 p-6 overflow-y-auto"
          style={{ fontFamily: 'Kanit, sans-serif' }}
        >
          <h2 className="text-xl font-semibold mb-4 text-white">Accessibility Adjustments</h2>

          <div className="space-y-3">
          {profiles.map(({ name, desc, icon, className }) => (
            <div key={name} className="bg-white dark:bg-gray-700 p-4 rounded-xl shadow flex justify-between items-center">
                <div>
                <p className="font-medium">{icon} {name}</p>
                <p className="text-sm text-gray-600 dark:text-white">{desc}</p>
                </div>
                <label className="inline-flex items-center cursor-pointer pl-3">
                <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={toggles[name] || false}
                    onChange={() => toggleProfile(name, className)}
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-[#1F3557] relative transition-colors">
                    <div
                        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform`}
                        style={{ transform: toggles[name] ? 'translateX(20px)' : 'translateX(0)' }}
                    />
                    </div>
                </label>
            </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}