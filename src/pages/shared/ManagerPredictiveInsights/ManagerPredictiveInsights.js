import React, { useState, useMemo, useEffect } from 'react';
import Header from '../../../components/layout/Header';
import NavigationBar from '../../../components/layout/NavigationBar';
import './ManagerPredictiveInsights.css';
import { useParams } from "react-router-dom";
import AccessibilityWidget from '../../../components/accessibility/AccessibilityWidget';

const ManagerPredictiveInsights = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [selectedLocation, setSelectedLocation] = useState('london');
    const [currentMonth, setCurrentMonth] = useState(5);
    const [currentDate] = useState(25);
    const { dashboardType } = useParams();
    const [cityCaseData, setCityCaseData] = useState({});

    const toggleNavigationBar = () => {
        setIsOpen(!isOpen);
    };

    const monthNames = [
        "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
        "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
    ];

    const teamDataByMonth = useMemo(() => {
        return [
            { team1: 3, team2: 7, team3: 2, team4: 6 },
            { team1: 5, team2: 4, team3: 3, team4: 0 },
            { team1: 2, team2: 8, team3: 3, team4: 0 },
            { team1: 10, team2: 0, team3: 0, team4: 0 },
            { team1: 3, team2: 3, team3: 3, team4: 3 },
            { team1: 4, team2: 6, team3: 2, team4: 0 },
            { team1: 5, team2: 5, team3: 0, team4: 0 },
            { team1: 3, team2: 4, team3: 2, team4: 5 },
            { team1: 2, team2: 2, team3: 2, team4: 2 },
            { team1: 0, team2: 8, team3: 0, team4: 0 },
            { team1: 8, team2: 3, team3: 0, team4: 0 },
            { team1: 2, team2: 3, team3: 4, team4: 5 }
        ];
    }, []);

    const goToPreviousMonth = () => {
        setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
    };

    const goToNextMonth = () => {
        setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
    };

    const goToPreviousNews = () => {
        setCurrentPage((prevPage) => Math.max(0, prevPage - 1));
    };

    const goToNextNews = () => {
        setCurrentPage((prevPage) => Math.min(newsItems.length - 1, prevPage + 1));
    };

    const handleLocationChange = (e) => {
        setSelectedLocation(e.target.value);
    };

    const newsItems = [
        {
            title: "Cases Hit Record High this June",
            content: "Cases hit a record high this June. Lockdown requirements are expected to become more stringent as cases increase..."
        },
        {
            title: "New Pandemic Guidelines Released",
            content: "The health department has released new pandemic guidelines for workplaces..."
        },
        {
            title: "Team 3 Shows Lowest Absence Rate",
            content: "Team 3 continues to maintain the lowest absence rate across all departments..."
        }
    ];

    const generateRandomWalkData = (length, start, maxStep) => {
        let current = start;
        const data = [current];
        for (let i = 1; i < length; i++) {
            const step = (Math.random() * 2 - 1) * maxStep; // Random step between -maxStep and maxStep
            current += step;
            data.push(Math.max(0, current)); // Ensure values don't go below 0
        }
        return data;
    };

    const locations = ['london', 'manchester', 'birmingham', 'leeds', 'glasgow', 'edinburgh', 'cardiff', 'belfast'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    useEffect(() => {
        const newCityCaseData = {};
        locations.forEach(city => {
            newCityCaseData[city] = generateRandomWalkData(12, Math.random() * 500, 100);
        });
        setCityCaseData(newCityCaseData);
    }, []);

    const currentCityData = cityCaseData[selectedLocation] || Array(12).fill(0);

    return(
        <div className="flex flex-col bg-gray-100 dark:bg-gray-800 transition-colors" style={{ fontFamily: 'Kanit, sans-serif' }}>
        <Header toggleNavigationBar={toggleNavigationBar} isOpen={isOpen} />

        <div className="flex flex-1">
            <NavigationBar isOpen={isOpen} toggleNavigationBar={toggleNavigationBar} />

            <div className="flex-1 min-h-screen transition-all" style={{ paddingLeft: isOpen ? "280px" : "100px" }}>
                <div className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
                    <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md transition-colors">
                        <div className="p-6 w-full overflow-x-auto">
                            <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white" style={{ fontFamily: 'Kanit, sans-serif' }}>
                                PREDICTIVE INSIGHTS
                            </h1>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                                <div className="absences-by-team dark:bg-gray-800">
                                    {dashboardType === 'manager' && (<h2 className="text-xl font-semibold mb-4 dark:text-white">Absences by Team</h2>)}
                                    {dashboardType === 'hr' && (<h2 className="text-xl font-semibold mb-4 dark:text-white">Absences by Department</h2>)}
                                    <div className="date-navigator">
                                        <button className="nav-arrow dark:text-gray-300" onClick={goToPreviousMonth}>&lt;</button>
                                        <span className="date dark:text-white">{monthNames[currentMonth]} {currentDate}</span>
                                        <button className="nav-arrow dark:text-gray-300" onClick={goToNextMonth}>&gt;</button>
                                    </div>

                                    <div className="pie-chart-container">
                                        <div className="pie-chart">
                                            <svg width="220" height="220" viewBox="0 0 220 220">

                                                <circle cx="110" cy="110" r="100" fill="white" className="dark:fill-gray-700" />

                                                <g>

                                                    {(() => {
                                                        const currentData = teamDataByMonth[currentMonth];
                                                        const total = currentData.team1 + currentData.team2 +
                                                                      currentData.team3 + currentData.team4;

                                                        const team1Percent = total > 0 ? currentData.team1 / total : 0;
                                                        const team2Percent = total > 0 ? currentData.team2 / total : 0;
                                                        const team3Percent = total > 0 ? currentData.team3 / total : 0;
                                                        const team4Percent = total > 0 ? currentData.team4 / total : 0;

                                                        const team1Angle = team1Percent * 360;
                                                        const team2Angle = team2Percent * 360;
                                                        const team3Angle = team3Percent * 360;
                                                        const team4Angle = team4Percent * 360;

                                                        let startAngle = 0;

                                                        const createSlice = (angle, color) => {
                                                            const endAngle = startAngle + angle;
                                                            const largeArcFlag = angle > 180 ? 1 : 0;

                                                            const startRad = (startAngle - 90) * Math.PI / 180;
                                                            const endRad = (endAngle - 90) * Math.PI / 180;

                                                            const startX = 110 + 100 * Math.cos(startRad);
                                                            const startY = 110 + 100 * Math.sin(startRad);
                                                            const endX = 110 + 100 * Math.cos(endRad);
                                                            const endY = 110 + 100 * Math.sin(endRad);

                                                            const path = `M 110 110 L ${startX} ${startY} A 100 100 0 ${largeArcFlag} 1 ${endX} ${endY} Z`;

                                                            startAngle = endAngle;

                                                            return <path d={path} fill={color} key={startAngle} />;
                                                        };

                                                        return (
                                                            <>
                                                                {createSlice(team1Angle, "#818CF8")}
                                                                {createSlice(team2Angle, "#FB923C")}
                                                                {createSlice(team3Angle, "#9CA3AF")}
                                                                {createSlice(team4Angle, "#60A5FA")}
                                                            </>
                                                        );
                                                    })()}
                                                </g>

                                                <circle cx="110" cy="110" r="40" fill="#F3F4F6" className="dark:fill-gray-600" fillOpacity="0.3" />
                                            </svg>
                                        </div>

                                        <div className="team-legend">
                                            <div className="team-item">
                                                <span className="team-color team1 dark:bg-indigo-400"></span>
                                                <span className="team-name dark:text-gray-300">Team 1</span>
                                                <span className="colon dark:text-gray-300">:</span>
                                                <span className="team-count dark:text-white">{teamDataByMonth[currentMonth].team1}</span>
                                            </div>
                                            <div className="team-item">
                                                <span className="team-color team2 dark:bg-orange-400"></span>
                                                <span className="team-name dark:text-gray-300">Team 2</span>
                                                <span className="colon dark:text-gray-300">:</span>
                                                <span className="team-count dark:text-white">{teamDataByMonth[currentMonth].team2}</span>
                                            </div>
                                            <div className="team-item">
                                                <span className="team-color team3 dark:bg-gray-400"></span>
                                                <span className="team-name dark:text-gray-300">Team 3</span>
                                                <span className="colon dark:text-gray-300">:</span>
                                                <span className="team-count dark:text-white">{teamDataByMonth[currentMonth].team3}</span>
                                            </div>
                                            <div className="team-item">
                                                <span className="team-color team4 dark:bg-blue-400"></span>
                                                <span className="team-name dark:text-gray-300">Team 4</span>
                                                <span className="colon dark:text-gray-300">:</span>
                                                <span className="team-count dark:text-white">{teamDataByMonth[currentMonth].team4}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="recent-news dark:bg-gray-800">
                                    <h2 className="text-xl font-semibold mb-4 dark:text-white">Recent News</h2>

                                    <div className="news-card dark:bg-gray-700">
                                        <h3 className="news-title dark:text-white">{newsItems[currentPage].title}</h3>
                                        <p className="news-content dark:text-gray-300">{newsItems[currentPage].content}</p>

                                        <div className="news-pagination">
                                            <button
                                                className="pagination-button back-button dark:text-blue-400 dark:disabled:text-gray-500"
                                                onClick={goToPreviousNews}
                                                disabled={currentPage === 0}
                                            >
                                                Back
                                            </button>

                                            <div className="pagination-dots">
                                                {newsItems.map((_, index) => (
                                                    <span
                                                        key={index}
                                                        className={`pagination-dot ${index === currentPage ? 'active dark:bg-blue-500' : 'dark:bg-gray-500'}`}
                                                        onClick={() => setCurrentPage(index)}
                                                    ></span>
                                                ))}
                                            </div>

                                            <button
                                                className="pagination-button next-button dark:text-blue-400 dark:disabled:text-gray-500"
                                                onClick={goToNextNews}
                                                disabled={currentPage === newsItems.length - 1}
                                            >
                                                Next
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="confirmed-cases dark:bg-gray-800">
                                <div className="location-header">
                                    <h2 className="text-xl font-semibold dark:text-white">Confirmed Cases</h2>
                                    <div className="location-dropdown">
                                        <select
                                            className="location-select dark:text-white dark:bg-gray-800"
                                            value={selectedLocation}
                                            onChange={handleLocationChange}
                                        >
                                            {locations.map(city => (
                                                <option key={city} value={city}>{city.charAt(0).toUpperCase() + city.slice(1)}</option>
                                            ))}
                                        </select>
                                        <span className="dropdown-arrow dark:text-white">▼</span>
                                    </div>
                                </div>
                                <div className="line-chart-container">
                                    <div className="line-chart dark:bg-gray-700">
                                        <svg width="100%" height="100%" viewBox="0 0 1000 300">
                                            {/* Grid lines */}
                                            {[250, 200, 150, 100, 50, 0].map(y => (
                                                <line
                                                    key={y}
                                                    x1="40"
                                                    y1={y}
                                                    x2="950"
                                                    y2={y}
                                                    stroke="#E5E7EB"
                                                    className="dark:stroke-gray-600"
                                                    strokeWidth="1"
                                                />
                                            ))}

                                            {/* Y-axis labels */}
                                            {[800, 600, 400, 200, 0].map(num => (
                                                <text
                                                    key={num}
                                                    x="10"
                                                    y={250 - num * 0.25}
                                                    fill="#9CA3AF"
                                                    className="dark:fill-gray-400"
                                                    fontSize="12"
                                                    fontWeight="500"
                                                    textAnchor="start"
                                                    dominantBaseline="middle"
                                                >
                                                    {num}
                                                </text>
                                            ))}

                                            {/* X-axis labels */}
                                            {months.map((month, index) => (
                                                <text
                                                    key={month}
                                                    x={40 + index * 80}
                                                    y="270"
                                                    fill="#9CA3AF"
                                                    className="dark:fill-gray-400"
                                                    fontSize="12"
                                                    fontWeight="500"
                                                    textAnchor="middle"
                                                    dominantBaseline="hanging"
                                                >
                                                    {month}
                                                </text>
                                            ))}

                                            {/* Line */}
                                            <path
                                                d={`M40,${250 - currentCityData[0] * 0.25} ${currentCityData.map((data, index) => `L${40 + index * 80},${250 - data * 0.25}`).join(' ')}`}
                                                fill="none"
                                                stroke="#3B82F6"
                                                strokeWidth="2"
                                            />

                                            {/* Data points */}
                                            {currentCityData.map((data, index) => (
                                                <circle
                                                    key={index}
                                                    cx={40 + index * 80}
                                                    cy={250 - data * 0.25}
                                                    r="3"
                                                    fill="#3B82F6"
                                                />
                                            ))}
                                        </svg>
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

export default ManagerPredictiveInsights;