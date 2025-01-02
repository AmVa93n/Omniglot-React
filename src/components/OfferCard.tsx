import { Offer } from '../types'
import Language from './Language'
import { ClassType, ClassLocation, Level } from './Snippet'
import { Link } from 'react-router-dom'
import '../styles/OfferCard.css'

interface Props {
    offer: Offer
    isOwn?: boolean
    handleEdit?: () => void
    handleDelete?: () => void
    disabled?: boolean
}

function OfferCard({ offer, isOwn, handleDelete, handleEdit, disabled }: Props) {
    return (
        <div className="card offer-card text-left mx-3 mb-4">
            <h5 className="card-header center">{offer.name}</h5>
            <div className="card-body">
                <div className="row mb-2">
                    <span className="card-text col"> 
                        <Language code={offer.language} />
                    </span>
                    <span className="card-text col">
                        <Level level={offer.level} />
                    </span>
                </div>
                
                <div className="row mb-2">
                    <span className="card-text col">
                        <ClassLocation type={offer.locationType} location={isOwn ? offer.location : ''} />
                    </span>
                </div>
        
                <div className="row mb-2">
                    <span className="card-text col">
                        <ClassType type={offer.classType} maxGroupSize={offer.maxGroupSize} />
                    </span>
                </div>

                {isOwn && <>
                    <div className="row mb-2">
                        <span className="card-text col">
                            <i className="bi bi-calendar-fill me-2"></i>{offer.weekdays.join(', ')}</span>
                    </div>
                    <div className="row mb-2">
                        <span className="card-text col">
                            <i className="bi bi-clock-fill me-2"></i>{offer.timeslots.join(', ')}</span>
                    </div>
                </>}
                
                <div className="row mb-2">
                    <span className="card-text col"><i className="bi bi-clock-fill me-2"></i>{offer.duration} Minutes</span>
                    <span className="card-text col"><i className="bi bi-tag-fill me-2"></i><span className="price">$</span>{offer.price}.00</span>
                </div>
        
                {!isOwn && 
                <div className="d-flex justify-content-center mt-3">
                    <Link to={`/offers/${offer._id}/book`} className="btn btn-warning"><i className="bi bi-calendar2-check-fill me-2"></i>Book</Link>
                </div>}

                {isOwn && 
                <div className="d-flex justify-content-center">
                    <button className="btn btn-sm btn-secondary mx-1" onClick={handleEdit} disabled={disabled}>
                        <i className="bi bi-pencil-square me-2"></i>Edit
                    </button>
                    <button className="btn btn-sm btn-danger mx-1" onClick={handleDelete} disabled={disabled}>
                        <i className="bi bi-trash3-fill me-2"></i>Delete
                    </button>
                </div>}
            </div>
        </div>
    )
}


export default OfferCard