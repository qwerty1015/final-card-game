import { auth, register } from "../firebase";
import { db } from '../firebase';
import { collection, addDoc} from "firebase/firestore";
import { useState, useEffect } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const usersCollectionRef = collection(db, "users");
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/dashboard");
  }, [user, loading]);

  const wrapper = () => {
    if (!registerUsername) alert("Please enter a username!");
    else if (confirmPassword != registerPassword) alert("Passwords don't match!");
    else register(registerUsername, registerEmail, registerPassword);
  };  
   
    return (
        <div>

          <div className="form" id="createAccount">
              <h1 className="form__title">Create Account</h1>
              <div className="form__message form__message--error"></div>
                <div className="form__input-group">

                  <input type="text" 
                    id="signupUsername" 
                    className="form__input" 
                    autoFocus 
                    onChange={(event) => {
                      setRegisterUsername(event.target.value);
                    }} 
                    placeholder="Username"/>

                <div className="form__input-error-message"></div>
              </div>
              <div className="form__input-group">

                <input type="text" 
                  className="form__input" 
                  autoFocus 
                  onChange={(event) => {
                    setRegisterEmail(event.target.value);
                  }} 
                  placeholder="Email Address"/>

                <div className="form__input-error-message"></div>
              </div>
              <div className="form__input-group">

                <input type="password" 
                  className="form__input" 
                  autoFocus 
                  onChange={(event) => {
                    setRegisterPassword(event.target.value);
                  }} 
                  placeholder="Password"/>

                <div className="form__input-error-message"></div>
              </div>
              <div className="form__input-group">

                <input type="password" 
                  className="form__input" 
                  autoFocus 
                  onChange={(event) => {
                    setConfirmPassword(event.target.value);
                  }} 
                  placeholder="Confirm password"/>

                <div className="form__input-error-message"></div>
              </div>
              <button className="form__button"
                onClick={wrapper}>Continue</button>

          </div>
        </div>
    );
}

export default Register