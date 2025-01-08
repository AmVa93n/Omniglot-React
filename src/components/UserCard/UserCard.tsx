import { Link } from 'react-router-dom';
import { User } from '../../types';
import LanguageChip from '../LanguageChip/LanguageChip';
import "./UserCard.css"
import Avatar from '../Avatar';
import useChat from '../../hooks/useChat';
import useFormat from '../../hooks/useFormat';

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
                <div className="user-info-container">
                    <Avatar src={user.profilePic} size={50} />
                    <div className="user-info">
                        <span className='username'>{user.username}</span>
                        <span className="age-country">{getUserAge(user.birthdate)}, {user.country}</span>
                    </div>
                </div>
            </Link>

            {user.professional && <span className="prof-badge">Professional</span>}

            <div className="card-row">
                <div className='card-text'>
                    { matchType === "teachers" ? 'Teaching' : 'Can teach'}
                </div>
                <div className="languages"> 
                    {user.lang_teach.map(lang => (
                        <LanguageChip key={lang} code={lang} />
                    ))}
                </div>
            </div>
            
            {matchType !== 'teachers' &&
            <div className="card-row">
                <div className='card-text'>
                    Wants to learn
                </div>
                <div className="languages"> 
                    {user.lang_learn.map(lang => (
                        <LanguageChip key={lang} code={lang} />
                    ))}
                </div>
            </div>}

            {matchType === 'teachers' &&
            <div className="card-row">
                <div className="card-text">
                    Rating
                </div>
                {user.reviewsNr > 0 && <div className='stars'>{drawStars(user.ratingAvg || 0)}</div>}
                ({user.reviewsNr} Reviews)
            </div>}

            <button onClick={() => handleMessage(user)}>
                <i className="bi bi-envelope-fill"></i>Message
            </button>
        </div>
    );
}

export default UserCard;