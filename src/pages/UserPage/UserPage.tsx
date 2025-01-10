import { useState, useEffect } from "react"
import { User } from '../../types'
import { useParams } from "react-router-dom";
import appService from "../../services/app.service";
import LanguageChip from "../../components/LanguageChip/LanguageChip";
import DeckCard from "../../components/DeckCard/DeckCard";
import OfferCard from "../../components/OfferCard/OfferCard";
import ReviewCard from "../../components/ReviewCard/ReviewCard";
import './UserPage.css'
import Avatar from "../../components/Avatar";
import useChat from "../../hooks/useChat";
import useFormat from "../../hooks/useFormat";

function UserPage() {
    const [viewedUser, setViewedUser] = useState({} as User)
    const [activeTab, setActiveTab] = useState('decks')
    const { userId } = useParams()
    const { handleMessage } = useChat()
    const { getUserAge } = useFormat()

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
            <div className="user-info-container">
                <div className="user-main">
                    <Avatar src={viewedUser.profilePic} size={200} />
                    <h2 className="mb-3 center">{viewedUser.username}</h2>
                </div>
            
                {viewedUser.professional &&
                <span className="prof-badge">
                    <i className="bi bi-award-fill"></i>Professional
                </span>}
                
                <div className="user-info">
                    <div className="user-info-row">
                        <span className="user-info-field">Gender</span>
                        <div className="col" id="gender">
                            <span>{viewedUser.gender}</span>
                        </div>
                    </div>
                
                    <div className="user-info-row">
                        <span className="user-info-field">Age</span>
                        <div className="col" id="birthdate">
                            <span className="age">{getUserAge(viewedUser.birthdate)}</span>
                        </div>
                    </div>
                
                    <div className="user-info-row">
                        <span className="user-info-field">Country</span>
                        <div className="col" id="country">
                            <span>{viewedUser.country}</span>
                        </div>
                    </div>
                
                    <div className="user-info-row">
                        <span className="user-info-field">Teaching</span>
                        <div className="languages">
                            {viewedUser.lang_teach?.map(lang => (
                                <LanguageChip key={lang} code={lang} />
                            ))}
                        </div>
                    </div>
                
                    <div className="user-info-row">
                        <span className="user-info-field">Learning</span>
                        <div className="languages">
                            {viewedUser.lang_learn?.map(lang => (
                                <LanguageChip key={lang} code={lang} />
                            ))}
                        </div>
                    </div>
                </div>
                
                <button className="message-button" onClick={() => handleMessage(viewedUser)}>
                    <i className="bi bi-envelope-fill"></i>Message {viewedUser.username}
                </button>
            </div>
            
            <div className="user-content-container">
                <div className={"user-content" + (activeTab === 'decks' ? ' active' : '')}>
                    <button className={"user-content-tab" + (activeTab === 'decks' ? ' active' : '')} onClick={() => setActiveTab('decks')}>
                        <i className="bi bi-stack"></i>{viewedUser.username}'s Decks
                    </button>
                    {activeTab === 'decks' && (
                        viewedUser.decks?.length === 0 ? <p>{viewedUser.username} has no decks yet.</p> : 
                        <div className="cards-container">
                            {viewedUser.decks?.map(deck => <DeckCard deck={deck} />)}
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
                            {viewedUser.offers?.map(offer => <OfferCard offer={offer} />)}
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
                            {viewedUser.reviews?.map(review => <ReviewCard review={review} />)}
                        </div>
                    )}
                </div>
            </div>
        
        </div>
    )
}

export default UserPage