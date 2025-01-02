import React, { useState, useEffect, useContext, useRef } from "react"
import { Class, calendarEvent } from '../types'
import accountService from "../services/account.service"
import EventCard from "../components/EventCard"
import { timeslots, flipDayAndYear, createDatePicker, formatDate } from '../utils'
import { Link } from "react-router-dom"
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import Language from "../components/Language"
import Snippet from "../components/Snippet"
import PendingRequest from "../components/PendingRequest"
import { ClassContext } from "../context/class.context"

function CalendarPage() {
    const [classes, setClasses] = useState([] as Class[])
    const [events, setEvents] = useState([] as calendarEvent[])
    const { managedClass, setManagedClass } = useContext(ClassContext)
    const prevMCRef = useRef<Class | null>(null);
    const [newDate, setNewDate] = useState('')
    const [newTimeslot, setNewTimeslot] = useState('')

    useEffect(()=> {
        async function fetchCalendar() {
            try {
                const classes = await accountService.getCalendar()
                setClasses(classes)
                const events = []
                for (const cls of classes) {
                    events.push(convertToEvent(cls))
                }
                setEvents(events)
            } catch (error) {
                console.log(error)
            }
        }

        fetchCalendar()
    }, [])

    useEffect(()=> {
        // re-render the calendar whenever an event changes
        createCalendar()
    }, [events])

    useEffect(() => {
        if (!managedClass) {
            prevMCRef.current = null; // Reset the ref
            return; // Exit early if no class is selected
        }
    
        if (
            prevMCRef.current &&
            prevMCRef.current._id === managedClass._id
        ) {
            if (prevMCRef.current.reschedule.status !== managedClass.reschedule.status) {
                // update classes if reschedule request status changed
                setClasses(prev => prev.map(cls => cls._id === managedClass._id ? managedClass : cls));
            }

            if (
                prevMCRef.current.date !== managedClass.date ||
                prevMCRef.current.timeslot !== managedClass.timeslot
            ) {
                // update classes and events if date/timeslot changed
                setClasses(prev => prev.map(cls => cls._id === managedClass._id ? managedClass : cls));
                setEvents(prev => prev.map(ev => ev.id === managedClass._id ? convertToEvent(managedClass) : ev));
            }
        }
    
        prevMCRef.current = managedClass; // Update the ref
    }, [managedClass]);
    

    function convertToEvent(cls: Class) {
        const [year, month, day] = cls.date.split('-').map(Number);
        const dateObj = new Date(year, month - 1, day);
        const currentDate = new Date();
        cls.isPast = dateObj < currentDate
    
        const date = [dateObj.getFullYear(),
          (dateObj.getMonth() + 1).toString().padStart(2, '0'),
          dateObj.getDate().toString().padStart(2, '0')
        ].join('-');
    
        const [hours, minutes] = cls.timeslot.split(':').map(Number);
        const totalMinutes = hours * 60 + minutes + Number(cls.duration);
        let newHours: number | string = Math.floor(totalMinutes / 60) % 24;
        let newMinutes: number | string = totalMinutes % 60;
        newHours = newHours.toString().padStart(2, '0');
        newMinutes = newMinutes.toString().padStart(2, '0');
        const endTime = `${newHours}:${newMinutes}`;
    
        const start = `${date}T${cls.timeslot}:00`;
        const end = `${date}T${endTime}:00`;
        cls.endTime = endTime
    
        const event = {
          title: cls.student.username,
          id: cls._id,
          start: start,
          end: end,
          display: 'block'
        }
        return event
    }

    function createCalendar() {
        const calendarEl = document.getElementById('calendar');
        if (!calendarEl) return
        const calendar = new Calendar(calendarEl, {
            initialView: 'dayGridMonth',
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
            },
            eventTimeFormat: {
                hour: '2-digit',
                minute: '2-digit',
                meridiem: false,
                hour12: false
            },
            events: events,
            plugins: [ dayGridPlugin, timeGridPlugin, listPlugin, bootstrap5Plugin ],
            themeSystem: 'bootstrap5',
            eventDidMount: function(info) {
                const hoverCard = document.getElementById(info.event.id);
                
                // Hover event listeners to show and hide the tooltip
                info.el.addEventListener('mouseenter', function() {
                    if (hoverCard) hoverCard.style.display = 'block';
                });

                info.el.addEventListener('mouseleave', function() {
                    if (hoverCard) hoverCard.style.display = 'none';
                });

                info.el.addEventListener('mousemove', function(e) {
                    if (hoverCard) {
                        hoverCard.style.top = (e.clientY + 15) + 'px';
                        hoverCard.style.left = (e.clientX + 15) + 'px';
                    }
                });

                // manage class
                info.el.addEventListener('click', function() {
                    const classToManage = classes.find(c => c._id === info.event.id)
                    if (classToManage) {
                        setManagedClass(classToManage)
                        setNewDate(flipDayAndYear(new Date(classToManage.date)))
                        setNewTimeslot(classToManage.timeslot)
                        createDatePicker()
                    } 
                });
            }
        });
        calendar.render();
    }

    function handleReschedule() {
        
    }

    async function handleCancel() {
        if (!managedClass) return
        try {
            await accountService.cancelClass(managedClass._id)
            setClasses(prev => prev.filter(c => c._id !== managedClass._id))
        } catch (error) {
            alert(error)
        }
    }

    async function handleSend(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (!managedClass) return
        const requestBody = {date: newDate, timeslot: newTimeslot}
        const reschData = await accountService.rescheduleClass(managedClass._id, requestBody)
        setManagedClass(prev => {
            if (!prev) return prev; // Narrowing for safety
            return {...prev, reschedule: reschData}
        })
    }

    return (
        <>
        <div className="d-flex">
            <div className="card text-left" id="manageClass">
                <h5 className="card-header center">Manage Class</h5>

            
                {managedClass &&
                <div className="card-body" id="{{managedClass._id}}-manage">
                    <Link to={"/users/" + managedClass.student._id} className="link-text">
                        <div className="d-flex align-items-center my-3">
                            <div className="circle-crop me-2" style={{width: '50px', height: '50px', display: 'inline-flex'}}>
                                <img src={managedClass.student.profilePic || "/images/Profile-PNG-File.png"}/>
                            </div>
                            <span className="fs-5">{managedClass.student.username}</span>
                        </div>
                    </Link>

                    <div className="row mb-3">
                        <span className="card-text col"> 
                            <Language code={managedClass.language} />
                        </span>
                    </div>

                    <div className="row mb-3">
                        <span className="card-text col">
                            <Snippet data={managedClass.level} />
                        </span>
                    </div>

                    <div className="row mb-3">
                        <span className="card-text col">
                            <Snippet data={managedClass.locationType} />
                        </span>
                        {managedClass.location && <span>({managedClass.location})</span>}
                    </div>

                    <div className="row mb-3">
                        <span className="card-text col">
                            <Snippet data={managedClass.classType} />
                            {managedClass.maxGroupSize && <span> (max. {managedClass.maxGroupSize} students)</span>}
                        </span>
                    </div>

                    <div className="row mb-3">
                        <span className="card-text col">
                            <i className="bi bi-calendar-fill me-2"></i><span className="date">{formatDate(managedClass.date)}</span>
                        </span>
                    </div>

                    <div className="row mb-3">
                        <span className="card-text col">
                            <i className="bi bi-clock-fill me-2"></i>{managedClass.timeslot} - {managedClass.endTime}
                        </span>
                    </div>

                    {managedClass.reschedule?.status === "pending" &&
                        <PendingRequest cls={managedClass} reschedule={managedClass.reschedule} />
                    }

                    <div className="d-flex flex-column mb-3" style={{width: '60%'}}>
                        <form action="/account/inbox" method="POST" style={{width: '100%'}}>
                            <input type="hidden" value="{{managedClass.student._id}}" name="targetUserId"/>
                            <button className="btn btn-sm btn-primary mb-2" style={{width: '100%'}}>
                                <i className="bi bi-envelope-fill me-2"></i>Message {managedClass.student.username}
                            </button>
                        </form>

                        {!managedClass.isPast &&
                        <>
                            <button className="btn btn-sm btn-secondary mb-2" onClick={handleReschedule} disabled={managedClass.reschedule?.status === "pending"}>
                                <i className="bi bi-calendar2-x-fill me-2"></i>Reschedule
                            </button>
                            <button className="btn btn-sm btn-danger mb-2" onClick={handleCancel}>
                                <i className="bi bi-x-circle-fill me-2"></i>Cancel
                            </button>
                        </>}

                    </div>
                    
                    <form onSubmit={handleSend} id="reschedule"> 
                        <div className="container mb-3">
                            <div className="form-group">
                                <label htmlFor="datepicker">Choose a new date</label>
                                <input type="text" id="datepicker" className="form-control" placeholder="Choose a date" name="date" required
                                    value={newDate}/>
                            </div>
                        </div>
                        <div className="container mb-4">
                            <label htmlFor="timeslot">Choose a new time slot</label>
                            <select className="form-select" id="timeslots" name="timeslot" 
                                value={newTimeslot} onChange={(e)=> setNewTimeslot(e.target.value)}> 
                                {timeslots.map(timeslot => (
                                    <option key={timeslot} value={timeslot}>{timeslot}</option>
                                ))}
                            </select>
                        </div>
                        <div className="d-flex justify-content-center">
                            <button className="btn btn-sm btn-primary mb-3" style={{width: 'fit-content'}}>Send Request</button>
                        </div>
                    </form>

                </div>
                }
                
            </div>

            <div style={{width: '80%'}}>
                <h3 className="center my-3">My Calendar</h3>
                <div id="calendar"></div>
            </div>
        </div>

        {classes.map(cls => (
            <EventCard cls={cls} key={cls._id} />
        ))}
        </>
    )
}

export default CalendarPage