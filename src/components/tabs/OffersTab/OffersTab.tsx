import { useContext, useState } from 'react';
import OfferCard from '../../reusable/OfferCard/OfferCard';
import { Offer } from '../../../types';
import CreateOfferModal from '../../modals/CreateOfferModal';
import EditOfferModal from '../../modals/EditOfferModal';
import { AccountContext } from '../../../context/account.context';
import './OffersTab.css';

function OffersTab() {
    const { offers } = useContext(AccountContext)
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [editedOffer, setEditedOffer] = useState<Offer | null>(null)

    return (
        <div className="offers-tab">
            <div className='offers-container'>
                {offers.map(offer => (
                    <OfferCard 
                        key={offer._id} 
                        offer={offer} 
                        isOwn={true}
                        handleEdit={() => {setEditedOffer(offer); setIsEditModalOpen(true)}}
                    />
                ))}
            </div>
            
            <button className="create-button" onClick={() => setIsCreateModalOpen(true)}>
                <i className="bi bi-clipboard2-plus-fill"></i>Create Offer
            </button>

            {isCreateModalOpen && <CreateOfferModal onClose={() => setIsCreateModalOpen(false)} />}
            {(isEditModalOpen && editedOffer) && <EditOfferModal offer={editedOffer} onClose={() => setIsEditModalOpen(false)} />}
        </div>
    );
}

export default OffersTab;