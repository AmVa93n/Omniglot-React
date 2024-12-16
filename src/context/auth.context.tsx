import { createContext, useState, useEffect, PropsWithChildren } from "react";
import authService from "../services/auth.service";

const AuthContext = createContext({});

function AuthProvider({ children }: PropsWithChildren) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [user, setUser] = useState(null);

  function storeToken(token: string) {
    localStorage.setItem("authToken", token);
  };

  async function authenticateUser() {
    // Get the stored token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // If the token exists in the localStorage
    if (storedToken) {
      // Send a request to the server using axios
      try {
        // If the server verifies that JWT token is valid  ✅
        const response = await authService.verify()
        const user = response.data;
        setIsLoggedIn(true);
        setIsAuthenticating(false);
        setUser(user);
      } catch (error) {
        // If the server sends an error response (invalid token) ❌
        console.log(error)
        handleInvalidToken()
      }
    } else {
      // If the token is not available
      handleInvalidToken()
    }
  };

  function removeToken() {
    localStorage.removeItem("authToken");
  };

  function logOutUser() {
    // Upon logout, remove the token from the localStorage
    removeToken();
    authenticateUser();
  };

  function handleInvalidToken() {
    setIsLoggedIn(false);
    setIsAuthenticating(false);
    setUser(null);
  }

  useEffect(() => {
    // Run this code once the AuthProviderWrapper component in the App loads for the first time.
    // This effect runs when the application and the AuthProviderWrapper component load for the first time.
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isAuthenticating,
        user,
        storeToken,
        authenticateUser,
        logOutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
