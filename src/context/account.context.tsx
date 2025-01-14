import { createContext, useState, useEffect, PropsWithChildren } from "react";
import { User } from "../types";
import accountService from "../services/account.service";

const AccountContext = createContext({} as context);

interface context {
  profile: User;
  setProfile: (profile: User) => void;
}

function AccountProvider({ children }: PropsWithChildren) {
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
    <AccountContext.Provider
      value={{
        profile, setProfile
      }}
    >
      {children}
    </AccountContext.Provider>
  );
}

export { AccountProvider, AccountContext };
