import { Link } from 'react-router-dom';

function Hero() {
    return (
        <div className="homepage-container" style={{backgroundImage: 'url(/images/hero.jpeg)'}}>
            <div className="container col-xxl-8 px-4 py-5">
                <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
                    <div className="col-10 col-sm-8 col-lg-6">
                        <img src="/images/hero2.png" className="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" loading="lazy"/>
                    </div>
                    <div className="col-lg-6 speech-bubble-blue">
                        <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">Exchange languages and learn for free</h1>
                        <p className="lead fw-normal">With Omniglot's matching system, you can easily connect with native speakers of your target language all around the world and teach each other at your own leisure.</p>
                        <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                            <Link to="/login">
                                <button type="button" className="btn btn-success rounded-pill btn-lg px-4 me-md-2">Login</button>
                            </Link>
                            <Link to="/signup">
                                <button type="button" className="btn btn-outline-dark rounded-pill btn-lg px-4">Sign Up</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero;