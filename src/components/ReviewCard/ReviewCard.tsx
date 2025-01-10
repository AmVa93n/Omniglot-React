import { Review } from '../../types'
import LanguageChip from '../LanguageChip/LanguageChip';
import InfoChip from '../InfoChip/InfoChip';
import { Link } from 'react-router-dom';
import './ReviewCard.css'
import Avatar from '../Avatar';
import useFormat from '../../hooks/useFormat';

interface Props {
    review: Review
}

function ReviewCard({ review }: Props) {
    const { formatDate, drawStars } = useFormat();

    return (
        <div className="review-card">
            <div className="review-card-header">
                <Link to={"/users/" + review.author._id}>
                    <div className="review-card-author">
                        <Avatar src={review.author.profilePic} size={50} />
                        <span className="username">{review.author.username}</span>
                    </div>
                </Link>

                <div className="review-info">
                    <div className="rating" style={{color: '#ffca08'}}>
                        {drawStars(review.rating)}
                    </div>
                    <div className="date">{formatDate(review.date)}</div>
                </div>
            </div>

            <div className="review-card-content">
                <span>"{review.text}"</span>
            </div>
    
            <div className="review-card-footer">
                <LanguageChip code={review.language} />
                <InfoChip type='level' text={review.level} />
                <InfoChip type='location' text={review.locationType} />
                <InfoChip type='class' text={review.classType} secondaryText={review.maxGroupSize} />
            </div>
        </div>
    )
}

export default ReviewCard