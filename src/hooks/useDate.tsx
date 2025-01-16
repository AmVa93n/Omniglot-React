import $ from 'jquery'
import useFormat from './useFormat'
import { Class } from '../types'

function useDate() {
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

    function getEndTime(cls: Class) {
      const [hours, minutes] = cls.timeslot.split(':').map(Number);
      const totalMinutes = hours * 60 + minutes + Number(cls.duration);
      let newHours: number | string = Math.floor(totalMinutes / 60) % 24;
      let newMinutes: number | string = totalMinutes % 60;
      newHours = newHours.toString().padStart(2, '0');
      newMinutes = newMinutes.toString().padStart(2, '0');
      return `${newHours}:${newMinutes}`;
    }
      
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

    return { timeslots, weekdays, getEndTime, createDatePicker }
}

export default useDate;