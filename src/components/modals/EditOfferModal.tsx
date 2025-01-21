import { useContext, useState } from 'react';
import { Offer } from '../../types';
import accountService from '../../services/account.service';
import useLanguages from '../../hooks/useLanguages';
import useDate from '../../hooks/useDate';
import { AccountContext } from '../../context/account.context';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';

interface Props {
    offer: Offer
    onClose: () => void
}

function EditOfferModal({ offer, onClose }: Props) {
    const { setOffers } = useContext(AccountContext)
    const { profile } = useAuth()
    const [offerForm, setOfferForm] = useState<Offer>(offer)
    const { getLanguageName } = useLanguages()
    const { timeslots, weekdays } = useDate()

    function handleChange(event: React.ChangeEvent) {
        const { name, value } = event.target as HTMLInputElement
        setOfferForm(prev => {
            return {...prev, [name]: value}
        })
    }

    function handleMultiSelect(event: React.ChangeEvent) {
        const { name, selectedOptions } = event.target as HTMLSelectElement
        const values = Array.from(selectedOptions).map(option => option.value)
        setOfferForm(prev => {
            return {...prev, [name]: values}
        })
    }

    async function handleSave() {
        try {
            const updatedOffer = await accountService.updateOffer(offer._id, offerForm)
            setOffers(prev => prev.map(offer => offer._id === updatedOffer._id ? updatedOffer : offer))
            toast.success('Offer updated successfully!')
            onClose()
        } catch (error) {
            toast.error('Failed to update offer')
            console.error(error)
        }
    }

    return (
        <div className="modal">
            <div className='modal-content'>
                <div className="modal-header">
                    <h2>Edit your offer</h2>
                </div>
            
                <div className='modal-body'>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" placeholder="Choose a name for your offer" value={offerForm.name} onChange={handleChange}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="language">Language</label>
                        <select id="language" name="language" value={offerForm.language} onChange={handleChange}>
                            {profile?.lang_teach.map(lang => (
                                <option key={lang} value={lang}>{getLanguageName(lang)}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="level">Level</label>
                        <select id="level" name="level" value={offerForm.level} onChange={handleChange}>
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Type</label>
                        <div>
                            <input type="radio" name="locationType" id="online" value="online" checked={offerForm.locationType === 'online'} onChange={handleChange}/>
                            <label htmlFor="online">Online</label>
                        </div>
                        <div>
                            <input type="radio" name="locationType" id="at-student" value="at-student" checked={offerForm.locationType === 'at-student'} onChange={handleChange}/>
                            <label htmlFor="at-student">In-person (at the student)</label>
                        </div>
                        <div>
                            <input type="radio" name="locationType" id="at-teacher" value="at-teacher" checked={offerForm.locationType === 'at-teacher'} onChange={handleChange}/>
                            <label htmlFor="at-teacher">In-person (at the teacher)</label>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="location">Location</label>
                        <input type="address" name="location" id="location" value={offerForm.location} onChange={handleChange} disabled={offerForm.locationType !== 'at-teacher'}/>
                    </div>

                    <div className="form-group">
                        <label>Type</label>
                        <div>
                            <input type="radio" name="classType" id="private" value="private" checked={offerForm.classType === 'private'} onChange={handleChange}/>
                            <label htmlFor="private">Private</label>
                        </div>
                        <div>
                            <input type="radio" name="classType" id="group" value="group" checked={offerForm.classType === 'group'} onChange={handleChange}/>
                            <label htmlFor="group">Group</label>
                        </div>
                    </div>

                    {offerForm.classType === 'group' &&
                    <div className="form-group">
                        <label htmlFor='maxGroupSize'>Max. Group Size</label>
                        <input type="number" id="maxGroupSize" name="maxGroupSize" min="2" max="15" placeholder="2" value={offerForm.maxGroupSize} onChange={handleChange}/>
                    </div>}

                    <div className="form-group">
                        <label htmlFor="weekdays">Weekdays</label>
                        <select id="weekdays" name="weekdays" size={7} multiple value={offerForm.weekdays} onChange={handleMultiSelect}> 
                            {weekdays.map(day => (
                                <option key={day} value={day}>{day}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="timeslots">Timeslots</label>
                        <select id="timeslots" name="timeslots" size={10} multiple value={offerForm.timeslots} onChange={handleMultiSelect}> 
                            {timeslots.map(slot => (
                                <option key={slot} value={slot}>{slot}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor='duration'>Duration</label>
                        <input type="number" id="duration" name="duration" min="60" max="180" placeholder="60" value={offerForm.duration} onChange={handleChange}/>
                        <small className="ms-1 mt-1">* Class duration in minutes</small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="price">Price</label>
                        <input type="number" id="price" name="price" min="10" max="100" placeholder="10"   value={offerForm.price} onChange={handleChange}/>
                        <small className="ms-1 mt-1">* Price is calculated per class per student</small>
                    </div>
                </div>

                <div className="modal-buttons">
                    <button onClick={handleSave}><i className="bi bi-floppy2-fill"></i>Save Changes</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            
            </div>
        </div>
    )
}

export default EditOfferModal;