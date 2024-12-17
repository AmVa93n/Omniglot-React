import { timeslots, flipDayAndYear } from "../utils"
import { Class } from '../types'
import $ from 'jquery';

function RescheduleModal({ selectedClass }: {selectedClass: Class | null}) {

    function handleChange() {

    }

    function handleSend() {

    }

    $(document).ready(() => {
        // Calculate start date (1 day from today)
        const today = new Date();
        const startDate = new Date(today);
        startDate.setDate(today.getDate() + 1);

        // Calculate end date (3 months from today)
        const endDate = new Date(today);
        endDate.setMonth(today.getMonth() + 3);
        
        $('#datepicker').datepicker({
            format: 'dd-mm-yyyy', // Format of the date
            startDate: flipDayAndYear(startDate), // Start date
            endDate: flipDayAndYear(endDate),   // End date
            autoclose: true, // Close datepicker after selection
            todayHighlight: false, // Highlight today's date
            weekStart: 1, // Start the week on Monday
        });
    });

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
                                        value={flipDayAndYear(new Date(selectedClass?.date || ''))} onChange={handleChange}/>
                                </div>
                            </div>
                            <div className="container mb-4">
                                <label htmlFor="timeslot">Choose a new time slot</label>
                                <select className="form-select" id="timeslots" name="timeslot" 
                                    value={selectedClass?.timeslot} onChange={handleChange}> 
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