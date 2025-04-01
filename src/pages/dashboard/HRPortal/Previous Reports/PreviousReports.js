import React, { useState, useEffect } from 'react';
import PdfViewer from './PdfViewer';  // Import the PdfViewer component
import Header from "../../../../components/layout/Header";
import NavigationBar from "../../../../components/layout/NavigationBar";

const PreviousReports = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [reports, setReports] = useState([]);

  // Example: Fetching the list of previous reports (You might fetch this from an API or database)
  useEffect(() => {
    const fetchedReports = [
      { id: 1, title: 'Report 1', pdfUrl: '/path-to-your-pdf/test.pdf' }
    ];

    setReports(fetchedReports);
  }, []);

  const toggleNavigationBar = () => {
    setIsOpen(!isOpen);
  };

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
                <h1 className="text-3xl font-bold mb-6 text-black dark:text-white" style={{ fontFamily: 'Kanit, sans-serif' }}>PREVIOUS REPORTS</h1>
                
                <div className="reports-list">
                  {reports.map(report => (
                    <div key={report.id} className="report-item mb-6 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-md">
                      <h2 className="text-xl font-semibold text-black dark:text-white">{report.title}</h2>
                      <PdfViewer pdfUrl="/test.pdf" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviousReports;
