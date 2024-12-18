import React, { useContext, useState, useEffect } from "react"
import { Class, calendarEvent, reschedule } from '../types'
import { AuthContext } from "../context/auth.context"
import accountService from "../services/account.service"
import EventBox from "../components/EventBox"
import { timeslots, flipDayAndYear, createDatePicker, formatDate } from '../utils'
import { Link } from "react-router-dom"
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import Language from "../components/Language"
import Snippet from "../components/Snippet"

function CalendarPage() {
    const [classes, setClasses] = useState([] as Class[])
    const [events, setEvents] = useState([] as calendarEvent[])
    const [managedClass, setManagedClass] = useState<Class | null>(null)
    const [reschedule, setReschedule] = useState<reschedule>({
        isOpen: false,
        date: undefined,
        timeslot: undefined
    })
    const { user } = useContext(AuthContext) 

    useEffect(()=> {
        async function fetchCalendar() {
            try {
                const { classes, events } = await accountService.getCalendar()
                setClasses(classes)
                setEvents(events)
            } catch (error) {
                console.log(error)
            }
        }

        fetchCalendar()
    }, [])

    useEffect(()=> {
        createCalendar()
    }, [events])

    useEffect(()=> {
        if (reschedule.isOpen) createDatePicker()
    }, [reschedule.isOpen])

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
                    if (classToManage) setManagedClass(classToManage)
                });
            }
        });
        calendar.render();
    }

    function handleReschedule() {
        setReschedule({
            isOpen: true,
            date: managedClass?.date,
            timeslot: managedClass?.timeslot
        })
    }

    function handleChange(event: React.ChangeEvent) {
        const field = (event.target as HTMLInputElement).name
        const value = (event.target as HTMLInputElement).value
        setReschedule(prev => {
            return {...prev, [field]: value}
        })
    }

    async function handleSend() {
        if (!managedClass) return
        await accountService.rescheduleClass(managedClass._id)
        setReschedule({
            isOpen: false,
            date: undefined,
            timeslot: undefined
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
                    <div className="p-1 bg-warning mb-3">
                        <p className="center m-0">Pending reschedule request</p>
                        <h6 className="center"><span className="date">{managedClass.reschedule?.new_date}</span>, {managedClass.reschedule?.new_timeslot}</h6>
                        {managedClass.reschedule.initiator !== user?._id &&
                            <div className="d-flex justify-content-center">
                                <button className="btn btn-sm btn-success mx-1" style={{fontSize: 'smaller'}}>
                                    <i className="bi bi-check-circle-fill me-2"></i>Accept
                                </button>
                                <button className="btn btn-sm btn-danger mx-1" style={{fontSize: 'smaller'}}>
                                    <i className="bi bi-x-circle-fill me-2"></i>Decline
                                </button>
                            </div>}
                    </div>}

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
                            <button className="btn btn-sm btn-danger mb-2">
                                <i className="bi bi-x-circle-fill me-2"></i>Cancel
                            </button>
                        </>}

                    </div>
                    
                </div>
                }

                {reschedule.isOpen &&
                <form onSubmit={handleSend} method="POST" id="reschedule">
                    <div className="container mb-3">
                        <div className="form-group">
                            <label htmlFor="datepicker">Choose a new date</label>
                            <input type="text" id="datepicker" className="form-control" placeholder="Choose a date" name="date" required
                                value={flipDayAndYear(new Date(reschedule?.date || ''))} onChange={handleChange}/>
                        </div>
                    </div>
                    <div className="container mb-4">
                        <label htmlFor="timeslot">Choose a new time slot</label>
                        <select className="form-select" id="timeslots" name="timeslot" 
                            value={reschedule?.timeslot} onChange={handleChange}> 
                            {timeslots.map(timeslot => (
                                <option key={timeslot} value={timeslot}>{timeslot}</option>
                            ))}
                        </select>
                    </div>
                    <div className="d-flex justify-content-center">
                        <button className="btn btn-sm btn-primary mb-3" style={{width: 'fit-content'}}>Send Request</button>
                    </div>
                </form>}
                
            </div>

            <div style={{width: '80%'}}>
                <h3 className="center my-3">My Calendar</h3>
                <div id="calendar"></div>
            </div>
        </div>

        {classes.map(cls => (
            <EventBox cls={cls} key={cls._id} />
        ))}
        </>
    )
}

export default CalendarPage