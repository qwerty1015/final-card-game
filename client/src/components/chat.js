import { useEffect, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import '../styles/chat.css'

// accepts props to pass in data from the socket connection and names
function Chat({socket, username, room}) {
	// keep track of value of input/message
	const [currentMessage, setCurrentMessage] = useState("");
	// keep track of list of messages sent
	const [messageList, setMessageList] = useState([]);
	
	// don't send empty messages, then transmit message data to other dude
	const sendMessage = async () => {
		var m = new Date();
		var dateString = m.getUTCHours() + ":" + ("0" + m.getUTCMinutes()).slice(-2) + ":" + ("0" + m.getUTCSeconds()).slice(-2);
		if (currentMessage !== "") {
			const messageData = {
				room: room,
				author: username,
				message: currentMessage,
				time: dateString
			};
			await socket.emit("send_message", messageData);
			setMessageList((list) => [...list, messageData]); // so we can see our own messages
			setCurrentMessage("");
		}
	};

	// listen for other chat messages (w/ their data), this is called when there's a change in socket server 
	// once message received, append new message data to the list of messages
	useEffect (() => {
		socket.on("receive_message", (data) => {
			socket.emit("ping", "ping");
			setMessageList((list) => [...list, data]);
		})

		return () => socket.removeListener('receive_message');
	}, [socket]);


	// return the different parts of the chat, button sends the message
	// body: return content for each parts of message and metadata in the message list
	// value of current message is stored so input can be cleared upon message send
	// ScrollToBottom is a react import that scrolls the chatbar
	// id comparison in chat-body to format chats based on who sent the message
	return (
		<div className="chat-window">
			<div className="chat-header">
				<p>{room}: Lobby Chat</p>
			</div>

			<div className="chat-body">
				<ScrollToBottom className="message-container">

				{messageList.map((messageContent) => {
					return (
						<div className="message" id={username === messageContent.author ? "you" : "other"}>
							<div className="message-content">
								<p>{messageContent.message}</p>
							</div>
							<div className="message-meta">
								<p id="time">{messageContent.time}</p>
								<p id="author">{messageContent.author}</p>
							</div>
						</div>
					);
				})}
				</ScrollToBottom>
			</div>

			<div className="chat-footer">
				<input
					type="text"
					value={currentMessage}
					placeholder="Enter your message..."
					onChange={(event) => {
						setCurrentMessage(event.target.value);
					}}
					onKeyPress={(event) => {
						event.key === "Enter" && sendMessage();
					}}
				/>
				<button className="button" onClick={sendMessage}>&#9658;</button>

			</div>
		</div>
	);
}

export default Chat;