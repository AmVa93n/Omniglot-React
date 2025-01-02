import { useNavigate } from 'react-router-dom'
import accountService from '../services/account.service'
import { Deck } from '../types'
import Language from './Language'
import Snippet from './Snippet'
import '../styles/DeckCard.css'

interface Props {
    deck: Deck,
    isOwn?: boolean
    handleDelete?: () => void
    handleEdit?: () => void
    handlePlay?: () => void
    disabled?: boolean
}

function DeckCard({ deck, isOwn, handleDelete, handleEdit, handlePlay, disabled }: Props) {
    const navigate = useNavigate()

    async function handleClone() {
        await accountService.cloneDeck(deck._id)
        navigate('/account/decks')
    }

    return (
        <div className="card offer-card text-left mx-3 mb-4" style={{width: '270px'}}>
            <h5 className="card-header center">{deck.topic}</h5>
            <div className="card-body">
    
                <div className="row mb-2">
                    <span className="card-text col">
                        <Language code={deck.language} />
                    </span>
                    <span className="card-text col addedIconWrapper">
                        <Snippet data={deck.level} />
                    </span>
                </div>
        
                <div className="row mb-3">
                    <span className="card-text col">
                        <i className="bi bi-aspect-ratio-fill me-2"></i>{deck.cards.length} Cards
                    </span>
                    {isOwn &&
                    <span className="card-text col">
                        <i className="bi bi-trophy-fill me-2"></i>{deck.mastered?.length || 0} Mastered
                    </span>
                    }
                </div>
        
                {!isOwn &&
                <div className="d-flex justify-content-center mt-auto">
                    <button className="btn btn-sm btn-primary mx-1" onClick={handleClone}>
                        <i className="bi bi-copy me-2"></i>Clone
                    </button>
                </div>}

                {isOwn &&
                <div className="d-flex justify-content-center mt-auto">
                    <button className="btn btn-sm btn-success mx-1" onClick={handlePlay} disabled={disabled}>
                        <i className="bi bi-play-circle-fill me-2"></i>Play
                    </button>
                    <button className="btn btn-sm btn-secondary mx-1" onClick={handleEdit} disabled={disabled}>
                        <i className="bi bi-pencil-square me-2"></i>Edit
                    </button>
                    <button className="btn btn-sm btn-danger mx-1" onClick={handleDelete} disabled={disabled}>
                        <i className="bi bi-trash3-fill me-2"></i>Delete
                    </button>
                </div>}
            </div>
        </div>
    )
}


export default DeckCard