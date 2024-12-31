import { useState, useEffect, useContext } from 'react'
import { Class } from '../types'
import accountService from '../services/account.service'
import ClassBox from '../components/ClassBox'
import RescheduleModal from '../components/RescheduleModal'
import { ClassContext } from '../context/class.context'
import { flipDayAndYear } from '../utils'
import ReviewForm from '../components/ReviewForm'

function ClassesPage() {
    const [upcomingClasses, setUpcomingClasses] = useState([] as Class[])
    const [pastClasses, setPastClasses] = useState([] as Class[])
    const { managedClass, setManagedClass } = useContext(ClassContext)
    const [newDate, setNewDate] = useState('')
    const [newTimeslot, setNewTimeslot] = useState('')
    const [ratedClass, setRatedClass] = useState<Class | null>(null)

    useEffect(()=> {
        async function fetchClasses() {
            try {
                const {upcomingClasses, pastClasses} = await accountService.getClasses()
                setUpcomingClasses(upcomingClasses)
                setPastClasses(pastClasses)
            } catch (error) {
                console.log(error)
            }
        }

        fetchClasses()
    }, [])

    useEffect(()=> {
        // update the upcoming classes array whenever a class is modified
        if (managedClass) setUpcomingClasses(prev => prev.map(c => c._id === managedClass._id ? managedClass : c))
    }, [managedClass])

    function handleReschedule(cls: Class) {
        setManagedClass(cls)
        setNewDate(flipDayAndYear(new Date(cls?.date)))
        setNewTimeslot(cls?.timeslot)
    }

    async function handleCancel(cls: Class) {
        try {
            await accountService.cancelClass(cls._id)
            setUpcomingClasses(prev => prev.filter(c => c._id !== cls._id))
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

    function handleRate(cls: Class) {
        setRatedClass(cls)
    }

    return (
        <>
            <h3 className="center my-3">My Booked Classes</h3>

            <div className="hr-with-text">
                <span>Upcoming</span>
            </div>

            <div className="d-flex justify-content-center flex-wrap px-auto" style={{width: '100%'}}>
                {upcomingClasses?.map(cls => (
                    <ClassBox 
                        key={cls._id} 
                        cls={cls} 
                        type='future' 
                        handleReschedule={handleReschedule} 
                        handleCancel={handleCancel}
                        handleRate={handleRate}
                    />
                ))}
            </div>

            <div className="hr-with-text">
                <span>Past</span>
            </div>


            <div className="d-flex justify-content-center flex-wrap px-auto" style={{width: '100%'}}>
                {pastClasses?.map(cls => (
                        <ClassBox 
                            key={cls._id} 
                            cls={cls} type='past' 
                            handleReschedule={handleReschedule} 
                            handleCancel={handleCancel}
                            handleRate={handleRate}
                        />
                ))}
            </div>

            <RescheduleModal newDate={newDate} newTimeslot={newTimeslot} setNewTimeslot={setNewTimeslot} handleSend={handleSend} />

            {ratedClass && <ReviewForm cls={ratedClass} setRatedClass={setRatedClass} setClasses={setPastClasses} />}
        </>
    )
}

export default ClassesPage