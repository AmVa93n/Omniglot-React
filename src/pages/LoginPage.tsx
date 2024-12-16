import { Link, useNavigate } from "react-router-dom"
import authService from "../services/auth.service";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

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
        <div className="content-box">
            <h2 className="center">Login</h2>
            <form onSubmit={(event) => handleSubmit(event)} method="POST">

                <div className="form-floating mb-3">
                <input type="text" name="email" id="email" placeholder="Your email address" className="form-control" autoComplete="email"/>
                <label htmlFor="email">Email</label>
                </div>

                <div className="form-floating mb-3">
                <input type="password" name="password" id="password" placeholder="Your password" className="form-control" autoComplete="current-password"/>
                <label htmlFor="password">Password</label>
                </div>

                <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-success mb-3 rounded-pill">Login</button>
                </div>
            </form>
            
            <p className="center">Don't have an account yet?</p>
            <div className="d-flex justify-content-center">
            <Link to="/signup"><button className="btn btn-dark rounded-pill">Sign Up</button></Link>
            </div>
        
        </div>
    )
}

export default LoginPage