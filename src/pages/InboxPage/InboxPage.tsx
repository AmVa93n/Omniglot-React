import { Chat } from "../../types";
import "./InboxPage.css";
import Avatar from "../../components/reusable/Avatar";
import useChat from "../../hooks/useChat";
import useAuth from "../../hooks/useAuth";
import useFormat from "../../hooks/useFormat";
import ChatWindow from "../../components/ChatWindow/ChatWindow";

function InboxPage() {
    const { chats, activeChat, setActiveChat } = useChat()
    const { user } = useAuth()
    const { getMsgTime } = useFormat()

    function getOtherParty(chat: Chat | null) {
        return chat?.participants.find(party => party._id != user?._id);
    }

    function getLastMessage(chat: Chat | null) {
        return chat?.messages[chat.messages?.length - 1]
    }

    function sortChats(a: Chat, b: Chat) {
        const a_timestamp = a.messages.length > 0 ? new Date(a.messages[a.messages.length - 1].timestamp).getTime() : 0;
        const b_timestamp = b.messages.length > 0 ? new Date(b.messages[b.messages.length - 1].timestamp).getTime() : 0;
        return b_timestamp - a_timestamp;
    }

    return (
        <div className="inbox-page">

            <div className="chat-list-window">
                <div className="chat-list-header">
                    <h2>Your Chats</h2>
                </div>
                <div className="chat-list">
                    {chats?.sort(sortChats).map(chat => (
                        <div 
                            key={chat._id}
                            className={`chat ${activeChat?._id === chat._id ? 'active' : ''}`} 
                            id={chat._id}
                            onClick={() => setActiveChat(chat)}
                        >
                            <Avatar src={getOtherParty(chat)?.profilePic || ''} size={50} />
                            <div className="chat-info">
                                <span className="chat-name">{getOtherParty(chat)?.username}</span>
                                {getLastMessage(chat) && 
                                    <span className="last-message">
                                        <span className="sender">{getLastMessage(chat)?.sender === user?._id ? 'You' : getOtherParty(chat)?.username}:</span>
                                        <span className='text'>{getLastMessage(chat)?.message}</span>
                                        <span className='timestamp'>{getMsgTime(getLastMessage(chat)?.timestamp || '')}</span>
                                    </span>
                                }
                                {getOtherParty(chat)?.professional && 
                                <span className="prof-badge">
                                    <i className="bi bi-award-fill"></i>Professional
                                </span>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <ChatWindow chat={activeChat} />
        </div>
    );
}

export default InboxPage;