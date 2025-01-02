import { Deck, Card } from '../types';
import { useState } from 'react';
import accountService from '../services/account.service';
import Language from './Language';
import { Level } from './Snippet';
import '../styles/FlashcardGame.css';

interface Props {
    deck: Deck;
    setPlayedDeck: React.Dispatch<React.SetStateAction<Deck | null>>;
    setDecks: React.Dispatch<React.SetStateAction<Deck[]>>;
}

function FlashcardGame({ deck, setPlayedDeck, setDecks }: Props) {
    const [cards, setCards] = useState<Card[]>(deck.cards.filter(card => card.priority > -10))
    const [currentCardIndex, setCurrentCardIndex] = useState(0)
    const [sessionStats, setSessionStats] = useState({correct: 0, guess: 0, wrong: 0, skip: 0})
    const [isFlipped, setIsFlipped] = useState(false)
    const [isRevealed, setIsRevealed] = useState(false)
    const [transition, setTransition] = useState(false)
    const [sessionEnded, setSessionEnded] = useState(false)

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
        <div className="content-box" style={{width: '50%'}}>
            <h2 className="mb-3">Playing "{deck.topic}"</h2>
            <div className="row mb-5 mx-auto" style={{width: 'fit-content'}}>
                <span className="card-text col-auto"> 
                    <Language code={deck.language} />
                </span>
                <span className="card-text col-auto">
                    <Level level={deck.level} />
                </span>
                <span className="card-text col-auto"><i className="bi bi-aspect-ratio-fill me-2"></i>{deck.cards.length} Cards</span>
                <span className="card-text col-auto"><i className="bi bi-trophy-fill me-2"></i>{deck.mastered.length} Mastered</span>
            </div>

            <div className="flashcard-container mx-auto" style={{width: 'fit-content'}}>
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
                    <div className={`flashcard mx-auto mb-3 ${isFlipped ? 'flipped' : ''}`} onClick={flipCard}>
                        <div className="fc-front">
                            <h1 id="front" className="m-0">{cards[currentCardIndex]?.front}</h1>
                        </div>
                        <div className="fc-back">
                            <h1 id="back" className="m-0">{cards[currentCardIndex]?.back}</h1>
                        </div>
                    </div>

                    <div className="d-flex justify-content-center gap-1">
                        <button id="knew" className="btn btn-sm btn-success" onClick={() => registerAnswer("correct")} disabled={!isFlipped}>
                            <i className="bi bi-emoji-smile-fill me-2"></i>Knew it
                        </button>
                        <button id="guessed" className="btn btn-sm btn-warning" onClick={() => registerAnswer("guess")} disabled={!isFlipped}>
                            <i className="bi bi-emoji-neutral-fill me-2"></i>Guessed it
                        </button>
                        <button id="wrong" className="btn btn-sm btn-danger" onClick={() => registerAnswer("wrong")} disabled={!isFlipped}>
                            <i className="bi bi-emoji-frown-fill me-2"></i>Got it wrong
                        </button>
                        <button id="skip" className="btn btn-sm btn-secondary" onClick={skipCard} disabled={isFlipped || transition}>
                            Skip for now
                        </button>
                    </div>
                </>}
            </div>
        </div>
    )
}

export default FlashcardGame;