import React, { useState, useEffect } from 'react';
import Header from '../../../components/layout/Header';
import NavigationBar from '../../../components/layout/NavigationBar';
import './SharedCalendar.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useParams } from "react-router-dom";


const EMPLOYEES = [
    { id: 1, name: "Alex Johnson", teamId: 1 },
    { id: 2, name: "Alfie Baker", teamId: 1 },
    { id: 3, name: "Michael Brown", teamId: 1 },
    { id: 4, name: "Emma Williams", teamId: 1 },
    { id: 5, name: "Robert Jones", teamId: 2 },
    { id: 6, name: "Jennifer Garcia", teamId: 2 },
    { id: 7, name: "David Miller", teamId: 2 },
    { id: 8, name: "Lisa Davis", teamId: 2 },
    { id: 9, name: "James Wilson", teamId: 2 },
    { id: 10, name: "Patricia Moore", teamId: 2 },
    { id: 11, name: "Daniel Taylor", teamId: 3 },
    { id: 12, name: "Nancy Anderson", teamId: 3 },
    { id: 13, name: "Paul Thomas", teamId: 4 },
    { id: 14, name: "Mary Jackson", teamId: 4 }
];

// Public holidays
const PUBLIC_HOLIDAYS = [
    {
        title: "🎄 Christmas Day",
        start: "2025-12-25",
        allDay: true,
        extendedProps: {
            type: "public-holiday",
            icon: "🎄"
        }
    },
    {
        title: "🎆 New Year's Day",
        start: "2025-01-01",
        allDay: true,
        extendedProps: {
            type: "public-holiday",
            icon: "🎆"
        }
    },
    {
        title: "🇬🇧 Bank Holiday",
        start: "2025-05-26",
        allDay: true,
        extendedProps: {
            type: "public-holiday",
            icon: "🇬🇧"
        }
    },
    {
        title: "🌸 Spring Bank Holiday",
        start: "2025-05-05",
        allDay: true,
        extendedProps: {
            type: "public-holiday",
            icon: "🌸"
        }
    },
    {
        title: "👻 Halloween",
        start: "2025-10-31",
        allDay: true,
        extendedProps: {
            type: "public-holiday",
            icon: "👻"
        }
    },
    {
        title: "🦃 Thanksgiving",
        start: "2025-11-27",
        allDay: true,
        extendedProps: {
            type: "public-holiday",
            icon: "🦃"
        }
    }
];

const LEAVE_EVENTS = [
    {
        id: '101',
        title: 'Alex Johnson - COVID-19 Isolation',
        start: '2025-01-15',
        end: '2025-01-22',
        allDay: true,
        extendedProps: {
            type: 'leave-event',
            employeeId: 1,
            teamId: 1,
            leaveType: 'COVID-19 Isolation'
        }
    },
    {
        id: '102',
        title: 'Alex Johnson - COVID-19 Symptoms',
        start: '2025-10-05',
        end: '2025-10-12',
        allDay: true,
        extendedProps: {
            type: 'leave-event',
            employeeId: 1,
            teamId: 1,
            leaveType: 'COVID-19 Symptoms'
        }
    },

    {
        id: '201',
        title: 'Alfie Baker - COVID-19 Isolation',
        start: '2025-01-08',
        end: '2025-01-15',
        allDay: true,
        extendedProps: {
            type: 'leave-event',
            employeeId: 2,
            teamId: 1,
            leaveType: 'COVID-19 Isolation'
        }
    },
    {
        id: '202',
        title: 'Michael Brown - COVID-19 Contact',
        start: '2025-01-20',
        end: '2025-01-25',
        allDay: true,
        extendedProps: {
            type: 'leave-event',
            employeeId: 3,
            teamId: 1,
            leaveType: 'COVID-19 Contact'
        }
    },

    {
        id: '203',
        title: 'Emma Williams - COVID-19 Symptoms',
        start: '2025-02-10',
        end: '2025-02-17',
        allDay: true,
        extendedProps: {
            type: 'leave-event',
            employeeId: 4,
            teamId: 1,
            leaveType: 'COVID-19 Symptoms'
        }
    },
    {
        id: '204',
        title: 'Robert Jones - COVID-19 Isolation',
        start: '2025-02-22',
        end: '2025-02-29',
        allDay: true,
        extendedProps: {
            type: 'leave-event',
            employeeId: 5,
            teamId: 2,
            leaveType: 'COVID-19 Isolation'
        }
    },

    {
        id: '205',
        title: 'Jennifer Garcia - COVID-19 Symptoms',
        start: '2025-03-05',
        end: '2025-03-12',
        allDay: true,
        extendedProps: {
            type: 'leave-event',
            employeeId: 6,
            teamId: 2,
            leaveType: 'COVID-19 Symptoms'
        }
    },
    {
        id: '206',
        title: 'David Miller - COVID-19 Contact',
        start: '2025-03-18',
        end: '2025-03-25',
        allDay: true,
        extendedProps: {
            type: 'leave-event',
            employeeId: 7,
            teamId: 2,
            leaveType: 'COVID-19 Contact'
        }
    },

    {
        id: '207',
        title: 'Lisa Davis - COVID-19 Isolation',
        start: '2025-04-08',
        end: '2025-04-15',
        allDay: true,
        extendedProps: {
            type: 'leave-event',
            employeeId: 8,
            teamId: 2,
            leaveType: 'COVID-19 Isolation'
        }
    },
    {
        id: '208',
        title: 'James Wilson - COVID-19 Symptoms',
        start: '2025-04-20',
        end: '2025-04-27',
        allDay: true,
        extendedProps: {
            type: 'leave-event',
            employeeId: 9,
            teamId: 2,
            leaveType: 'COVID-19 Symptoms'
        }
    },

    {
        id: '209',
        title: 'Patricia Moore - COVID-19 Contact',
        start: '2025-05-10',
        end: '2025-05-17',
        allDay: true,
        extendedProps: {
            type: 'leave-event',
            employeeId: 10,
            teamId: 2,
            leaveType: 'COVID-19 Contact'
        }
    },
    {
        id: '210',
        title: 'Daniel Taylor - COVID-19 Isolation',
        start: '2025-05-22',
        end: '2025-05-29',
        allDay: true,
        extendedProps: {
            type: 'leave-event',
            employeeId: 11,
            teamId: 3,
            leaveType: 'COVID-19 Isolation'
        }
    },

    // June
    {
        id: '211',
        title: 'Nancy Anderson - COVID-19 Symptoms',
        start: '2025-06-05',
        end: '2025-06-12',
        allDay: true,
        extendedProps: {
            type: 'leave-event',
            employeeId: 12,
            teamId: 3,
            leaveType: 'COVID-19 Symptoms'
        }
    },
    {
        id: '212',
        title: 'Paul Thomas - COVID-19 Contact',
        start: '2025-06-18',
        end: '2025-06-25',
        allDay: true,
        extendedProps: {
            type: 'leave-event',
            employeeId: 13,
            teamId: 4,
            leaveType: 'COVID-19 Contact'
        }
    },

    // July
    {
        id: '213',
        title: 'Mary Jackson - COVID-19 Isolation',
        start: '2025-07-08',
        end: '2025-07-15',
        allDay: true,
        extendedProps: {
            type: 'leave-event',
            employeeId: 14,
            teamId: 4,
            leaveType: 'COVID-19 Isolation'
        }
    },
    {
        id: '214',
        title: 'Alfie Baker - COVID-19 Symptoms',
        start: '2025-07-20',
        end: '2025-07-27',
        allDay: true,
        extendedProps: {
            type: 'leave-event',
            employeeId: 2,
            teamId: 1,
            leaveType: 'COVID-19 Symptoms'
        }
    },

    // August
    {
        id: '215',
        title: 'Michael Brown - COVID-19 Contact',
        start: '2025-08-10',
        end: '2025-08-17',
        allDay: true,
        extendedProps: {
            type: 'leave-event',
            employeeId: 3,
            teamId: 1,
            leaveType: 'COVID-19 Contact'
        }
    },
    {
        id: '216',
        title: 'Emma Williams - COVID-19 Isolation',
        start: '2025-08-22',
        end: '2025-08-29',
        allDay: true,
        extendedProps: {
            type: 'leave-event',
            employeeId: 4,
            teamId: 1,
            leaveType: 'COVID-19 Isolation'
        }
    },

    // September
    {
        id: '217',
        title: 'Robert Jones - COVID-19 Symptoms',
        start: '2025-09-05',
        end: '2025-09-12',
        allDay: true,
        extendedProps: {
            type: 'leave-event',
            employeeId: 5,
            teamId: 2,
            leaveType: 'COVID-19 Symptoms'
        }
    },
    {
        id: '218',
        title: 'Jennifer Garcia - COVID-19 Contact',
        start: '2025-09-18',
        end: '2025-09-25',
        allDay: true,
        extendedProps: {
            type: 'leave-event',
            employeeId: 6,
            teamId: 2,
            leaveType: 'COVID-19 Contact'
        }
    },

    // October
    {
        id: '219',
        title: 'David Miller - COVID-19 Isolation',
        start: '2025-10-08',
        end: '2025-10-15',
        allDay: true,
        extendedProps: {
            type: 'leave-event',
            employeeId: 7,
            teamId: 2,
            leaveType: 'COVID-19 Isolation'
        }
    },
    {
        id: '220',
        title: 'Lisa Davis - COVID-19 Symptoms',
        start: '2025-10-20',
        end: '2025-10-27',
        allDay: true,
        extendedProps: {
            type: 'leave-event',
            employeeId: 8,
            teamId: 2,
            leaveType: 'COVID-19 Symptoms'
        }
    },

    // November
    {
        id: '221',
        title: 'James Wilson - COVID-19 Contact',
        start: '2025-11-10',
        end: '2025-11-17',
        allDay: true,
        extendedProps: {
            type: 'leave-event',
            employeeId: 9,
            teamId: 2,
            leaveType: 'COVID-19 Contact'
        }
    },
    {
        id: '222',
        title: 'Patricia Moore - COVID-19 Isolation',
        start: '2025-11-22',
        end: '2025-11-29',
        allDay: true,
        extendedProps: {
            type: 'leave-event',
            employeeId: 10,
            teamId: 2,
            leaveType: 'COVID-19 Isolation'
        }
    },

    // December
    {
        id: '223',
        title: 'Daniel Taylor - COVID-19 Symptoms',
        start: '2025-12-05',
        end: '2025-12-12',
        allDay: true,
        extendedProps: {
            type: 'leave-event',
            employeeId: 11,
            teamId: 3,
            leaveType: 'COVID-19 Symptoms'
        }
    },
    {
        id: '224',
        title: 'Nancy Anderson - COVID-19 Contact',
        start: '2025-12-18',
        end: '2025-12-25',
        allDay: true,
        extendedProps: {
            type: 'leave-event',
            employeeId: 12,
            teamId: 3,
            leaveType: 'COVID-19 Contact'
        }
    },

    {
        id: '301',
        title: 'COVID Protocol Meeting',
        start: '2025-01-05T10:00:00',
        end: '2025-01-05T11:30:00',
        extendedProps: {
            type: 'meeting-event',
            teamId: 1,
            details: 'Review updated COVID protocols'
        }
    },
    {
        id: '302',
        title: 'Health & Safety Briefing',
        start: '2025-04-12T14:00:00',
        end: '2025-04-12T15:30:00',
        extendedProps: {
            type: 'meeting-event',
            teamId: 1,
            details: 'Quarterly health and safety update'
        }
    },
    {
        id: '303',
        title: 'COVID Response Team',
        start: '2025-07-20T11:00:00',
        end: '2025-07-20T12:30:00',
        extendedProps: {
            type: 'meeting-event',
            teamId: 1,
            details: 'Review and update response procedures'
        }
    },
    {
        id: '304',
        title: 'Annual Health Review',
        start: '2025-10-15T13:00:00',
        end: '2025-10-15T14:30:00',
        extendedProps: {
            type: 'meeting-event',
            teamId: 1,
            details: 'Annual health policy review'
        }
    }
];

const SharedCalendar = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [events, setEvents] = useState([]);
    const [currentEmployeeId] = useState(1);
    const { dashboardType } = useParams();

    useEffect(() => {
        // Combine public holidays with leave events
        const allEvents = [...PUBLIC_HOLIDAYS];
        
        // Filter events based on dashboard type from URL params
        if (dashboardType === 'employee') {
            // For employees, only show their own leaves and team meetings
            const employeeEvents = LEAVE_EVENTS.filter(event => 
                event.extendedProps.employeeId === currentEmployeeId || 
                (event.extendedProps.type === 'meeting-event' && 
                 event.extendedProps.teamId === EMPLOYEES.find(e => e.id === currentEmployeeId)?.teamId)
            );
            allEvents.push(...employeeEvents);
        } else if (dashboardType === 'manager') {
            // For managers, only show Team 1 employees and meetings
            const teamOneEvents = LEAVE_EVENTS.filter(event => 
                event.extendedProps.teamId === 1 ||
                (event.extendedProps.type === 'meeting-event' && 
                 event.extendedProps.teamId === 1)
            );
            allEvents.push(...teamOneEvents);
        } else {
            // For HR, show all leaves across all teams
            allEvents.push(...LEAVE_EVENTS);
        }
        
        setEvents(allEvents);
    }, [dashboardType, currentEmployeeId]);


    const toggleNavigationBar = () => {
        setIsOpen(!isOpen);
    };

    const handleDateClick = (info) => {


        const leaveTypes = [
            "COVID-19 Symptoms",
            "COVID-19 Isolation",
            "COVID-19 Contact"
        ];

        const leaveType = window.prompt(`Enter type of absence (options: ${leaveTypes.join(', ')}):`, leaveTypes[0]);

        if (leaveType && leaveTypes.includes(leaveType)) {
            const endDate = new Date(info.dateStr);
            endDate.setDate(endDate.getDate() + 14);

            const newEvent = {
                id: `new-${Date.now()}`,
                title: `${EMPLOYEES.find(e => e.id === currentEmployeeId)?.name} - ${leaveType}`,
                start: info.dateStr,
                end: endDate.toISOString().split('T')[0],
                allDay: true,
                extendedProps: {
                    type: 'leave-event',
                    employeeId: currentEmployeeId,
                    teamId: EMPLOYEES.find(e => e.id === currentEmployeeId)?.teamId,
                    leaveType: leaveType
                }
            };
            setEvents([...events, newEvent]);
        }
    };

    //Note to come back to this function because notifs are buggy 
    const handleEventClick = (info) => {
        const event = info.event;
        
        if (event.extendedProps.type === 'public-holiday') {
            alert(`${event.title} is a public holiday.`);
            return;
        }
    
        if (dashboardType === 'employee' && event.extendedProps.employeeId !== currentEmployeeId) {
            alert("You can only manage your own absences.");
            return;
        }
        
        if (window.confirm(`Do you want to delete the event '${event.title}'?`)) {
            setEvents(events.filter(e => e.id !== event.id));
        }
    };

    const renderEventContent = (eventInfo) => {
        const event = eventInfo.event;
        const eventType = event.extendedProps.type || 'default';

        return (
            <div className={`fc-event ${eventType}`}>
                {event.extendedProps.icon && <span className="holiday-icon">{event.extendedProps.icon}</span>}
                <div className="fc-event-title">{event.title}</div>
            </div>
        );
    };


    return (
        <div className="flex flex-col bg-gray-100 dark:bg-gray-800 transition-colors">
            <Header toggleNavigationBar={toggleNavigationBar} isOpen={isOpen} />

            <div className="flex flex-1">
                <NavigationBar isOpen={isOpen} toggleNavigationBar={toggleNavigationBar} />

                <div className="flex-1 min-h-screen transition-all" style={{ paddingLeft: isOpen ? "280px" : "100px" }}>
                    <div className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
                        <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md transition-colors">
                            <div className="p-6 w-full">
                                <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white" style={{ fontFamily: 'Kanit, sans-serif' }}>
                                    CALENDAR
                                </h1>

                                <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-sm text-blue-800 dark:text-blue-200">
                                    {dashboardType === 'employee' && (
                                        <p>You are viewing your personal calendar. Click on a date to report a COVID-related absence.</p>
                                    )}
                                    {dashboardType === 'manager' && (
                                        <p>You are viewing all COVID-related absences across the team you manage.</p>
                                    )}
                                    {dashboardType === 'hr' && (
                                        <p>You are viewing all COVID-related absences across the company to monitor pandemic impact.</p>
                                    )}
                                </div>

                                <div className="mb-4 grid grid-cols-4 gap-2">
                                    <div className="flex items-center">
                                        <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                                        <span className="text-sm">COVID Absence</span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-3 h-3 rounded-full bg-orange-500 mr-2"></div>
                                        <span className="text-sm">Public Holiday</span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                                        <span className="text-sm">Meeting</span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                                        <span className="text-sm">Training</span>
                                    </div>
                                </div>

                                <div>
                                <FullCalendar
                                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                                        initialView="dayGridMonth"
                                        headerToolbar={{
                                            left: 'prev,next today',
                                            center: 'title',
                                            right: 'dayGridMonth,timeGridWeek,timeGridDay'
                                        }}
                                        events={events}
                                        editable={true}
                                        selectable={true}
                                        selectMirror={true}
                                        dayMaxEvents={true}
                                        weekends={true}
                                        dateClick={handleDateClick}
                                        eventClick={handleEventClick}
                                        eventContent={renderEventContent}
                                        height="auto"
                                        aspectRatio={1.5}
                                        eventClassNames={(arg) => {
                                            return [ arg.event.extendedProps.type || 'default' ];
                                        }}
                                        eventMouseEnter={(info) => {
                                            // Safe event hover handling
                                            if (info && info.el) {
                                                info.el.style.cursor = 'pointer';
                                            }
                                        }}
                                        eventMouseLeave={(info) => {
                                            // Safe event hover handling
                                            if (info && info.el) {
                                                info.el.style.cursor = '';
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default SharedCalendar;