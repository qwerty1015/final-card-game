import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Draggable from 'react-draggable';

const socket = io.connect('http://localhost:3000');

function CardBoard({socket, playerId, lobbyId}) {
    const [positions, setPositions] = useState({});
    const [players, setPlayers] = useState([]);

  useEffect(() => {
    // Join the lobby on mount
    socket.emit("join-lobby", lobbyId);

    // Listen for updates to the initial positions
    socket.on("initial-positions", (positions) => {
        setPositions(positions);
    });

    // Listen for other players joining the lobby
    socket.on("player-joined", (playerId) => {
        setPlayers((prevPlayers) => [...prevPlayers, playerId]);
    });

    // Listen for other players leaving the lobby
    socket.on("player-left", (playerId) => {
        setPlayers((prevPlayers) => prevPlayers.filter((p) => p !== playerId));
        setPositions((prevPositions) => {
            const { [playerId]: removed, ...rest } = prevPositions;
            return rest;
        });
    });

  }, [])

    const handleDrag = (event, { x, y }) => {
        socket.emit("position-update", { lobbyId, position: { x, y } });
    };

    return (
        <div>
            <h1>Lobby: {lobbyId}</h1>
            <div style={{ display: "flex" }}>
                {players.map((playerId) => (
                    <div key={playerId} style={{ marginRight: "10px" }}>
                        <Draggable
                            position={positions[playerId]}
                            onDrag={handleDrag}
                            bounds="parent"
                            >
                            <div
                                style={{
                                    width: "100px",
                                    height: "100px",
                                    backgroundColor: "red",
                                }}
                                >
                                {playerId}
                            </div>
                        </Draggable>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CardBoard;