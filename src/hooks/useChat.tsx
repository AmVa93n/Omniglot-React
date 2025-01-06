import { useContext } from 'react';
import { SocketContext } from '../context/socket.context';

function useChat() {
    const context = useContext(SocketContext);
    if (context === undefined) {
        throw new Error('useChat must be used within a SocketProvider');
    }
    return context;
}

export default useChat;