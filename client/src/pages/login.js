import { auth, login } from "../firebase";
import { useState, useEffect } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    // Navigate to dashboard if already or once logged in
    useEffect(() => {
      if (loading) {
        // maybe trigger a loading screen
        return;
      }
      if (user) navigate("/dashboard");
    }, [user, loading]);

    return (
        <div>
            <div className="form" id="login">
                <h1 className="form__title">Login</h1>
                <div className="form__message form__message--error"></div>
                <div className="form__input-group">

                    <input type="text" 
                      className="form__input" 
                      autoFocus 
                      onChange={(event) => {
                        setLoginEmail(event.target.value);
                      }} 
                      placeholder="Email"/>

                    <div className="form__input-error-message"></div>
                </div>
                <div className="form__input-group">

                    <input type="password" 
                      className="form__input" 
                      autoFocus 
                      onChange={(event) => {
                        setLoginPassword(event.target.value);
                      }} 
                      placeholder="Password"/>

                    <div className="form__input-error-message"></div>

                    <button className="form__button" 
                      onClick={() => login(loginEmail, loginPassword)}>Sign In</button>

                </div>
            </div>
        </div>
    );
}

export default Login