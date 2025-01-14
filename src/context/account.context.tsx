import { createContext, useState, useEffect, PropsWithChildren } from "react";
import { User, Class } from "../types";
import accountService from "../services/account.service";

const AccountContext = createContext({} as context);

interface context {
  profile: User;
  setProfile: (profile: User) => void;
  classes: Class[];
  setClasses: React.Dispatch<React.SetStateAction<Class[]>>;
}

function AccountProvider({ children }: PropsWithChildren) {
  const [profile, setProfile] = useState({} as User)
  const [classes, setClasses] = useState([] as Class[])

  useEffect(() => {
    async function fetchUserData() {
        try {
          const profileData = await accountService.getProfile()
          setProfile(profileData)
          const classesData = await accountService.getClasses()
          setClasses(classesData)
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
    }

    fetchUserData()
  }, [])

  return (
    <AccountContext.Provider
      value={{
        profile, setProfile, classes, setClasses
      }}
    >
      {children}
    </AccountContext.Provider>
  );
}

export { AccountProvider, AccountContext };
