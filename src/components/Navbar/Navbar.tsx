import './Navbar.css'
import { Link } from "react-router-dom"
import { useState } from 'react'
import Notifications from '../Notifications/Notifications'
import Avatar from '../Avatar'
import useAuth from '../../hooks/useAuth'
import useChat from '../../hooks/useChat'
import UserMenu from '../UserMenu/UserMenu'

function Navbar() {
    const { notifications } = useChat()
    const { user } = useAuth()
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
            <Link className="logo" to="/">
                <img src="/images/logo.png" width="200px"/>
            </Link>

            <div className="searchbar-container">
                <input className="form-control" type="search" placeholder="Search a user..." aria-label="Search"/>
                <i className="bi bi-search"></i>
            </div>

            <div className="navbar-buttons-container">

                {user ?
                <>
                <Link to="/users/match/partners">
                    <button className="navbar-button">
                        <i className="bi bi-chat-text-fill fs-4"></i>
                        <span>Partners</span>
                    </button>
                </Link>

                <Link to="/users/match/teachers">
                    <button className="navbar-button">
                        <i className="bi bi-mortarboard-fill fs-4"></i>
                        <span>Teachers</span>
                    </button>
                </Link>
                
                <button className="notifications-button" onClick={toggleNotifications}>
                    <i className="bi bi-bell-fill fs-4"></i>
                    <span className="unread-badge" style={{display: getUnread() > 0 ? 'block' : 'none'}}>
                        {getUnread()}
                    </span>
                </button>
                <Notifications isOpen={isNotificationsOpen} onClose={() => setIsNotificationsOpen(false)} />
                
                <button onClick={toggleUserMenu}>
                    <Avatar src={user.profilePic} size={50}/>
                </button>
                <UserMenu isOpen={isUserMenuOpen} onClose={() => setIsUserMenuOpen(false)} />

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