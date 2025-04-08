import React, { useState, useEffect } from 'react';
import Header from '../../../components/layout/Header';
import NavigationBar from '../../../components/layout/NavigationBar';
import AccessibilityWidget from '../../../components/accessibility/AccessibilityWidget';
import './SharedCalendar.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useParams } from "react-router-dom";
import calendarData from '../../../models/CalendarData.json';

const SharedCalendar = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [events, setEvents] = useState([]);
    const [currentEmployeeId] = useState(1);
    const { dashboardType } = useParams();

    useEffect(() => {
        // Combine public holidays with leave events
        const allEvents = [...calendarData.publicHolidays];

        // Filter events based on dashboard type from URL params
        if (dashboardType === 'employee') {
            // For employees, only show their own leaves and team meetings
            const employeeEvents = calendarData.leaveEvents.filter(event => 
                event.extendedProps.employeeId === currentEmployeeId || 
                (event.extendedProps.type === 'meeting-event' && 
                 event.extendedProps.teamId === calendarData.employees.find(e => e.id === currentEmployeeId)?.teamId)
            );
            allEvents.push(...employeeEvents);
        } else if (dashboardType === 'manager') {
            // For managers, only show Team 1 employees and meetings
            const teamOneEvents = calendarData.leaveEvents.filter(event => 
                event.extendedProps.teamId === 1 ||
                (event.extendedProps.type === 'meeting-event' && 
                 event.extendedProps.teamId === 1)
            );
            allEvents.push(...teamOneEvents);
        } else {
            // For HR, show all leaves across all teams
            allEvents.push(...calendarData.leaveEvents);
        }

        setEvents(allEvents);
    }, [dashboardType, currentEmployeeId]);

    const toggleNavigationBar = () => {
        setIsOpen(!isOpen);
    };

    const handleDateClick = (info) => {
        const leaveTypes = ["COVID-19 Symptoms", "COVID-19 Isolation", "COVID-19 Contact"];
        const leaveType = window.prompt(`Enter type of absence (options: ${leaveTypes.join(', ')}):`, leaveTypes[0]);

        if (leaveType && leaveTypes.includes(leaveType)) {
            const endDate = new Date(info.dateStr);
            endDate.setDate(endDate.getDate() + 14);

            const newEvent = {
                id: `new-${Date.now()}`,
                title: `${calendarData.employees.find(e => e.id === currentEmployeeId)?.name} - ${leaveType}`,
                start: info.dateStr,
                end: endDate.toISOString().split('T')[0],
                allDay: true,
                extendedProps: {
                    type: 'leave-event',
                    employeeId: currentEmployeeId,
                    teamId: calendarData.employees.find(e => e.id === currentEmployeeId)?.teamId,
                    leaveType: leaveType
                }
            };
            setEvents([...events, newEvent]);
        }
    };

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
            <AccessibilityWidget />
        </div>
    );
};

export default SharedCalendar;
