import React, { useState } from "react";
import { FaTimes, FaSearch } from "react-icons/fa";
import Header from "../../../../components/layout/Header";
import NavigationBar from "../../../../components/layout/NavigationBar";
import PdfViewer from '../../../shared/PdfViewer';

const PreviousReports = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedPDF, setSelectedPDF] = useState(null);

    const navigationOptions = [
        { name: "January 2025", file: "/documents/previous-reports/January2025.pdf" },
        { name: "February 2025", file: "/documents/previous-reports/February2025.pdf" },
        { name: "March 2025", file: "/documents/previous-reports/March2025.pdf" },
    ];

    const filteredOptions = navigationOptions.filter((option) =>
        option.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const toggleNavigationBar = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        console.log("handleOptionClick triggered with:", option.file);
        setSelectedPDF((prevSelected) =>
            prevSelected && prevSelected.uri === option.file ? null : { uri: option.file }
        );
    };

    React.useEffect(() => {
        console.log("selectedPDF updated to:", selectedPDF);
    }, [selectedPDF]);

    return (
        <div className="flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-all">
            <Header toggleNavigationBar={toggleNavigationBar} isOpen={isOpen} />
            <div className="flex flex-1">
                <NavigationBar isOpen={isOpen} toggleNavigationBar={toggleNavigationBar} />
                <div className="flex-1 min-h-screen">
                    <div 
                        className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900"
                        style={{ marginLeft: isOpen ? "280px" : "0px", transition: "margin-left 0.3s ease" }}
                    >
                        <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                            <div className="flex">
                                {/* Left Sidebar */}
                                <div className="w-1/4 pr-6 border-r border-gray-300 dark:border-gray-700">
                                    <h1 className="text-4xl font-bold text-black dark:text-white mb-4" style={{ fontFamily: 'Kanit, sans-serif' }}>
                                        PREVIOUS REPORTS
                                    </h1>
                                    {/* Search Bar */}
                                    <div className="flex items-center p-3 bg-gray-200 dark:bg-gray-700 rounded-full">
                                        <FaSearch className="text-gray-700 dark:text-gray-300 ml-2 mr-1" />
                                        <input
                                            type="text"
                                            className="bg-transparent text-gray-700 dark:text-gray-200 w-full text-sm outline-none"
                                            placeholder="Search"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                        <FaTimes className="text-gray-700 dark:text-gray-300 mr-2 cursor-pointer" onClick={() => setSearchQuery("")} />
                                    </div>
                                    {/* Navigation */}
                                    <div className="mt-6 p-4 bg-[#1F3557] dark:bg-gray-600 text-white rounded-lg">
                                        <div className="flex flex-col gap-2">
                                            {filteredOptions.map((option, index) => (
                                                <button
                                                    key={index}
                                                    className="text-left hover:bg-custom-green-27 p-2 rounded-md transition-colors"
                                                    style={{ fontFamily: 'Kanit, sans-serif' }}
                                                    onClick={() => handleOptionClick(option)}
                                                >
                                                    {option.name}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                {/* Right Content */}
                                <div className="w-3/4 pl-6 flex flex-col relative">
                                    <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Kanit, sans-serif' }}>
                                        Document Preview
                                    </h2>

                                    {/* Download button */}
                                    {selectedPDF && (
                                        <a
                                            href={selectedPDF.uri}
                                            download
                                            className="absolute top-0 right-0 mt-1 mr-1 bg-green-800 text-white px-4 py-2 rounded-md text-sm hover:bg-green-900 transition"
                                        >
                                            Download Report
                                        </a>
                                    )}

                                    <div 
                                        className="border rounded-lg shadow-md"
                                        style={{ width: "100%", display: "flex", justifyContent: "center" }}
                                    >
                                        {selectedPDF ? (
                                            <div style={{ width: "95%" }}>
                                                <PdfViewer pdfUrl={selectedPDF.uri} />
                                            </div>
                                        ) : (
                                            <p className="text-gray-500 p-4">Select a document from the side menu to preview...</p>
                                        )}
                                    </div>
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