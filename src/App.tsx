import './App.css'
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UsersPage from "./pages/UsersPage";
import UserPage from "./pages/UserPage";
import ProfilePage from "./pages/ProfilePage";
import ClassesPage from "./pages/ClassesPage";
import CalendarPage from "./pages/CalendarPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"
import IsPrivate from "./components/auth/IsPrivate";
import IsAnon from "./components/auth/IsAnon";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/users/match/:matchType" element={<UsersPage />}/>
        <Route path="/users/:userType/:langId" element={<UsersPage />}/>
        <Route path="/users/:userId" element={<UserPage />}/>

        <Route path="/account/profile" element={
            <IsPrivate>
              <ProfilePage />
            </IsPrivate>
          }/>

        <Route path="/account/classes" element={
            <IsPrivate>
              <ClassesPage />
            </IsPrivate>
          }/>

        <Route path="/account/calendar" element={
            <IsPrivate>
              <CalendarPage />
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
    </>
  )
}

export default App
