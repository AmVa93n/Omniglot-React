import { useState, useEffect } from "react"
import accountService from "../services/account.service" 
import { User } from '../types'
import Language from "../components/Language"
import { langList, formatDate, getCountries } from "../utils"
import '../styles/ProfilePage.css'
import { country, form } from "../types"
import LanguageCheckbox from "../components/LanguageCheckbox"

function ProfilePage() {
    const [user, setUser] = useState({} as User)
    const [editedFields, setEditedFields] = useState([] as string[])
    const [countries, setCountries] = useState([] as country[])
    const [editForm, setEditForm] = useState({} as form)
    const languages = Object.keys(langList).sort((a, b) => langList[a].localeCompare(langList[b]));

    useEffect(() => {
        async function fetchUser() {
            try {
              const data = await accountService.getProfile()
              setUser(data)
            } catch (error) {
              console.error('Error fetching data in component:', error);
            }
        }

        async function fetchCountries() {
            const countries = await getCountries()
            if (countries) setCountries(countries)
        }

        fetchUser()
        fetchCountries()
    }, [])

    function editProfilePic() {
        document.getElementById('pfp')?.click();
    }

    function toggleEdit(field: string) {
        if (!editedFields.includes(field)) {
            setEditedFields(prev => [...prev, field])
        } else {
            setEditedFields(prev => prev.filter(f => f !== field))
        }
        setEditForm(prev => {
            return {...prev, [field]: user[field]}
        })
    }

    function handleChange(event: React.ChangeEvent) {
        const field = (event.target as HTMLInputElement).name
        const value = (event.target as HTMLInputElement).value
        setEditForm(prev => {
            return {...prev, [field]: value}
        })
    }

    function handleCheckbox(list: string, language: string) {
        const key = 'lang_' + list
        const isChecked = editForm[key].includes(language)
        const newList = [...editForm[key]]
        if (isChecked) {
            newList.push(language)
            setEditForm(prev => {return {...prev, ['lang_' + list]: newList}})
        } else {
            const index = newList.indexOf(language);
            newList.splice(index, 1);
        }
    }

    function handleFileUpload(event: React.ChangeEvent) {
        console.log(event)
    }

    async function handleSave() {
        
    }
    
    async function handleDelete() {
        
    }

    return (
        <div className="content-box" style={{width: '35%'}}>
            <h2 className="mb-3 center">My Profile</h2>
            <form onSubmit={handleSave} method="POST" encType="multipart/form-data">
                <div className="position-relative">
                    <div className="mb-3 mx-auto circle-crop">
                        <img id="profile-pic-preview" src={user?.profilePic || '/images/Profile-PNG-File.png'}/>
                    </div>
                    <button type="button" id="edit-pfp-btn" className="btn btn-secondary btn-sm circle-btn editPfpBtn" onClick={editProfilePic}>
                        <i className="bi bi-pencil-square"></i>
                    </button>
                </div>

            <div className="d-flex justify-content-center my-3">
                <input type="file" id="pfp" name="pfp" style={{display: 'none'}} onChange={(event) => handleFileUpload(event)} />
                <button type="button" className="btn btn-sm pfp-cancel d-none" onClick={() => setEditedFields(prev => prev.filter(f => f !== 'pfp'))}><i className="bi bi-x-circle-fill"></i></button>
            </div>

            <div className="row fs-6 mb-3 align-items-center">
                <span className="col-4 fw-bold">Username</span>
                <div className="col">
                    {!editedFields.includes('username') ? 
                        <span>{user?.username}</span> :
                        <input className="form-control" type="text" name="username" value={editForm.username} onChange={handleChange}/>}
                </div>
                <div className="col-3">
                    <button type="button" className="btn btn-sm" onClick={() => toggleEdit('username')}>
                        <i className={!editedFields.includes('username') ? 'bi bi-pencil-fill' : 'bi bi-x-circle-fill'}></i>
                    </button>
                </div>
            </div>
            
            <div className="row fs-6 mb-3 align-items-center">
                <span className="col-4 fw-bold">Email</span>
                <div className="col">
                    {!editedFields.includes('email') ?
                        <span>{user?.email}</span> :
                        <input className="form-control" type="text" name="email" value={editForm.email} onChange={handleChange} />
                    }
                </div>
                <div className="col-3">
                    <button type="button" className="btn btn-sm" onClick={() => toggleEdit('email')}>
                        <i className="!editedFields.includes('email') ? 'bi bi-pencil-fill' : 'bi bi-x-circle-fill'"></i>
                    </button>
                </div>
            </div>

            <div className="row fs-6 mb-3 align-items-center">
                <span className="col-4 fw-bold">Gender</span>
                <div className="col">
                    {!editedFields.includes('gender') ?
                        <span>{user?.gender}</span> :
                        <>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="gender" id="male" value="male" checked={user.gender === 'male'}/>
                                <label className="form-check-label me-2" htmlFor="male">Male</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="gender" id="female" value="female" checked={user.gender === 'female'}/>
                                <label className="form-check-label me-2" htmlFor="female">Female</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="gender" id="other" value="other" checked={user.gender === 'other'}/>
                                <label className="form-check-label me-2" htmlFor="other">Other</label>
                            </div>
                        </>
                    }
                </div>
                <div className="col-3">
                    <button type="button" className="btn btn-sm" onClick={() => toggleEdit('gender')}>
                        <i className="!editedFields.includes('gender') ? 'bi bi-pencil-fill' : 'bi bi-x-circle-fill'"></i>
                    </button>
                </div>
            </div>

            <div className="row fs-6 mb-3 align-items-center">
                <span className="col-4 fw-bold">Birthdate</span>
                <div className="col">
                    {!editedFields.includes('birthdate') ?
                        <span>{formatDate(user?.birthdate)}</span> :
                        <input className="form-control" type="date" name="birthdate" value={editForm.birthdate} onChange={handleChange} />
                    }
                </div>
                <div className="col-3">
                    <button type="button" className="btn btn-sm" onClick={() => toggleEdit('birthdate')}>
                        <i className={!editedFields.includes('birthdate') ? 'bi bi-pencil-fill' : 'bi bi-x-circle-fill'}></i>
                    </button>
                </div>
            </div>

            <div className="row fs-6 mb-4 align-items-center">
                <span className="col-4 fw-bold">Country</span>
                <div className="col">
                    {!editedFields.includes('country') ?
                        <span>{user?.country}</span> :
                        <select className="form-select" name="country" value={editForm.country} onChange={handleChange}>
                            {countries.map(country => (
                                <option value={country.name.common}>{country.name.common}</option>
                            ))}
                        </select>}
                    
                </div>
                <div className="col-3">
                    <button type="button" className="btn btn-sm" onClick={() => toggleEdit('country')}>
                        <i className={!editedFields.includes('country') ? 'bi bi-pencil-fill' : 'bi bi-x-circle-fill'}></i>
                    </button>
                </div>
            </div>

            <div className="row fs-6 mb-2">
                <p className="col-4 fw-bold">I want to teach</p>
                <div className="col">
                    {!editedFields.includes('teach') ?
                    <>
                        {user.lang_teach?.map(lang => (<Language key={lang} code={lang} />))} 
                    </> : 
                    <>
                        {languages.map(lang => (
                            <LanguageCheckbox key={lang} code={lang} type='teach' 
                                checked={editForm.lang_teach?.includes(lang)}
                                disabled={editForm.lang_learn?.includes(lang)} 
                                onChange={() => handleCheckbox('teach', lang)} 
                            />
                        ))}
                    </>}
                </div>
                <div className="col-3">
                    <button type="button" className="btn btn-sm" onClick={() => toggleEdit('teach')}>
                        <i className={!editedFields.includes('teach') ? 'bi bi-pencil-fill' : 'bi bi-x-circle-fill'}></i>
                    </button>
                </div>
            </div>

            <div className="row fs-6 mb-4">
                <p className="col-4 fw-bold">I want to learn</p>
                <div className="col">
                    {!editedFields.includes('learn') ?
                    <>
                        {user.lang_learn?.map(lang => (<Language key={lang} code={lang} />))} 
                    </> : 
                    <>
                        {languages.map(lang => (
                            <LanguageCheckbox key={lang} code={lang} type='learn'
                                checked={editForm.lang_learn?.includes(lang)}
                                disabled={editForm.lang_teach?.includes(lang)} 
                                onChange={() => handleCheckbox('learn', lang)} 
                            />
                        ))}
                    </>}
                    
                </div>
                <div className="col-3">
                    <button type="button" className="btn btn-sm" onClick={() => toggleEdit('learn')}>
                        <i className={!editedFields.includes('learn') ? 'bi bi-pencil-fill' : 'bi bi-x-circle-fill'}></i>
                    </button>
                </div>
            </div>

            <div className="row mb-2">
                <p className="col-4 fw-bold">Professional Profile</p>
                <div className="form-check form-switch col">
                    <input className="form-check-input" type="checkbox" id="professional" name="professional" 
                        checked={editForm.professional} onChange={handleChange}/>
                    <label className="form-check-label" htmlFor="professional"><small>I want to offer paid classNamees and educational content.
                    </small></label>
                    <input type="hidden" name="stripeAccountId" value="user?.stripeAccountId"/>
                </div>
            </div>
            
            <div className="row mb-2">
                <p className="col-4 fw-bold">Private Profile</p>
                <div className="form-check form-switch col">
                    <input className="form-check-input" type="checkbox" id="private" name="private" 
                        checked={editForm.private} onChange={handleChange}/>
                    <label className="form-check-label" htmlFor="private"><small>Your profile will not appear in search results.<br/>
                        Only users who you've contacted can see your profile.
                    </small></label>
                </div>
            </div>

            <div className="d-flex justify-content-center mt-3">
                <button type="submit" className="btn btn-primary rounded-pill">
                    <i className="bi bi-floppy2-fill me-2"></i>Save Changes
                </button>
            </div>
        </form>

        <div className="d-flex justify-content-center mt-3">
        <button className="btn btn-sm btn-outline-danger" onClick={handleDelete}>Delete Account</button>
        </div>
        
    </div>
    )
}

export default ProfilePage