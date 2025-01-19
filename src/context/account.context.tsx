import { createContext, useState, useEffect, PropsWithChildren } from "react";
import { User, Class, Deck, Offer, Review, Transaction } from "../types";
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
  calendar: Class[];
  setCalendar: React.Dispatch<React.SetStateAction<Class[]>>;
  reviews: Review[];
  transactions: Transaction[];
}

function AccountProvider({ children }: PropsWithChildren) {
  const [profile, setProfile] = useState({} as User)
  const [classes, setClasses] = useState([] as Class[])
  const [decks, setDecks] = useState([] as Deck[])
  const [offers, setOffers] = useState([] as Offer[])
  const [calendar, setCalendar] = useState([] as Class[])
  const [reviews, setReviews] = useState([] as Review[])
  const [transactions, setTransactions] = useState([] as Transaction[])

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
          const calendarData = await accountService.getCalendar()
          setCalendar(calendarData)
          const transactions = await accountService.getEarnings()
          setTransactions(transactions)
          const reviewsData = await accountService.getReviews()
          setReviews(reviewsData)
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
    }

    fetchUserData()
  }, [])

  return (
    <AccountContext.Provider
      value={{
        profile, setProfile, classes, setClasses, decks, setDecks, offers, setOffers, calendar, setCalendar, reviews, transactions
      }}
    >
      {children}
    </AccountContext.Provider>
  );
}

export { AccountProvider, AccountContext };
