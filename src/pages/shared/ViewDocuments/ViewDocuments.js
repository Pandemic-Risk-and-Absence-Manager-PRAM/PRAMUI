import React, { useState } from 'react';
import Header from '../../../components/layout/Header';
import NavigationBar from "../../../components/layout/NavigationBar";
import './ViewDocuments.css';
import { useParams } from "react-router-dom";
import AccessibilityWidget from '../../../components/accessibility/AccessibilityWidget';

const ViewDocuments = () => {
    const { dashboardType } = useParams();
    const [isOpen, setIsOpen] = useState(true);
    const [isVisible1, setIsVisible1] = useState(false);
    const [isVisible2, setIsVisible2] = useState(false);

    const toggleNavigationBar = () => {
        setIsOpen(!isOpen);
    };

    const toggleVisibility1 = () => {
        setIsVisible1(!isVisible1);
    };

    const toggleVisibility2 = () => {
        setIsVisible2(!isVisible2);
    };

    return (
        <div className="flex flex-col min-h-screen" style={{ fontFamily: 'Kanit, sans-serif' }}>
            <Header toggleNavigationBar={toggleNavigationBar} isOpen={isOpen} />

            <div className="flex flex-1">
                <NavigationBar isOpen={isOpen} toggleNavigationBar={toggleNavigationBar} />

                <div className="flex-1 min-h-screen transition-all" style={{ paddingLeft: isOpen ? "280px" : "100px" }}>
                    <div className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
                        <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md transition-colors">
                            <div className="p-6 w-full overflow-x-auto">
                                <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white" style={{ fontFamily: 'Kanit, sans-serif' }}>
                                    VIEW DOCUMENTS
                                </h1>
                                <div className="flex flex-row gap-6">
                                    <div className="flex-column">
                                        {/*view documents sidebar*/}
                                        <div className="box-green dark:bg-gray-700 dark:text-white" onClick={toggleVisibility1} style={{ cursor: 'pointer' }}>
                                            <div className="content">
                                                <div className="top-section">
                                                    <div className="text-title dark:text-white">COVID PCR Test Result</div>
                                                    <div className="text-upload-info dark:text-gray-400">Uploaded by: Alex Johnson | Mar 5, 2025 at 14:32</div>
                                                </div>
                                                <div className="bottom-section">
                                                    <div className="text-date dark:text-gray-400">Mar 5, 2025</div>
                                                    <div className="box-red dark:bg-red-800 dark:text-white">Positive</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-px bg-gray-300 dark:bg-gray-600 mx-4"></div>
                                        {/*document*/}
                                        {isVisible1 && (
                                            <div className="test-result-container flex-grow dark:bg-gray-700 dark:text-white">
                                                <div className="test-result-header dark:border-b dark:border-gray-700">
                                                    <h1 className="test-result-title dark:text-white ">COVID PCR Test Result</h1>
                                                    <a
                                                        href="/documents/view-documents/COVID_PCR_Test_Result.pdf"
                                                        download="COVID_PCR_Test_Result.pdf"
                                                        className="download-button dark:bg-gray-600 dark:border dark:border-gray-500 dark:text-white"
                                                    >
                                                        Download    
                                                    </a>
                                                </div>
                                                <div className="test-result-content">
                                                    <div className="test-result-section dark:border-b dark:border-gray-700">
                                                        <h2 className="test-result-section-title">COVID-19 RT-PCR Test Result</h2>
                                                        <p className="test-result-section-info">Test ID: COV-29938-Z | Date: Mar 5, 2025</p>
                                                    </div>
                                                    <div className="test-result-section dark:border-b dark:border-gray-700">
                                                        <p className="test-result-section-info"><strong>Patient:</strong> Alex Johnson</p>
                                                        <p className="test-result-section-info"><strong>Sample Collection:</strong> Mar 4, 2025</p>
                                                        <p className="test-result-section-info"><strong>Sample Type:</strong> Nasopharyngeal Swab</p>
                                                    </div>
                                                    <div className="test-result-section">
                                                        <p className="test-result-section-title">Result: POSITIVE</p>
                                                        <p className="test-result-section-info">SARS-CoV-2 RNA: Detected</p>
                                                    </div>
                                                </div>
                                                <div className="test-result-footer dark:border-t dark:border-gray-700">
                                                    <p>Uploaded by: Alex Johnson | Mar 5, 2025 at 14:32</p>
                                                    <p>| Page 1 of 1</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    {dashboardType === 'hr' && (
                                        <div className="flex-column">
                                            {/*2 document sidebar*/}
                                            <div className="box-green dark:bg-gray-700 dark:text-white" onClick={toggleVisibility2} style={{ cursor: 'pointer' }}>
                                                <div className="content">
                                                    <div className="top-section">
                                                        <div className="text-title dark:text-white">COVID At-Home Test</div>
                                                        <div className="text-upload-info dark:text-gray-400">Uploaded by: Pluto Smith | Apr 10, 2025 at 10:15</div>
                                                    </div>
                                                    <div className="bottom-section">
                                                        <div className="text-date dark:text-gray-400">Apr 10, 2025</div>
                                                        <div className="box-green-small dark:bg-green-800 dark:text-white">Negative</div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/*2 document*/}
                                            {isVisible2 && (
                                                <div className="test-result-container dark:bg-gray-800 dark:text-white">
                                                    <div className="test-result-header dark:border-b dark:border-gray-700">
                                                        <h1 className="test-result-title">COVID At-Home Test</h1>
                                                        <a
                                                        href="/documents/view-documents/COVID_PCR_Test_Result.pdf"
                                                        download="COVID_At-Home_Test_Result.pdf"
                                                        className="download-button dark:bg-gray-600 dark:border dark:border-gray-500 dark:text-white"
                                                        >
                                                            Download    
                                                        </a>
                                                    </div>
                                                    <div className="test-result-content">
                                                        <div className="test-result-section dark:border-b dark:border-gray-700">
                                                            <h2 className="test-result-section-title">COVID At-Home Test Result</h2>
                                                            <p className="test-result-section-info">Test ID: ANO-12345-X | Date: Apr 10, 2025</p>
                                                        </div>
                                                        <div className="test-result-section dark:border-b dark:border-gray-700">
                                                            <p className="test-result-section-info"><strong>Patient:</strong> Pluto Smith</p>
                                                            <p className="test-result-section-info"><strong>Sample Collection:</strong> Apr 9, 2025</p>
                                                            <p className="test-result-section-info"><strong>Sample Type:</strong> Lateral Flow Swab</p>
                                                        </div>
                                                        <div className="test-result-section">
                                                            <p className="test-result-section-title">Result: NEGATIVE</p>
                                                            <p className="test-result-section-info">SARS-CoV-2 RNA: Not Detected</p>
                                                        </div>
                                                    </div>
                                                    <div className="test-result-footer dark:border-t dark:border-gray-700">
                                                        <p>Uploaded by: Pluto Smith | Apr 10, 2025 at 10:15</p>
                                                        <p>| Page 1 of 1</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
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

export default ViewDocuments;