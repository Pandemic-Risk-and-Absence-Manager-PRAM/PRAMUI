import React, { useState, useEffect, useRef } from 'react';
import { FaWheelchair } from "react-icons/fa";
import ADHDOverlay from './ADHDOverlay';

const profiles = [
  { name: "Seizure Safe Profile", desc: "Clear flashes & reduces color", icon: "⚡", className: "seizure-safe" },
  { name: "Vision Impaired Profile", desc: "Enhances website's visuals", icon: "👁️", className: "vision-impaired" },
  { name: "ADHD Friendly Profile", desc: "More focus & fewer distractions", icon: "🧠", className: "adhd-friendly" },
  { name: "Cognitive Disability Profile", desc: "Assists with reading & focusing", icon: "🧩", className: "cognitive-friendly" },
  { name: "Dark Mode", desc: "High contrast dark mode", icon: "🌙", className: "dark" },
  { name: "Dyslexic Filter", desc: "Boost color contrast", icon: "🌈", className: "high-contrast" },
];

const screenTints = [
  "#3B82F680", "#8B5CF680", "#EF444480", "#F9731680", "#10B98180", "#F3F4F680", "#11182780"
];

export default function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const [toggles, setToggles] = useState(() => {
    // Load previous toggle states from localStorage
    const savedToggles = localStorage.getItem('accessibilityToggles');
    return savedToggles ? JSON.parse(savedToggles) : {};
  });
  const [activeTint, setActiveTint] = useState(null);
  const popupRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleProfile = (name, className) => {
    setToggles((prev) => {
      const updated = { ...prev, [name]: !prev[name] };
      const enabled = updated[name];

      // Update localStorage whenever toggles change
      localStorage.setItem('accessibilityToggles', JSON.stringify(updated));

      if (enabled) {
        document.body.classList.add(className);
        document.documentElement.classList.add(className);
      } else {
        document.body.classList.remove(className);
        document.documentElement.classList.remove(className);

        // Remove tint if Dyslexic Filter is being toggled off
        if (name === "Dyslexic Filter") {
          removeScreenTint();
        }
      }

      return updated;
    });
  };

  const applyScreenTint = (color) => {
    setActiveTint(color);
    document.documentElement.style.setProperty('--screen-tint', color);
  };

  const removeScreenTint = () => {
    setActiveTint(null);
    document.documentElement.style.removeProperty('--screen-tint');
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
        className="fixed bottom-0 right-3 transform -translate-y-1/2 bg-[#cce3c7] dark:bg-custom-green-27 hover:bg-[#b2d1a8] dark:hover:bg-gray-600 text-white p-3 rounded-full shadow-lg z-50"
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

          {/* Profile Toggles */}
          <div className="space-y-3 mb-6">
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
                      className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform"
                      style={{ transform: toggles[name] ? 'translateX(20px)' : 'translateX(0)' }}
                    />
                  </div>
                </label>
              </div>
            ))}

            {/* Screen Tint Options */}
            {toggles["Dyslexic Filter"] && (
              <div className="mb-2 ml-2">
                <p className="font-medium text-white mb-2">Screen Tint</p>
                <div className="flex gap-2 flex-wrap mb-1">
                  {screenTints.map((color) => (
                    <div
                      key={color}
                      className="w-6 h-6 rounded-full cursor-pointer border-2"
                      style={{
                        backgroundColor: color,
                        borderColor: activeTint === color ? 'white' : 'transparent'
                      }}
                      onClick={() => applyScreenTint(color)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <ADHDOverlay isActive={toggles["ADHD Friendly Profile"]} />
    </>
  );
}
