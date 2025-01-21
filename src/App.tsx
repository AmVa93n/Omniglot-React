import './App.css'
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UsersPage from "./pages/UsersPage/UsersPage";
import UserPage from "./pages/UserPage/UserPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer"
import IsPrivate from "./components/auth/IsPrivate";
import IsAnon from "./components/auth/IsAnon";
import InboxPage from './pages/InboxPage/InboxPage';
import CheckoutPage from './pages/CheckoutPage/CheckoutPage';
import AccountPage from './pages/AccountPage/AccountPage';
import { AccountProvider } from './context/account.context';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/users" element={<UsersPage />}/>
        <Route path="/users/:userId" element={<UserPage />}/>

        <Route path="/account/*" element={
            <IsPrivate>
              <AccountProvider>
                <AccountPage />
              </AccountProvider>
            </IsPrivate>
          }/>

        <Route path="/account/inbox" element={
            <IsPrivate>
              <InboxPage />
            </IsPrivate>
          }/>

        <Route path="/offers/:offerId/book" element={
            <IsPrivate>
              <CheckoutPage />
            </IsPrivate>
          }/>

        <Route path="/login" element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }/>

        <Route path="/signup" element={
            <IsAnon>
              <SignupPage />
            </IsAnon>
          }/>
      </Routes>

      <Footer />
      <ToastContainer position='bottom-left'/>
    </>
  )
}

export default App
