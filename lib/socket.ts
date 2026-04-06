// lib/socket.ts
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const getSocket = (userId?: number): Socket => {
    if (!socket) {
        socket = io(process.env.NEXT_PUBLIC_WS_URL!, {
            withCredentials: true,
            autoConnect: false,
            query: { userId },
        });
    }
    return socket;
};

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};