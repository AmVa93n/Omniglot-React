import LanguageCheckbox from "../components/LanguageCheckbox"
import { signupForm } from "../types"
import useCountries from "../hooks/useCountries"
import useLanguages from "../hooks/useLanguages"
import { useState } from "react"
import authService from "../services/auth.service" 
import { useNavigate } from "react-router-dom"
import UserAvatar from "../components/UserAvatar"

function SignupPage() {
    const [signupForm, setSignupForm] = useState<signupForm>({
        username: '',
        email: '',
        password: '',
        profilePic: '',
        birthdate: '',
        country: '',
        gender: 'male',
        lang_teach: [],
        lang_learn: [],
        professional: false,
        private: false
    })
    const [pfpPreview, setPfpPreview] = useState<string | ArrayBuffer | null>('/images/Profile-PNG-File.png');
    const navigate = useNavigate()
    const { languagesList } = useLanguages()
    const countries = useCountries()

    function handleChange(event: React.ChangeEvent) {
        const field = (event.target as HTMLInputElement).name
        const value = (event.target as HTMLInputElement).value
        setSignupForm(prev => {
            return {...prev, [field]: value}
        })
    }

    function handleCheckbox(event: React.ChangeEvent, field: string) {
        const value = (event.target as HTMLInputElement).value
        const isChecked = signupForm[field as 'lang_teach' | 'lang_learn'].includes(value)
        const newList = [...signupForm[field as 'lang_teach' | 'lang_learn']]
        if (!isChecked) {
            newList.push(value)
        } else {
            const index = newList.indexOf(value);
            newList.splice(index, 1);
        }
        setSignupForm(prev => {return {...prev, [field]: newList}})
    }

    function handleFilePreview(event: React.ChangeEvent<HTMLInputElement>) {
        const reader = new FileReader();
        reader.onload = function(){
          setPfpPreview(reader.result)
        }
        const file = event.target.files?.[0]
        if (file) reader.readAsDataURL(file);
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        signupForm.lang_teach.forEach((lang) => formData.append('lang_teach[]', lang));
        signupForm.lang_learn.forEach((lang) => formData.append('lang_learn[]', lang));
        try {
            await authService.signup(formData)
            navigate("/login");
        } catch (error) {
            alert(error)
        }
    }

    return (
        <div className="content-box">
            <h2 className="mb-3">Create an account</h2>
            <form onSubmit={handleSubmit}>

                <div className="form-floating mb-3">
                    <input type="text" name="username" required id="username" placeholder="Your username" className="form-control" autoComplete="username" 
                        value={signupForm.username} onChange={handleChange}/>
                    <label htmlFor="username">Username</label>
                </div>

                <div className="form-floating mb-3">
                    <input type="email" name="email" required id="email" placeholder="Your email" className="form-control"
                        value={signupForm.email} onChange={handleChange}/>
                    <label htmlFor="email">Email address</label>
                    <small className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>

                <div className="form-floating mb-3">
                    <input type="password" name="password" required id="password" placeholder="Your password" className="form-control" autoComplete="current-password"
                        value={signupForm.password} onChange={handleChange}/>
                    <label htmlFor="password">Password</label>
                    <small className="form-text text-muted">* Must be at least 8 characters long.</small><br/>
                    <small className="form-text text-muted">* Must contain at least one number, one lowercase and one uppercase letter.</small>
                </div>

                <fieldset className="row mb-3">
                    <legend className="col-form-label col-sm-3 pt-0">Gender</legend>
                    <div className="col-sm-9">
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="gender" id="male" value="male"/>
                            <label className="form-check-label" htmlFor="male">Male</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="gender" id="female" value="female"/>
                            <label className="form-check-label" htmlFor="female">Female</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="gender" id="other" value="other"/>
                            <label className="form-check-label" htmlFor="other">Other</label>
                        </div>
                    </div>
                </fieldset>
                
                <div className="row mb-3">
                    <label htmlFor="birthdate" className="col-sm-3 col-form-label">Birth Date</label>
                    <div className="col-sm-9">
                        <input type="date" id="birthdate" name="birthdate" required className="form-control"
                            value={signupForm.birthdate} onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-floating mb-3">
                    <select className="form-select" id="country" name="country" required value={signupForm.country} onChange={handleChange}>
                        {countries.map(country => (
                            <option key={country.name.common} value={country.name.common}>{country.name.common}</option>
                        ))}
                    </select>
                    <label htmlFor="country">Country of Residence</label>
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="profile-pic" className="form-label">Profile Picture</label>
                    <div className="mb-3 mx-auto d-flex just">
                        <UserAvatar src={pfpPreview as string} size={200}/>
                    </div>
                    <input className="form-control" type="file" name="profilePic" onChange={(event) => handleFilePreview(event)}/>
                </div>
                
                <div className="row mb-3">
                    <div className="col-6" id="lang_teach">
                        <p>I want to teach</p>
                        {languagesList.map(lang => (
                            <LanguageCheckbox key={lang} code={lang} type='teach' 
                                checked={signupForm.lang_teach?.includes(lang)}
                                disabled={signupForm.lang_learn?.includes(lang)} 
                                onChange={(event) => handleCheckbox(event, 'lang_teach')} 
                            />
                        ))}
                    </div>

                    <div className="col-6" id="lang_learn">
                        <p>I want to learn</p>
                        {languagesList.map(lang => (
                            <LanguageCheckbox key={lang} code={lang} type='learn' 
                                checked={signupForm.lang_learn?.includes(lang)}
                                disabled={signupForm.lang_teach?.includes(lang)} 
                                onChange={(event) => handleCheckbox(event, 'lang_learn')} 
                            />
                        ))}
                    </div>
                </div>

                <p>Professional Profile</p>
                <div className="form-check form-switch mb-3">
                    <input className="form-check-input" type="checkbox" role="switch" id="professional" name="professional" 
                        checked={signupForm.professional} onChange={handleChange}/>
                    <label className="form-check-label" htmlFor="professional"><small>I want to offer paid classNamees and educational content.
                    </small></label>
                </div>

                <p>Private Profile</p>
                <div className="form-check form-switch mb-3">
                    <input className="form-check-input" type="checkbox" role="switch" id="private" name="private"
                        checked={signupForm.private} onChange={handleChange}/>
                    <label className="form-check-label" htmlFor="private"><small>Your profile will not appear in search results.<br/>
                        Only users who you've contacted can see your profile.
                    </small></label>
                </div>

                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary rounded-pill">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default SignupPage