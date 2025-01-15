import { Deck } from "../../types";
import "./DeckView.css";
import LanguageChip from "../LanguageChip/LanguageChip";
import InfoChip from "../InfoChip/InfoChip";
import accountService from "../../services/account.service";
import { useContext } from "react";
import { AccountContext } from "../../context/account.context";

interface Props {
    deck: Deck;
}

function DeckView({ deck }: Props) {
    const { setDecks } = useContext(AccountContext);

    function handleEdit(cardId: string) {
        console.log(cardId);
    }

    async function handleDelete(cardId: string) {
        try {
            await accountService.deleteFlashcard(cardId)
            setDecks(prev => prev.map(d => d._id === deck._id ? {...d, cards: d.cards.filter(c => c._id !== cardId)} : d));
        } catch (error) {
            alert(error);
        }
    }

    return (
        <div className="deck-view">
            <div className="deck-header">
                <i className="bi bi-stack"></i>
                <h1>{deck.topic}</h1>
            </div>

            <div className="deck-info">
                <LanguageChip code={deck.language} />
                <InfoChip type="level" text={deck.level} />
                <InfoChip type="cards" text={deck.cards.length.toString()} />
                <InfoChip type="mastered" text={deck.cards.filter(card => card.priority === -10).length.toString()} />
            </div>
            
            <div className="flashcards">
                {deck.cards.map((card, index) => (
                    <div key={card._id} className="flashcard">
                        <div className="flashcard-decorator">
                            <span className="hash">#</span>
                            <span>{index + 1}</span>
                        </div>

                        <div className="flashcard-main">
                            <div className="flashcard-content">
                                <div className="flashcard-front">
                                    <span className="flashcard-text">{card.front}</span>
                                    <span className="flashcard-tag">Front</span>
                                </div>
                                <div className="flashcard-back">
                                    <span className="flashcard-text">{card.back}</span>
                                    <span className="flashcard-tag">Back</span>
                                </div>
                            </div>
                            <div className="flashcard-mastery">
                                <i className="bi bi-trophy-fill"></i>
                                <span>Mastery</span>
                                <div className="progress-bar-container">
                                    <div className="progress-bar" style={{ width: `${card.priority < 0 ? card.priority * -10 : 1}%` }}></div>
                                </div>
                            </div>
                        </div>

                        <div className="flashcard-buttons">
                            <button className="edit-button" onClick={() => handleEdit(card._id)}>
                                <i className="bi bi-pencil-square"></i>Edit
                            </button>
                            <button className="delete-button" onClick={() => handleDelete(card._id)}>
                                <i className="bi bi-trash3-fill"></i>Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <button className="add-button">
                <i className="bi bi-plus-circle-fill"></i>Add Card
            </button>
        </div>
    );
}

export default DeckView;