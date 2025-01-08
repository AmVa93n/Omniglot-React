import { useNavigate } from "react-router-dom";
import appService from "../../services/app.service";
import { useContext } from "react";
import { SocketContext } from "../../context/socket.context";
import Avatar from "../Avatar";
import './Notifications.css'

interface Props {
    onClose: () => void
}

function Notifications({ onClose }: Props) {
    const { notifications, setNotifications } = useContext(SocketContext)
    const navigate = useNavigate()

    function getNotificationMessage(type: string) {
        const messages: { [key: string]: string } = {
            review: 'has left a review about your class',
            booking: 'has booked a class with you',
            message: 'has sent you a message',
            clone: 'has cloned one of your decks',
            'cancel-teacher': 'has cancelled your class',
            'cancel-student': 'has cancelled your class',
            'reschedule-teacher-pending': 'has requested to reschedule your class',
            'reschedule-student-pending': 'has requested to reschedule your class',
            'reschedule-teacher-accept': 'has accepted your reschedule request',
            'reschedule-student-accept': 'has accepted your reschedule request',
            'reschedule-teacher-decline': 'has declined your reschedule request',
            'reschedule-student-decline': 'has declined your reschedule request',
        };
    
        return messages[type] || '';
    }

    async function markAsRead(notifId: string, type: string) {
        let redirectUrl
        switch(type) {
            case 'message': redirectUrl = '/account/inbox' ;break
            case 'review': redirectUrl = '/account/reviews' ;break
            case 'clone': redirectUrl = '/account/decks' ;break
            case 'booking':
            case 'cancel-student':
            case "reschedule-student-accept":
            case "reschedule-student-decline":
            case "reschedule-student-pending": redirectUrl = '/account/calendar' ;break
            case 'cancel-teacher': 
            case "reschedule-teacher-accept":
            case "reschedule-teacher-decline":
            case "reschedule-teacher-pending": redirectUrl = '/account/classes' ;break
        }
        try {
            await appService.readNotification(notifId)
            setNotifications(prev => prev.map(n => n._id === notifId ? {...n, read: true} : n))
            navigate(`${redirectUrl}`);
            onClose()
        } catch (error) {
            console.log(error)
        }
    }

    async function deleteNotification(notifId: string, event: React.MouseEvent) {
        event.stopPropagation();
        try {
            await appService.deleteNotification(notifId)
            const notifToDelete = notifications.find(n => n._id === notifId)
            if (notifToDelete) {
                setNotifications(prev => prev.filter(n => n._id !== notifId))
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <ul id="notification-list">
            {notifications.map(notif => (
                <li key={notif._id}>
                    <div 
                        className={`notification ${!notif.read ? 'unread' : ''}`}
                        onClick={() => markAsRead(notif._id, notif.type)}
                    >
                        <div className="notification-content">
                            <div className="notification-text">
                                <Avatar src={notif.source.profilePic} size={25} />
                                <span>
                                    <b>{notif.source.username}</b>
                                    {` ${getNotificationMessage(notif.type)}`}
                                </span>
                            </div>
                            <small className="notification-timestamp">{notif.timeDiff}</small>
                        </div>
                        
                        <button className="notification-delete" onClick={(event) => deleteNotification(notif._id, event)}>
                            <i className="bi bi-x"></i>
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    )
}

export default Notifications