import './Navbar.css'
import { Link } from "react-router-dom"
import Notifications from '../Notifications'
import UserAvatar from '../UserAvatar'
import useAuth from '../../hooks/useAuth'
import useChat from '../../hooks/useChat'

function Navbar() {
    const { notifications } = useChat()
    const { user, logOutUser } = useAuth()

    function getUnread() {
        return notifications.filter(n => !n.read).length
    }

    return (
        <nav className="navbar navbar-expand bg-light py-1" style={{boxShadow:'rgba(0, 0, 0, 0.5) 0px 1px 6px 0px', zIndex: 3}}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img src="/images/logo.png" width="200px"/>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <div className="container">
                        <div className="row g-0 justify-content-center">
                            <div className="col-md-6 col-lg-4 g-0">
                                <form id="searchForm" className="d-flex position-relative" role="search">
                                    <input id="search" className="form-control rounded-pill" type="search" placeholder="Search" aria-label="Search"/>
                                    <i className="bi bi-search position-absolute" style={{top: '25%', right: '5%'}}></i>
                                    <ul id="results" className="list-group mt-3" style={{width: '100%'}}></ul>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="navbar-nav navButtonsRow">

                    {user ?
                    <>
                    <Link to="/users/match/partners" className="nav-link navButton">
                        <div className="iconWrapper">
                            <i className="bi bi-chat-text-fill fs-3"></i>
                        </div>
                        <span>Partners</span>
                    </Link>

                    <Link to="/users/match/teachers" className="nav-link navButton">
                        <div className="iconWrapper">
                            <i className="bi bi-mortarboard-fill fs-3"></i>
                        </div>
                        <span>Teachers</span>
                    </Link>
                    
                    <div className="dropdown-center dropDownWrapper">
                        <button className="dropdown-toggle no-arrow" data-bs-toggle="dropdown">
                            <div className="nav-link btn navButton">
                                <div className="iconWrapper">
                                    <i className="bi bi-bell-fill fs-3"></i>
                                    <span 
                                        id="unreadCount" 
                                        className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" 
                                        style={{display: getUnread() > 0 ? 'block' : 'none'}}>
                                            {getUnread()}
                                    </span>
                                </div>
                                <span>Notifications</span>
                            </div>
                        </button>

                        <Notifications />
                    </div>
                    
                    <div className="dropdown-center dropDownWrapper">
                        <button className="dropdown-toggle no-arrow" data-bs-toggle="dropdown">
                            <div className="nav-item">
                                <UserAvatar src={user.profilePic} size={50}/>
                            </div>
                        </button>

                        <ul className="dropdown-menu dropdown-menu-end">
                            <li><Link className="dropdown-item d-flex gap-2 align-items-center" to="/account/profile"><i className="bi bi-person-circle me-2"></i>Profile</Link></li>
                            <li><Link className="dropdown-item d-flex gap-2 align-items-center" to="/account/inbox"><i className="bi bi-inbox-fill me-2"></i>Inbox</Link></li>
                            <li><Link className="dropdown-item d-flex gap-2 align-items-center" to="/account/classes"><i className="bi bi-easel3-fill me-2"></i>Classes</Link></li>
                            <li><Link className="dropdown-item d-flex gap-2 align-items-center" to="/account/decks"><i className="bi bi-stack me-2"></i>Decks</Link></li>
                            
                            {user?.professional &&
                            <>
                            <li><hr className="dropdown-divider"/></li>
                            <li><Link className="dropdown-item d-flex gap-2 align-items-center" to="/account/offers"><i className="bi bi-clipboard2-fill me-2"></i>Offers</Link></li>
                            <li><Link className="dropdown-item d-flex gap-2 align-items-center" to="/account/calendar"><i className="bi bi-calendar-week me-2"></i>Calendar</Link></li>
                            <li><Link className="dropdown-item d-flex gap-2 align-items-center" to="/account/wallet"><i className="bi bi-cash-coin me-2"></i>Wallet</Link></li>
                            <li><Link className="dropdown-item d-flex gap-2 align-items-center" to="/account/reviews"><i className="bi bi-star-fill me-2"></i>Reviews</Link></li>
                            </>}

                            <li><hr className="dropdown-divider"/></li>
                            <li>
                                <button className="dropdown-item dropdown-item-danger d-flex gap-2 align-items-center" onClick={logOutUser} style={{color: 'red'}}>
                                    <i className="bi bi-box-arrow-in-right me-2"></i>Logout
                                </button>
                            </li>
                        </ul>
                    </div>

                    </> :
                
                    <Link to="/login">
                        <div className="nav-item">
                            <UserAvatar src={''} size={50}/>
                        </div>
                    </Link>
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar