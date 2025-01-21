import { useNavigate } from 'react-router-dom'
import accountService from '../../../services/account.service'
import { Deck } from '../../../types'
import LanguageChip from '../LanguageChip/LanguageChip'
import InfoChip from '../InfoChip/InfoChip'
import './DeckCard.css'
import { useContext } from 'react'
import { AccountContext } from '../../../context/account.context'
import useNotifications from '../../../hooks/useNotifications'
import useAuth from '../../../hooks/useAuth'
import { toast } from 'react-toastify'

interface Props {
    deck: Deck,
    isOwn?: boolean
    handleView?: () => void
    handleEdit?: () => void
}

function DeckCard({ deck, isOwn, handleView, handleEdit }: Props) {
    const navigate = useNavigate()
    const { setDecks } = useContext(AccountContext)
    const { sendNotification } = useNotifications()
    const { user } = useAuth()

    async function handleClone() {
        try {
            await accountService.cloneDeck(deck._id)
            sendNotification(user!._id, deck.creator, 'clone')
            toast.success('Deck cloned successfully!')
            navigate('/account/decks')
        } catch (error) {
            toast.error('Failed to clone deck')
            console.error(error)
        }
    }

    async function handleDelete() {
        try {
            await accountService.deleteDeck(deck._id)
            setDecks(prev => prev.filter(d => d._id !== deck._id))
            toast.success('Deck deleted successfully!')
        } catch (error) {
            toast.error('Failed to delete deck')
            console.error(error)
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
                {isOwn && <InfoChip type='mastered' text={deck.cards.filter(card => card.priority === -10).length.toString()} />}
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
                <button className="edit-button" onClick={handleEdit}>
                    <i className="bi bi-pencil-square"></i>Edit
                </button>
                <button className="delete-button" onClick={handleDelete}>
                    <i className="bi bi-trash3-fill"></i>Delete
                </button>
                </>}
            </div>
        </div>
    )
}

export default DeckCard