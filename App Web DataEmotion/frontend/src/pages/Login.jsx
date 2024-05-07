import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

export function Login({ onLogin }) {
    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    });
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleChange = (e) => {
        setLoginData({...loginData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8000/appweb/login/', loginData);
            console.log(res.data);
            localStorage.setItem('token', res.data.token);
            setIsAuthenticated(true); // Establecer autenticación en true después de iniciar sesión
            onLogin();
        } catch (error) {
            console.error(error);
            // Manejar el error de inicio de sesión
        }
    };

    if (isAuthenticated) {
        return <Navigate to="/appweb" replace />; // Redirigir a la página principal si el inicio de sesión es exitoso
    }

    return (
        <div class='container'>
            
            <h2>Ingresar a tu cuenta</h2>
            <form onSubmit={handleSubmit} class='card'>
                <label>
            
                    <h4>Usuario:</h4>
                    <input type="text" name="username" value={loginData.username} onChange={handleChange} />
                </label>
                <label>
                    <h4>Contraseña:</h4>
                    <input type="password" name="password" value={loginData.password} onChange={handleChange} />
                </label>
                <button type="submit"><h3>Ingresar</h3></button>
            </form>
        </div>
    );
}