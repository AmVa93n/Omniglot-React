import { Review } from '../types'
import Language from './Language'
import { formatDate } from '../utils'
import Snippet from './Snippet';
import { Link } from 'react-router-dom';

interface Props {
    review: Review
}

function ReviewBox({ review }: Props) {

    function drawStars(stars: number) {
        return Array.from({ length: stars }, (_, i) => (
          <span key={i}>&#9733;</span> // Unicode for star
        ));
    }

    return (
        <div className="card review-card text-left mx-3 mb-4">
            <div className="card-body">
                <div className="row mb-2">
                    <Link to={"/users/" + review.author._id} className="link-text col">
                        <div className="d-flex align-items-center">
                            <div className="circle-crop me-2" style={{width: '50px', height: '50px', display: 'inline-flex'}}>
                                <img src={review.author.profilePic || '/images/Profile-PNG-File.png'}/>
                            </div>
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
                        <Snippet data={review.level} />
                    </span>
                </div>
                
                <div className="row">
                    <span className="card-text col">
                        <Snippet data={review.locationType} />
                    </span>
                    <span className="card-text col">
                        <Snippet data={review.classType} />
                        {review.maxGroupSize && <span> (max. {review.maxGroupSize} students)</span>}
                    </span>
                </div>
            </div>
        </div>
    )
}


export default ReviewBox