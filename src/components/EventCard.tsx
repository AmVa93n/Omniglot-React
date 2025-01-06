import { Class } from '../types'
import { Link } from 'react-router-dom'
import Language from './Language'
import { ClassType, ClassLocation, Level } from './Snippet'
import '../styles/EventCard.css'
import UserAvatar from './UserAvatar'
import useFormat from '../hooks/useFormat'

function EventCard({ cls }: {cls: Class}) {
    const { formatDate } = useFormat()

    return (
        <div className="card calendar-card text-left mx-3 mb-4" id={cls._id} style={{display: 'none'}}>
            <h5 className="card-header center"><span className="fs-6 date">{formatDate(cls.date)}</span><br/>{cls.timeslot}</h5>
            <div className="card-body">
                <Link to={"/users/" + cls.student._id}>
                    <div className="d-flex align-items-center mb-2">
                        <UserAvatar src={cls.student.profilePic} size={50} />
                        <span className="fs-5">{cls.student.username}</span>
                    </div>
                </Link>

                <div className="row mb-2">
                    <span className="card-text col"> 
                        <Language code={cls.language} />
                    </span>
                    <span className="card-text col">
                        <Level level={cls.level} />
                    </span>
                </div>

                <div className="row mb-2">
                    <span className="card-text col">
                        <ClassLocation type={cls.locationType} location={cls.location} />
                    </span>
                </div>

                <div className="row mb-2">
                    <span className="card-text col">
                        <ClassType type={cls.classType} maxGroupSize={cls.maxGroupSize} />
                    </span>
                </div>

                <div className="row">
                    <span className="card-text col"><i className="bi bi-clock-fill me-2"></i>{cls.duration} Minutes</span>
                </div>

            </div>
        </div>
    )
}

export default EventCard