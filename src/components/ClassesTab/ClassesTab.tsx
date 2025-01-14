import { useState, useEffect, useContext } from 'react'
import { Class } from '../../types'
import accountService from '../../services/account.service'
import ClassCard from '../ClassCard/ClassCard'
import RescheduleModal from '../RescheduleModal'
import { ClassContext } from '../../context/class.context'
import ReviewForm from '../ReviewForm'
import './ClassesTab.css'
import useFormat from '../../hooks/useFormat'
import { AccountContext } from '../../context/account.context'

function ClassesTab() {
    const { classes, setClasses } = useContext(AccountContext)
    const { managedClass, setManagedClass } = useContext(ClassContext)
    const [newDate, setNewDate] = useState('')
    const [newTimeslot, setNewTimeslot] = useState('')
    const [ratedClass, setRatedClass] = useState<Class | null>(null)
    const { flipDayAndYear } = useFormat()

    useEffect(()=> {
        // update the upcoming classes array whenever a class is modified
        if (managedClass) setClasses(prev => prev.map(c => c._id === managedClass._id ? managedClass : c))
    }, [managedClass])

    function handleReschedule(cls: Class) {
        setManagedClass(cls)
        setNewDate(flipDayAndYear(new Date(cls?.date)))
        setNewTimeslot(cls?.timeslot)
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
            <div>
                <span>Upcoming</span>
                {classes?.filter(cls => !cls.isPast).map(cls => (
                    <ClassCard 
                        key={cls._id} 
                        cls={cls}  
                        handleReschedule={handleReschedule} 
                        handleRate={handleRate}
                    />
                ))}
            </div>

            <div>
                <span>Past</span>
                {classes?.filter(cls => cls.isPast).map(cls => (
                        <ClassCard 
                            key={cls._id} 
                            cls={cls}
                            handleReschedule={handleReschedule} 
                            handleRate={handleRate}
                        />
                ))}
            </div>

            {/*<RescheduleModal newDate={newDate} newTimeslot={newTimeslot} setNewTimeslot={setNewTimeslot} handleSend={handleSend} />*/}

            {ratedClass && <ReviewForm cls={ratedClass} setRatedClass={setRatedClass} setClasses={setClasses} />}
        </>
    )
}

export default ClassesTab