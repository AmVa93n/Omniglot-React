import { Class } from '../types'

function useDate() {
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

    return { timeslots, weekdays, getEndTime }
}

export default useDate;