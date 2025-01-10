import { Class } from '../types'
import Avatar from './Avatar'
import useFormat from '../hooks/useFormat'

interface Props {
    cls: Class
}

function ClassCardInReview({ cls }: Props) {
    const { formatDate } = useFormat()

    return (
        <div className="card text-left mx-3 mb-4">
            <h5 className="card-header center"><span className="fs-6 date">{formatDate(cls.date)}</span><br/>{cls.timeslot}</h5>
        
            <div className="card-body">
                
                <div className="d-flex align-items-center mb-2">
                    <Avatar src={cls.teacher.profilePic} size={50} />
                    <span className="fs-5">{cls.teacher.username}</span>
                </div>

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
                        <ClassType type={cls.classType} maxGroupSize={cls.maxGroupSize}/>
                    </span>
                </div>

                <div className="row mb-2">
                    <span className="card-text col"><i className="bi bi-clock-fill me-2"></i>{cls.duration} Minutes</span>
                </div>

            </div>
        </div>
    )
}

export default ClassCardInReview