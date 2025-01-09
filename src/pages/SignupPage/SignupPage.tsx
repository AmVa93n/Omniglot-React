import { signupForm } from "../../types"
import useCountries from "../../hooks/useCountries"
import useLanguages from "../../hooks/useLanguages"
import { useState } from "react"
import authService from "../../services/auth.service" 
import { useNavigate } from "react-router-dom"
import './SignupPage.css'
import LanguageSelectModal from "../../components/LanguageSelectModal/LanguageSelectModal"
import LanguageChip from "../../components/LanguageChip/LanguageChip"
import Avatar from "../../components/Avatar"

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
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalField, setModalField] = useState<'lang_teach' | 'lang_learn'>('lang_teach')
    const navigate = useNavigate()
    const { languagesList } = useLanguages()
    const countries = useCountries()
    const availableLanguages = languagesList.filter(lang => !signupForm.lang_teach.includes(lang) && !signupForm.lang_learn.includes(lang))

    function handleChange(event: React.ChangeEvent) {
        const { name, value } = event.target as HTMLInputElement
        setSignupForm(prev => {
            return {...prev, [name]: value}
        })
    }

    function handleAddLanguage(field: 'lang_teach' | 'lang_learn') {
        setModalField(field)
        setIsModalOpen(true)
    }

    function handleDeleteLanguage(code: string, field: 'lang_teach' | 'lang_learn') {
        setSignupForm(prev => {
            return {...prev, [field]: prev[field].filter(lang => lang !== code)}
        })
    }

    function handleModalConfirm(selectedLanguages: string[], field: 'lang_teach' | 'lang_learn') {
        setSignupForm(prev => {
            return {...prev, [field]: [...prev[field], ...selectedLanguages]}
        })
        setIsModalOpen(false)
    }

    function handleSwitch(event: React.ChangeEvent) {
        const { name, checked } = event.target as HTMLInputElement
        if (name === 'professional') {
            setSignupForm(prev => {
                return {...prev, private: checked ? false : prev.private, professional: checked}
            })
        }
        if (name === 'private') {
            setSignupForm(prev => {
                return {...prev, professional: checked ? false : prev.professional, private: checked}
            })
        }
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
        <div className="signup-page">
            <form onSubmit={handleSubmit}>
                <h1>Create an account</h1>
                <div className="signup-form-body">
                    <div className="signup-form-section">
                        <h3>Account Information</h3>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" name="username" required placeholder="Your username" value={signupForm.username} onChange={handleChange}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input type="email" name="email" required placeholder="Your email" value={signupForm.email} onChange={handleChange}/>
                            <small>We'll never share your email with anyone else.</small>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" required placeholder="Your password" value={signupForm.password} onChange={handleChange}/>
                            <small>* Must be at least 8 characters long.</small><br/>
                            <small>* Must contain at least one number, one lowercase and one uppercase letter.</small>
                        </div>

                        <div className="form-group">
                            <label htmlFor="profile-pic">Profile Picture</label>
                            <input type="file" name="profilePic" onChange={(event) => handleFilePreview(event)}/>
                        </div>
                        <Avatar src={pfpPreview as string} size={100} />
                    </div>

                    <div className="signup-form-section">
                        <h3>Personal Information</h3>
                        <div className="form-group">
                            <label>Gender</label>
                            <div className="gender-options">
                                <label>
                                    <input type="radio" name="gender" value="male" checked={signupForm.gender === 'male'} onChange={handleChange} />Male
                                </label>
                                <label>
                                    <input type="radio" name="gender" value="female" checked={signupForm.gender === 'female'} onChange={handleChange} />Female
                                </label>
                                <label>
                                    <input type="radio" name="gender" value="other" checked={signupForm.gender === 'other'} onChange={handleChange} />Other    
                                </label>
                            </div>
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="birthdate">Birth Date</label>
                            <input type="date" name="birthdate" required value={signupForm.birthdate} onChange={handleChange}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="country">Country of Residence</label>
                            <select name="country" required value={signupForm.country} onChange={handleChange}>
                                {countries.map(country => (
                                    <option key={country.name.common} value={country.name.common}>{country.name.common}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    
                    <div className="signup-form-section">
                        <h3>Languages</h3>
                        <div className="form-group">
                            <label>I want to teach</label>
                            <div className="languages">
                                {signupForm.lang_teach.map(lang => (
                                    <LanguageChip key={lang} code={lang} onDelete={() => handleDeleteLanguage(lang, 'lang_teach')} />
                                ))}
                            </div>
                            <button className="add-button" type="button" onClick={() => handleAddLanguage('lang_teach')} disabled={availableLanguages.length === 0}>
                                <i className="bi bi-plus-circle-fill"></i>Add Languages
                            </button>
                        </div>

                        <div className="form-group">
                            <label>I want to learn</label>
                            <div className="languages">
                                {signupForm.lang_learn.map(lang => (
                                    <LanguageChip key={lang} code={lang} onDelete={() => handleDeleteLanguage(lang, 'lang_learn')} />
                                ))}
                            </div>
                            <button className="add-button" type="button" onClick={() => handleAddLanguage('lang_learn')} disabled={availableLanguages.length === 0}>
                                <i className="bi bi-plus-circle-fill"></i>Add Languages
                            </button>
                        </div>

                        {isModalOpen && 
                            <LanguageSelectModal 
                                languages={availableLanguages} 
                                field={modalField}
                                onConfirm={handleModalConfirm}
                                onCancel={() => setIsModalOpen(false)}
                            />}
                    </div>

                    <div className="signup-form-section">
                        <h3>Profile Type</h3>
                        <div className="form-group checkbox">
                            <label>
                                <input type="checkbox" name="professional" checked={signupForm.professional} disabled={signupForm.private} onChange={handleSwitch}/>Professional Profile
                            </label>
                            <small>I want to offer paid classes and educational content.</small>
                        </div>

                        
                        <div className="form-group checkbox">
                            <label>
                                <input type="checkbox" name="private" checked={signupForm.private} disabled={signupForm.professional} onChange={handleSwitch}/>Private Profile
                            </label>
                            <small>Your profile will not appear in search results.<br/>Only users who you've contacted can see your profile.</small>
                        </div>
                    </div>
                </div>

                <button type="submit" className="signup-button">Submit</button>
                
            </form>
        </div>
    )
}

export default SignupPage