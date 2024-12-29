import { useEffect, useState } from 'react';
import accountService from '../services/account.service';
import OfferBox from '../components/OfferBox';
import { Offer } from '../types';

function OffersPage() {
    const [offers, setOffers] = useState<Offer[]>([])
    
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
            <h3 className="center my-3">My Offers</h3>
            <div className="d-flex justify-content-center flex-wrap px-auto" style={{width: '100%'}}>
                {offers.map(offer => (
                    <OfferBox offer={offer} isOwn={true} handleDelete={handleDelete} />
                ))}
            </div>

            <div className="d-flex justify-content-center mt-3">
                <a href="/account/offers/new">
                <button className="btn btn-primary mx-auto"><i className="bi bi-clipboard2-plus-fill me-2"></i>Create Offer</button></a>
            </div>
        </>
    );
}

export default OffersPage;