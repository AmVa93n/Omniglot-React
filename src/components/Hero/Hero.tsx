import { Link } from 'react-router-dom';
import './Hero.css';

function Hero() {
    return (
        <div className='hero-container'>
            <div className="hero-text-container">
                <h1>Exchange languages and learn for free</h1>
                <p>With Omniglot's matching system, you can easily connect with native speakers of your target language all around the world and teach each other at your own leisure.</p>
                <div className="hero-buttons">
                    <Link to="/login">
                        <button type="button" className='login'>Login</button>
                    </Link>
                    <Link to="/signup">
                        <button type="button" className='signup'>Sign Up</button>
                    </Link>
                </div>
            </div>

            <div className="hero-hello">
                <img src="/images/hero2.png" loading="lazy"/>
            </div>
        </div>
    )
}

export default Hero;