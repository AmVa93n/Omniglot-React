import UserInfo from '../../components/UserInfo/UserInfo';
import './AccountPage.css'
import { useState, useEffect } from 'react';
import accountService from '../../services/account.service';
import { User } from '../../types';

function AccountPage() {
    const [profile, setProfile] = useState({} as User)

    useEffect(() => {
        async function fetchUser() {
            try {
              const profileData = await accountService.getProfile()
              setProfile(profileData)
            } catch (error) {
              console.error('Error fetching data in component:', error);
            }
        }

        fetchUser()
    }, [])

    return (
        <div className='account-page'>
            <UserInfo user={profile} isOwn={true} />
        </div>
    );
}

export default AccountPage;