import { useState, useContext } from 'react';
import { Deck } from '../../types';
import accountService from '../../services/account.service';
import useLanguages from '../../hooks/useLanguages';
import { AccountContext } from '../../context/account.context';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';

interface Props {
    onClose: () => void;
}

function CreateDeckModal({ onClose }: Props) {
    const { setDecks } = useContext(AccountContext)
    const { profile } = useAuth()
    const [deckForm, setDeckForm] = useState<Omit<Deck, "_id" | "creator">>({
        topic: '',
        language: profile!.lang_teach[0],
        level: 'beginner',
        cards: []
    })
    const { getLanguageName } = useLanguages()

    function handleChange(event: React.ChangeEvent) {
        const { name, value } = event.target as HTMLInputElement
        setDeckForm(prev => {
            return {...prev, [name]: value}
        })
    }

    async function handleSubmit() {
        try {
            const createdDeck = await accountService.createDeck(deckForm)
            createdDeck.cards = []
            setDecks(prev => [...prev, createdDeck])
            toast.success('Deck created successfully!')
            onClose()
        } catch (error) {
            toast.error('Failed to create deck')
            console.error(error)
        }
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Create a new deck</h2>
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
                    <button onClick={handleSubmit} disabled={!deckForm.topic}>Submit</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    )

}

export default CreateDeckModal;