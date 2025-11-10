import React from 'react';
import './LoadingScreen.css';

const LoadingScreen = ({ message = "Chargement..." }) => {
    return (
        <div className="loading-overlay">
            <div className="loading-spinner"></div>
            <p>{message}</p>
        </div>
    );
};

export default LoadingScreen;