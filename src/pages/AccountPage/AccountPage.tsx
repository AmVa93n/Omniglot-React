import UserInfo from '../../components/UserInfo/UserInfo';
import './AccountPage.css'
import { useContext } from 'react';
import { AccountContext } from '../../context/account.context';

function AccountPage() {
    const { profile } = useContext(AccountContext)

    return (
        <div className='account-page'>
            <UserInfo user={profile} isOwn={true} />
        </div>
    );
}

export default AccountPage;