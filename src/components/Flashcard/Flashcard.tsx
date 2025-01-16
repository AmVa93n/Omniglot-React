import { Flashcard } from "../../types";
import './Flashcard.css'
import { useContext, useState } from "react";
import { AccountContext } from "../../context/account.context";
import accountService from "../../services/account.service";

interface Props {
    flashcard: Flashcard;
    index: number;
}

function FlashcardCard({ flashcard, index }: Props) {
    const { setDecks } = useContext(AccountContext);
    const [isEdited, setIsEdited] = useState(false);
    const [cardForm, setCardForm] = useState(flashcard);

    function handleChange(event: React.ChangeEvent) {
        const { name, value } = event.target as HTMLInputElement;
        setCardForm(prev => ({ ...prev, [name]: value }));
    }

    async function handleSave() {
        try {
            const updatedCard = await accountService.updateFlashcard(flashcard._id, cardForm);
            setDecks(prev => prev.map(d => d._id === flashcard.deck ? {...d, cards: d.cards.map(c => c._id === flashcard._id ? updatedCard : c)} : d));
            setIsEdited(false);
        } catch (error) {
            alert(error);
        }
    }

    function handleCancel() {
        setCardForm(flashcard);
        setIsEdited(false);
    }

    async function handleDelete() {
        try {
            await accountService.deleteFlashcard(flashcard._id);
            setDecks(prev => prev.map(d => d._id === flashcard.deck ? {...d, cards: d.cards.filter(c => c._id !== flashcard._id)} : d));
        } catch (error) {
            alert(error);
        }
    }

    return (
        <div className={`flashcard ${isEdited ? "edited" : ""}`}>
            <div className={`flashcard-decorator ${isEdited ? "edited" : ""}`}>
                <span className="hash">#</span>
                <span>{index}</span>
            </div>

            <div className="flashcard-main">
                <div className="flashcard-content">
                    <div className="flashcard-front">
                        {!isEdited ? <span className="flashcard-text">{flashcard.front}</span> :
                            <input name="front" value={cardForm.front} onChange={handleChange} />
                        }
                        <span className="flashcard-tag">Front</span>
                    </div>
                    <div className="flashcard-back">
                        {!isEdited ? <span className="flashcard-text">{flashcard.back}</span> :
                            <input name="back" value={cardForm.back} onChange={handleChange} />
                        }
                        <span className="flashcard-tag">Back</span>
                    </div>
                </div>
                <div className="flashcard-mastery">
                    <i className="bi bi-trophy-fill"></i>
                    <span>Mastery</span>
                    <div className="progress-bar-container">
                        <div className="progress-bar" style={{ width: `${flashcard.priority < 0 ? flashcard.priority * -10 : 1}%` }}></div>
                    </div>
                </div>
            </div>

            <div className="flashcard-buttons">
                {isEdited ? <>
                    <button className="edit-button" onClick={handleSave}>
                        <i className="bi bi-floppy2-fill"></i>Save
                    </button>
                    <button className="edit-button" onClick={handleCancel}>
                        <i className="bi bi-x-circle-fill"></i>Cancel
                    </button>
                </> :
                <>
                    <button className="edit-button" onClick={() => setIsEdited(true)}>
                        <i className="bi bi-pencil-square"></i>Edit
                    </button>
                    <button className="delete-button" onClick={handleDelete}>
                        <i className="bi bi-trash3-fill"></i>Delete
                    </button>
                </>}
            </div>
        </div>
    )
}

export default FlashcardCard;