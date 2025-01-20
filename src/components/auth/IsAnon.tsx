import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { Navigate } from "react-router-dom";
import Loading from "./Loading";

function IsAnon({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, isAuthenticating } = useContext(AuthContext);

  // If the authentication is still loading ⏳
  if (isAuthenticating) {
    return <Loading />;
  }

  if (isLoggedIn) {
    // If the user is logged in, navigate to home page ❌
    return <Navigate to="/" />;
  }

  // If the user is not logged in, allow to see the page ✅
  return children;
}

export default IsAnon;
