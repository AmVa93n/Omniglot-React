import './UserInfo.css'
import LanguageChip from "../../components/LanguageChip/LanguageChip";
import Avatar from "../../components/Avatar";
import useChat from "../../hooks/useChat";
import useFormat from "../../hooks/useFormat";
import { User } from '../../types';
import { useState } from 'react';
import EditProfileForm from '../EditProfileForm/EditProfileForm';

interface Props {
    user: User
    isOwn?: boolean
}

function UserInfo({ user, isOwn }: Props) {
    const { handleMessage } = useChat()
    const { getUserAge, formatDate } = useFormat()
    const [isEditing, setIsEditing] = useState(false)

    async function handleDelete() {
        
    }

    return (
        <div className="user-info-container">
            <div className="user-main">
                <Avatar src={user.profilePic} size={200} />
                <h2 className="mb-3 center">{user.username}</h2>
            </div>
        
            {user.professional &&
            <span className="badge prof">
                <i className="bi bi-award-fill"></i>Professional
            </span>}

            {user.private &&
            <span className="badge private">
                <i className="bi bi-eye-slash-fill"></i>Private
            </span>}
            
            {!isEditing && <>
            <div className="user-info">
                {isOwn &&
                <div className="user-info-row">
                    <span className="user-info-field">Email</span>
                    <span>{user.email}</span>
                </div>}

                <div className="user-info-row">
                    <span className="user-info-field">Gender</span>
                    <span>{user.gender}</span>
                </div>
            
                <div className="user-info-row">
                    {!isOwn && <>
                    <span className="user-info-field">Age</span>
                    <span className="age">{getUserAge(user.birthdate)}</span>
                    </>}
                    {isOwn && <>
                    <span className="user-info-field">Birthdate</span>
                    <span>{formatDate(user.birthdate)} ({getUserAge(user.birthdate)})</span>
                    </>}
                </div>
            
                <div className="user-info-row">
                    <span className="user-info-field">Country</span>
                    <span>{user.country}</span>
                </div>
            
                <div className="user-info-row">
                    <span className="user-info-field">Teaching</span>
                    <div className="languages">
                        {user.lang_teach?.map(lang => (
                            <LanguageChip key={lang} code={lang} />
                        ))}
                    </div>
                </div>
            
                <div className="user-info-row">
                    <span className="user-info-field">Learning</span>
                    <div className="languages">
                        {user.lang_learn?.map(lang => (
                            <LanguageChip key={lang} code={lang} />
                        ))}
                    </div>
                </div>
            </div>
            
            <div className="user-info-buttons">
                {!isOwn && 
                <button className="message-button" onClick={() => handleMessage(user)}>
                    <i className="bi bi-envelope-fill"></i>Message {user.username}
                </button>}
                {isOwn && <>
                <button className="edit-button" onClick={() => setIsEditing(true)}>
                    <i className="bi bi-pencil-square"></i>Edit Profile
                </button>
                <button className="delete-button" onClick={handleDelete}>Delete Account</button>
                </>}
            </div>
            </>}

            {isEditing && <EditProfileForm profile={user} onCancel={() => setIsEditing(false)} />}
        </div>
    )
}

export default UserInfo;