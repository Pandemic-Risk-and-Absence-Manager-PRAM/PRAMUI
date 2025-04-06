import React, { useState } from 'react';
import Header from '../../../components/layout/Header';
import NavigationBar from '../../../components/layout/NavigationBar';
import './SharedCalendar.css';

const SharedCalendar = () => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleNavigationBar = () => {
        setIsOpen(!isOpen);
    };

    return(
        <div className="flex flex-col bg-gray-100 dark:bg-gray-800 transition-colors">
        <Header toggleNavigationBar={toggleNavigationBar} isOpen={isOpen} />

        <div className="flex flex-1">
            <NavigationBar isOpen={isOpen} toggleNavigationBar={toggleNavigationBar} />
            
            <div className="flex-1 min-h-screen transition-all" style={{ paddingLeft: isOpen ? "280px" : "100px" }}>
                <div className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
                    <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md transition-colors">
                        <div className="p-6 w-full overflow-x-auto">
                            <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white" style={{ fontFamily: 'Kanit, sans-serif' }}>
                                CALENDAR 
                                </h1>
                            </div>
                            </div>
                            </div>
                            </div>
                            </div>
                            </div>
    )
}

export default SharedCalendar;