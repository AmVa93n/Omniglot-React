import { Review } from '../types'
import Language from './Language'
import { ClassType, ClassLocation, Level } from './Snippet';
import { Link } from 'react-router-dom';
import '../styles/ReviewCard.css'
import UserAvatar from './UserAvatar';
import useFormat from '../hooks/useFormat';

interface Props {
    review: Review
}

function ReviewCard({ review }: Props) {
    const { formatDate, drawStars } = useFormat();

    return (
        <div className="card review-card text-left mx-3 mb-4">
            <div className="card-body">
                <div className="row mb-2">
                    <Link to={"/users/" + review.author._id} className="col">
                        <div className="d-flex align-items-center">
                            <UserAvatar src={review.author.profilePic} size={50} />
                            <span className="fs-5">{review.author.username}</span>
                            
                        </div>
                    </Link>
                    <div className="col-auto">
                    <div className="card-text ms-auto rating fs-5" style={{width: 'fit-content', color: '#ffca08'}}>
                        {drawStars(review.rating)}
                    </div>
                    <div className="card-text ms-auto date" style={{width: 'fit-content'}}>{formatDate(review.date)}</div>
                    </div>
                </div>
                <div className="row">
                    <span className="card-text col fst-italic">"{review.text}"</span>
                </div>
            </div>
    
            <div className="card-footer">
                <div className="row mb-2">
                    <span className="card-text col"> 
                        <Language code={review.language} />
                    </span>
                    <span className="card-text col">
                        <Level level={review.level} />
                    </span>
                </div>
                
                <div className="row">
                    <span className="card-text col">
                        <ClassLocation type={review.locationType} />
                    </span>
                    <span className="card-text col">
                        <ClassType type={review.classType} maxGroupSize={review.maxGroupSize} />
                    </span>
                </div>
            </div>
        </div>
    )
}

export default ReviewCard