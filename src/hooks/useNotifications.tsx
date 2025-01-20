import { useContext } from 'react';
import { SocketContext } from '../context/socket.context';

function useNotifications() {
    const { socket } = useContext(SocketContext);

    function sendNotification(source: string, target: string, type: string) {
        if (socket) {
            const notification = {
                source,
                target,
                type
            }
            socket.emit('notification', notification)
        }
    }

    return { sendNotification }
}

export default useNotifications;