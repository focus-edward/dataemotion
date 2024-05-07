import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

export function Register() {
    const [userData, setUserData] = useState({
        username: '',
        password: '',
        email: '',
        nombres: '',
        apellidos: '',
        edad: '',
        direccion: ''
    });
    const [isRegistered, setIsRegistered] = useState(false);

    const handleChange = (e) => {
        setUserData({...userData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8000/appweb/signup/', {
                username: userData.username,
                password: userData.password,
                email: userData.email,
                perfil_usuario: {
                    nombres: userData.nombres,
                    apellidos: userData.apellidos,
                    edad: userData.edad,
                    direccion: userData.direccion
                }
            });
            console.log(res.data);
            setIsRegistered(true); // Establecer isRegistered a true después de registrarse exitosamente
        } catch (error) {
            console.error(error);
        }
    };

    if (isRegistered) {
        return <Navigate to="/appweb/login" replace />; // Redirigir a la página de inicio de sesión si el registro es exitoso
    }

    return (
        <div class='container'>

            <h4 class='touse'>Para poder usar la aplicación, debes registrarte o iniciar sesión.</h4>
            <h4>Registrarse</h4>

            <form onSubmit={handleSubmit} class='card'>
                <label>
                    <h4>Usuario:</h4>
                    <input type="text" name="username" value={userData.username} onChange={handleChange} />
                </label>
                <label>
                    <h4>Contraseña:</h4>
                    <input type="password" name="password" value={userData.password} onChange={handleChange} />
                </label>
                <label>
                    <h4>Correo:</h4>
                    <input type="email" name="email" value={userData.email} onChange={handleChange} />
                </label>
                <label>
                    <h4>Nombres:</h4>
                    <input type="text" name="nombres" value={userData.nombres} onChange={handleChange} />
                </label>
                <label>
                    <h4>Apellidos:</h4>
                    <input type="text" name="apellidos" value={userData.apellidos} onChange={handleChange} />
                </label>
                <label>
                    <h4>Edad:</h4>
                    <input type="number" name="edad" value={userData.edad} onChange={handleChange} />
                </label>
                <label>
                    <h4>Dirección:</h4>
                    <input type="text" name="direccion" value={userData.direccion} onChange={handleChange} />
                </label>
                <button type="submit"><h3>Registrarse</h3></button>
            </form>
            <br></br>
            <br></br>
            <a href ="/appweb/login">
                <h4>Ya tienes una cuenta existente? Ingresa aqui</h4>
            </a>
            <br></br>
            <br></br>
        </div>
    );
}