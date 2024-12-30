import { Deck } from '../types'
import Language from './Language'
import Snippet from './Snippet'

interface Props {
    deck: Deck,
    isOwn: boolean
    handleDelete: (deckId: string) => void
    isEdited: boolean
    handleEdit: () => void
}

function DeckBox({ deck, isOwn, handleDelete, isEdited, handleEdit }: Props) {
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
                    <button className="btn btn-sm btn-primary mx-1">
                        <i className="bi bi-copy me-2"></i>Clone
                    </button>
                </div>}

                {isOwn &&
                <div className="d-flex justify-content-center mt-auto">
                    <button className="btn btn-sm btn-success mx-1" disabled={isEdited}>
                        <i className="bi bi-play-circle-fill me-2"></i>Play
                    </button>
                    <button className="btn btn-sm btn-secondary mx-1" onClick={handleEdit} disabled={isEdited}>
                        <i className="bi bi-pencil-square me-2"></i>Edit
                    </button>
                    <button className="btn btn-sm btn-danger mx-1" onClick={() => handleDelete(deck._id)} disabled={isEdited}>
                        <i className="bi bi-trash3-fill me-2"></i>Delete
                    </button>
                </div>}
            </div>
        </div>
    )
}


export default DeckBox