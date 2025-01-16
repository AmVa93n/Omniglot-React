import { createContext, useState, useEffect, PropsWithChildren } from "react";
import { User, Class, Deck, Offer } from "../types";
import accountService from "../services/account.service";

const AccountContext = createContext({} as context);

interface context {
  profile: User;
  setProfile: (profile: User) => void;
  classes: Class[];
  setClasses: React.Dispatch<React.SetStateAction<Class[]>>;
  decks: Deck[];
  setDecks: React.Dispatch<React.SetStateAction<Deck[]>>;
  offers: Offer[];
  setOffers: React.Dispatch<React.SetStateAction<Offer[]>>;
}

function AccountProvider({ children }: PropsWithChildren) {
  const [profile, setProfile] = useState({} as User)
  const [classes, setClasses] = useState([] as Class[])
  const [decks, setDecks] = useState([] as Deck[])
  const [offers, setOffers] = useState<Offer[]>([])

  useEffect(() => {
    async function fetchUserData() {
        try {
          const profileData = await accountService.getProfile()
          setProfile(profileData)
          const classesData = await accountService.getClasses()
          setClasses(classesData)
          const decksData = await accountService.getDecks()
          setDecks(decksData)
          const offersData = await accountService.getOffers()
          setOffers(offersData)
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
    }

    fetchUserData()
  }, [])

  return (
    <AccountContext.Provider
      value={{
        profile, setProfile, classes, setClasses, decks, setDecks, offers, setOffers
      }}
    >
      {children}
    </AccountContext.Provider>
  );
}

export { AccountProvider, AccountContext };
