import { Class } from '../../types'
import './CalendarEvent.css'
import Avatar from '../Avatar'
import useFormat from '../../hooks/useFormat'
import LanguageChip from '../LanguageChip/LanguageChip'
import InfoChip from '../InfoChip/InfoChip'
import useDate from '../../hooks/useDate'

interface Props {
    cls: Class
    position: { top: number, left: number }
}

function CalendarEvent({ cls, position }: Props) {
    const { formatDate } = useFormat()
    const { getEndTime } = useDate()

    return (
        <div className="calendar-card" style={{ top: position.top, left: position.left }}>
            <div className="calendar-card-header">
                <div className="calendar-card-student">
                    <Avatar src={cls.student.profilePic} size={50} />
                    <span className="username">{cls.student.username}</span>
                </div>

                <div className="calendar-card-date-time">
                    <span className='date'>{formatDate(cls.date)}</span>
                    <span className='time'>{cls.timeslot} - {getEndTime(cls)}</span>
                </div>
            </div>
            
            <div className="calendar-card-content">
                <LanguageChip code={cls.language} />
                <InfoChip type='level' text={cls.level} />
                <InfoChip type='location' text={cls.locationType} />            
                <InfoChip type='class' text={cls.classType} secondaryText={cls.maxGroupSize} />
                <InfoChip type='duration' text={cls.duration.toString()} />
            </div>
        </div>
    )
}

export default CalendarEvent