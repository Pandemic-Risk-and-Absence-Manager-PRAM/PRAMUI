import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Header from "../../../../components/layout/Header";
import NavigationBar from "../../../../components/layout/NavigationBar";

const ReportAbsence = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [absenceReason, setAbsenceReason] = useState("");
  const [absencePeriod, setAbsencePeriod] = useState({
    start: new Date(),
    end: new Date(),
  });
  const [comments, setComments] = useState("");

  const toggleNavigationBar = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = () => {
    alert("Absence Reported!");
    setAbsenceReason("");
    setAbsencePeriod({
      start: new Date(),
      end: new Date(),
    });
    setComments("");
  };

  const formattedDateRange = useMemo(() => {
    const formatDate = (date) => {
      if (!date) return "";
      return date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    };

    if (absencePeriod.start && absencePeriod.end) {
      return `${formatDate(absencePeriod.start)} - ${formatDate(absencePeriod.end)}`;
    }
    return "";
  }, [absencePeriod]);

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-all">
      <Header toggleNavigationBar={toggleNavigationBar} isOpen={isOpen} />
      <div className="flex flex-1">
        <NavigationBar isOpen={isOpen} toggleNavigationBar={toggleNavigationBar} />
        <div className="flex-1 min-h-screen">
          <div className="p-6 h-screen bg-gray-100 dark:bg-gray-900" style={{ marginLeft: isOpen ? "280px" : "0px", transition: "margin-left 0.3s ease" }}>
            <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md transition-all">
              <div className="p-6 w-full overflow-x-auto">
                <h1 className="text-3xl font-bold mb-6 text-black dark:text-white" style={{ fontFamily: 'Kanit, sans-serif' }}>REPORT ABSENCE</h1>

                <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                  <div className="flex flex-wrap -mx-4">
                    {/* Absence Reason */}
                    <div className="w-full md:w-1/2 px-4 mb-4">
                      <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Absence Reason</label>
                      <select
                        className="w-full p-2 border rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                        value={absenceReason}
                        onChange={(e) => setAbsenceReason(e.target.value)}
                      >
                        <option value="">Select Reason</option>
                        <option value="COVID">COVID</option>
                        <option value="Acute Illness">Acute Illness e.g. a cold</option>
                        <option value="Workplace Injury">Workplace Injury</option>
                      </select>
                    </div>

                    {/* Absence Period (Calendar) */}
                    <div className="w-full md:w-1/2 px-4 mb-4">
                      <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Expected Absence Period</label>
                      <div className="mb-2 p-2 border rounded-lg text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 font-semibold text-center">
                        {formattedDateRange}
                      </div>
                      <DatePicker
                        selected={absencePeriod.start}
                        onChange={(dates) => {
                          const [start, end] = dates;
                          setAbsencePeriod({ start, end });
                        }}
                        startDate={absencePeriod.start}
                        endDate={absencePeriod.end}
                        selectsRange
                        inline
                        className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:text-white"
                        calendarClassName="modern-calendar"
                      />
                    </div>
                  </div>

                  {/* Additional Comments */}
                  <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Additional Comments</label>
                    <textarea
                      className="w-full p-2 border rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Type here"
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                    />
                  </div>

                  {/* Buttons */}
                  <div className="flex justify-between">
                    <Link to="/dashboard">
                      <button className="bg-gray-300 dark:bg-gray-700 dark:text-white text-black px-4 py-2 rounded transition-all">Cancel</button>
                    </Link>
                    <button onClick={handleSubmit} className="bg-green-600 dark:bg-green-700 text-white px-4 py-2 rounded transition-all">Submit</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS to Style DatePicker */}
      <style>
        {`
        .modern-calendar .react-datepicker {
          width: 100%;
          background-color: #ffffff;
        }
        .dark .modern-calendar .react-datepicker {
          background-color: #1f2937;
          color: white;
        }
        .modern-calendar .react-datepicker__month-container {
          width: 100%;
          border: 1px solid #e2e8f0;
          border-radius: 0.375rem;
          padding: 1rem;
        }
        .dark .modern-calendar .react-datepicker__month-container {
          border: 1px solid #374151;
        }
        .modern-calendar .react-datepicker__day--selected,
        .modern-calendar .react-datepicker__day--keyboard-selected {
          background-color: #48bb78;
          color: white;
          border-radius: 50%;
        }
        .dark .modern-calendar .react-datepicker__day--selected,
        .dark .modern-calendar .react-datepicker__day--keyboard-selected {
          background-color: #38a169;
        }
        .modern-calendar .react-datepicker__day:hover {
          background-color: #edf2f7;
        }
        .dark .modern-calendar .react-datepicker__day:hover {
          background-color: #2d3748;
        }
        .react-datepicker__navigation {
          top: 10px !important;
          width: 32px !important;
          height: 32px !important;
        }
        .react-datepicker__navigation--previous {
          left: 10px !important;
        }
        .react-datepicker__navigation--next {
          right: 10px !important;
        }
        .react-datepicker__navigation-icon {
          top: 8px !important;
        }
        `}
      </style>
    </div>
  );
};

export default ReportAbsence;
