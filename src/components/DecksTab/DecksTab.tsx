import { useContext, useState } from "react";
import { Deck } from "../../types";
import DeckCard from "../DeckCard/DeckCard";
import CreateDeckModal from "../CreateDeckModal";
import EditDeckForm from "../EditDeckForm";
import FlashcardGame from "../FlashcardGame";
import DeckView from "../DeckView/DeckView";
import { AccountContext } from "../../context/account.context";
import "./DecksTab.css";

function DecksTab() {
    const { decks, setDecks } = useContext(AccountContext)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [viewedDeck, setViewedDeck] = useState<Deck | null>(null)
    const [editedDeck, setEditedDeck] = useState<Deck | null>(null)
    const [playedDeck, setPlayedDeck] = useState<Deck | null>(null)

    return (
        <div className="decks-tab">
            { viewedDeck ? <DeckView deck={viewedDeck} />
            //: playedDeck ? <FlashcardGame deck={playedDeck} setPlayedDeck={setPlayedDeck} setDecks={setDecks} />
            : editedDeck ? <EditDeckForm deck={editedDeck} setEditedDeck={setEditedDeck} setDecks={setDecks} />
            : <>
                <div className="decks-container">
                    {decks.map(deck => (
                        <DeckCard 
                            key={deck._id} 
                            deck={deck} 
                            isOwn={true}
                            handleView={() => setViewedDeck(deck)}
                            handleEdit={() => setEditedDeck(deck)}
                            handlePlay={() => setPlayedDeck(deck)}
                            disabled={playedDeck !== null || editedDeck !== null}
                        />
                    ))}
                </div>
                <button className="create-button" onClick={() => setIsModalOpen(true)}>
                    <i className="bi bi-folder-plus"></i>Create Deck
                </button>
            </>}

            {isModalOpen && <CreateDeckModal onClose={() => setIsModalOpen(false)} />}
        </div>
    );
}

export default DecksTab;