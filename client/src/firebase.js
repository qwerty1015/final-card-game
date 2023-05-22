import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut 
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  doc,
  where,
  setDoc
} from "@firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDo8KCJQw1u4URw41rJLnH-dgWnDmCmJtE",
  authDomain: "co-op-cards.firebaseapp.com",
  projectId: "co-op-cards",
  storageBucket: "co-op-cards.appspot.com",
  messagingSenderId: "1095538745485",
  appId: "1:1095538745485:web:6753d881280b38b86242c4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Login Function
const login = async (loginEmail, loginPassword) => {
  try {
    const user = await signInWithEmailAndPassword(
      auth,
      loginEmail,
      loginPassword
    );
  } catch (error) {
    console.log(error.message);
    alert(error.message);
  }
};

// Register Function
const register = async (registerUsername, registerEmail, registerPassword) => {
  try {

    // creates user account in firebase authenticator
    const res = await createUserWithEmailAndPassword(
      auth,
      registerEmail,
      registerPassword
    );
    const user = res.user;

    // creates user with username in the firestore database
    await setDoc( doc(db, "users", user.uid), {
      uid: user.uid,
      authProvider: "local",
      username: registerUsername, 
      email: registerEmail, 
      upgradeList: [], 
      gameList: []});
    
  } catch (error) {
    console.log(error.message);
    alert(error.message);
  }
};

// Reset Password Function
const sendPasswordReset = async (resetEmail) => {
  try {
    await sendPasswordResetEmail(auth, resetEmail);
    alert("Password reset link sent!");
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

// Logout Function
const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  login,
  register,
  sendPasswordReset,
  logout,
};
