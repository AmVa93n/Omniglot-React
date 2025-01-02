import { useState, useEffect } from "react"
import { User } from '../types'
import { useParams } from "react-router-dom";
import appService from "../services/app.service";
import { getUserAge } from '../utils'
import Language from "../components/Language";
import DeckCard from "../components/DeckCard";
import OfferCard from "../components/OfferCard";
import ReviewCard from "../components/ReviewCard";
import '../styles/UserPage.css'
import accountService from "../services/account.service";
import { useNavigate } from "react-router-dom";

function UserPage() {
    const [viewedUser, setViewedUser] = useState({} as User)
    const { userId } = useParams()
    const navigate = useNavigate()

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

    async function handleMessage() {
        await accountService.createChat({ targetUserId: viewedUser._id });
        navigate('/account/inbox');
    }

    return (
        <div className="d-flex justify-content-center" style={{width: '100%'}}>

            <div style={{width: '40%'}}>
                <div className="content-box mx-auto mt-3 mb-5" style={{position: 'relative', width: '80%'}}>
                    <h2 className="mb-3 center">{viewedUser.username}</h2>
                    <div className="mb-4 mx-auto circle-crop">
                        <img id="profile-pic-preview" src={viewedUser.profilePic || '/images/Profile-PNG-File.png'} style={{minWidth: '200px'}}/>
                    </div>
                
                        {viewedUser.professional &&
                        <span className="badge rounded-pill text-bg-primary fs-6 profBadge">
                            <i className="bi bi-award-fill me-1"></i>Professional
                        </span>}
                
                    <div className="row fs-6 mb-2">
                        <span className="col-4 fw-bold">Gender</span>
                        <div className="col" id="gender">
                            <span>{viewedUser.gender}</span>
                        </div>
                    </div>
                
                    <div className="row fs-6 mb-2">
                        <span className="col-4 fw-bold">Age</span>
                        <div className="col" id="birthdate">
                            <span className="age">{getUserAge(viewedUser.birthdate)}</span>
                        </div>
                    </div>
                
                    <div className="row fs-6 mb-4">
                        <span className="col-4 fw-bold">Country</span>
                        <div className="col" id="country">
                            <span>{viewedUser.country}</span>
                        </div>
                    </div>
                
                    <div className="row fs-6 mb-2">
                        <p className="col-4 fw-bold">Can teach</p>
                        <div className="col">
                            <div id="lang_teach">
                                {viewedUser.lang_teach?.map(lang => (
                                    <Language key={lang} code={lang} />
                                ))}
                            </div>
                        </div>
                    </div>
                
                    <div className="row fs-6 mb-2">
                        <p className="col-4 fw-bold">Wants to learn</p>
                        <div className="col">
                            <div id="lang_learn">
                                {viewedUser.lang_learn?.map(lang => (
                                    <Language key={lang} code={lang} />
                                ))}
                            </div>
                        </div>
                    </div>
                
                    <div className="d-flex justify-content-center mt-4">
                        <button className="btn btn-primary mx-1" onClick={handleMessage}>
                            <i className="bi bi-envelope-fill me-1"></i>Message {viewedUser.username}
                        </button>
                    </div>
                </div>
            </div>
            
            <div className="ms-5 mt-3" style={{width: '40%', maxHeight: '1000px'}}>
            
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link active text-black" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button">
                            <i className="bi bi-stack me-1"></i>{viewedUser.username}'s Decks
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className={`nav-link ${viewedUser.professional && 'text-black'}`} id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" disabled={!viewedUser.professional}>
                            <i className="bi bi-clipboard2-fill me-1"></i>{viewedUser.username}'s Offers
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className={`nav-link ${viewedUser.professional && 'text-black'}`} id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact-tab-pane" type="button" disabled={!viewedUser.professional}>
                            <i className="bi bi-star-fill me-1"></i>{viewedUser.username}'s Reviews
                        </button>
                    </li>
                </ul>

                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="home-tab-pane" tabIndex={0}>
                        <div className="d-flex justify-content-center flex-wrap px-auto mt-3">
                            {viewedUser.decks?.map(deck => (
                                <DeckCard deck={deck} />
                            ))}
                        </div>
                    </div>
                    <div className="tab-pane fade" id="profile-tab-pane" tabIndex={0}>
                        <div className="d-flex justify-content-center flex-wrap px-auto mt-3">
                            {viewedUser.offers?.map(offer => (
                                <OfferCard offer={offer} />
                            ))}
                        </div>
                    </div>
                    <div className="tab-pane fade" id="contact-tab-pane" tabIndex={0}>
                        <div className="d-flex justify-content-center flex-wrap px-auto mt-3" style={{maxHeight: '55%', overflowY:'auto'}}>
                            {viewedUser.reviews?.map(review => (
                                <ReviewCard review={review} />
                            ))}
                        </div>
                    </div>
                </div>
            
            </div>
        
        </div>
    )
}

export default UserPage