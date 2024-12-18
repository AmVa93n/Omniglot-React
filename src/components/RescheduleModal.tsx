import { timeslots, flipDayAndYear, createDatePicker } from "../utils"
import { reschedule } from '../types'
import { useEffect } from "react";
import accountService from "../services/account.service";

function RescheduleModal({ classId, reschedule, setReschedule }: 
    {classId: string, reschedule: reschedule, setReschedule: React.Dispatch<React.SetStateAction<reschedule>> }) {

    useEffect(()=> {
        createDatePicker()
    }, [])

    function handleChange(event: React.ChangeEvent) {
        const field = (event.target as HTMLInputElement).name
        const value = (event.target as HTMLInputElement).value
        setReschedule(prev => {
            return {...prev, [field]: value}
        })
    }

    async function handleSend() {
        await accountService.rescheduleClass(classId)
        setReschedule({
            isOpen: false,
            date: undefined,
            timeslot: undefined
        })
    }

    return (
        <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Send a reschedule request</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
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
                                <button type="submit" className="btn btn-primary mx-1">Send Request</button>
                                <button type="button" className="btn btn-secondary mx-1" data-bs-dismiss="modal">Close</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RescheduleModal