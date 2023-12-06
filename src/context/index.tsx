import { createContext, ReactNode, useEffect, useState } from 'react'
import { io } from "socket.io-client";

type ProviderChildrenType = {
    children: ReactNode
}

export const GlobalContext = createContext<any>([])

const GlobalContextProvider = ({ children }: ProviderChildrenType) => {

    const [socket, setSocket] = useState<any>(null);
    const [gameState, setGameState] = useState(null);
    const [PlayerName, setPlayerName] = useState<string | null>(null)

    const data = { socket, gameState, setGameState, PlayerName, setPlayerName }

    useEffect(() => {
        // Connect to the Socket.io server
        const socket = io(import.meta.env.VITE_BACKEND_URL);
        setSocket(socket);
        // Clean up on component unmount
        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <GlobalContext.Provider value={data}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalContextProvider