import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { AuthContext } from "./auth.context";
import { Chat, Message, User, Notification } from '../types';
import accountService from '../services/account.service';
import appService from '../services/app.service';
import { useNavigate } from 'react-router-dom';

const SocketContext = createContext<context>({} as context);

interface context {
    socket: Socket | null
    chats: Chat[]
    setChats: React.Dispatch<React.SetStateAction<Chat[]>>
    activeChat: Chat | null
    setActiveChat: React.Dispatch<React.SetStateAction<Chat | null>>
    notifications: Notification[]
    setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>
    handleMessage: (viewedUser: User) => void
}

function SocketProvider({ children }: PropsWithChildren) {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [chats, setChats] = useState<Chat[]>([]);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [activeChat, setActiveChat] = useState<Chat | null>(null);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    async function fetchChats() {
        try {
            const chats = await accountService.getChats()
            setChats(chats)
            setActiveChat(chats[0])
        } catch (error) {
            console.log(error)
        }
    }

    async function fetchNotifications() {
        try {
            const notifications = await appService.getNotifications()
            setNotifications(notifications)
        } catch (error) {
            console.log(error)
        }
    }

    async function handleMessage(viewedUser: User) {
        if (!user) return;
        if (!chats.some((chat) => chat.participants.includes(viewedUser) && chat.participants.includes(user))) {
            const newChat = await accountService.createChat({ targetUserId: viewedUser._id });
            setChats(prev => [...prev, newChat]);
            setActiveChat(newChat);
        }
        navigate('/account/inbox');
    }

    useEffect(() => {
        const newSocket = io(import.meta.env.VITE_SERVER_URL || 'http://localhost:3000', { transports: ['websocket'] });
        setSocket(newSocket);

        if (user) {
            newSocket.emit('online', user);
            fetchChats();
            fetchNotifications();
        }

        newSocket.on('newChat', (newChat: Chat) => { 
            setChats((prevChats) => 
                (prevChats.some((existingChat) => existingChat._id === newChat._id)) ? prevChats : [newChat, ...prevChats]
            );
            if (newChat.participants[0]._id === user?._id) {
                setActiveChat(newChat);
            } 
            newSocket.emit('addChat', newChat._id);
        });
        
        newSocket.on('newMessage', (newMsg: Message) => { 
            setChats((prevChats) => prevChats.map((chat) => {
                return chat._id === newMsg.chat ? { ...chat, messages: [...chat.messages, newMsg] } : chat;
            }));
            setActiveChat((prevChat) =>
                prevChat?._id === newMsg.chat ? { ...prevChat, messages: [...prevChat.messages, newMsg] } : prevChat
            );
        });

        newSocket.on('newNotification', (newNotif: Notification) => {
            setNotifications((prevNotifs) => [newNotif, ...prevNotifs]);
        });

        return () => {
            newSocket.off('newChat');
            newSocket.off('newMessage');
            newSocket.off('newNotification');
            newSocket.close();
        };
    }, [user]);

  return (
    <SocketContext.Provider value={{
        socket, chats, setChats, activeChat, setActiveChat, handleMessage, 
        notifications, setNotifications
    }}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketProvider, SocketContext };