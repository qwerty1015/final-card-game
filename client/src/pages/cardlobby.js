import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import io from 'socket.io-client';

import Chat from '../components/chat';
import Card from '../components/card';
import CardBoard from '../components/cardboard';

// io establishes a connection between front and back end
const socket = io.connect("http://localhost:3001");

function CardLobby(props) {
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
            <Card cardName = "2_of_Spades" lobbyId = {gameId} />
            <Card cardName = "2_of_Clubs" lobbyId = {gameId} />
            <Card cardName = "2_of_Diamonds" lobbyId = {gameId} />
            <Card cardName = "2_of_Hearts" lobbyId = {gameId} />
            <Card cardName = "3_of_Clubs" lobbyId = {gameId} />
        </div>
    );
}

export default CardLobby