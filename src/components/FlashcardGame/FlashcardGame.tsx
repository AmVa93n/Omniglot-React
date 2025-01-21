import { Deck, Flashcard } from '../../types';
import { useState, useContext } from 'react';
import accountService from '../../services/account.service';
import './FlashcardGame.css';
import { AccountContext } from '../../context/account.context';
import { toast } from 'react-toastify';

interface Props {
    deck: Deck;
    onClose: () => void;
}

function FlashcardGame({ deck, onClose }: Props) {
    const [cards, setCards] = useState<Flashcard[]>(deck.cards.filter(card => card.priority > -10))
    const [currentCardIndex, setCurrentCardIndex] = useState(0)
    const isGameOver = currentCardIndex >= cards.length
    const [gameStats, setGameStats] = useState({correct: 0, guess: 0, wrong: 0, skip: 0})
    const [isFlipped, setIsFlipped] = useState(false)
    const [transition, setTransition] = useState(false)
    const { setDecks } = useContext(AccountContext)

    function handleAnswer(status: 'correct' | 'guess' | 'wrong') {
        const change = status === "correct" ? -1 : status === "guess" ? 0 : 1
        const updatedPriority = cards[currentCardIndex].priority + change
        if (updatedPriority >= -10 || updatedPriority <= 0) { // If not out of bounds
            setCards(prev => 
                prev.map((card, index) => index === currentCardIndex ? {...card, priority: updatedPriority} : card)
            );
        }
        setGameStats({...gameStats, [status]: gameStats[status] + 1})
        if (currentCardIndex + 1 !== cards.length) { // If not the last card
            setIsFlipped(false)
            setTransition(true)
            setTimeout(() => {
                setCurrentCardIndex(currentCardIndex + 1)
                setTransition(false)
            }, 400); // Half of the flip duration to avoid showing the back side
        } else { // If the last card
            setCurrentCardIndex(currentCardIndex + 1)
        }
    }

    function handleSkip() {
        setGameStats({...gameStats, skip: gameStats.skip + 1})
        setCurrentCardIndex(currentCardIndex + 1)
    }

    async function handleSave() {
        try {
            const updatedCards = await accountService.updateCards(deck._id, cards)
            setDecks(prev => prev.map(d => d._id === deck._id ? {...d, cards: updatedCards} : d))
            toast.success('Progress saved!')
            onClose()
        } catch (error) {
            toast.error('Failed to save progress')
            console.error(error)
        }
    }

    return (
        <div className="flashcard-game">
            <div className="game-screen">
                <span className="game-progress">
                    {isGameOver ? 'Game Over' : `Card ${currentCardIndex + 1} of ${cards.length}`}
                </span>

                <div className="flashcard-container">
                    <div 
                        className={`flashcard ${isFlipped ? 'flipped' : ''}`}
                        onClick={() => !isFlipped && setIsFlipped(true)}
                    >
                        <div className="flashcard-front">
                            <h1>{cards[currentCardIndex]?.front}</h1>
                        </div>
                        <div className="flashcard-back">
                            <h1>{cards[currentCardIndex]?.back}</h1>
                        </div>
                    </div>
                </div>

                <div className="game-buttons">
                    <button className="correct-button" onClick={() => handleAnswer("correct")} disabled={!isFlipped || isGameOver}>
                        <i className="bi bi-emoji-smile-fill"></i>Knew it
                    </button>
                    <button className="guess-button" onClick={() => handleAnswer("guess")} disabled={!isFlipped || isGameOver}>
                        <i className="bi bi-emoji-neutral-fill"></i>Guessed it
                    </button>
                    <button className="wrong-button" onClick={() => handleAnswer("wrong")} disabled={!isFlipped || isGameOver}>
                        <i className="bi bi-emoji-frown-fill"></i>Got it wrong
                    </button>
                    <button className="skip-button" onClick={handleSkip} disabled={isFlipped || transition || isGameOver}>
                        <i className="bi bi-arrow-right-circle-fill"></i>Skip
                    </button>
                </div>
            </div>
            
            <div className="game-summary">
                <h3>Game Summary</h3>
                <div className='breakdown'>
                    <div className='row' style={{backgroundColor: 'lightgreen'}}>
                        <span>Correct </span>
                        <span>{gameStats['correct']}</span>
                    </div>
                    <div className='row' style={{backgroundColor: 'rgb(255, 255, 0, 0.5)'}}>
                        <span>Guessed </span>
                        <span>{gameStats['guess']}</span>
                    </div>
                    <div className='row' style={{backgroundColor: 'lightcoral'}}>
                        <span>Wrong </span>
                        <span>{gameStats['wrong']}</span>
                    </div>
                    <div className='row'>
                        <span>Skipped </span>
                        <span>{gameStats['skip']}</span>
                    </div>
                    <div className='row'>
                        <span>Remaining </span>
                        <span>{cards.length - currentCardIndex}</span>
                    </div>
                </div>

                <button className="save-button" onClick={handleSave} disabled={!isGameOver}>
                    <i className="bi bi-floppy2-fill"></i>Save Progress
                </button>
            </div>
        </div>
    )
}

export default FlashcardGame;