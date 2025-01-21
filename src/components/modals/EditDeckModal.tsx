import { useState, useContext } from 'react';
import { Deck } from '../../types';
import accountService from '../../services/account.service';
import useLanguages from '../../hooks/useLanguages';
import { AccountContext } from '../../context/account.context';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';

interface Props {
    deck: Deck;
    onClose: () => void;
}

function EditDeckModal({ deck, onClose }: Props) {
    const { setDecks } = useContext(AccountContext)
    const { profile } = useAuth()
    const [deckForm, setDeckForm] = useState<Deck>(deck)
    const { getLanguageName } = useLanguages()

    function handleChange(event: React.ChangeEvent) {
        const { name, value } = event.target as HTMLInputElement
        setDeckForm(prev => {
            return {...prev, [name]: value}
        })
    }

    async function handleSave() {
        try {
            const updatedDeck = await accountService.updateDeck(deck._id, deckForm)
            setDecks(prev => prev.map(deck => deck._id === updatedDeck._id ? updatedDeck : deck))
            toast.success('Deck updated successfully!')
            onClose()
        } catch (error) {
            toast.error('Failed to update deck')
            console.error(error)
        }
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Edit your deck</h2>
                </div>

                <div className="modal-body">
                    <div className="form-group">
                        <label htmlFor="topic">Topic</label>
                        <input type="text" name="topic" id="topic" placeholder="Choose a topic for your deck" value={deckForm.topic} onChange={handleChange}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="language">Language</label>
                        <select id="language" name="language" value={deckForm.language} onChange={handleChange}>
                            {profile?.lang_teach.map(lang => (
                                <option key={lang} value={lang}>{getLanguageName(lang)}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="level">Level</label>
                        <select id="level" name="level" value={deckForm.level} onChange={handleChange}>
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                        </select>
                    </div>
                </div>

                <div className="modal-buttons">
                    <button onClick={handleSave} disabled={!deckForm.topic}>
                        <i className="bi bi-floppy2-fill"></i>Save Changes
                    </button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default EditDeckModal;