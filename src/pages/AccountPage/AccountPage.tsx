import UserInfo from '../../components/UserInfo/UserInfo';
import './AccountPage.css'
import { useContext } from 'react';
import { AccountContext } from '../../context/account.context';
import { useState } from 'react';
import ClassesTab from '../../components/ClassesTab/ClassesTab';

function AccountPage() {
    const { profile } = useContext(AccountContext)
    const tabs = [
        {name: 'Classes', icon: 'bi-easel3-fill'},
        {name: 'Decks', icon: 'bi-stack'},
        {name: 'Offers', icon: 'bi-clipboard2-fill', prof: true},
        {name: 'Calendar', icon: 'bi-calendar-week', prof: true},
        {name: 'Wallet', icon: 'bi-cash-coin', prof: true},
        {name: 'Reviews', icon: 'bi-star-fill', prof: true},
    ]
    const [activeTab, setActiveTab] = useState('Classes')

    return (
        <div className='account-page'>
            <UserInfo user={profile} isOwn={true} />

            <div className="user-content-container">
                <div className="user-content-tabs">
                    {tabs.map(tab => (
                        tab.prof && !profile.professional ? null :
                        <button key={tab.name} className={`user-content-tab ${tab.name === activeTab ? 'active' : ''}`} onClick={() => setActiveTab(tab.name)}>
                            <i className={`bi ${tab.icon}`}></i>{tab.name}
                        </button>
                    ))}
                </div>

                <div className="user-content">
                    {activeTab === 'Classes' && <ClassesTab />}
                </div>
            </div>
        </div>
    );
}

export default AccountPage;