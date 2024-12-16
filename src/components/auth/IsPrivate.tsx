import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { Navigate } from "react-router-dom";
import Loading from "./Loading";

function IsPrivate({ children }) {
  const { isLoggedIn, isAuthenticating } = useContext(AuthContext);

  // If the authentication is still loading ⏳
  if (isAuthenticating) {
    return <Loading />;
  }

  if (!isLoggedIn) {
    // If the user is not logged in navigate to the login page ❌
    return <Navigate to="/login" />;
  }
  // If the user is logged in, allow to see the page ✅
  return children;
}

export default IsPrivate;
