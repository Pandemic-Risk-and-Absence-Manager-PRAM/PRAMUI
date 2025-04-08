import React, {useState} from 'react';
import NavigationBar from "../../../components/layout/NavigationBar";
import Header from "../../../components/layout/Header";
import PdfViewer from "../PdfViewer"
import {FaSearch, FaTimes} from "react-icons/fa";
import AccessibilityWidget from '../../../components/accessibility/AccessibilityWidget';

const Resources = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedPDF, setSelectedPDF] = useState(null);

    const navigationOptions = [
        { name: "Sick Leave Policy", file: "/documents/resources/SickLeavePolicy.pdf" },
        { name: "Absence Reporting Procedure", file: "/documents/resources/AbsenceReportingProcedure.pdf" },
        { name: "Remote Work Arrangements", file: "/documents/resources/RemoteWorkArrangements.pdf" },
        { name: "Return to Work Protocol", file: "/documents/resources/RTO.pdf" },
        { name: "Pandemic Response Plan", file: "/documents/resources/SickLeavePolicy.pdf" },
        { name: "Health Insurance Coverage", file: "/documents/resources/HealthInsurance.pdf" },
        { name: "Employee Support Resources", file: "/documents/resources/SickLeavePolicy.pdf" }
    ];

    const filteredOptions = navigationOptions.filter((option) =>
        option.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const toggleNavigationBar = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        setSelectedPDF((prevSelected) =>
            prevSelected && prevSelected.uri === option.file ? null : { uri: option.file }
        );
    };

    React.useEffect(() => {
        console.log("selectedPDF updated to:", selectedPDF);
    }, [selectedPDF]);

    return (
        <div className="flex flex-col bg-gray-100 dark:bg-gray-800 transition-colors" style={{ fontFamily: 'Kanit, sans-serif' }}>
            <Header toggleNavigationBar={toggleNavigationBar} isOpen={isOpen} />

            <div className="flex flex-1">
                <NavigationBar isOpen={isOpen} toggleNavigationBar={toggleNavigationBar} />

                <div className="flex-1 min-h-screen transition-all" style={{ paddingLeft: isOpen ? "280px" : "100px" }}>
                    <div className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
                        <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md transition-colors">
                            <div className="p-6 w-full overflow-x-auto">
                                <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white" style={{ fontFamily: 'Kanit, sans-serif' }}>
                                    RESOURCES
                                </h1>
                                <div className="w-[907px] bg-blue-50 dark:bg-gray-700 p-4 rounded-md">
                                    <div className="text-cyan-900 text-lg font-bold dark:text-white">Recent Updates</div>
                                    <div className="text-cyan-900 text-sm mt-2 dark:text-white">New sick leave policy due to pandemic situation - Updated Mar 1, 2025</div>
                                    <div className="text-cyan-900 text-sm mt-1 dark:text-white">Return to office guidelines for recovered employees - Updated Feb 15, 2025</div>
                                </div>
                                <div className="flex p-4">
                                    {/* sidebar */}
                                    <div className="w-1/4 pr-6 border-r border-gray-300 dark:border-gray-700">
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
                                    {/* documents */}
                                    <div className="w-3/4 pl-6 flex flex-col">
                                        <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Kanit, sans-serif' }}>
                                            Document Preview
                                        </h2>
                                        <div
                                            className="border rounded-lg shadow-md overflow-y-auto overflow-x-auto"
                                            style={{ maxHeight: "700px", width: "100%", display: "flex", justifyContent: "center" }}
                                        >
                                            {selectedPDF ? (
                                                <div style={{ width: "95%", height: "600px" }}>
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
            <AccessibilityWidget />
        </div>
    );
};

export default Resources;