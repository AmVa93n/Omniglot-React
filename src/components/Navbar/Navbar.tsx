import './Navbar.css'
import { Link } from "react-router-dom"
import { useState } from 'react'
import Notifications from '../Notifications/Notifications'
import Avatar from '../reusable/Avatar'
import useAuth from '../../hooks/useAuth'
import useChat from '../../hooks/useChat'
import UserMenu from '../UserMenu/UserMenu'

function Navbar() {
    const { notifications } = useChat()
    const { profile } = useAuth()
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

    function getUnread() {
        return notifications.filter(n => !n.read).length
    }

    function toggleNotifications() {
        setIsNotificationsOpen(!isNotificationsOpen)
        setIsUserMenuOpen(false)
    }

    function toggleUserMenu() {
        setIsUserMenuOpen(!isUserMenuOpen)
        setIsNotificationsOpen(false)
    }

    return (
        <nav className="navbar">
            <Link to="/">
                <div className="logo">
                    <img src="/images/logo.png" width={'100%'}/>
                </div>
            </Link>

            <div className="searchbar-container">
                <input type="search" placeholder="Search a user..." />
                <i className="bi bi-search"></i>
            </div>

            <div className="navbar-buttons-container">

                {profile ?
                <>
                <Link to={{pathname: "/users"}}>
                    <button className="navbar-button">
                        <i className="bi bi-chat-text-fill"></i>
                        <span>Partners</span>
                    </button>
                </Link>

                <Link to={{pathname: "/users", search: "?professional=true"}}>
                    <button className="navbar-button">
                        <i className="bi bi-mortarboard-fill"></i>
                        <span>Teachers</span>
                    </button>
                </Link>
                
                <button className="notifications-button" onClick={toggleNotifications}>
                    <i className="bi bi-bell-fill"></i>
                    <span className="unread-badge" style={{display: getUnread() > 0 ? 'block' : 'none'}}>
                        {getUnread()}
                    </span>
                </button>
                {isNotificationsOpen && <Notifications onClose={() => setIsNotificationsOpen(false)} />}
                
                <button onClick={toggleUserMenu}>
                    <Avatar src={profile.profilePic} size={50}/>
                </button>
                {isUserMenuOpen && <UserMenu onClose={() => setIsUserMenuOpen(false)} />}

                </> :
            
                <Link to="/login">
                    <Avatar src={''} size={50}/>
                </Link>
                }
            </div>
        </nav>
    )
}

export default Navbar