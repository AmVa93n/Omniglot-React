import { Deck } from "../../types";
import "./DeckView.css";
import LanguageChip from "../LanguageChip/LanguageChip";
import InfoChip from "../InfoChip/InfoChip";
import accountService from "../../services/account.service";
import { useContext } from "react";
import { AccountContext } from "../../context/account.context";
import FlashcardCard from "../Flashcard/Flashcard";

interface Props {
    deck: Deck;
}

function DeckView({ deck }: Props) {
    const { setDecks } = useContext(AccountContext);

    async function handleAdd() {
        const cardForm = { front: " ", back: " " };
        try {
            const newCard = await accountService.createFlashcard(deck._id, cardForm);
            setDecks(prev => prev.map(d => d._id === deck._id ? {...d, cards: [...d.cards, newCard]} : d));
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
                    <FlashcardCard key={card._id} flashcard={card} index={index + 1} />
                ))}
            </div>

            <button className="add-button" onClick={handleAdd}>
                <i className="bi bi-plus-circle-fill"></i>Add Card
            </button>
        </div>
    );
}

export default DeckView;