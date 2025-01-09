import { useEffect, useState } from 'react';
import accountService from '../services/account.service';
import OfferCard from '../components/OfferCard/OfferCard';
import { Offer } from '../types';
import NewOfferForm from '../components/NewOfferForm';
import EditOfferForm from '../components/EditOfferForm';

function OffersPage() {
    const [offers, setOffers] = useState<Offer[]>([])
    const [isCreating, setIsCreating] = useState(false)
    const [editedOffer, setEditedOffer] = useState<Offer | null>(null)
    
    useEffect(()=> {
        async function fetchOffers() {
            try {
                const offers = await accountService.getOffers()
                setOffers(offers)
            } catch (error) {
                console.log(error)
            }
        }

        fetchOffers()
    }, [])

    async function handleDelete(offerId: string) {
        try {
            await accountService.deleteOffer(offerId)
            setOffers(offers.filter(o => o._id !== offerId))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <h3 className="my-3">My Offers</h3>
            <div className="d-flex justify-content-center flex-wrap px-auto" style={{width: '100%'}}>
                {offers.map(offer => (
                    <OfferCard 
                        key={offer._id} 
                        offer={offer} 
                        isOwn={true} 
                        handleDelete={() => handleDelete(offer._id)} 
                        handleEdit={() => setEditedOffer(offer)}
                        disabled={editedOffer?._id === offer._id}
                    />
                ))}
            </div>

            <div className="d-flex justify-content-center mt-3">
                {editedOffer ? 
                    <EditOfferForm offer={editedOffer} setEditedOffer={setEditedOffer} setOffers={setOffers} />
                : isCreating ? 
                    <NewOfferForm setOffers={setOffers} setIsCreating={setIsCreating} />
                :
                    <button className="btn btn-primary mx-auto" onClick={() => setIsCreating(true)}>
                        <i className="bi bi-clipboard2-plus-fill me-2"></i>Create Offer
                    </button>}
            </div>
        </>
    );
}

export default OffersPage;