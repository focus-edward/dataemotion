import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { Principal } from "./pages/Principal";
import { Login } from "./pages/Login";
import { Register } from "./pages/Signup";
import { Toaster } from "react-hot-toast";
import './components/styles.css';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    };

    return (
        <BrowserRouter>
            <Navigation isLoggedIn={isLoggedIn} onLogout={handleLogout} />
            <Routes>
                <Route path="/" element={<Navigate to={isLoggedIn ? "/appweb" : "/appweb/signup"} />} />
                <Route path="/appweb" element={isLoggedIn ? <Principal /> : <Navigate to="/appweb/signup" />} />
                <Route path="/appweb/login" element={<Login onLogin={handleLogin} />} />         
                <Route path="/appweb/signup" element={<Register onLogin={handleLogin} />} />       
            </Routes>
            <Toaster />
        </BrowserRouter>
    );
}

export default App;

