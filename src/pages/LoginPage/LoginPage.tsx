import { Link, useNavigate } from "react-router-dom"
import authService from "../../services/auth.service";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import './LoginPage.css'

function LoginPage() {
    const navigate = useNavigate()
    const { storeToken, authenticateUser } = useContext(AuthContext)

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        const form = event.currentTarget as HTMLFormElement; // Cast to HTMLFormElement
        const formData = new FormData(form);
        const email = formData?.get('email');
        const password = formData?.get('password');
        const requestBody = { email, password };
    
        try {
          const { authToken } = await authService.login(requestBody)
          // If the POST request is successful store the authentication token,
          // after the token is stored authenticate the user
          // and at last navigate to the home page
          storeToken(authToken);
          authenticateUser();
          navigate('/');
          
        } catch (error) {
          // If the request resolves with an error, set the error message in the state
          alert(error)
        }
        
      };

    return (
      <div className="login-page">
        <div className="login-container">
            <div className="login-header">
              <img src="/images/logo-no-text.png" alt="logo" className="logo" width={28}/>
              <h2>Login</h2>
            </div>
            <form onSubmit={(event) => handleSubmit(event)} method="POST">

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="text" name="email" id="email" placeholder="Your email address" autoComplete="email"/>
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" name="password" id="password" placeholder="Your password" autoComplete="current-password"/>
                </div>

                <div className="login-button-container">
                  <button type="submit" className="login-button">Login</button>
                </div>
            </form>
            
            <div className="signup-container">
              <p>Don't have an account yet?</p>
              <Link to="/signup"><button className="signup-button">Sign Up</button></Link>
            </div>
        
        </div>
      </div>
    )
}

export default LoginPage