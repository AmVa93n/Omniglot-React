import { Class } from '../types'
import { Link } from 'react-router-dom'
import Language from './Language'
import Snippet from './Snippet'
import { formatDate } from '../utils'
import PendingRequest from './PendingRequest'

interface Props {
    cls: Class
    type?: 'past' | 'future'
    handleReschedule: (cls: Class) => void
    handleCancel: (cls: Class) => void
    handleRate: (cls: Class) => void
}

function ClassBox({ cls, type, handleReschedule, handleCancel, handleRate }: Props) {

    return (
        <div className="card offer-card text-left mx-3 mb-4">
            <h5 className="card-header center"><span className="fs-6 date">{formatDate(cls.date)}</span><br/>{cls.timeslot}</h5>

            {type === 'future' && cls.reschedule?.status === 'pending' &&
                <PendingRequest cls={cls} reschedule={cls.reschedule} />

            }
        
            <div className="card-body">
                <Link to={"/users/" + cls.teacher._id} className="link-text">
                    <div className="d-flex align-items-center mb-2">
                        <div className="circle-crop me-2" style={{width: '50px', height: '50px', display: 'inline-flex'}}>
                            <img src={cls.teacher.profilePic || '/images/Profile-PNG-File.png'}/>
                        </div>
                        <span className="fs-5">{cls.teacher.username}</span>
                    </div>
                </Link>

                <div className="row mb-2">
                    <span className="card-text col"> 
                        <Language code={cls.language} />
                    </span>
                    <span className="card-text col">
                        <Snippet data={cls.level} />
                    </span>
                </div>

                <div className="row mb-2">
                    <span className="card-text col">
                        <Snippet data={cls.locationType} />
                    </span>
                    {cls.location && <span>({cls.location})</span>}
                </div>

                <div className="row mb-2">
                    <span className="card-text col">
                        <Snippet data={cls.classType} />
                        {cls.maxGroupSize && <span> (max. {cls.maxGroupSize} students)</span>}
                    </span>
                </div>

                <div className="row mb-2">
                    <span className="card-text col"><i className="bi bi-clock-fill me-2"></i>{cls.duration} Minutes</span>
                </div>

                <div className="d-flex justify-content-center mt-3">
                    {type === 'future' &&
                    <>
                        <button 
                            className="btn btn-sm btn-secondary mx-1" 
                            onClick={() => handleReschedule(cls)}
                            data-bs-toggle="modal" 
                            data-bs-target="#exampleModal" 
                            disabled={cls.reschedule?.status === 'pending'}
                        >
                            <i className="bi bi-calendar2-x-fill me-2"></i>Reschedule
                        </button>
                        <button className="btn btn-sm btn-danger mx-1" onClick={() => handleCancel(cls)}>
                            <i className="bi bi-x-circle-fill me-2"></i>Cancel
                        </button>
                    </>}

                    {type === 'past' && (
                        cls.isRated ?
                        <button className="btn btn-warning mx-1" disabled>
                            <i className="bi bi-check-circle-fill me-2"></i>Rated
                        </button>
                        :
                        <button className="btn btn-warning mx-1" onClick={() => handleRate(cls)}>
                            <i className="bi bi-star-fill me-2"></i>Rate
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ClassBox