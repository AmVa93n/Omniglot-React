import { useState, useContext } from 'react'
import { Class } from '../../types'
import ClassCard from '../ClassCard/ClassCard'
import RescheduleModal from '../RescheduleModal/RescheduleModal'
import ReviewForm from '../ReviewForm'
import './ClassesTab.css'
import { AccountContext } from '../../context/account.context'

function ClassesTab() {
    const { classes, setClasses } = useContext(AccountContext)
    const [managedClass, setManagedClass] = useState<Class | null>(null)
    const [ratedClass, setRatedClass] = useState<Class | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    function handleReschedule(cls: Class) {
        setManagedClass(cls)
        setIsModalOpen(true)
    }

    function handleRate(cls: Class) {
        setRatedClass(cls)
    }

    interface ClassesByYear {
        [year: string]: {
            [month: string]: Class[]
        }
    }

    const upcomingClasses = classes?.reduce((acc, cls) => {
        if (cls.isPast) return acc;
        const date = new Date(cls.date);
        const year = date.getFullYear();
        const month = date.toLocaleString('en', { month: 'long' });

        if (!acc[year]) acc[year] = {};
        if (!acc[year][month]) acc[year][month] = [];
        acc[year][month].push(cls);

        return acc;
    }, {} as ClassesByYear);

    const pastClasses = classes?.reduce((acc, cls) => {
        if (!cls.isPast) return acc;
        const date = new Date(cls.date);
        const year = date.getFullYear().toString();
        const month = date.toLocaleString('en', { month: 'long' });

        if (!acc[year]) acc[year] = {};
        if (!acc[year][month]) acc[year][month] = [];
        acc[year][month].push(cls);

        return acc;
    }, {} as ClassesByYear);

    const sortedUpcomingYears = Object.keys(upcomingClasses || {}).sort((a, b) => parseInt(b) - parseInt(a));
    const sortedPastYears = Object.keys(pastClasses || {}).sort((a, b) => parseInt(b) - parseInt(a));

    return (
        <>
            <div className="timeline">
                <div className="timeline-section">
                    <span className='timeline-title'>Upcoming</span>
                    {upcomingClasses && sortedUpcomingYears.map(year => (
                        <div key={year} className="timeline-year">
                            <h2>{year}</h2>
                            {Object.entries(upcomingClasses[year])
                                .sort((a, b) => new Date(b[0]).getMonth() - new Date(a[0]).getMonth())
                                .map(([month, classes]) => (
                                    <div key={month} className="timeline-month">
                                        <h3>{month}</h3>
                                        <div className="timeline-classes">
                                            {classes.map(cls => (
                                                <ClassCard 
                                                    key={cls._id} 
                                                    cls={cls}  
                                                    handleReschedule={handleReschedule} 
                                                    handleRate={handleRate}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                ))}
                        </div>
                    ))}
                </div>

                <div className="timeline-section">
                    <span className='timeline-title'>Past</span>
                    {pastClasses && sortedPastYears.map(year => (
                        <div key={year} className="timeline-year">
                            <h2>{year}</h2>
                            {Object.entries(pastClasses[year])
                                .sort((a, b) => new Date(b[0]).getMonth() - new Date(a[0]).getMonth())
                                .map(([month, classes]) => (
                                    <div key={month} className="timeline-month">
                                        <h3>{month}</h3>
                                        <div className="timeline-classes">
                                            {classes.map(cls => (
                                                <ClassCard 
                                                    key={cls._id} 
                                                    cls={cls}  
                                                    handleReschedule={handleReschedule} 
                                                    handleRate={handleRate}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                ))}
                        </div>
                    ))}
                </div>
            </div>

            {isModalOpen && <RescheduleModal cls={managedClass} onClose={() => setIsModalOpen(false)} />}

            {ratedClass && <ReviewForm cls={ratedClass} setRatedClass={setRatedClass} setClasses={setClasses} />}
        </>
    )
}

export default ClassesTab