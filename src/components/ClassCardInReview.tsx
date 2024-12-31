import { Class } from '../types'
import Language from './Language'
import Snippet from './Snippet'
import { formatDate } from '../utils'

interface Props {
    cls: Class
}

function ClassCardInReview({ cls }: Props) {

    return (
        <div className="card text-left mx-3 mb-4">
            <h5 className="card-header center"><span className="fs-6 date">{formatDate(cls.date)}</span><br/>{cls.timeslot}</h5>
        
            <div className="card-body">
                
                <div className="d-flex align-items-center mb-2">
                    <div className="circle-crop me-2" style={{width: '50px', height: '50px', display: 'inline-flex'}}>
                        <img src={cls.teacher.profilePic || '/images/Profile-PNG-File.png'}/>
                    </div>
                    <span className="fs-5">{cls.teacher.username}</span>
                </div>

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

            </div>
        </div>
    )
}

export default ClassCardInReview