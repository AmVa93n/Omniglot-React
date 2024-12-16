import { useEffect, useState } from "react";
import { User } from '../types'
import { useParams, Link } from "react-router-dom";
import appService from "../services/app.service";
import { getUserAge } from "../utils";
import "../styles/UsersPage.css"
import Language from "../components/Language";

function UsersPage() {
    const [users, setUsers] = useState([] as User[])
    const { matchType, userType, langId } = useParams()

    useEffect(() => {
        async function fetchUsers() {
            let data
            try {
              if (matchType) {
                data = await appService.getMatches(matchType);
              } 
              if (userType && langId) {
                if (userType === 'learners') {
                    data = await appService.getLearners(langId);
                } else {
                    data = await appService.getTeachers(langId);
                }
              }
              setUsers(data)
            } catch (error) {
              console.error('Error fetching data in component:', error);
            }
        }

        fetchUsers()
    }, [matchType, userType, langId])

    return (
        <>
        <h4 className="center my-3">{users.length} matches found</h4>
        <div className="d-flex flex-wrap mx-auto gap-3" style={{width: '92%'}}>
            {users.map(user => (
            <div className="user-card" key={user._id}>
                <Link to={'/users/' + user._id} className="link-text">
                    <div className="d-flex align-items-center mb-3 position-relative">
                        <div className="circle-crop me-2" style={{width: '50px', height: '50px', display: 'inline-flex'}}>
                            <img src={user.profilePic || '/images/Profile-PNG-File.png'}/>
                        </div>
                        <span className="fs-5">{user.username}</span>
                        <span className="userAgeCountry">
                            <span className="age">{getUserAge(user.birthdate)}</span>, {user.country}
                        </span>
                        
                        {user.professional &&
                        <span className="badge rounded-pill text-bg-primary profBadge">Professional</span>}
                        
                    </div>
                </Link>

                <div className="row mb-2 align-items-center">
                    <span className="fw-bold col-auto" style={{width: '125px'}}>{ matchType === "teachers" ? 'Teaching' : 'Can teach'}</span> 
                    <div className="col">
                        {user.lang_teach.map(lang => (
                            <Language key={lang} code={lang} />
                        ))}
                    </div>
                </div>
                
                {matchType !== 'teachers' &&
                <div className="row mb-2 align-items-center">
                    <span className="fw-bold col-auto" style={{width: '125px'}}>Wants to learn</span>
                    <div className="col">
                        {user.lang_learn.map(lang => (
                            <Language key={lang} code={lang} />
                        ))}
                    </div>
                </div>}

                {matchType === 'teachers' &&
                <div className="row mb-2 align-items-center">
                    <span className="fw-bold col-auto" style={{width: '125px'}}>Rating</span>
                    <div className="col">
                        {user.reviews &&
                        <div className="mx-auto" style={{width: 'fit-content'}}>{user.ratingAvg} 
                            <span style={{color: '#ffca08'}}>&#9733;</span>
                        </div>}
                        <div className="mx-auto small" style={{width: 'fit-content'}}>({user.reviewsNr} Reviews)</div>
                    </div>
                </div>}

                <div className="row mt-auto">
                    <div className="col d-flex justify-content-center align-items-end">
                        <form action="/account/inbox" method="POST">
                            <input style={{display: 'none'}} name="targetUserId"/>
                            <button type="submit" className="btn btn-primary mx-1"><i className="bi bi-envelope-fill me-1"></i>Message</button>
                        </form>
                    </div>
                </div>
                
            </div>
            ))}
        </div>
        </>
    )
}

export default UsersPage