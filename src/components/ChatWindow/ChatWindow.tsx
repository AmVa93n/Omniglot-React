import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Chat } from '../../types';
import './ChatWindow.css'
import appService from "../../services/app.service";
import useChat from '../../hooks/useChat';
import useFormat from '../../hooks/useFormat';
import useAuth from '../../hooks/useAuth';
import data, { Skin } from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

interface Props {
    chat: Chat | null
}

function ChatWindow({ chat }: Props) {
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [messageText, setMessageText] = useState('');
    const { setChats, chats, socket } = useChat()
    const { getMsgTime } = useFormat()
    const { user } = useAuth()
    const otherParty = chat?.participants.find(u => u._id !== user?._id)

    async function handleDelete() {
        if (!chat) return
        try {
            await appService.deleteMessages(chat?._id)
            setChats(chats.filter(c => c._id !== chat?._id))
        } catch (error) {
            console.log(error)
        }
    }

    function handleSend() {
        if (!messageText.trim()) return;
        const message = {
            sender: user?._id,
            recipient: otherParty?._id,
            message: messageText,
            chat: chat?._id
        }
        socket?.emit('message', message)
        setMessageText('');
        setShowEmojiPicker(false);
    }

    // Scroll chat to the bottom whenever a new message is added
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chat?.messages]);

    return(
        <div className="chat-window">
            <div className="chat-header">
                <h2>{chat ? `Chat with ${otherParty?.username}` : 'You have no chats'}</h2>
                <div className="chat-header-buttons">
                    <Link to={`/users/${otherParty?._id}`}>
                        <button className="profile-button">
                            <i className="bi bi-person-circle"></i>Profile
                        </button>
                    </Link>
                    <button className="delete-button" onClick={handleDelete} disabled={!chat}>
                        <i className="bi bi-trash3-fill"></i>Delete
                    </button>
                </div>
            </div>
            
            <div className="chat-messages" ref={chatContainerRef}>
                {chat?.messages?.map(msg => (
                    <div 
                        key={msg._id}
                        className={`message ${msg.sender === user?._id ? 'by-user': 'to-user'}`} 
                    >
                        <div className="message-text">
                            <span>{msg.message}</span>
                        </div>
                        <span className="timestamp">{getMsgTime(msg.timestamp)}</span>
                    </div>
                ))}
            </div>

            <div className="chat-input">
                <input type="text" placeholder="Type a message..." value={messageText} onChange={(e) => setMessageText(e.target.value)} />
                <button className='emoji-button' onClick={() => setShowEmojiPicker(!showEmojiPicker)}>😊</button>
                <button className="send-button" onClick={handleSend}>
                    <i className="bi bi-send-fill me-2"></i>Send
                </button>
                {showEmojiPicker && (
                    <div className='emoji-picker'>
                        <Picker 
                            data={data} 
                            onEmojiSelect={(emoji: Skin) => setMessageText(messageText + emoji.native)} 
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default ChatWindow