import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";
import '../styles/cardlobby.css';

import io from 'socket.io-client';
const socket = io.connect('http://localhost:3000');

function Card(props) {
  const bounds = {left: -100, top: -25, right: window.innerWidth - 282, bottom: window.innerHeight - 220}
  const [position, setPosition] = useState([100, 100]);
  const [image, setImage] = useState('Reverse.png');

  const name = props.cardName;
  const lobbyId = props.lobbyId;

  function handleDrag(e, ui) {
    e.preventDefault()
    const { x, y } = ui;
    console.log(ui);
    console.log(e.clientX);
    console.log(e.clientY);

    socket.emit("position-update", { lobbyId: lobbyId, x: e.clientX, y: e.clientY, name: name });
  }

  useEffect(() => {
    socket.on("get-new-position", (data) => {
      setPosition([data.x, data.y]);
    });

  }, [])

  const flip = () => {
    if (image == 'Reverse.png') {
      setImage(name + ".png");
    } 
    else {
      setImage('Reverse.png');
    }
  };

  return (
    <Draggable className = "Card" onDrag={handleDrag} bounds = {bounds}>
      <div style={{ position: "absolute", left: position[0], top: position[1] }}>
        <img src= { process.env.PUBLIC_URL  + "/cards/" + image } 
        onMouseUp={flip}/>
      </div>
    </Draggable>
  );
}

export default Card;