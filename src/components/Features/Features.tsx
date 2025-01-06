import { Link } from 'react-router-dom';
import './Features.css';

function Features() {
    return (
        <div className="features-container">
            <div className="features-main">
                <h2>Make the most out of Omniglot</h2>
                <p>Join hundreds of certified teachers and boost your revenue with a professional account.<br />Offer commission-free classes with secure credit card payments, paid out from your Stripe account.</p>
                <Link to={"/account/profile"}><button>Go professional</button></Link>
            </div>
            
            <div className="features-list">
                    <div className="features-list-item">
                        <div className="feature-icon-container">
                            <i className="bi bi-cash-coin"></i>
                        </div>
                        <h4>Offers</h4>
                        <p>Private or group classes, online or in-person. Set your own availability and prices to make your offers attractive and competitive.</p>
                    </div>

                    <div className="features-list-item">
                        <div className="feature-icon-container">
                            <i className="bi bi-inbox"></i>
                        </div>
                        <h4>Live Messages</h4>
                        <p>Keep in touch with your students at any time.</p>
                    </div>

                    <div className="features-list-item">
                        <div className="feature-icon-container">
                            <i className="bi bi-calendar"></i>
                        </div>
                        <h4>Calendar</h4>
                        <p>Easily track, manage or reschedule your classes using our dynamic calendar.</p>
                    </div>

                    <div className="features-list-item">
                        <div className="feature-icon-container">
                            <i className="bi bi-star"></i>
                        </div>
                        <h4>Reviews</h4>
                        <p>Students will have a chance to rate you after the class and share their experience.</p>
                    </div>
            </div>
        </div>
    );
}

export default Features;