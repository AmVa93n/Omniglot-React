import UserInfo from '../../components/UserInfo/UserInfo';
import './AccountPage.css'
import { useContext } from 'react';
import { AccountContext } from '../../context/account.context';
import ClassesTab from '../../components/tabs/ClassesTab/ClassesTab';
import DecksTab from '../../components/tabs/DecksTab/DecksTab';
import OffersTab from '../../components/tabs/OffersTab/OffersTab';
import CalendarTab from '../../components/tabs/CalendarTab/CalendarTab';
import ReviewsTab from '../../components/tabs/ReviewsTab/ReviewsTab';
import EarningsTab from '../../components/tabs/EarningsTab/EarningsTab';
import { Routes, Route, Link, Outlet, useLocation } from 'react-router-dom';

function AccountPage() {
    const { profile } = useContext(AccountContext)
    const tabs = [
        {name: 'Classes', icon: 'bi-easel3-fill'},
        {name: 'Decks', icon: 'bi-stack'},
        {name: 'Offers', icon: 'bi-clipboard2-fill', prof: true},
        {name: 'Calendar', icon: 'bi-calendar-week', prof: true},
        {name: 'Earnings', icon: 'bi-cash-coin', prof: true},
        {name: 'Reviews', icon: 'bi-star-fill', prof: true},
    ]
    const location = useLocation()

    return (
        <div className='account-page'>
            <UserInfo user={profile} isOwn={true} />

            <div className="user-content-container">
                <div className="user-content-tabs">
                    {tabs.map(tab => (
                        tab.prof && !profile.professional ? null :
                        <Link to={`/account/${tab.name.toLowerCase()}`} key={tab.name}>
                        <button 
                            className={`user-content-tab ${location.pathname.includes(tab.name.toLowerCase()) ? 'active' : ''}`}
                        >
                            <i className={`bi ${tab.icon}`}></i>{tab.name}
                        </button>
                        </Link>
                    ))}
                </div>

                <div className="user-content">
                    <Routes>
                        <Route path="classes" element={<ClassesTab />} />
                        <Route path="decks/*" element={<DecksTab />} />
                        <Route path="offers" element={<OffersTab />} />
                        <Route path="calendar/*" element={<CalendarTab />} />
                        <Route path="earnings" element={<EarningsTab />} />
                        <Route path="reviews" element={<ReviewsTab />} />
                    </Routes>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default AccountPage;