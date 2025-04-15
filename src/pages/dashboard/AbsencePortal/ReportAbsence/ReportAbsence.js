import React, { useState, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./ReportAbsence.css";
import Header from "../../../../components/layout/Header";
import NavigationBar from "../../../../components/layout/NavigationBar";
import AccessibilityWidget from "../../../../components/accessibility/AccessibilityWidget";
import FileUpload from "../UploadDocuments/FileUpload";

const ReportAbsence = () => {
  const { dashboardType } = useParams();
  const [isOpen, setIsOpen] = useState(true);
  const [absenceReason, setAbsenceReason] = useState("");
  const [absencePeriod, setAbsencePeriod] = useState({
    start: null,
    end: null, 
  });
  const [comments, setComments] = useState("");
  const [error, setError] = useState(""); 
  const [selectedPDF, setSelectedPDF] = useState(null);

  const toggleNavigationBar = () => {
    setIsOpen(!isOpen);
  };

  const handleFileSelected = (fileUrl) => {
    setSelectedPDF(fileUrl ? { uri: fileUrl } : null);
  };

  const handleSubmit = () => {
    // Validation
    if (!absenceReason && !absencePeriod.start && !absencePeriod.end) {
      setError("Please select an absence reason and an absence period.");
      return;
    }
    if (!absenceReason) {
      setError("Please select an absence reason.");
      return;
    }
    if (!absencePeriod.start || !absencePeriod.end) {
      setError("Please select an absence period.");
      return;
    }

    // Clear any previous errors
    setError("");

    alert("Absence Reported!");
    setAbsenceReason("");
    setAbsencePeriod({
      start: null,
      end: null,
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
    <div className="flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-all">
      <Header toggleNavigationBar={toggleNavigationBar} isOpen={isOpen} />
      <div className="flex flex-1">
        <NavigationBar isOpen={isOpen} toggleNavigationBar={toggleNavigationBar} />
        <div className="flex-1 min-h-screen">
          <div className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900"
            style={{ marginLeft: isOpen ? "280px" : "0px", transition: "margin-left 0.3s ease" }}>
            <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md transition-all">
              <div className="p-6 w-full overflow-x-auto">
                <h1 className="text-3xl font-bold mb-6 text-black dark:text-white" style={{ fontFamily: 'Kanit, sans-serif' }}>REPORT ABSENCE</h1>
                
                {/* Error when submitting form if unfilled */}
                {error && <p className="text-red-500 mb-4">{error}</p>}

                <div className="flex flex-wrap -mx-4" style={{ fontFamily: 'Kanit, sans-serif' }}>
                  {/* Absence Reason */}
                  <div className="w-full md:w-1/2 px-4 mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Absence Reason</label>
                    <select
                      className=" w-full mb-2 p-2 border rounded-lg text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 font-semibold text-center"
                      value={absenceReason}
                      onChange={(e) => setAbsenceReason(e.target.value)}
                    >
                      <option value="">Select Reason</option>
                      <option value="COVID">COVID</option>
                      <option value="Acute Illness">Acute Illness e.g. a cold</option>
                      <option value="Workplace Injury">Workplace Injury</option>
                    </select>
                     {/* File Upload */}
                     <div className="w-full px-4 mb-4">
                      <label className="block text-gray-700 dark:text-gray-300 font-medium text-sm mb-2">
                        Upload Supporting Documents (Optional)
                      </label>
                      <FileUpload onFileSelected={handleFileSelected}/>
                    </div>
                  </div>

                  {/* Absence Period Range */}
                  <div className="w-full md:w-1/2 px-4 mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
                      Expected Absence Period
                    </label>

                    <div className="mb-2 p-2 border rounded-lg text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 font-semibold text-center">
                      {formattedDateRange || "No date selected"}
                    </div>

                    {/* DatePicker (Calendar) */}
                    <div className="flex justify-center">
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
                        className="p-2 border rounded-lg dark:bg-gray-800 dark:text-white"
                        calendarClassName="modern-calendar"
                      />
                    </div>
                  </div>
                </div>

                <div className="w-full px-4 mb-4">
                  {/* Additional Comments */}
                  <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
                      Additional Comments (Optional)
                    </label>
                    <textarea
                      className="w-full p-2 border rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Type here"
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                    />
                  </div>

                  {/* Buttons */}
                  <div className="flex justify-between">
                    <Link to={`/dashboard/${dashboardType}`}>
                      <button className="bg-gray-300 dark:bg-gray-700 dark:text-white text-black px-4 py-2 rounded transition-all">
                        Cancel
                      </button>
                    </Link>
                    <button
                      onClick={handleSubmit}
                      className="bg-green-600 dark:bg-green-700 text-white px-4 py-2 rounded transition-all"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AccessibilityWidget />
    </div>
  );
};

export default ReportAbsence;