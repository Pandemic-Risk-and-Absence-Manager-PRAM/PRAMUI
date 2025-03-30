import React from 'react';
import Header from '../../../components/layout/Header';
import NavigationBar from "../../../components/layout/NavigationBar";
import './EmployeeAbsenceRequest.css';
import './ViewDocuments.css';

const ViewDocuments = () => {
    const [isOpen, setIsOpen] = React.useState(true);

    const toggleNavigationBar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="flex flex-col h-screen">
            <Header toggleNavigationBar={toggleNavigationBar} isOpen={isOpen} />

            <div className="flex flex-1">
                <NavigationBar isOpen={isOpen} toggleNavigationBar={toggleNavigationBar} />

                <div className="flex-1 min-h-screen">
                    <div className="p-6 h-screen bg-gray-100" style={{ paddingLeft: isOpen ? "280px" : "100px", transition: "padding-left 0.3s ease" }}>
                        <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md">
                            <div className="p-6 w-full overflow-x-auto">
                                <h1 className="text-3xl font-bold mb-6" style={{fontFamily: 'Kanit, sans-serif'}}>VIEW
                                    DOCUMENTS</h1>
                                {/*view documents sidebar*/}
                                <div className="box-green">
                                    <div className="content">
                                        <div className="left-section">
                                            <div className="text-title">COVID PCR Test Result</div>
                                            <div className="text-upload-info">Uploaded by: Alex Johnson | Mar 5,
                                                2025 at 14:32
                                            </div>
                                        </div>
                                        <div className="right-section">
                                            <div className="text-date">Mar 5, 2025</div>
                                            <div className="box-red">Positive</div>
                                        </div>
                                    </div>
                                </div>
                                {/*documents*/}
                                <div className="flex space-x-4 flex-row">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewDocuments;