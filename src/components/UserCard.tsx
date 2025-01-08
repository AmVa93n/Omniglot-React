import { Link } from 'react-router-dom';
import { User } from '../types';
import Language from './Language';
import "../styles/UserCard.css"
import Avatar from './Avatar';
import useChat from '../hooks/useChat';
import useFormat from '../hooks/useFormat';

interface Props {
    user: User;
    matchType: string;
}

function UserCard({ user, matchType }: Props) {
    const { handleMessage } = useChat();
    const { getUserAge, drawStars } = useFormat();

    return (
        <div className="user-card" key={user._id}>
                <Link to={'/users/' + user._id}>
                    <div className="d-flex align-items-center mb-3 position-relative">
                        <Avatar src={user.profilePic} size={50} />
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
                        {user.reviewsNr > 0 &&
                        <div className="mx-auto" style={{width: 'fit-content', color: '#ffca08'}}> 
                            {drawStars(user.ratingAvg || 0)}
                        </div>}
                        <div className="mx-auto small" style={{width: 'fit-content'}}>({user.reviewsNr} Reviews)</div>
                    </div>
                </div>}

                <div className="row mt-auto">
                    <div className="col d-flex justify-content-center align-items-end">
                        <button className="btn btn-primary mx-1" onClick={() => handleMessage(user)}>
                            <i className="bi bi-envelope-fill me-1"></i>Message
                        </button>
                    </div>
                </div>
                
            </div>
    );
}

export default UserCard;