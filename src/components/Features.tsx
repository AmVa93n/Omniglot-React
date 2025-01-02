import { Link } from 'react-router-dom';

function Features() {
    return (
        <div className="homepage-container" style={{backgroundImage: 'url(/images/features.jpg)' }}>
            <div className="container px-4 py-5">
                <div className="row row-cols-1 row-cols-md-2 align-items-md-center g-5 py-5">

                    <div className="col d-flex flex-column align-items-start gap-2 speech-bubble-blue me-4" style={{width: '47%'}}>
                        <h2 className="fw-bold text-body-emphasis">Make the most out of Omniglot</h2>
                        <p className="text-body-secondary fw-medium">Join hundreds of certified teachers and boost your revenue with a professional account.<br />Offer commission-free classes with secure credit card payments, paid out from your Stripe account.</p>
                        <Link to={"/account/profile"} className="btn btn-primary btn-lg rounded-pill">Go professional</Link>
                    </div>
                    
                    <div className="col speech-bubble-blue">
                        <div className="row row-cols-1 row-cols-sm-2 g-4">
                            <div className="col d-flex flex-column gap-2">
                                <div className="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-4 rounded-3">
                                    <i className="bi bi-cash-coin"></i>
                                </div>
                                <h4 className="fw-semibold mb-0 text-body-emphasis">Offers</h4>
                                <p className="text-body-secondary fw-medium">Private or group classes, online or in-person. Set your own availability and prices to make your offers attractive and competitive.</p>
                            </div>
                            <div className="col d-flex flex-column gap-2">
                                <div className="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-4 rounded-3">
                                    <i className="bi bi-inbox"></i>
                                </div>
                                <h4 className="fw-semibold mb-0 text-body-emphasis">Live Messages</h4>
                                <p className="text-body-secondary fw-medium">Keep in touch with your students at any time.</p>
                            </div>
                            <div className="col d-flex flex-column gap-2">
                                <div className="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-4 rounded-3">
                                    <i className="bi bi-calendar"></i>
                                </div>
                                <h4 className="fw-semibold mb-0 text-body-emphasis">Calendar</h4>
                                <p className="text-body-secondary fw-medium">Easily track, manage or reschedule your classes using our dynamic calendar.</p>
                            </div>
                            <div className="col d-flex flex-column gap-2">
                                <div className="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-4 rounded-3">
                                    <i className="bi bi-star"></i>
                                </div>
                                <h4 className="fw-semibold mb-0 text-body-emphasis">Reviews</h4>
                                <p className="text-body-secondary fw-medium">Students will have a chance to rate you after the class and share their experience.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Features;