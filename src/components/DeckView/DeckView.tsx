import "./DeckView.css";
import LanguageChip from "../reusable/LanguageChip/LanguageChip";
import InfoChip from "../reusable/InfoChip/InfoChip";
import accountService from "../../services/account.service";
import { useContext, useState } from "react";
import { AccountContext } from "../../context/account.context";
import FlashcardCard from "../reusable/Flashcard/Flashcard";
import FlashcardGame from "../FlashcardGame/FlashcardGame";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

function DeckView() {
    const { decks, setDecks } = useContext(AccountContext);
    const [isPlaying, setIsPlaying] = useState(false)
    const { deckId } = useParams()
    const deck = decks.find(deck => deck._id === deckId)!

    async function handleAdd() {
        const cardForm = { front: " ", back: " " };
        try {
            const newCard = await accountService.createFlashcard(deck._id, cardForm);
            setDecks(prev => prev.map(d => d._id === deck._id ? {...d, cards: [...d.cards, newCard]} : d));
            toast.success('Card added successfully!');
        } catch (error) {
            toast.error('Failed to add card');
            console.error(error);
        }
    }

    return (
        <div className="deck-view">
            <div className="deck-header">
                <i className="bi bi-stack"></i>
                <h1>{deck.topic}</h1>

                <button className={`play-button ${isPlaying ? 'stop' : ''}`} onClick={() => setIsPlaying(!isPlaying)}>
                    <i className={`bi bi-${!isPlaying ? 'play' : 'stop'}-circle-fill`}></i>
                    {!isPlaying ? 'Play' : 'Stop'}
                </button>
            </div>

            <div className="deck-info">
                <LanguageChip code={deck.language} />
                <InfoChip type="level" text={deck.level} />
                <InfoChip type="cards" text={deck.cards.length.toString()} />
                <InfoChip type="mastered" text={deck.cards.filter(card => card.priority === -10).length.toString()} />
            </div>
            
            {!isPlaying ? <>
                <div className="flashcards">
                    {deck.cards.map((card, index) => (
                        <FlashcardCard key={card._id} flashcard={card} index={index + 1} />
                    ))}
                </div>

                <button className="add-button" onClick={handleAdd}>
                    <i className="bi bi-plus-circle-fill"></i>Add Card
                </button>
            </>
            : <FlashcardGame deck={deck} onClose={() => setIsPlaying(false)} />}
        </div>
    );
}

export default DeckView;