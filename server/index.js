// add dependencies
const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors"); // good for cors issues/errors with socket.io
const { Server } = require("socket.io");
app.use(cors());

// generates the server
const server = http.createServer(app);

const lobbies = new Map();

// connects socket.io server
const io = new Server(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET, POST"] // accepts get and post requests
	}
});

// room stuff
io.on("connection", (socket) => {
	console.log(`User Connected: ${socket.id}`);

	//listens for joining room
	socket.on("join_room", (lobbyId) => {
		// Create the lobby if it doesn't exist
		if (!lobbies.has(lobbyId)) {
			positions = new Map();
			positions.set("Two_of_Clubs", [25,25])
			positions.set("Two_of_Hearts", [25,25])
			positions.set("Two_of_Spades", [25,25])
			positions.set("Two_of_Diamonds", [25,25])

			lobbies.set(lobbyId, { players: [], positions: positions });
		}

		// Add the player to the lobby
		lobbies.get(lobbyId).players.push(socket.id);

		// Notify all players in the lobby that a new player joined
		io.to(lobbyId).emit("player-joined", socket.id);

		// Send the initial positions to the newly joined player
		socket.emit("initial-positions", lobbies.get(lobbyId).positions);

		socket.join(lobbyId);
		console.log(`User with ID: ${socket.id} joined room: ${lobbyId}`)
	});

	// Update the position of a draggable component
	socket.on("position-update", (data) => {
		console.log("dfdfd")
		// Store the new position for the card
		lobbies.get(data.lobbyId).positions.set(data.name, [data.x, data.y]);
	
		// Notify all players in the lobby of the updated position
		io.to(data.lobbyId).emit("set-new-location", data);
	});

	
	// Leave the lobby
	socket.on("leave-lobby", (lobbyId) => {
		// Remove the player from the lobby
		const lobby = lobbies.get(lobbyId);
		lobby.players = lobby.players.filter((player) => player !== socket.id);
	
		// Delete the lobby if there are no players left
		if (lobby.players.length === 0) {
		  lobbies.delete(lobbyId);
		} 
		else {
		  // Notify all players in the lobby that a player left
		  io.to(lobbyId).emit("player-left", socket.id);
		}
	});

	// listens for sending message, emits message data to a specific room
	socket.on("send_message", (data) => {
		console.log(data)
		socket.to(data.room).emit("receive_message", data);
	});

	// test ping
	socket.on("ping", (data) => {
		console.log(data)
	});

	// listens for disconnection
	socket.on("disconnect", () => {
		console.log("User Disconnected: ", socket.id);
	})
});


// runs express server on port 3001 (react on 3000)
server.listen(3001, () => {
	console.log("SERVER RUNNING");
});