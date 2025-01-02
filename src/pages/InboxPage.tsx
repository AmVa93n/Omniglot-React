import { useState, useEffect, useContext } from "react";
import accountService from "../services/account.service";
import { Chat } from "../types";
import { AuthContext } from "../context/auth.context";
import { getMsgTime } from "../utils";
import { Link } from "react-router-dom";
import "../styles/InboxPage.css";
import UserAvatar from "../components/UserAvatar";

function InboxPage() {
    const [chats, setChats] = useState<Chat[]>([]);
    const [activeChat, setActiveChat] = useState<Chat | null>(null);
    const { user } = useContext(AuthContext)

    useEffect(()=> {
        async function fetchChats() {
            try {
                const chats = await accountService.getChats()
                setChats(chats)
                setActiveChat(chats[0])
            } catch (error) {
                console.log(error)
            }
        }

        fetchChats()
    }, [])

    function getOtherParty(chat: Chat | null) {
        return chat?.participants.find(party => party._id != user?._id);
    }

    async function handleDelete() {
        if (!activeChat) return
        try {
            await accountService.deleteMessages(activeChat?._id)
            setChats(chats.filter(chat => chat._id !== activeChat?._id))
        } catch (error) {
            console.log(error)
        }
    }

    function handleSend() {
    }

    return (
        <div className="row" style={{width: '100%', height: '625px'}}>

            <div className="col-2" style={{borderRight: '1px solid rgb(199, 199, 199)', maxHeight: '625px'}}>
                <div className="p-3 fs-3">Inbox

                </div>
                <div className="row-auto" id="conversation-list" style={{height: '550px', overflowY: 'auto'}}>
                    {chats.map(chat => (
                        <div 
                            key={chat._id}
                            className={`chatbox ${activeChat?._id === chat._id ? 'chatbox-active' : ''}`} 
                            id={chat._id}
                            onClick={() => setActiveChat(chat)}
                        >
                            <div className="d-flex align-items-center position-relative">
                                <UserAvatar src={getOtherParty(chat)?.profilePic || ''} size={50} />
                                <span className="fs-5">{getOtherParty(chat)?.username}</span>
                                {getOtherParty(chat)?.professional && <span className="badge rounded-pill text-bg-primary position-absolute" style={{top: -8, right: -8}}>Professional</span>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="col-7 g-0 d-flex flex-column" style={{maxHeight: '625px', borderRight: '1px solid rgb(199, 199, 199)'}}>
                <div className="p-3 d-flex" style={{flex: '0 0 auto', borderBottom: '1px solid rgb(199, 199, 199)'}}>
                    <span id="conversation-with" className="fs-3" >{activeChat ? `Chat with ${getOtherParty(activeChat)?.username}` : 'You have no chats'}</span>
                    <div className="ms-auto">
                        <Link id="profile" to={`/users/${getOtherParty(activeChat)?._id}`} className="btn btn-primary me-1" style={{height: 'fit-content'}}><i className="bi bi-person-circle me-2"></i>Profile</Link>
                        <button id="delete" className="btn btn-danger" style={{height: 'fit-content'}} onClick={handleDelete} disabled={!activeChat}>
                            <i className="bi bi-trash3-fill me-2"></i>Delete
                        </button>
                    </div>
                </div>
                
                <div className="p-3 d-flex flex-column" id="message-list" style={{flex: '1 1 auto', overflowY: 'auto', backgroundColor: 'white'}}>
                    {activeChat?.messages.map(msg => (
                        <div 
                            key={msg._id}
                            className={`d-flex align-items-center ${msg.sender === user?._id && 'flex-row-reverse'}`} 
                            style={{width: 'fit-content', alignSelf: msg.sender === user?._id ? 'flex-end' : 'flex-start'}}
                        >
                            <div 
                                className={`rounded-pill p-2 mb-1 ${msg.sender === user?._id && 'bg-primary'}`}
                                style={{
                                    backgroundColor: msg.sender !== user?._id ? 'rgb(200, 200, 200)' : 'auto', 
                                    color: msg.sender === user?._id ? 'white' : 'auto'
                                }}
                            >
                                <span>{msg.message}</span>
                            </div>
                            <span className="timestamp">{getMsgTime(msg.timestamp)}</span>
                        </div>
                    ))}
                </div>

                <div className="p-3" style={{flex: '0 0 auto',  borderTop: '1px solid rgb(199, 199, 199)'}}>
                    <div className="d-flex align-items-center">
                        <input id="input" autoComplete="off" placeholder="Message" className="form-control rounded-pill me-2" />
                        <button className="btn btn-primary d-flex align-items-center" onClick={handleSend}>
                            <i className="bi bi-send-fill me-2"></i>Send
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default InboxPage;