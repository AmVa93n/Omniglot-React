import './EditProfileForm.css'
import { useContext, useState } from 'react'
import { editProfileForm, User } from '../../types'
import accountService from '../../services/account.service'
import useCountries from '../../hooks/useCountries'
import useLanguages from '../../hooks/useLanguages'
import useLanguageSelect from '../../hooks/useLanguageSelect'
import LanguageChip from '../LanguageChip/LanguageChip'
import LanguageSelectModal from '../LanguageSelectModal/LanguageSelectModal'
import { AccountContext } from '../../context/account.context'

interface Props {
    profile: User,
    onClose: () => void
}

function EditProfileForm({ profile, onClose }: Props) {
    const [editForm, setEditForm] = useState<editProfileForm>(profile)
    const countries = useCountries()
    const { languagesList } = useLanguages()
    const { isModalOpen, modalField, handleAdd, handleDelete, handleConfirm, handleCancel } = useLanguageSelect(setEditForm)
    const availableLanguages = languagesList.filter(lang => !editForm.lang_teach.includes(lang) && !editForm.lang_learn.includes(lang))
    const { setProfile } = useContext(AccountContext)

    function handleChange(event: React.ChangeEvent) {
        const { name, value } = event.target as HTMLInputElement
        setEditForm(prev => {
            return {...prev, [name]: value}
        })
    }

    function handleSwitch(event: React.ChangeEvent) {
        const { name, checked } = event.target as HTMLInputElement
        if (name === 'professional') {
            setEditForm(prev => {
                return {...prev, private: checked ? false : prev.private, professional: checked}
            })
        }
        if (name === 'private') {
            setEditForm(prev => {
                return {...prev, professional: checked ? false : prev.professional, private: checked}
            })
        }
    }

    async function handleSave(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget);
        editForm.lang_teach.forEach((lang) => formData.append('lang_teach[]', lang));
        editForm.lang_learn.forEach((lang) => formData.append('lang_learn[]', lang));
        try {
            const updatedProfile = await accountService.updateProfile(formData);
            setProfile(updatedProfile)
            onClose()
        } catch (error) {
            alert(error)
        }
    }

    return (
        <div className='edit-profile-form'>
            <form onSubmit={handleSave}>
                <div className='form-group'>
                    <label htmlFor='username'>Username</label>
                    <input type='text' name='username' value={editForm.username} onChange={handleChange} />
                </div>

                <div className='form-group'>
                    <label htmlFor='email'>Email</label>
                    <input type='email' name='email' value={editForm.email} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Gender</label>
                    <div className="gender-options">
                        <label>
                            <input type="radio" name="gender" value="male" checked={editForm.gender === 'male'} onChange={handleChange} />Male
                        </label>
                        <label>
                            <input type="radio" name="gender" value="female" checked={editForm.gender === 'female'} onChange={handleChange} />Female
                        </label>
                        <label>
                            <input type="radio" name="gender" value="other" checked={editForm.gender === 'other'} onChange={handleChange} />Other    
                        </label>
                    </div>
                </div>

                <div className='form-group'>
                    <label htmlFor='birthdate'>Birthdate</label>
                    <input type='date' name='birthdate' value={editForm.birthdate} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="country">Country</label>
                    <select name="country" required value={editForm.country} onChange={handleChange}>
                        {countries.map(country => (
                            <option key={country.name.common} value={country.name.common}>{country.name.common}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Teaching</label>
                    <div className="languages">
                        {editForm.lang_teach.map(lang => (
                            <LanguageChip key={lang} code={lang} onDelete={() => handleDelete(lang, 'lang_teach')} />
                        ))}
                    </div>
                    <button className="add-button" type="button" onClick={() => handleAdd('lang_teach')} disabled={availableLanguages.length === 0}>
                        <i className="bi bi-plus-circle-fill"></i>Add
                    </button>
                </div>

                <div className="form-group">
                    <label>Learning</label>
                    <div className="languages">
                        {editForm.lang_learn.map(lang => (
                            <LanguageChip key={lang} code={lang} onDelete={() => handleDelete(lang, 'lang_learn')} />
                        ))}
                    </div>
                    <button className="add-button" type="button" onClick={() => handleAdd('lang_learn')} disabled={availableLanguages.length === 0}>
                        <i className="bi bi-plus-circle-fill"></i>Add
                    </button>
                </div>

                {isModalOpen && 
                    <LanguageSelectModal 
                        languages={availableLanguages} 
                        field={modalField}
                        onConfirm={handleConfirm}
                        onCancel={handleCancel}
                    />}

                <div className="form-group checkbox">
                    <label>
                        <input type="checkbox" name="professional" checked={editForm.professional} disabled={editForm.private} onChange={handleSwitch}/>Professional Profile
                    </label>
                </div>
                        
                <div className="form-group checkbox">
                    <label>
                        <input type="checkbox" name="private" checked={editForm.private} disabled={editForm.professional} onChange={handleSwitch}/>Private Profile
                    </label>
                </div>

                <div className='edit-profile-form-buttons'>
                    <button type='submit'>
                        <i className="bi bi-floppy2-fill"></i>Save
                    </button>
                    <button type='button' onClick={onClose}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default EditProfileForm;