import { Class } from '../../../types'
import { Link } from 'react-router-dom'
import './ClassCard.css'
import Avatar from '../Avatar'
import LanguageChip from '../LanguageChip/LanguageChip'
import InfoChip from '../InfoChip/InfoChip'
import accountService from '../../../services/account.service'
import { useContext } from 'react'
import { AccountContext } from '../../../context/account.context'
import useAuth from '../../../hooks/useAuth'
import useNotifications from '../../../hooks/useNotifications'
import PendingRequest from '../PendingRequest/PendingRequest'

interface Props {
    cls: Class
    handleReschedule: (cls: Class) => void
    handleRate: (cls: Class) => void
}

function ClassCard({ cls, handleReschedule, handleRate }: Props) {
    const { setClasses } = useContext(AccountContext)
    const { user } = useAuth()
    const { sendNotification } = useNotifications()

    async function handleCancel(cls: Class) {
        try {
            await accountService.cancelClass(cls._id)
            setClasses(prev => prev.filter(c => c._id !== cls._id))
            sendNotification(user!._id, cls.teacher._id, 'cancel-student')
        } catch (error) {
            alert(error)
        }
    }

    async function handleAccept() {
        try {
            const updatedClass = await accountService.acceptReschedule(cls._id)
            setClasses(prev => prev.map(c => c._id === cls._id ? updatedClass : c))
            sendNotification(user!._id, cls.teacher._id, 'reschedule-student-accept')
        } catch (error) {
            alert(error)
        }
    }

    async function handleDecline() {
        try {
            const updatedClass = await accountService.declineReschedule(cls._id)
            setClasses(prev => prev.map(c => c._id === cls._id ? updatedClass : c))
            sendNotification(user!._id, cls.teacher._id, 'reschedule-student-decline')
        } catch (error) {
            alert(error)
        }
    }

    async function handleWithdraw() {
        try {
            const updatedClass = await accountService.withdrawReschedule(cls._id)
            setClasses(prev => prev.map(c => c._id === cls._id ? updatedClass : c))
        } catch (error) {
            alert(error)
        }
    }

    return (
        <div className="class-card">
            <div className='class-card-main'>
                <div className="class-card-header">
                    <Link to={"/users/" + cls.teacher._id}>
                        <div className="class-card-teacher">
                            <Avatar src={cls.teacher.profilePic} size={50} />
                            <span className="username">{cls.teacher.username}</span>
                        </div>
                    </Link>
                    {!cls.isPast && cls.reschedule?.status === 'pending' &&
                        <PendingRequest cls={cls} page='classes'
                        onAccept={handleAccept} onDecline={handleDecline} onWithdraw={handleWithdraw} />
                    }
                </div>
                
                <div className="class-card-content">
                    <LanguageChip code={cls.language} />
                    <InfoChip type='level' text={cls.level} />
                    <InfoChip type='location' text={cls.locationType} secondaryText={cls.location} />
                    <InfoChip type='class' text={cls.classType} secondaryText={cls.maxGroupSize} />
                    <InfoChip type='duration' text={cls.duration.toString()} />
                </div>

                <div className="class-card-buttons">
                    {!cls.isPast &&
                    <>
                        <button 
                            className="reschedule-button" 
                            onClick={() => handleReschedule(cls)}
                            disabled={cls.reschedule?.status === 'pending'}
                        >
                            <i className="bi bi-calendar2-x-fill"></i>Reschedule
                        </button>
                        <button className="cancel-button" onClick={() => handleCancel(cls)}>
                            <i className="bi bi-x-circle-fill"></i>Cancel
                        </button>
                    </>}

                    {cls.isPast && (
                        <button className="rate-button" onClick={() => handleRate(cls)} disabled={cls.isRated}>
                            <i className={`bi ${cls.isRated ? 'bi-check-circle-fill': 'bi-star-fill'} `}></i>{cls.isRated ? 'Rated' : 'Rate'}
                        </button>
                    )}
                </div>
            </div>

            <div className="class-card-decorator">
                <div className="class-card-date-time">
                    <span className='date'><i className='bi bi-calendar-fill'></i>{(new Date(cls.date)).getUTCDate().toString().padStart(2, '0')}</span>
                    <span className='time'><i className='bi bi-clock-fill'></i>{cls.timeslot}</span>
                </div>
            </div>
        </div>
    )
}

export default ClassCard