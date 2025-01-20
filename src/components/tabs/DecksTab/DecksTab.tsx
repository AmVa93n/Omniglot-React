import { useContext, useState } from "react";
import { Deck } from "../../../types";
import DeckCard from "../../reusable/DeckCard/DeckCard";
import CreateDeckModal from "../../modals/CreateDeckModal";
import EditDeckModal from "../../modals/EditDeckModal";
import DeckView from "../../DeckView/DeckView";
import { AccountContext } from "../../../context/account.context";
import "./DecksTab.css";
import { Routes, Route, useNavigate, Outlet } from "react-router-dom";

function DecksTab() {
    const { decks } = useContext(AccountContext)
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [editedDeck, setEditedDeck] = useState<Deck | null>(null)
    const navigate = useNavigate()

    return (
        <div className="decks-tab">
            <Routes>
                <Route path="/" element={
                    <>
                        <div className="decks-container">
                            {decks.map(deck => (
                                <DeckCard 
                                    key={deck._id} 
                                    deck={deck} 
                                    isOwn={true}
                                    handleView={() => navigate(`/account/decks/${deck._id}`)}
                                    handleEdit={() => {setEditedDeck(deck); setIsEditModalOpen(true)}}
                                />
                            ))}
                        </div>
                        <button className="create-button" onClick={() => setIsCreateModalOpen(true)}>
                            <i className="bi bi-folder-plus"></i>Create Deck
                        </button>

                        {isCreateModalOpen && <CreateDeckModal onClose={() => setIsCreateModalOpen(false)} />}
                        {(isEditModalOpen && editedDeck) && <EditDeckModal deck={editedDeck} onClose={() => setIsEditModalOpen(false)} />}
                    </>
                } />
                <Route path=":deckId" element={<DeckView />} />
            </Routes>
            <Outlet />
        </div>
    );
}

export default DecksTab;