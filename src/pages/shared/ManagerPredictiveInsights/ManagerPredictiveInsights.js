import React, { useState, useMemo } from 'react';
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
        let newMonth = currentMonth;
        if (newMonth === 0) {
            newMonth = 11;
        } else {
            newMonth = newMonth - 1;
        }
        setCurrentMonth(newMonth);
    };
    
    const goToNextMonth = () => {
        let newMonth = currentMonth;
        if (newMonth === 11) {
            newMonth = 0;
        } else {
            newMonth = newMonth + 1;
        }
        setCurrentMonth(newMonth);
    };

    const goToPreviousNews = () => {
        let newPage = currentPage;
        if (newPage > 0) {
            newPage = newPage - 1;
        }
        setCurrentPage(newPage);
    };
    
    const goToNextNews = () => {
        let newPage = currentPage;
        if (newPage < newsItems.length - 1) {
            newPage = newPage + 1;
        }
        setCurrentPage(newPage);
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
                                PREDICTIVE INSIGHTS
                                </h1>
                                
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                                    <div className="absences-by-team dark:bg-gray-800">
                                        {dashboardType === 'manager' && (<h2 className="text-xl font-semibold mb-4 dark:text-white">Absences by Team</h2>)}
                                        {dashboardType === 'hr' && (<h2 className="text-xl font-semibold mb-4 dark:text-white">Absences by department</h2>)}
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
                                                            
                                                            const team1Percent = currentData.team1 / total;
                                                            const team2Percent = currentData.team2 / total;
                                                            const team3Percent = currentData.team3 / total;
                                                            const team4Percent = currentData.team4 / total;
                                                            
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
                                                <option value="london">LONDON</option>
                                                <option value="manchester">MANCHESTER</option>
                                                <option value="birmingham">BIRMINGHAM</option>
                                                <option value="leeds">LEEDS</option>
                                                <option value="glasgow">GLASGOW</option>
                                                <option value="edinburgh">EDINBURGH</option>
                                                <option value="cardiff">CARDIFF</option>
                                                <option value="belfast">BELFAST</option>
                                            </select>
                                            <span className="dropdown-arrow dark:text-white">▼</span>
                                        </div>
                                    </div>
                                    
                                    <div className="line-chart-container">
                                        <div className="line-chart dark:bg-gray-700">
                                            <svg width="100%" height="100%" viewBox="0 0 1000 300">
                                                <line x1="40" y1="50" x2="950" y2="50" stroke="#E5E7EB" className="dark:stroke-gray-600" strokeWidth="1" />
                                                <line x1="40" y1="100" x2="950" y2="100" stroke="#E5E7EB" className="dark:stroke-gray-600" strokeWidth="1" />
                                                <line x1="40" y1="150" x2="950" y2="150" stroke="#E5E7EB" className="dark:stroke-gray-600" strokeWidth="1" />
                                                <line x1="40" y1="200" x2="950" y2="200" stroke="#E5E7EB" className="dark:stroke-gray-600" strokeWidth="1" />
                                                <line x1="40" y1="250" x2="950" y2="250" stroke="#E5E7EB" className="dark:stroke-gray-600" strokeWidth="1" />
                                                
                                                <path 
                                                    d="M40,200 L120,180 L200,170 L280,160 L360,155 L440,160 L520,150 L600,145 L680,150 L760,140 L840,145 L920,150" 
                                                    fill="none" 
                                                    stroke="#9CA3AF" 
                                                    strokeWidth="2" 
                                                />
                                                
                                                <path 
                                                    d="M40,180 L120,160 L200,150 L280,145 L360,140 L440,145 L520,130 L600,120 L680,110 L760,105 L840,90 L920,50" 
                                                    fill="none" 
                                                    stroke="#3B82F6" 
                                                    strokeWidth="2" 
                                                />
                                                
                                                <circle cx="40" cy="200" r="3" fill="#9CA3AF" />
                                                <circle cx="120" cy="180" r="3" fill="#9CA3AF" />
                                                <circle cx="200" cy="170" r="3" fill="#9CA3AF" />
                                                <circle cx="280" cy="160" r="3" fill="#9CA3AF" />
                                                <circle cx="360" cy="155" r="3" fill="#9CA3AF" />
                                                <circle cx="440" cy="160" r="3" fill="#9CA3AF" />
                                                <circle cx="520" cy="150" r="3" fill="#9CA3AF" />
                                                <circle cx="600" cy="145" r="3" fill="#9CA3AF" />
                                                <circle cx="680" cy="150" r="3" fill="#9CA3AF" />
                                                <circle cx="760" cy="140" r="3" fill="#9CA3AF" />
                                                <circle cx="840" cy="145" r="3" fill="#9CA3AF" />
                                                <circle cx="920" cy="150" r="3" fill="#9CA3AF" />
                                                
                                                <circle cx="40" cy="180" r="3" fill="#3B82F6" />
                                                <circle cx="120" cy="160" r="3" fill="#3B82F6" />
                                                <circle cx="200" cy="150" r="3" fill="#3B82F6" />
                                                <circle cx="280" cy="145" r="3" fill="#3B82F6" />
                                                <circle cx="360" cy="140" r="3" fill="#3B82F6" />
                                                <circle cx="440" cy="145" r="3" fill="#3B82F6" />
                                                <circle cx="520" cy="130" r="3" fill="#3B82F6" />
                                                <circle cx="600" cy="120" r="3" fill="#3B82F6" />
                                                <circle cx="680" cy="110" r="3" fill="#3B82F6" />
                                                <circle cx="760" cy="105" r="3" fill="#3B82F6" />
                                                <circle cx="840" cy="90" r="3" fill="#3B82F6" />
                                                <circle cx="920" cy="50" r="3" fill="#3B82F6" />
                                                
                                                <text x="950" y="150" fill="#9CA3AF" className="dark:fill-gray-400" fontSize="12" fontWeight="500" textAnchor="start" dominantBaseline="middle">2024</text>
                                                <text x="950" y="50" fill="#3B82F6" fontSize="12" fontWeight="500" textAnchor="start" dominantBaseline="middle">2025</text>
                                            </svg>
                                        </div>
                                        
                                        <div className="y-axis">
                                            {[1200, 1100, 1000, 900, 800, 700, 600, 500, 400, 300, 200, 100, 0].map(num => (
                                                <div key={num} className="y-axis-label dark:text-gray-400">{num}</div>
                                            ))}
                                        </div>
                                        
                                        <div className="x-axis">
                                            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(month => (
                                                <div key={month} className="x-axis-label dark:text-gray-400">{month}</div>
                                            ))}
                                        </div>
                                        
                                        <div className="line-chart-legend">
                                            {}
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