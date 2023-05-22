import { auth, db, logout } from "../firebase";
import { collection, getDocs, query, where, arrayUnion, updateDoc, doc, arrayRemove } from "firebase/firestore";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

import GameSelect from "../components/gameselect";

function Dashboard() {
    const [user, loading, error] = useAuthState(auth);
    const [username, setUsername] = useState("");
    const [gameList, setGameList] = useState([]);
    const [uid, setUid] = useState("");

    const [gameId, setGameId] = useState("");

    const navigate = useNavigate();
    const fetchData = async () => {
        try {
          const q = query(collection(db, "users"), where("uid", "==", user?.uid));
          const doc = await getDocs(q);
          const data = doc.docs[0].data();

          setUsername(data.username);
          setGameList(data.gameList);
          setUid(data.uid);

        } catch (error) {
          console.error(error);
          alert("An error occured while fetching user data");
        }
    };

    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/login");
        fetchData();
      }, [user, loading]);

    
    const createGame = async (gameId) => {
        try {
            const docRef = doc(db, "users", user.uid);

            updateDoc(docRef, {
                gameList: arrayUnion(gameId),
            });

            fetchData();

        } catch (error) {
            console.error(error);
            alert(error);
        }
    };

    const deleteGame = async (gameId) => {
        try {
            const docRef = doc(db, "users", user.uid);

            updateDoc(docRef, {
                gameList: arrayRemove(gameId),
            });

            fetchData();

        } catch (error) {
            console.error(error);
            alert(error);
        }
    };

    return (
        <div>
            <button className="form__button" 
                onClick={() => logout()}>Sign Out</button>
            <br/>
            <p>Your active games:</p>

            <div className="game-list">
				{gameList.map((content) => {
					return (
						<div className="game">
                            <GameSelect gameId={content} username={username}/>
                            <button className="form__button" 
                                onClick={() => deleteGame(content)}>Delete Lobby</button>
						</div>
					);
				})}
			</div>

            <br/>

            <p>Create a new game:</p>

            <input type="text" 
                  className="form__input" 
                  autoFocus 
                  onChange={(event) => {
                    setGameId(event.target.value);
                  }} 
                  placeholder="Set Lobby ID"/>

            <button className="form__button" 
                onClick={() => createGame(gameId)}>Create Game</button>

        </div>
    );
}

export default Dashboard