import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
// import "./UploadDocument.css";
import Header from "../../../../components/layout/Header";
import NavigationBar from "../../../../components/layout/NavigationBar";
import AccessibilityWidget from "../../../../components/accessibility/AccessibilityWidget";
import FileUpload from "./FileUpload";
import PdfViewer from "../../../shared/PdfViewer";

const UploadDocument = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedPDF, setSelectedPDF] = useState(null);

  const toggleNavigationBar = () => setIsOpen(!isOpen);

  const handleFileSelected = (fileUrl) => {
    setSelectedPDF(fileUrl ? { uri: fileUrl } : null);
  };

  useEffect(() => {
    console.log("Selected PDF updated to:", selectedPDF);
  }, [selectedPDF]);

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
                <h1 className="text-3xl font-bold mb-6 text-black dark:text-white" style={{ fontFamily: 'Kanit, sans-serif' }}>UPLOAD DOCUMENTS</h1>

                <div className="flex flex-col md:flex-row gap-6">
                  {/* File Upload */}
                  <div className="md:w-1/2 pt-10">
                    <FileUpload onFileSelected={handleFileSelected} />
                  </div>

                  {/* Upload Preview */}
                  <div className="md:w-1/2">
                    <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Kanit, sans-serif' }}>
                      Document Preview
                    </h2>
                    <div className="border rounded-lg shadow-md"
                      style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                      {selectedPDF ? (
                        <div style={{ width: "95%" }}>
                          <PdfViewer pdfUrl={selectedPDF.uri} />
                        </div>
                      ) : (
                        <p className="text-gray-500 p-4" style={{ fontFamily: 'Kanit, sans-serif' }}>Upload a document to preview...</p>
                      )}
                    </div>
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

export default UploadDocument;
