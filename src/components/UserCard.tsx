import { Link } from 'react-router-dom';
import { User } from '../types';
import { getUserAge } from '../utils';
import Language from './Language';
import "../styles/UserCard.css"

interface Props {
    user: User;
    matchType: string;
}

function UserCard({ user, matchType }: Props) {
    return (
        <div className="user-card" key={user._id}>
                <Link to={'/users/' + user._id} className="link-text">
                    <div className="d-flex align-items-center mb-3 position-relative">
                        <div className="circle-crop me-2" style={{width: '50px', height: '50px', display: 'inline-flex'}}>
                            <img src={user.profilePic || '/images/Profile-PNG-File.png'}/>
                        </div>
                        <span className="fs-5">{user.username}</span>
                        <span className="userAgeCountry">
                            <span className="age">{getUserAge(user.birthdate)}</span>, {user.country}
                        </span>
                        
                        {user.professional &&
                        <span className="badge rounded-pill text-bg-primary profBadge">Professional</span>}
                        
                    </div>
                </Link>

                <div className="row mb-2 align-items-center">
                    <span className="fw-bold col-auto" style={{width: '125px'}}>{ matchType === "teachers" ? 'Teaching' : 'Can teach'}</span> 
                    <div className="col">
                        {user.lang_teach.map(lang => (
                            <Language key={lang} code={lang} />
                        ))}
                    </div>
                </div>
                
                {matchType !== 'teachers' &&
                <div className="row mb-2 align-items-center">
                    <span className="fw-bold col-auto" style={{width: '125px'}}>Wants to learn</span>
                    <div className="col">
                        {user.lang_learn.map(lang => (
                            <Language key={lang} code={lang} />
                        ))}
                    </div>
                </div>}

                {matchType === 'teachers' &&
                <div className="row mb-2 align-items-center">
                    <span className="fw-bold col-auto" style={{width: '125px'}}>Rating</span>
                    <div className="col">
                        {user.reviews &&
                        <div className="mx-auto" style={{width: 'fit-content'}}>{user.ratingAvg} 
                            <span style={{color: '#ffca08'}}>&#9733;</span>
                        </div>}
                        <div className="mx-auto small" style={{width: 'fit-content'}}>({user.reviewsNr} Reviews)</div>
                    </div>
                </div>}

                <div className="row mt-auto">
                    <div className="col d-flex justify-content-center align-items-end">
                        <form action="/account/inbox" method="POST">
                            <input style={{display: 'none'}} name="targetUserId"/>
                            <button type="submit" className="btn btn-primary mx-1"><i className="bi bi-envelope-fill me-1"></i>Message</button>
                        </form>
                    </div>
                </div>
                
            </div>
    );
}

export default UserCard;