import React from 'react';
import { Link } from 'react-router-dom';

export function Navigation({ isLoggedIn, onLogout }) {
    return (
        <div class='containernav'>
            <div class='logo'>
            <Link to='/appweb'>
                <h2>Appweb</h2>
            </Link>
            </div>
            <div>
            {isLoggedIn ? (
                <button class='navoptions' onClick={onLogout}>Cerrar Sesión</button>
            ) : (
                <>
                    <Link to="appweb/signup" class='navoptions'>Crear usuario</Link>
                    
                    <Link to="appweb/login" class='navoptions'>Ingresar</Link>
                </>
            )}
            </div>
        </div>
    );
}