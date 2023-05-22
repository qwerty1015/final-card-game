import { auth, sendPasswordReset } from "../firebase";
import { useState, useEffect } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";

function Forgot_Password() {
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");

    useEffect(() => {
        if (loading) {
          // maybe trigger a loading screen
          return;
        }
        if (user) navigate("/dashboard");
      }, [user, loading]);

    return (
        <div>
            <div className="form">
                <h1 className="form__title">Recover Password</h1>
                    
                    <input type="text" 
                        className="form__input" 
                        autoFocus 
                        onChange={(event) => {
                            setEmail(event.target.value);
                        }} 
                        placeholder="Email"/>
                    
                    <div className="form__input-error-message"></div>
                <button className="form__button" onClick={() => sendPasswordReset(email)}>Send Recovery Email</button>
            </div>
        </div>
    );
}

export default Forgot_Password