import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function UserMenu() {
    const { user, logOutUser } = useAuth()

    return (
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
    )
}

export default UserMenu;