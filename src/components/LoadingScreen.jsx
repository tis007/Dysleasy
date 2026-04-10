/*******************************************************************************
 * Copyright (c) 2026 ToNIC - Toulouse NeuroImaging Center (Inserm) (https://tonic.inserm.fr/en/)
 *                    CLLE - Cognition, Langues, Langage, Ergonomie (CNRS) (https://clle.univ-tlse2.fr/)
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Creative Commons
 * Attribution-NonCommercial-NoDerivatives 4.0 International License (CC BY-NC-ND 4.0)
 * which accompanies this distribution, and is available at
 * https://creativecommons.org/licenses/by-nc-nd/4.0/
 *
 * Initial Contributors:
 *     Matis Mehl : Développeur, élève-ingénieur ISIS
 *
 * New contributors :
 *
 *******************************************************************************/
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