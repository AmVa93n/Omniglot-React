import React, { useContext, useState } from "react"
import { calendarEvent, Class } from '../../../types'
import CalendarEvent from "../../CalendarEvent/CalendarEvent"
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import './CalendarTab.css'
import { AccountContext } from "../../../context/account.context"
import Avatar from "../../Avatar";
import useDate from "../../../hooks/useDate";
import { Routes, Route, Outlet } from "react-router-dom";
import CalendarEventModal from "../../CalendarEventModal/CalendarEventModal";

function CalendarTab() {
    const { calendar } = useContext(AccountContext)
    const [hoveredEventId, setHoveredEventId] = useState('')
    const [hoveredEventPosition, setHoveredEventPosition] = useState({ top: 0, left: 0 });
    const { getEndTime } = useDate()
    const calendarEvents = calendar.map(cls => getCalendarEvent(cls))
    const [managedEventId, setManagedEventId] = useState('')

    function getCalendarEvent(cls: Class) {
        const date = new Date(cls.date);
        const dateString = [date.getFullYear(), (date.getMonth() + 1).toString().padStart(2, '0'), 
            date.getDate().toString().padStart(2, '0')].join('-');

        const endTime = getEndTime(cls.timeslot, cls.duration);
    
        return { 
            id: cls._id, 
            title: cls.student.username, 
            start: `${dateString}T${cls.timeslot}:00`, 
            end: `${dateString}T${endTime}:00`
        }
    }

    function renderEvent({ event }: { event: calendarEvent }) {
        const classData = calendar.find(cls => cls._id === event.id)!

        return (
            <div className="calendar-event-snippet"
                onMouseEnter={(e) => handleEventMouseEnter(e, event)}
                onMouseLeave={() => setHoveredEventId('')}
            >
                <Avatar src={classData.student.profilePic} size={20} />
                <span>{event.title}</span>
                <span>{event.start.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</span>
            </div>
        )
    }

    const handleEventMouseEnter = (e: React.MouseEvent, event: calendarEvent) => {
        setHoveredEventId(event.id);
        const rect = (e.target as HTMLElement).getBoundingClientRect();
        setHoveredEventPosition({ top: rect.top - 10, left: rect.left + rect.width / 2 });
    };

    return (
        <div className="calendar-tab">
            <Routes>
                <Route path="/" element={
                    <>
                        <FullCalendar 
                            plugins={[ dayGridPlugin, timeGridPlugin, listPlugin, bootstrap5Plugin ]} 
                            initialView="dayGridMonth" 
                            headerToolbar={{
                                left: 'prev,next today', 
                                center: 'title', 
                                right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                            }}
                            eventTimeFormat={{
                                hour: '2-digit',
                                minute: '2-digit',
                                meridiem: false,
                                hour12: false
                            }}
                            events={calendarEvents}
                            eventContent={renderEvent}
                            eventClick={(e) => setManagedEventId(e.event.id)}
                        />
            
                        {hoveredEventId && 
                            <CalendarEvent cls={calendar.find(cls => cls._id === hoveredEventId)!} position={hoveredEventPosition} />
                        }
                        {managedEventId && 
                            <CalendarEventModal cls={calendar.find(cls => cls._id === managedEventId)!} onClose={() => setManagedEventId('')} />}
                    </>
                } />
            </Routes>
            <Outlet />
        </div>
    )
}

export default CalendarTab