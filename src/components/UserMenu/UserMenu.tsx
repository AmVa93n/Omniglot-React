import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import './UserMenu.css';

interface Props {
    isOpen: boolean
    onClose: () => void
}

function UserMenu({ isOpen, onClose }: Props) {
    const { user, logOutUser } = useAuth()
    const navigate = useNavigate()

    const menuItems = [
        { title: 'Profile', icon: 'bi bi-person-circle', link: '/account/profile' },
        { title: 'Inbox', icon: 'bi bi-inbox-fill', link: '/account/inbox' },
        { title: 'Classes', icon: 'bi bi-easel3-fill', link: '/account/classes' },
        { title: 'Decks', icon: 'bi bi-stack', link: '/account/decks' },
    ]

    const professionalItems = [
        { title: 'Offers', icon: 'bi bi-clipboard2-fill', link: '/account/offers' },
        { title: 'Calendar', icon: 'bi bi-calendar-week', link: '/account/calendar' },
        { title: 'Wallet', icon: 'bi bi-cash-coin', link: '/account/wallet' },
        { title: 'Reviews', icon: 'bi bi-star-fill', link: '/account/reviews' },
    ]

    function handleLogout() {
        logOutUser()
        onClose()
        navigate('/login')
    }

    return (
        <ul id="user-menu" style={{display: isOpen ? 'block' : 'none'}}>
            {menuItems.map(item => (
                <li key={item.title} className='user-menu-item' onClick={() => {navigate(item.link); onClose()}}>
                    <i className={item.icon}></i>{item.title}
                </li>
            ))}
            
            {user?.professional &&
            <>
                <hr className="user-menu-divider"/>
                {professionalItems.map(item => (
                    <li key={item.title} className='user-menu-item' onClick={() => {navigate(item.link); onClose()}}>
                        <i className={item.icon}></i>{item.title}
                    </li>
                ))}
            </>}

            <hr className="user-menu-divider"/>

            <li className="user-menu-item" onClick={handleLogout} style={{color: 'red'}}>
                <i className="bi bi-box-arrow-in-right"></i>Logout
            </li>
        </ul>
    )
}

export default UserMenu;