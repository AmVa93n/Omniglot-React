import { Link } from "react-router-dom"
import { getLanguageName } from "../utils"
import { useEffect, useState } from "react"
import appService from "../services/app.service"

function HomePage() {
    const [stats, setStats] = useState({
        teach: [] as statListItem[],
        learn: [] as statListItem[],
    })

    interface statListItem {
        name: string
        amount: number
    }

    useEffect(()=> {
        async function fetchStats() {
            try {
                const data = await appService.getLanguageStats()
                setStats(data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchStats()
    }, [])

    return (
        <>
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
            
        <div className="b-example-divider"></div>

        <div className="homepage-container" style={{backgroundImage: 'url(/images/features.jpg)' }}>
            <div className="container px-4 py-5">
            <div className="row row-cols-1 row-cols-md-2 align-items-md-center g-5 py-5">
                <div className="col d-flex flex-column align-items-start gap-2 speech-bubble-blue me-4" style={{width: '47%'}}>
                    <h2 className="fw-bold text-body-emphasis">Make the most out of Omniglot</h2>
                    <p className="text-body-secondary fw-medium">Join hundreds of certified teachers and boost your revenue with a professional account.<br />Offer commission-free classNamees with secure credit card payments, paid out from your Stripe account.</p>
                    <a href="/account/profile" className="btn btn-primary btn-lg rounded-pill">Go professional</a>
                </div>
                <div className="col speech-bubble-blue">
                    <div className="row row-cols-1 row-cols-sm-2 g-4">
                        <div className="col d-flex flex-column gap-2">
                            <div className="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-4 rounded-3">
                                <i className="bi bi-cash-coin"></i>
                            </div>
                            <h4 className="fw-semibold mb-0 text-body-emphasis">Offers</h4>
                            <p className="text-body-secondary fw-medium">Private or group classNamees, online or in-person. Set your own availability and prices to make your offers attractive and competitive.</p>
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
                            <p className="text-body-secondary fw-medium">Easily track, manage or reschedule your classNamees using our dynamic calendar.</p>
                        </div>
                        <div className="col d-flex flex-column gap-2">
                            <div className="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-4 rounded-3">
                                <i className="bi bi-star"></i>
                            </div>
                            <h4 className="fw-semibold mb-0 text-body-emphasis">Reviews</h4>
                            <p className="text-body-secondary fw-medium">Students will have a chance to rate you after the className and share their experience.</p>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
            
        <div className="b-example-divider"></div>
            
        <div id="statistics" className="row g-0 py-3">
            <h2 className="center px-0">Most popular languages</h2>
            
            <div className="col-auto mx-auto">
                <h4 className="mx-auto" style={{width: 'fit-content'}}>Teaching</h4>
                <ul className="list-group">
                    {stats.teach.map(lang => (
                        <Link key={lang.name} to={'/users/teachers/' + lang.name} className="text-decoration-none">
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                <div className="langWrapper">
                                    <img src={'/images/' + lang.name + '.svg'} className="lang-flag"/>
                                    <span className="lang-name">{getLanguageName(lang.name)}</span>
                                </div>
                                <span className="badge bg-primary rounded-pill ms-5">{lang.amount} Users</span>
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>
            
            <div className="col-auto mx-auto">
                <h4 className="mx-auto" style={{width: 'fit-content'}}>Learning</h4>
                <ul className="list-group">
                    {stats.learn.map(lang => (
                        <Link key={lang.name} to={'/users/learners/' + lang.name} className="text-decoration-none">
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                <div className="langWrapper">
                                    <img src={'/images/' + lang.name + '.svg'} className="lang-flag"/>
                                    <span className="lang-name">{getLanguageName(lang.name)}</span>
                                </div>
                                <span className="badge bg-primary rounded-pill ms-5">{lang.amount} Users</span>
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>
        </div>
            
        <svg xmlns="http://www.w3.org/2000/svg" className="d-none">
            <symbol id="bootstrap" viewBox="0 0 118 94">
            <title>Bootstrap</title>
            <path fillRule="evenodd" clipRule="evenodd" d="M24.509 0c-6.733 0-11.715 5.893-11.492 12.284.214 6.14-.064 14.092-2.066 20.577C8.943 39.365 5.547 43.485 0 44.014v5.972c5.547.529 8.943 4.649 10.951 11.153 2.002 6.485 2.28 14.437 2.066 20.577C12.794 88.106 17.776 94 24.51 94H93.5c6.733 0 11.714-5.893 11.491-12.284-.214-6.14.064-14.092 2.066-20.577 2.009-6.504 5.396-10.624 10.943-11.153v-5.972c-5.547-.529-8.934-4.649-10.943-11.153-2.002-6.484-2.28-14.437-2.066-20.577C105.214 5.894 100.233 0 93.5 0H24.508zM80 57.863C80 66.663 73.436 72 62.543 72H44a2 2 0 01-2-2V24a2 2 0 012-2h18.437c9.083 0 15.044 4.92 15.044 12.474 0 5.302-4.01 10.049-9.119 10.88v.277C75.317 46.394 80 51.21 80 57.863zM60.521 28.34H49.948v14.934h8.905c6.884 0 10.68-2.772 10.68-7.727 0-4.643-3.264-7.207-9.012-7.207zM49.948 49.2v16.458H60.91c7.167 0 10.964-2.876 10.964-8.281 0-5.406-3.903-8.178-11.425-8.178H49.948z"></path>
            </symbol>
            <symbol id="facebook" viewBox="0 0 16 16">
            <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
            </symbol>
            <symbol id="instagram" viewBox="0 0 16 16">
                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
            </symbol>
            <symbol id="twitter" viewBox="0 0 16 16">
            <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
            </symbol>
        </svg>
            
        <div className="bg-light" style={{width: '100%', height: 'fit-content'}}>
            <div className="container py-4">
            <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 border-top">
                <div className="col-md-4 d-flex align-items-center">
                <a href="/" className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1">
                    <svg className="bi" width="30" height="24"><use xlinkHref="#bootstrap"/></svg>
                </a>
                <span className="mb-3 mb-md-0 text-body-secondary">&copy; 2024 Company, Inc</span>
                </div>
            
                <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
                <li className="ms-3"><a className="text-body-secondary" href="#"><svg className="bi" width="24" height="24"><use xlinkHref="#twitter"/></svg></a></li>
                <li className="ms-3"><a className="text-body-secondary" href="#"><svg className="bi" width="24" height="24"><use xlinkHref="#instagram"/></svg></a></li>
                <li className="ms-3"><a className="text-body-secondary" href="#"><svg className="bi" width="24" height="24"><use xlinkHref="#facebook"/></svg></a></li>
                </ul>
            </footer>
            </div>
        </div>
        </>
    )
}

export default HomePage