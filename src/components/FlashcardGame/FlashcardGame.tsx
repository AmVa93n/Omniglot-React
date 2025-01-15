import { Deck, Flashcard } from '../../types';
import { useState, useContext } from 'react';
import accountService from '../../services/account.service';
import './FlashcardGame.css';
import { AccountContext } from '../../context/account.context';
import LanguageChip from '../LanguageChip/LanguageChip';
import InfoChip from '../InfoChip/InfoChip';

interface Props {
    deck: Deck;
    setPlayedDeck: React.Dispatch<React.SetStateAction<Deck | null>>;
}

function FlashcardGame({ deck, setPlayedDeck }: Props) {
    const [cards, setCards] = useState<Flashcard[]>(deck.cards.filter(card => card.priority > -10))
    const [currentCardIndex, setCurrentCardIndex] = useState(0)
    const [sessionStats, setSessionStats] = useState({correct: 0, guess: 0, wrong: 0, skip: 0})
    const [isFlipped, setIsFlipped] = useState(false)
    const [isRevealed, setIsRevealed] = useState(false)
    const [transition, setTransition] = useState(false)
    const [sessionEnded, setSessionEnded] = useState(false)
    const { setDecks } = useContext(AccountContext)

    function flipCard() { 
        if (isRevealed) return
        setIsFlipped(!isFlipped)
        setIsRevealed(true)
    }

    function registerAnswer(status: 'correct' | 'guess' | 'wrong') {
        const change = status === "correct" ? -1 : status === "guess" ? 0 : 1
        setCards(prev => 
            prev.map((card, index) => index === currentCardIndex ? {...card, priority: card.priority + change} : card)
        );
        setSessionStats({...sessionStats, [status]: sessionStats[status] + 1})
        nextCard()
    }

    function nextCard() {
        setIsFlipped(false)
        setIsRevealed(false)
        setTransition(true)
        setTimeout(() => {
            if (currentCardIndex + 1 === cards.length) {
                setIsFlipped(false)
                setSessionEnded(true)
                return
            }
            setCurrentCardIndex(currentCardIndex + 1)
            setTransition(false)
        }, 400); // Half of the flip duration to avoid showing the back side
    }

    function skipCard() {
        setSessionStats({...sessionStats, skip: sessionStats.skip + 1})
        if (currentCardIndex + 1 === cards.length) {
            setIsFlipped(false)
            setSessionEnded(true)
            return
        }
        setCurrentCardIndex(currentCardIndex + 1)
    }

    async function saveProgress() {
        try {
            const updatedCards = await accountService.updateCards(deck._id, cards)
            setDecks(prev => prev.map(d => d._id === deck._id ? {...d, card: updatedCards} : d))
            setPlayedDeck(null)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flashcard-game">
            <h2>Playing "{deck.topic}"</h2>
            <div className="deck-info">
                <LanguageChip code={deck.language} />
                <InfoChip type='level' text={deck.level} />
                <InfoChip type="cards" text={deck.cards.length.toString()} />
                <InfoChip type="mastered" text={deck.cards.filter(card => card.priority === -10).length.toString()} />
            </div>

            <div className="flashcard-container">
                <p id="tracker" className="fw-bold center">
                    {sessionEnded ? 'Deck finished' : `Card ${currentCardIndex + 1} of ${cards.length}`}
                </p>
                
                {sessionEnded &&
                <div id="summary">
                    <p>Correct: <span className="fw-bold" style={{color: 'green'}}>{sessionStats['correct']}</span></p>
                    <p>Guessed: <span className="fw-bold" style={{color: 'gold'}}>{sessionStats['guess']}</span></p>
                    <p>Wrong: <span className="fw-bold" style={{color: 'red'}}>{sessionStats['wrong']}</span></p>
                    <p>Skipped: <span className="fw-bold" style={{color: 'gray'}}>{sessionStats['skip']}</span></p>

                    <div className="d-flex justify-content-center">
                        <button className="btn btn-primary rounded-pill" onClick={saveProgress}>
                            <i className="bi bi-floppy2-fill me-2"></i>Save Progress
                        </button>
                    </div>
                </div>}
                
                {!sessionEnded &&
                <>
                    <div className={`flashcard ${isFlipped ? 'flipped' : ''}`} onClick={flipCard}>
                        <div className="fc-front">
                            <h1>{cards[currentCardIndex]?.front}</h1>
                        </div>
                        <div className="fc-back">
                            <h1>{cards[currentCardIndex]?.back}</h1>
                        </div>
                    </div>

                    <div className="game-buttons">
                        <button className="correct-button" onClick={() => registerAnswer("correct")} disabled={!isFlipped}>
                            <i className="bi bi-emoji-smile-fill"></i>Knew it
                        </button>
                        <button className="guess-button" onClick={() => registerAnswer("guess")} disabled={!isFlipped}>
                            <i className="bi bi-emoji-neutral-fill"></i>Guessed it
                        </button>
                        <button className="wrong-button" onClick={() => registerAnswer("wrong")} disabled={!isFlipped}>
                            <i className="bi bi-emoji-frown-fill"></i>Got it wrong
                        </button>
                        <button className="skip-button" onClick={skipCard} disabled={isFlipped || transition}>
                            Skip for now
                        </button>
                    </div>
                </>}
            </div>
        </div>
    )
}

export default FlashcardGame;