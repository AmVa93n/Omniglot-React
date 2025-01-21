import { useState, useContext } from "react";
import useDate from "../../hooks/useDate";
import { Class } from "../../types";
import accountService from "../../services/account.service";
import { AccountContext } from "../../context/account.context";
import useNotifications from "../../hooks/useNotifications";
import useAuth from "../../hooks/useAuth";
import DatePicker from "react-datepicker";

interface Props {
    cls: Class | null
    onClose: () => void
}

function RescheduleModal({ cls, onClose }: Props) {
    const [newDate, setNewDate] = useState(cls?.date || '')
    const [newTimeslot, setNewTimeslot] = useState(cls?.timeslot || '')
    const { timeslots } = useDate()
    const { setClasses } = useContext(AccountContext)
    const { sendNotification } = useNotifications()
    const { user } = useAuth()

    async function handleSend() {
        if (!cls) return
        const updatedClass = await accountService.rescheduleClass(cls._id, {date: newDate, timeslot: newTimeslot})
        setClasses(prev => prev.map(c => c._id === cls._id ? updatedClass : c))
        sendNotification(user!._id, cls.teacher._id, 'reschedule-student-pending')
        onClose()
    }

    function handleDateChange(date: Date | null) {
        if (date) {
            setNewDate(date.toISOString().split('T')[0])
        } else {
            setNewDate('')
        }
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Send a reschedule request</h2>
                </div>

                <div className="modal-body">
                    <div className="form-group">
                        <label htmlFor="date">Choose a new date</label>
                        <DatePicker 
                            selected={new Date(newDate)} 
                            onChange={handleDateChange} 
                            dateFormat="dd / MM / yyyy" 
                            id="date"
                            minDate={new Date()}
                            maxDate={new Date(new Date().setMonth(new Date().getMonth() + 3))}
                        />
                    </div>
                
                    <div className="form-group">
                        <label htmlFor="timeslot">Choose a new time slot</label>
                        <select id="timeslot" value={newTimeslot} onChange={(e)=> setNewTimeslot(e.target.value)}> 
                            {timeslots.map(timeslot => (
                                <option key={timeslot} value={timeslot}>{timeslot}</option>
                            ))}
                        </select>
                    </div>
                </div>
                            
                <div className="modal-buttons">
                    <button 
                        onClick={handleSend} 
                        disabled={newDate === cls?.date && newTimeslot === cls?.timeslot}
                    >
                        Send Request
                    </button>
                    <button onClick={onClose} >Close</button>
                </div>
            </div>
        </div>
    )
}

export default RescheduleModal