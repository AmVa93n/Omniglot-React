import { Offer } from '../../types'
import LanguageChip from '../LanguageChip/LanguageChip'
import { ClassTypeChip, ClassLocationChip, LevelChip, Chip } from '../InfoChip/InfoChip'
import { Link } from 'react-router-dom'
import './OfferCard.css'

interface Props {
    offer: Offer
    isOwn?: boolean
    handleEdit?: () => void
    handleDelete?: () => void
    disabled?: boolean
}

function OfferCard({ offer, isOwn, handleDelete, handleEdit, disabled }: Props) {
    return (
        <div className="offer-card">
            <div className="offer-card-header">
                <h5>{offer.name}</h5>
            </div>
            <div className="offer-card-content">
                
                <LanguageChip code={offer.language} />
                <LevelChip level={offer.level} />
                <ClassLocationChip type={offer.locationType} location={isOwn ? offer.location : ''} />
                <ClassTypeChip type={offer.classType} maxGroupSize={offer.maxGroupSize} />

                {isOwn && <>
                    <Chip type="weekdays" text={offer.weekdays.join(', ')} />
                    <Chip type="timeslots" text={offer.timeslots.join(', ')} />
                </>}
                
                <Chip type="duration" text={offer.duration.toString()} />
                <Chip type="price" text={offer.price.toString()} />
            </div>

            <div className="offer-card-buttons">
                {!isOwn && 
                    <Link to={`/offers/${offer._id}/book`}>
                        <button className="book-button">
                            <i className="bi bi-calendar2-check-fill"></i>Book
                        </button>
                    </Link>
                }

                {isOwn && <>
                    <button className="edit-button" onClick={handleEdit} disabled={disabled}>
                        <i className="bi bi-pencil-square"></i>Edit
                    </button>
                    <button className="delete-button" onClick={handleDelete} disabled={disabled}>
                        <i className="bi bi-trash3-fill"></i>Delete
                    </button>
                </>}
            </div>
            
        </div>
    )
}


export default OfferCard