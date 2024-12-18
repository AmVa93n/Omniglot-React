import { useState, useEffect } from 'react'
import { Class, reschedule } from '../types'
import accountService from '../services/account.service'
import ClassBox from '../components/ClassBox'
import RescheduleModal from '../components/RescheduleModal'

function ClassesPage() {
    const [classes, setClasses] = useState({} as classes)
    const [selectedClass, setSelectedClass] = useState({} as Class)
    const [reschedule, setReschedule] = useState<reschedule>({
            isOpen: false,
            date: undefined,
            timeslot: undefined
    })

    interface classes {
        upcomingClasses:  Class[]
        pastClasses: Class[]
    }

    useEffect(()=> {
        async function fetchClasses() {
            try {
                const data: classes = await accountService.getClasses()
                setClasses(data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchClasses()
    }, [])

    function handleReschedule(cls: Class) {
        setSelectedClass(cls)
        setReschedule({
            isOpen: true,
            date: cls?.date,
            timeslot: cls?.timeslot
        })
    }

    return (
        <>
            <h3 className="center my-3">My Booked Classes</h3>

            <div className="hr-with-text">
                <span>Upcoming</span>
            </div>

            <div className="d-flex justify-content-center flex-wrap px-auto" style={{width: '100%'}}>
                {classes.upcomingClasses?.map(cls => (
                    <ClassBox key={cls._id} cls={cls} type='future' onClick={handleReschedule}/>
                ))}
            </div>

            <div className="hr-with-text">
                <span>Past</span>
            </div>


            <div className="d-flex justify-content-center flex-wrap px-auto" style={{width: '100%'}}>
                {classes.pastClasses?.map(cls => (
                        <ClassBox key={cls._id} cls={cls} type='past' onClick={handleReschedule}/>
                ))}
            </div>

            {reschedule.isOpen &&
            <RescheduleModal classId={selectedClass._id} reschedule={reschedule} setReschedule={setReschedule} />}
        </>
    )
}

export default ClassesPage