import { useState, useRef } from "react"
import '../styles/ProfilePage.css'
import Avatar from "../components/Avatar"
import useFormat from "../hooks/useFormat"
import useLanguages from "../hooks/useLanguages"
import useCountries from "../hooks/useCountries"

function ProfilePage() {
    const [pfpPreview, setPfpPreview] = useState<string | ArrayBuffer | null>('');
    const fileInputRef = useRef(null);
    const { formatDate } = useFormat()
    const { languagesList } = useLanguages()
    const countries = useCountries()

    function handleCheckbox(event: React.ChangeEvent, field: string) {
        const value = (event.target as HTMLInputElement).value
        const isChecked = editForm[field as 'lang_teach' | 'lang_learn'].includes(value)
        const newList = [...editForm[field as 'lang_teach' | 'lang_learn']]
        if (!isChecked) {
            newList.push(value)
        } else {
            const index = newList.indexOf(value);
            newList.splice(index, 1);
        }
        setEditForm(prev => {return {...prev, [field]: newList}})
    }

    function handleFilePreview(event: React.ChangeEvent<HTMLInputElement>) {
        const reader = new FileReader();
        reader.onload = function(){
          setPfpPreview(reader.result)
        }
        const file = event.target.files?.[0]
        if (file) reader.readAsDataURL(file);
    }

    return (
        <div className="content-box" style={{width: '35%'}}>
            <h2 className="mb-3 center">My Profile</h2>
            <form onSubmit={handleSave} method="POST" encType="multipart/form-data">
                <div className="position-relative">
                    <div className="mb-3 mx-auto d-flex justify-content-center">
                        <Avatar src={pfpPreview as string} size={200} />
                    </div>
                    <button type="button" id="edit-pfp-btn" className="btn btn-secondary btn-sm circle-btn editPfpBtn" onClick={() => toggleEdit('profilePic')}>
                        <i className="bi bi-pencil-square"></i>
                        <input type="file" id="pfp" name="profilePic" style={{display: 'none'}} ref={fileInputRef} onChange={handleFilePreview} />
                    </button>
                </div>

            <div className="d-flex justify-content-center my-3">
                <button type="button" className="btn btn-sm pfp-cancel d-none" onClick={() => setEditedFields(prev => prev.filter(f => f !== 'pfp'))}><i className="bi bi-x-circle-fill"></i></button>
            </div>

            <div className="row fs-6 mb-3 align-items-center">
                <span className="col-4 fw-bold">Username</span>
                <div className="col">
                    {!editedFields.includes('username') ? 
                        <span>{profile?.username}</span> :
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
                        <span>{profile?.email}</span> :
                        <input className="form-control" type="text" name="email" value={editForm.email} onChange={handleChange} />
                    }
                </div>
                <div className="col-3">
                    <button type="button" className="btn btn-sm" onClick={() => toggleEdit('email')}>
                        <i className={!editedFields.includes('email') ? 'bi bi-pencil-fill' : 'bi bi-x-circle-fill'}></i>
                    </button>
                </div>
            </div>

            <div className="row fs-6 mb-3 align-items-center">
                <span className="col-4 fw-bold">Gender</span>
                <div className="col">
                    {!editedFields.includes('gender') ?
                        <span>{profile?.gender}</span> :
                        <>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="gender" id="male" value="male"/>
                                <label className="form-check-label me-2" htmlFor="male">Male</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="gender" id="female" value="female"/>
                                <label className="form-check-label me-2" htmlFor="female">Female</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="gender" id="other" value="other"/>
                                <label className="form-check-label me-2" htmlFor="other">Other</label>
                            </div>
                        </>
                    }
                </div>
                <div className="col-3">
                    <button type="button" className="btn btn-sm" onClick={() => toggleEdit('gender')}>
                        <i className={!editedFields.includes('gender') ? 'bi bi-pencil-fill' : 'bi bi-x-circle-fill'}></i>
                    </button>
                </div>
            </div>

            <div className="row fs-6 mb-3 align-items-center">
                <span className="col-4 fw-bold">Birthdate</span>
                <div className="col">
                    {!editedFields.includes('birthdate') ?
                        <span>{formatDate(profile?.birthdate)}</span> :
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
                        <span>{profile?.country}</span> :
                        <select className="form-select" name="country" value={editForm.country} onChange={handleChange}>
                            {countries.map(country => (
                                <option key={country.name.common} value={country.name.common}>{country.name.common}</option>
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
                    {!editedFields.includes('lang_teach') ?
                    <>
                        {profile.lang_teach?.map(lang => (<Language key={lang} code={lang} />))} 
                    </> : 
                    <>
                        {languagesList.map(lang => (
                            <LanguageCheckbox key={lang} code={lang} type='teach' 
                                checked={editForm.lang_teach?.includes(lang)}
                                disabled={editForm.lang_learn?.includes(lang)} 
                                onChange={(event) => handleCheckbox(event, 'lang_teach')} 
                            />
                        ))}
                    </>}
                </div>
                <div className="col-3">
                    <button type="button" className="btn btn-sm" onClick={() => toggleEdit('lang_teach')}>
                        <i className={!editedFields.includes('lang_teach') ? 'bi bi-pencil-fill' : 'bi bi-x-circle-fill'}></i>
                    </button>
                </div>
            </div>

            <div className="row fs-6 mb-4">
                <p className="col-4 fw-bold">I want to learn</p>
                <div className="col">
                    {!editedFields.includes('lang_learn') ?
                    <>
                        {profile.lang_learn?.map(lang => (<Language key={lang} code={lang} />))} 
                    </> : 
                    <>
                        {languagesList.map(lang => (
                            <LanguageCheckbox key={lang} code={lang} type='learn'
                                checked={editForm.lang_learn?.includes(lang)}
                                disabled={editForm.lang_teach?.includes(lang)} 
                                onChange={(event) => handleCheckbox(event, 'lang_learn')} 
                            />
                        ))}
                    </>}
                    
                </div>
                <div className="col-3">
                    <button type="button" className="btn btn-sm" onClick={() => toggleEdit('lang_learn')}>
                        <i className={!editedFields.includes('lang_learn') ? 'bi bi-pencil-fill' : 'bi bi-x-circle-fill'}></i>
                    </button>
                </div>
            </div>

            <div className="row mb-2">
                <p className="col-4 fw-bold">Professional Profile</p>
                <div className="form-check form-switch col">
                    <input className="form-check-input" type="checkbox" id="professional" name="professional" 
                        checked={editForm.professional} onChange={handleChange}/>
                    <label className="form-check-label" htmlFor="professional"><small>I want to offer paid classes and educational content.
                    </small></label>
                    <input type="hidden" name="stripeAccountId" value={profile?.stripeAccountId}/>
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
    </div>
    )
}

export default ProfilePage