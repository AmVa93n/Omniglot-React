import { useContext, useState } from "react";
import { Deck } from "../../types";
import DeckCard from "../DeckCard/DeckCard";
import CreateDeckModal from "../CreateDeckModal";
import EditDeckModal from "../EditDeckModal";
import FlashcardGame from "../FlashcardGame/FlashcardGame";
import DeckView from "../DeckView/DeckView";
import { AccountContext } from "../../context/account.context";
import "./DecksTab.css";

function DecksTab() {
    const { decks } = useContext(AccountContext)
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [viewedDeckId, setViewedDeckId] = useState<string>('')
    const [editedDeck, setEditedDeck] = useState<Deck | null>(null)
    const [playedDeck, setPlayedDeck] = useState<Deck | null>(null)

    return (
        <div className="decks-tab">
            { viewedDeckId ? <DeckView deck={decks.find(deck => deck._id === viewedDeckId)!} />
            : playedDeck ? <FlashcardGame deck={playedDeck} setPlayedDeck={setPlayedDeck} />
            : <>
                <div className="decks-container">
                    {decks.map(deck => (
                        <DeckCard 
                            key={deck._id} 
                            deck={deck} 
                            isOwn={true}
                            handleView={() => setViewedDeckId(deck._id)}
                            handleEdit={() => {setEditedDeck(deck); setIsEditModalOpen(true)}}
                            handlePlay={() => setPlayedDeck(deck)}
                        />
                    ))}
                </div>
                <button className="create-button" onClick={() => setIsCreateModalOpen(true)}>
                    <i className="bi bi-folder-plus"></i>Create Deck
                </button>
            </>}

            {isCreateModalOpen && <CreateDeckModal onClose={() => setIsCreateModalOpen(false)} />}
            {(isEditModalOpen && editedDeck) && <EditDeckModal deck={editedDeck} onClose={() => setIsEditModalOpen(false)} />}
        </div>
    );
}

export default DecksTab;