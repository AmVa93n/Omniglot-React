import { useNavigate } from 'react-router-dom'
import accountService from '../../services/account.service'
import { Deck } from '../../types'
import LanguageChip from '../LanguageChip/LanguageChip'
import InfoChip from '../InfoChip/InfoChip'
import './DeckCard.css'
import { useContext } from 'react'
import { AccountContext } from '../../context/account.context'

interface Props {
    deck: Deck,
    isOwn?: boolean
    handleView?: () => void
    handleEdit?: () => void
    handlePlay?: () => void
    disabled?: boolean
}

function DeckCard({ deck, isOwn, handleView, handleEdit, handlePlay, disabled }: Props) {
    const navigate = useNavigate()
    const { setDecks } = useContext(AccountContext)

    async function handleClone() {
        await accountService.cloneDeck(deck._id)
        navigate('/account/decks')
    }

    async function handleDelete() {
        try {
            await accountService.deleteDeck(deck._id)
            setDecks(prev => prev.filter(d => d._id !== deck._id))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="deck-card">
            <div className='deck-card-header'>
                <h5>{deck.topic}</h5>
            </div>

            <div className="deck-card-content">
                <LanguageChip code={deck.language} />
                <InfoChip type='level' text={deck.level} />
                <InfoChip type='cards' text={deck.cards.length.toString()} />
                {isOwn && <InfoChip type='mastered' text={deck.mastered?.length.toString()} />}
            </div>
                
            <div className="deck-card-buttons">
                <button className="view-button" onClick={handleView}>
                    <i className="bi bi-eye-fill"></i>View
                </button>

                {!isOwn &&
                <button className="clone-button" onClick={handleClone}>
                    <i className="bi bi-copy"></i>Clone
                </button>}

                {isOwn && <>
                <button className="play-button" onClick={handlePlay} disabled={disabled}>
                    <i className="bi bi-play-circle-fill"></i>Play
                </button>
                <button className="edit-button" onClick={handleEdit} disabled={disabled}>
                    <i className="bi bi-pencil-square"></i>Edit
                </button>
                <button className="delete-button" onClick={handleDelete} disabled={disabled}>
                    <i className="bi bi-trash3-fill"></i>Delete
                </button>
                </>}
            </div>
        </div>
    )
}

export default DeckCard