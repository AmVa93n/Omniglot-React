import { Offer } from '../types'
import Language from './Language'
import Snippet from './Snippet'

function OfferBox({ offer }: {offer: Offer}) {
    return (
        <div className="card offer-card text-left mx-3 mb-4">
            <h5 className="card-header center">{offer.name}</h5>
            <div className="card-body">
                <div className="row mb-2">
                    <span className="card-text col"> 
                        <Language code={offer.language} />
                    </span>
                    <span className="card-text col addedIconWrapper">
                        <Snippet data={offer.level} />
                    </span>
                </div>
                
                <div className="row mb-2">
                    <span className="card-text col addedIconWrapper">
                        <Snippet data={offer.locationType} />
                    </span>
                </div>
        
                <div className="row mb-2">
                    <span className="card-text col">
                        <Snippet data={offer.classType} />
                        {offer.maxGroupSize && <span> (max. {offer.maxGroupSize} students)</span>}
                    </span>
                </div>
                
                <div className="row mb-2">
                    <span className="card-text col"><i className="bi bi-clock-fill me-2"></i>{offer.duration} Minutes</span>
                    <span className="card-text col"><i className="bi bi-tag-fill me-2"></i><span className="price">$</span>{offer.price}.00</span>
                </div>
        
                <div className="d-flex justify-content-center mt-3">
                    <a href="/offers/{{offer._id}}/book" className="btn btn-warning"><i className="bi bi-calendar2-check-fill me-2"></i>Book</a>
                </div>
            </div>
        </div>
    )
}


export default OfferBox