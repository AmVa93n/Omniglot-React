import { Class } from "../../../types";
import useFormat from "../../../hooks/useFormat";
import useDate from "../../../hooks/useDate";
import './CalendarEventModal.css';
import Avatar from "../../reusable/Avatar";
import LanguageChip from "../../reusable/LanguageChip/LanguageChip";
import InfoChip from "../../reusable/InfoChip/InfoChip";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { useContext, useState } from "react";
import accountService from "../../../services/account.service";
import { AccountContext } from "../../../context/account.context";
import useChat from "../../../hooks/useChat";
import useNotifications from "../../../hooks/useNotifications";

interface Props {
    cls: Class;
    onClose: () => void;
}

function CalendarEventModal({ cls, onClose }: Props) {
    const { formatDate } = useFormat();
    const { getEndTime, timeslots } = useDate();
    const { user } = useAuth();
    const { setCalendar } = useContext(AccountContext);
    const [isRescheduling, setIsRescheduling] = useState(false);
    const [newDate, setNewDate] = useState(cls?.date || '')
    const [newTimeslot, setNewTimeslot] = useState(cls?.timeslot || '')
    const { handleMessage } = useChat()
    const { sendNotification } = useNotifications()

    async function handleCancel(cls: Class) {
        try {
            await accountService.cancelClass(cls._id)
            setCalendar(prev => prev.filter(c => c._id !== cls._id))
            sendNotification(user!._id, cls.student._id, 'cancel-teacher')
        } catch (error) {
            alert(error)
        }
    }

    async function handleAccept() {
        try {
            const updatedClass = await accountService.acceptReschedule(cls._id)
            setCalendar(prev => prev.map(c => c._id === cls._id ? updatedClass : c))
            sendNotification(user!._id, cls.student._id, 'reschedule-teacher-accept')
        } catch (error) {
            alert(error)
        }
    }

    async function handleDecline() {
        try {
            const updatedClass = await accountService.declineReschedule(cls._id)
            setCalendar(prev => prev.map(c => c._id === cls._id ? updatedClass : c))
            sendNotification(user!._id, cls.student._id, 'reschedule-teacher-decline')
        } catch (error) {
            alert(error)
        }
    }

    async function handleWithdraw() {
        try {
            const updatedClass = await accountService.withdrawReschedule(cls._id)
            setCalendar(prev => prev.map(c => c._id === cls._id ? updatedClass : c))
        } catch (error) {
            alert(error)
        }
    }

    async function handleSend() {
        if (!cls) return
        const updatedClass = await accountService.rescheduleClass(cls._id, {date: newDate, timeslot: newTimeslot})
        setCalendar(prev => prev.map(c => c._id === cls._id ? updatedClass : c))
        sendNotification(user!._id, cls.student._id, 'reschedule-teacher-pending')
        setIsRescheduling(false)
    }

    return (
        <div className="modal">
            <div className="modal-content" style={{position: 'relative'}}>
                <div className="modal-header">
                    <div className="calendar-event-date-time">
                        <span className='date'>{formatDate(cls.date)}</span>
                        <span className='time'>{cls.timeslot} - {getEndTime(cls.timeslot, cls.duration)}</span>
                    </div>
                </div>

                <div className="modal-body">
                    <Link to={`/users/${cls.student._id}`}>
                        <div className="calendar-event-student">
                            <Avatar src={cls.student.profilePic} size={50} />
                            <span className="username">Class with {cls.student.username}</span>
                        </div>
                    </Link>
                    <div className="calendar-event-content">
                        <LanguageChip code={cls.language} />
                        <InfoChip type='level' text={cls.level} />
                        <InfoChip type='location' text={cls.locationType} secondaryText={cls.location} />         
                        <InfoChip type='class' text={cls.classType} secondaryText={cls.maxGroupSize} />
                        <InfoChip type='duration' text={cls.duration.toString()} />
                    </div>

                    {!cls.isPast && cls.reschedule?.status === 'pending' &&
                        <div className="calendar-event-pending-request">
                            <h4>Pending Reschedule Request</h4>
                            <div className="comparison">
                                <div className="calendar-event-date-time old">
                                    <span className='date'>{formatDate(cls.date)}</span>
                                    <span className='time'>{cls.timeslot} - {getEndTime(cls.timeslot, cls.duration)}</span>
                                </div>
                                <span className="arrow">→</span>
                                <div className="calendar-event-date-time">
                                    <span className='date'>{formatDate(cls.reschedule.new_date)}</span>
                                    <span className='time'>{cls.reschedule.new_timeslot} - {getEndTime(cls.reschedule.new_timeslot, cls.duration)}</span>
                                </div>
                            </div>
                            
                            <div className="pending-request-buttons">
                            {cls.reschedule.initiator === user?._id && 
                                <button className="withdraw-button" onClick={handleWithdraw}>
                                    <i className="bi bi-x-circle-fill"></i>Withdraw
                                </button>
                            }
                            {cls.reschedule.initiator !== user?._id && <>
                                <button className="accept-button" onClick={handleAccept}>
                                    <i className="bi bi-check-circle-fill"></i>Accept
                                </button>
                                <button className="decline-button" onClick={handleDecline}>
                                    <i className="bi bi-x-circle-fill"></i>Decline
                                </button>
                            </>}
                            </div>
                        </div>         
                    }

                    {isRescheduling &&
                    <div className="calendar-event-reschedule">
                        <h4>Send a reschedule request</h4>
                        <div className="form-group">
                            <label htmlFor="date">Choose a new date</label>
                            <input type="date" id="date" name="date" value={newDate} onChange={(e)=> setNewDate(e.target.value)} placeholder="Choose a date" required />
                        </div>
                    
                        <div className="form-group">
                            <label htmlFor="timeslot">Choose a new time slot</label>
                            <select id="timeslot" name="timeslot" value={newTimeslot} onChange={(e)=> setNewTimeslot(e.target.value)}> 
                                {timeslots.map(timeslot => (
                                    <option key={timeslot} value={timeslot}>{timeslot}</option>
                                ))}
                            </select>
                        </div>

                        <div className="calendar-event-buttons">
                            <button className="reschedule-button"
                                onClick={handleSend} 
                                disabled={newDate === cls?.date && newTimeslot === cls?.timeslot}
                            >
                                Send Request
                            </button>
                            <button onClick={() => setIsRescheduling(false)} >Discard</button>
                        </div>
                    </div>}
                </div>

                <div className="calendar-event-buttons">
                    <button className="message-button" onClick={() => handleMessage(cls.student)}>
                        <i className="bi bi-envelope-fill"></i>Message {cls.student.username}
                    </button>
                    {!isRescheduling && !cls.isPast &&
                    <button 
                        className="reschedule-button" 
                        onClick={() => setIsRescheduling(true)}
                        disabled={cls.reschedule?.status === 'pending'}
                    >
                        <i className="bi bi-calendar2-x-fill"></i>Reschedule
                    </button>}
                    {!cls.isPast &&
                    <button className="cancel-button" onClick={() => handleCancel(cls)}>
                        <i className="bi bi-x-circle-fill"></i>Cancel
                    </button>}
                </div>

                <button className="calendar-event-close" onClick={onClose}>X</button>
            </div>
        </div>
    );
}

export default CalendarEventModal;