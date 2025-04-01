import React, { useState } from "react";
import { FaTimes, FaSearch } from "react-icons/fa";
import Header from "../../../../components/layout/Header";
import NavigationBar from "../../../../components/layout/NavigationBar";
import PdfViewer from './PdfViewer';

const PreviousReports = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedPDF, setSelectedPDF] = useState(null);

    const navigationOptions = [
        { name: "March 2025", file: "/documents/test.pdf" }
    ];

    const filteredOptions = navigationOptions.filter((option) =>
        option.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const toggleNavigationBar = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        console.log("handleOptionClick triggered with:", option.file);
        setSelectedPDF([{ uri: option.file }]); // Set selected document for preview
    };

    React.useEffect(() => {
        console.log("selectedPDF updated to:", selectedPDF); // Debugging: Log selectedPDF changes
    }, [selectedPDF]);

    return (
        <div className="flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-all">
            <Header toggleNavigationBar={toggleNavigationBar} isOpen={isOpen} />

            <div className="flex flex-1">
                <NavigationBar isOpen={isOpen} toggleNavigationBar={toggleNavigationBar} />

                <div className="flex-1 min-h-screen transition-all" style={{ paddingLeft: isOpen ? "280px" : "100px" }}>
                    <div className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
                        <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md transition-colors pb-6">
                            <div className="flex justify-start items-center pt-6 pb-6 pl-6 transition-all">
                                <h1 className="text-4xl text-black dark:text-white font-bold" style={{ fontFamily: 'Kanit, sans-serif' }}>
                                    PREVIOUS REPORTS
                                </h1>
                            </div>
                            <div className="flex items-center p-3 gap-2 mt-3 mx-6 bg-gray-100 dark:bg-gray-700 rounded-full transition-all" style={{ maxWidth: "330px" }}>
                                <FaSearch className="text-gray-700 dark:text-gray-300 ml-2" />
                                <input
                                    type="text"
                                    className="bg-transparent text-gray-700 dark:text-gray-200 w-full text-sm"
                                    placeholder="Search"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                {searchQuery && (
                                    <FaTimes className="text-gray-700 dark:text-gray-300 mr-2 cursor-pointer" onClick={() => setSearchQuery("")} />
                                )}
                            </div>
                            <div className="mt-4 mx-6 p-4 bg-[#1F3557] dark:bg-gray-600 text-white rounded-lg" style={{ maxWidth: "330px" }}>
                                <div className="flex flex-col gap-2">
                                    {filteredOptions.map((option, index) => (
                                        <button
                                            key={index}
                                            className="text-left hover:bg-custom-green-27 p-2 rounded-md transition-colors"
                                            style={{ fontFamily: 'Kanit, sans-serif' }}
                                            onClick={() => handleOptionClick(option)}
                                        >
                                            {console.log("Rendering button for:", option.name)}
                                            {option.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            {selectedPDF && (
                                <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
                                    <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Kanit, sans-serif' }}>
                                        Document Preview
                                    </h2>
                                    <div className="doc-viewer">
                                        {/* {console.log("Rendering document preview for:", selectedPDF)}; */}
                                        <PdfViewer pdfUrl={selectedPDF[0].uri} />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PreviousReports;