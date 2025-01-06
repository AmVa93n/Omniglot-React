import './Navbar.css'
import { Link } from "react-router-dom"
import Notifications from '../Notifications'
import UserAvatar from '../UserAvatar'
import useAuth from '../../hooks/useAuth'
import useChat from '../../hooks/useChat'
import UserMenu from '../UserMenu'

function Navbar() {
    const { notifications } = useChat()
    const { user } = useAuth()

    function getUnread() {
        return notifications.filter(n => !n.read).length
    }

    return (
        <nav className="navbar">
            <Link className="logo" to="/">
                <img src="/images/logo.png" width="200px"/>
            </Link>

            <div className="searchbar-container">
                <input id="search" className="form-control" type="search" placeholder="Search" aria-label="Search"/>
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
                
                <div className="dropdown-center dropdown-container">
                    <button className="dropdown-toggle no-arrow notifications-button" data-bs-toggle="dropdown">
                        <i className="bi bi-bell-fill fs-4"></i>
                        <span className="unread" style={{display: getUnread() > 0 ? 'block' : 'none'}}>
                            {getUnread()}
                        </span>
                    </button>

                    <Notifications />
                </div>
                
                <div className="dropdown-center dropdown-container">
                    <button className="dropdown-toggle no-arrow" data-bs-toggle="dropdown">
                        <UserAvatar src={user.profilePic} size={50}/>
                    </button>

                    <UserMenu />
                </div>

                </> :
            
                <Link to="/login">
                    <div className="nav-item">
                        <UserAvatar src={''} size={50}/>
                    </div>
                </Link>
                }
            </div>
        </nav>
    )
}

export default Navbar