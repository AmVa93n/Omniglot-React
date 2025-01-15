import { useState, useEffect } from "react"
import { User } from '../../types'
import { useParams } from "react-router-dom";
import appService from "../../services/app.service";
import DeckCard from "../../components/DeckCard/DeckCard";
import OfferCard from "../../components/OfferCard/OfferCard";
import ReviewCard from "../../components/ReviewCard/ReviewCard";
import './UserPage.css'
import UserInfo from "../../components/UserInfo/UserInfo";

function UserPage() {
    const [viewedUser, setViewedUser] = useState({} as User)
    const [activeTab, setActiveTab] = useState('decks')
    const { userId } = useParams()
    

    useEffect(() => {
        async function fetchUser() {
            try {
              const data = await appService.getUser(userId || '')
              setViewedUser(data)
            } catch (error) {
              console.error('Error fetching data in component:', error);
            }
        }

        fetchUser()
    }, [userId])

    return (
        <div className="user-page">
            <UserInfo user={viewedUser} />
            
            <div className="user-content-container">
                <div className={"user-content" + (activeTab === 'decks' ? ' active' : '')}>
                    <button className={"user-content-tab" + (activeTab === 'decks' ? ' active' : '')} onClick={() => setActiveTab('decks')}>
                        <i className="bi bi-stack"></i>{viewedUser.username}'s Decks
                    </button>
                    {activeTab === 'decks' && (
                        viewedUser.decks?.length === 0 ? <p>{viewedUser.username} has no decks yet.</p> : 
                        <div className="cards-container">
                            {viewedUser.decks?.map(deck => <DeckCard key={deck._id} deck={deck} />)}
                        </div>
                    )}
                </div>

                <div className={"user-content" + (activeTab === 'offers' ? ' active' : '')}>
                    <button className={"user-content-tab" + (activeTab === 'offers' ? ' active' : '')} onClick={() => setActiveTab('offers')}  disabled={!viewedUser.professional}>
                        <i className="bi bi-clipboard2-fill"></i>{viewedUser.username}'s Offers
                    </button>
                    {activeTab === 'offers' && (
                        viewedUser.offers?.length === 0 ? <p>{viewedUser.username} has no offers yet.</p> : 
                        <div className="cards-container">
                            {viewedUser.offers?.map(offer => <OfferCard key={offer._id} offer={offer} />)}
                        </div>
                    )}
                </div>

                <div className={"user-content" + (activeTab === 'reviews' ? ' active' : '')}>
                    <button className={"user-content-tab" + (activeTab === 'reviews' ? ' active' : '')} onClick={() => setActiveTab('reviews')} disabled={!viewedUser.professional}>
                        <i className="bi bi-star-fill"></i>{viewedUser.username}'s Reviews
                    </button>
                    {activeTab === 'reviews' && (
                        viewedUser.reviews?.length === 0 ? <p>{viewedUser.username} has no reviews yet.</p> : 
                        <div className="cards-container">
                            {viewedUser.reviews?.map(review => <ReviewCard key={review._id} review={review} />)}
                        </div>
                    )}
                </div>
            </div>
        
        </div>
    )
}

export default UserPage