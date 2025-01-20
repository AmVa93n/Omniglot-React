import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import './UserMenu.css';

interface Props {
    onClose: () => void
}

function UserMenu({ onClose }: Props) {
    const { profile, logOutUser } = useAuth()
    const navigate = useNavigate()

    const menuItems = [
        { title: 'Inbox', icon: 'bi bi-inbox-fill', link: '/account/inbox' },
        { title: 'Classes', icon: 'bi bi-easel3-fill', link: '/account/classes' },
        { title: 'Decks', icon: 'bi bi-stack', link: '/account/decks' },
    ]

    const professionalItems = [
        { title: 'Offers', icon: 'bi bi-clipboard2-fill', link: '/account/offers' },
        { title: 'Calendar', icon: 'bi bi-calendar-week', link: '/account/calendar' },
        { title: 'Earnings', icon: 'bi bi-cash-coin', link: '/account/earnings' },
        { title: 'Reviews', icon: 'bi bi-star-fill', link: '/account/reviews' },
    ]

    function handleLogout() {
        logOutUser()
        onClose()
        navigate('/login')
    }

    return (
        <ul id="user-menu">
            {menuItems.map(item => (
                <li key={item.title} className='user-menu-item' onClick={() => {navigate(item.link); onClose()}}>
                    <i className={item.icon}></i>{item.title}
                </li>
            ))}
            
            {profile?.professional &&
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