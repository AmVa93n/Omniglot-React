import './EditProfileForm.css'
import { useState } from 'react'
import { editProfileForm, User } from '../../types'
import accountService from '../../services/account.service'

interface Props {
    profile: User,
    onCancel: () => void
}

function EditProfileForm({ profile, onCancel }: Props) {
    const [editForm, setEditForm] = useState<editProfileForm>(profile)

    function handleChange(event: React.ChangeEvent) {
        const { name, value } = event.target as HTMLInputElement
        setEditForm(prev => {
            return {...prev, [name]: value}
        })
    }

    async function handleSave(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget);
        editForm.lang_teach.forEach((lang) => formData.append('lang_teach[]', lang));
        editForm.lang_learn.forEach((lang) => formData.append('lang_learn[]', lang));
        try {
            const updatedProfile = await accountService.updateProfile(formData);
            setProfile(updatedProfile)
        } catch (error) {
            alert(error)
        }
    }

    return (
        <div className='edit-profile-form'>
            <form onSubmit={handleSave}>
                <div className='form-group'>
                    <label htmlFor='username'>Username</label>
                    <input type='text' id='username' name='username' value={editForm.username} onChange={handleChange} />
                </div>

                <div className='form-group'>
                    <label htmlFor='email'>Email</label>
                    <input type='email' id='email' name='email' value={editForm.email} onChange={handleChange} />
                </div>

                <div className='form-group'>
                    <label htmlFor='birthdate'>Birthdate</label>
                    <input type='date' id='birthdate' name='birthdate' value={editForm.birthdate} onChange={handleChange} />
                </div>

                <button type='submit'>
                    <i className="bi bi-floppy2-fill"></i>Save
                </button>
                <button type='button' onClick={onCancel}>Cancel</button>
            </form>
        </div>
    );
}

export default EditProfileForm;