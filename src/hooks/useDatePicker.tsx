import $ from 'jquery'
import useFormat from './useFormat'

function useDatePicker() {
    const { flipDayAndYear } = useFormat()

    function generateTimeslots() {
        const timeslots = []
        for (let hr = 7; hr < 21; hr++) {
          for (const min of [0,15,30,45]) {
            const hour = hr.toString().padStart(2, '0')
            const minute = min.toString().padStart(2, '0')
            const slot = `${hour}:${minute}`;
            timeslots.push(slot);
          }
        }
        return timeslots
    }
      
    const timeslots = generateTimeslots()

    const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
      
    function createDatePicker() {
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
    }

    return { timeslots, weekdays, createDatePicker }
}

export default useDatePicker;