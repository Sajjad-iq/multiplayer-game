import { useContext, useEffect } from "react"
import { GlobalContext } from "../context"


export function SocketIoActions() {

    const { socket, setGameState } = useContext(GlobalContext)
    // Send player actions or movements to the server
    const move = (coordinates: any) => {
        socket.emit('move', coordinates);
    };

    // Send player actions or movements to the server
    const startAttack = (coordinates: any) => {
        socket.emit('attack', coordinates);
    };

    useEffect(() => {

        if (!socket) return;

        socket.on('playerJoined', (playerName: any) => {
            // Handle a new player joining the game
        });
        socket.on('playerLeft', (playerId: any) => {
            // Handle a player leaving the game
            // ...
        });

        // Handle server events
        socket.on('gameState', (gameState: any) => {
            setGameState(gameState);
        });
    }, [])



    return { move, startAttack }
}
