import { Link } from "react-router-dom";

function GameSelect(props) {

    const gameId = props.gameId;
    const username = props.username;

    return (
        <div>
            <p> Lobby ID: {gameId}</p>
            <Link
                to={'/cardlobby'}
                state={{gameId: {gameId}, username: {username}}}
            >Join Custom Card Lobby</Link><br/>
            <Link
                to={'/pokerlobby'}
                state={{gameId: {gameId}, username: {username}}}
            >Join Poker Lobby</Link>
        </div>
    );
}

export default GameSelect