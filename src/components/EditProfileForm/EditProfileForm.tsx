import './EditProfileForm.css'
import { useState, useRef } from 'react'
import { User } from '../../types'
import accountService from '../../services/account.service'
import useCountries from '../../hooks/useCountries'
import useLanguages from '../../hooks/useLanguages'
import useLanguageSelect from '../../hooks/useLanguageSelect'
import LanguageChip from '../reusable/LanguageChip/LanguageChip'
import LanguageSelectModal from '../modals/LanguageSelectModal/LanguageSelectModal'
import useAuth from '../../hooks/useAuth'
import Avatar from '../reusable/Avatar'
import { toast } from 'react-toastify'

interface Props {
    profile: User,
    onClose: () => void
}

function EditProfileForm({ profile, onClose }: Props) {
    const [editForm, setEditForm] = useState<User>(profile)
    const countries = useCountries()
    const { languagesList } = useLanguages()
    const { isModalOpen, modalField, handleAdd, handleDelete, handleConfirm, handleCancel } = useLanguageSelect(setEditForm)
    const availableLanguages = languagesList.filter(lang => !editForm.lang_teach.includes(lang) && !editForm.lang_learn.includes(lang))
    const { setProfile } = useAuth()
    const [pfpPreview, setPfpPreview] = useState<string | ArrayBuffer | null>(profile.profilePic);
    const fileInputRef = useRef<HTMLInputElement>(null)

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

    function handleFilePreview(event: React.ChangeEvent<HTMLInputElement>) {
        const reader = new FileReader();
        reader.onload = function(){
          setPfpPreview(reader.result)
        }
        const file = event.target.files?.[0]
        if (file) reader.readAsDataURL(file);
    }

    async function handleSave(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget);
        editForm.lang_teach.forEach((lang) => formData.append('lang_teach[]', lang));
        editForm.lang_learn.forEach((lang) => formData.append('lang_learn[]', lang));
        toast.info('Saving changes...');
        try {
            const updatedProfile = await accountService.updateProfile(formData);
            setProfile(updatedProfile);
            toast.dismiss();
            toast.success('Profile updated successfully!');
            onClose();
        } catch (error) {
            toast.dismiss();
            toast.error('Failed to update profile');
            console.error(error);
        }
    }

    return (
        <div className='edit-profile-form'>
            <form onSubmit={handleSave}>
                <div className="user-avatar-container">
                    <Avatar src={pfpPreview as string} size={200} />
                    <button type="button" className="edit-profilePic-button" onClick={() => fileInputRef.current?.click()}>
                        <i className="bi bi-pencil-square"></i>
                    </button>
                    <input type="file" name="profilePic" ref={fileInputRef} onChange={handleFilePreview} hidden />
                </div>

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