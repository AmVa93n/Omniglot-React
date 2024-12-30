import { useEffect, useState } from 'react';
import { offerForm, Offer } from '../types';
import { timeslots, getLanguageName } from '../utils';
import accountService from '../services/account.service';

interface Props {
    offer: Offer
    setEditedOffer: React.Dispatch<React.SetStateAction<Offer | null>>
    setOffers: React.Dispatch<React.SetStateAction<Offer[]>>
}

function EditOfferForm({ offer, setEditedOffer, setOffers }: Props) {
    const [languages, setLanguages] = useState<string[]>([])
    const [offerForm, setOfferForm] = useState<offerForm>(offer)

    useEffect(() => {
        async function fetchUser() {
            try {
              const profileData = await accountService.getProfile()
              setLanguages(profileData.lang_teach)
            } catch (error) {
              console.error('Error fetching data in component:', error);
            }
        }
        fetchUser()
    }, [])

    function handleChange(event: React.ChangeEvent) {
        const { name, value } = event.target as HTMLInputElement
        setOfferForm(prev => {
            return {...prev, [name]: value}
        })
    }

    async function handleSave(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        try {
            const updatedOffer = await accountService.updateOffer(offer._id, formData)
            setOffers(prev => prev.map(offer => offer._id === updatedOffer._id ? updatedOffer : offer))
        } catch (error) {
            alert(error)
        }
    }

    return (
        <div className="content-box" style={{minWidth: '25%'}}>
            <h2 className="center mb-3">Edit your offer</h2>
            <form onSubmit={handleSave} method="POST">

                <div className="form-floating mb-3">
                    <input type="text" name="name" id="name" placeholder="Choose a name for your offer" className="form-control" value={offerForm.name} onChange={handleChange}/>
                    <label htmlFor="name">Name</label>
                </div>

                <div className="form-floating mb-3">
                    <select className="form-select" id="language" name="language" value={offerForm.language} onChange={handleChange}>
                        {languages.map(lang => (
                            <option key={lang} value={lang}>{getLanguageName(lang)}</option>
                        ))}
                    </select>
                    <label htmlFor="language">Language</label>
                </div>

                <div className="form-floating mb-3">
                    <select className="form-select" id="level" name="level" value={offerForm.level} onChange={handleChange}>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                    </select>
                    <label htmlFor="level">Level</label>
                </div>

                <fieldset className="row mb-3">
                    <legend className="col-form-label col-sm-3 pt-0">Type</legend>
                    <div className="col-sm-9">
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="locationType" id="online" value="online" checked={offerForm.locationType === 'online'} onChange={handleChange}/>
                            <label className="form-check-label" htmlFor="online">Online</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="locationType" id="at-student" value="at-student" checked={offerForm.locationType === 'at-student'} onChange={handleChange}/>
                            <label className="form-check-label" htmlFor="at-student">In-person (at the student)</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="locationType" id="at-teacher" value="at-teacher" checked={offerForm.locationType === 'at-teacher'} onChange={handleChange}/>
                            <label className="form-check-label" htmlFor="at-teacher">In-person (at the teacher)</label>
                        </div>
                    </div>
                </fieldset>

                <div className="form-floating mb-3">
                    <input type="address" name="location" id="location" placeholder="" className="form-control" disabled={offerForm.locationType !== 'at-teacher'} value={offerForm.location} onChange={handleChange}/>
                    <label htmlFor="location">Location</label>
                </div>

                <fieldset className="row mb-3">
                    <legend className="col-form-label col-sm-3 pt-0">Type</legend>
                    <div className="col-sm-9">
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="classType" id="private" value="private" checked={offerForm.classType === 'private'} onChange={handleChange}/>
                            <label className="form-check-label" htmlFor="private">Private</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="classType" id="group" value="group" checked={offerForm.classType === 'group'} onChange={handleChange}/>
                            <label className="form-check-label" htmlFor="group">Group</label>
                        </div>
                    </div>
                </fieldset>

                {offerForm.classType === 'group' &&
                <div className="input-group mb-3" id="maxGroupSize">
                    <span className="input-group-text" id="addon-wrapping">Max. Group Size</span>
                    <input id="mgs-input" type="number" className="form-control" min="2" max="15" placeholder="2" name="maxGroupSize" value={offerForm.maxGroupSize} onChange={handleChange}/>
                </div>}

                <div className="row mb-3">
                    <label className="col-3 pt-0" htmlFor="weekdays">Weekdays</label>
                    <div className="col-9">
                        <select className="form-select" id="weekdays" name="weekdays" size={7} multiple value={offerForm.weekdays} onChange={handleChange}> 
                            <option value="Monday">Monday</option>
                            <option value="Tuesday">Tuesday</option>
                            <option value="Wednesday">Wednesday</option>
                            <option value="Thursday">Thursday</option>
                            <option value="Friday">Friday</option>
                            <option value="Saturday">Saturday</option>
                            <option value="Sunday">Sunday</option>
                        </select>
                    </div>
                </div>

                <div className="row mb-3">
                    <label className="col-3 pt-0" htmlFor="timeslots">Timeslots</label>
                    <div className="col-9">
                        <select className="form-select" id="timeslots" name="timeslots" size={10} style={{overflowY: 'scroll'}} multiple value={offerForm.timeslots} onChange={handleChange}> 
                            {timeslots.map(slot => (
                                <option key={slot} value={slot}>{slot}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="mb-3">
                    <div className="input-group" id="duration">
                        <span className="input-group-text" id="addon-wrapping">Duration</span>
                        <input type="number" className="form-control" min="60" max="180" placeholder="60" name="duration" value={offerForm.duration} onChange={handleChange}/>
                    </div>
                    <small className="ms-1 mt-1">* Class duration in minutes</small>
                </div>

                <div className="mb-3">
                    <div className="input-group">
                        <span className="input-group-text">Price</span>
                        <input type="number" className="form-control" min="10" max="100" placeholder="10"  name="price" value={offerForm.price} onChange={handleChange}/>
                        <span className="input-group-text">$</span>
                    </div>
                    <small className="ms-1 mt-1">* Price is calculated per class per student</small>
                </div>

                <div className="d-flex justify-content-center gap-2">
                    <button type="submit" className="btn btn-primary rounded-pill"><i className="bi bi-floppy2-fill me-2"></i>Save Changes</button>
                    <button type='button' className="btn btn-secondary rounded-pill" onClick={() => setEditedOffer(null)}>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default EditOfferForm;