import { Deck } from '../types'
import Language from './Language'
import Snippet from './Snippet'

function DeckBox({ deck }: {deck: Deck}) {
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
            </div>
    
            <div className="d-flex justify-content-center mt-auto">
                <a href="/account/decks/{{deck._id}}/clone" className="btn btn-sm btn-primary mx-1"><i className="bi bi-copy me-2"></i>Clone</a>
            </div>
            </div>
        </div>
    )
}


export default DeckBox