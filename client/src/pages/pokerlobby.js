import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import io from 'socket.io-client';

import Chat from '../components/chat';
import Card from '../components/card';

// io establishes a connection between front and back end
const socket = io.connect("http://localhost:3001");

function PokerLobby(props) {
    const location = useLocation();
    const gameId = location.state.gameId.gameId;
    const username = location.state.username.username;

    // join socket room on load
    useEffect (() => {
		socket.emit("join_room", (gameId))
	}, []);

    return (
        <div>
            Lobby Name: {gameId} <br/>
            Username: {username}
            <Chat socket={socket} username={username} room={gameId}/>
            <iframe src="https://replit.com/@AndyYing/Texas-Holdem?lite=true&outputonly=true" width="900" height="600" frameborder="0" style={{ position: "absolute", left: 100, top: 100 }} />
        </div>
    );
}

export default PokerLobby