import { useNavigate } from "react-router-dom";
import appService from "../services/app.service";
import { useContext } from "react";
import { SocketContext } from "../context/socket.context";
import UserAvatar from "./UserAvatar";

function Notifications() {
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

    async function readNotif(notifId: string, type: string) {
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
        } catch (error) {
            console.log(error)
        }
    }

    async function deleteNotif(notifId: string, event: React.MouseEvent) {
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
        <ul className="dropdown-menu dropdown-menu-end" style={{maxHeight: '400px', overflowY: 'auto'}} id="notifList">
            {notifications.map(notif => (
                <li className="notif" key={notif._id}>
                    <div 
                        className="dropdown-item gap-2 py-2 position-relative" 
                        onClick={() => readNotif(notif._id, notif.type)} 
                        style={{backgroundColor: !notif.read ? 'rgb(227, 242, 253)' : '', cursor: 'pointer', borderBottom: 'solid 0.8px rgb(222, 226, 230)'}}
                    >
                        <div className="d-flex align-items-center mb-1">
                            <UserAvatar src={notif.source.profilePic} size={25} />
                            <span>
                                <span className="fw-bold">{notif.source.username}</span>
                                {` ${getNotificationMessage(notif.type)}`}
                            </span>
                        </div>
                        <small style={{width: 'fit-content'}} className="d-block ms-auto">{notif.timeDiff}</small>
                        <button className="btn position-absolute top-0 end-0 p-0" onClick={(event) => deleteNotif(notif._id, event)}>
                            <i className="bi bi-x"></i>
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    )
}

export default Notifications