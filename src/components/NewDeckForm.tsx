import { useEffect, useState } from 'react';
import { deckForm, Deck } from '../types';
import accountService from '../services/account.service';
import useLanguages from '../hooks/useLanguages';

interface Props {
    setDecks: React.Dispatch<React.SetStateAction<Deck[]>>
    setIsCreating: React.Dispatch<React.SetStateAction<boolean>>
}

function NewDeckForm({ setDecks, setIsCreating }: Props) {
    const [languages, setLanguages] = useState<string[]>([])
    const [deckForm, setDeckForm] = useState<deckForm>({
        topic: '',
        language: '',
        level: '',
        cards: Array(10).fill({front: '', back: ''})
    })
    const { getLanguageName } = useLanguages()

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
        setDeckForm(prev => {
            return {...prev, [name]: value}
        })
    }

    function handleCardChange(event: React.ChangeEvent) {
        const { name, value } = event.target as HTMLInputElement
        const cardIndex = parseInt(name.match(/\d+/)![0])
        const cardSide = name.includes('front') ? 'front' : 'back'
        setDeckForm(prev => {
            const newCards = prev.cards.map((card, index) => {
                return index === cardIndex ? {...card, [cardSide]: value} : card
            })
            return {...prev, cards: newCards}
        })
    }

    function addCard() {
        setDeckForm(prev => {
            return {...prev, cards: [...prev.cards, {front: '', back: '', priority: 0}]}
        }
    )}

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        try {
            const createdOffer = await accountService.createDeck(formData)
            setDecks(prev => [...prev, createdOffer])
        } catch (error) {
            alert(error)
        }
    }

    return (
        <div className="content-box" style={{minWidth: '25%'}}>
            <h2 className="mb-3">Create a deck</h2>
            <form onSubmit={handleSubmit} method="POST">

                <div className="form-floating mb-3 mx-auto" style={{width: '50%'}}>
                    <input type="text" name="topic" id="topic" placeholder="Choose a topic for your deck" className="form-control" value={deckForm.topic} onChange={handleChange}/>
                    <label htmlFor="topic">Topic</label>
                </div>

                <div className="form-floating mb-3 mx-auto" style={{width: '50%'}}>
                    <select className="form-select" id="language" name="language" value={deckForm.language} onChange={handleChange}>
                        {languages.map(lang => (
                            <option key={lang} value={lang}>{getLanguageName(lang)}</option>
                        ))}
                    </select>
                    <label htmlFor="language">Language</label>
                </div>

                <div className="form-floating mb-4 mx-auto" style={{width: '50%'}}>
                    <select className="form-select" id="level" name="level" value={deckForm.level} onChange={handleChange}>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                    </select>
                    <label htmlFor="level">Level</label>
                </div>

                <div id="cards">
                    {deckForm.cards.map((card, index) => (
                        <div key={index} className="row mb-3 align-items-center">
                            <span className="col-2" style={{width: '85px'}}>Card #{index+1}</span>
                            <div className="input-group col">
                                <span className="input-group-text" id="addon-wrapping">Front</span>
                                <input type="text" className="form-control" name={`card${index}-front`} value={card.front} onChange={handleCardChange}/>
                            </div>
                            <div className="input-group col">
                                <span className="input-group-text" id="addon-wrapping">Back</span>
                                <input type="text" className="form-control" name={`card${index}-back`} value={card.back} onChange={handleCardChange}/>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="d-flex justify-content-center mb-5">
                    <button type="button" className="btn btn-sm btn-primary rounded-pill" onClick={addCard}>
                        <i className="bi bi-plus-circle-fill me-2"></i>Add Card
                    </button>
                </div>

                <div className="d-flex justify-content-center gap-2">
                    <button type="submit" className="btn btn-primary rounded-pill">Submit</button>
                    <button type='button' className="btn btn-secondary rounded-pill" onClick={() => setIsCreating(false)}>Cancel</button>
                </div>
            </form>
        </div>
    )

}

export default NewDeckForm;