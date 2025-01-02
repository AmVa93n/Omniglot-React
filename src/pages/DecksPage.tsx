import { useState, useEffect } from "react";
import { Deck } from "../types";
import DeckCard from "../components/DeckCard";
import accountService from "../services/account.service";
import NewDeckForm from "../components/NewDeckForm";
import EditDeckForm from "../components/EditDeckForm";
import FlashcardGame from "../components/FlashcardGame";

function DecksPage() {
    const [decks, setDecks] = useState<Deck[]>([]);
    const [isCreating, setIsCreating] = useState(false)
    const [editedDeck, setEditedDeck] = useState<Deck | null>(null)
    const [playedDeck, setPlayedDeck] = useState<Deck | null>(null)

    useEffect(()=> {
        async function fetchDecks() {
            try {
                const decks = await accountService.getDecks()
                setDecks(decks)
            } catch (error) {
                console.log(error)
            }
        }

        fetchDecks()
    }, [])

    async function handleDelete(deckId: string) {
        try {
            await accountService.deleteDeck(deckId)
            setDecks(decks.filter(deck => deck._id !== deckId))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <h3 className="center my-3">My Decks</h3>
            <div className="d-flex justify-content-center flex-wrap px-auto" style={{width: '100%'}}>
                {decks.map(deck => (
                    <DeckCard 
                        key={deck._id} 
                        deck={deck} 
                        isOwn={true} 
                        handleDelete={() => handleDelete(deck._id)} 
                        handleEdit={() => setEditedDeck(deck)}
                        handlePlay={() => setPlayedDeck(deck)}
                        disabled={playedDeck !== null || editedDeck !== null}
                    />
                ))}
            </div>

            <div className="d-flex justify-content-center mt-3">
                {playedDeck ?
                    <FlashcardGame deck={playedDeck} setPlayedDeck={setPlayedDeck} setDecks={setDecks} />
                : editedDeck ? 
                    <EditDeckForm deck={editedDeck} setEditedDeck={setEditedDeck} setDecks={setDecks} />
                : isCreating ? 
                    <NewDeckForm setDecks={setDecks} setIsCreating={setIsCreating} />
                :
                    <button className="btn btn-primary mx-auto" onClick={() => setIsCreating(true)}>
                        <i className="bi bi-folder-plus me-2"></i>Create Deck
                    </button>}
            </div>
        </>
    );
}

export default DecksPage;