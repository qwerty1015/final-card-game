import './styles/App.css';

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/login";
import Forgot_Password from "./pages/forgot_password";
import Register from "./pages/register";
import Home from "./pages/home";
import Dashboard from "./pages/dashboard";
import CardLobby from "./pages/cardlobby";
import PokerLobby from './pages/pokerlobby';

import NavBar from './components/navbar';

function App() {

  return (
    <>
      <NavBar/>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot_password" element={<Forgot_Password />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cardlobby" element={<CardLobby gameId={"3"}/>} />
        <Route path="/pokerlobby" element={<PokerLobby gameId={"3"}/>} />
      </Routes>
    </>
  );
}

export default App;