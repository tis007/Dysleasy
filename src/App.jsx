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
import React, {useCallback, useEffect, useRef, useState} from 'react';
import './App.css';

import Header from './components/Header';
import FileUpload from './components/FileUpload';
import FormattingOptions from './components/FormattingOptions';
import OriginalInput from './components/OriginalInput';
import AdaptedPreview from './components/AdaptedPreview';
import LoadingScreen from './components/LoadingScreen';
import ccIcon from './assets/Cc_by-nc-nd_icon.svg.png';

function App() {
    const [originalText, setOriginalText] = useState('');
    const [adaptedText, setAdaptedText] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [isUpdateRequired, setIsUpdateRequired] = useState(false);
    const [pdfKey, setPdfKey] = useState(0);

    const [formattingOptions, setFormattingOptions] = useState({
        font: 'Arial',
        size: 14,
        charSpacing: 1,
        wordSpacing: 1,
        lineHeight: 1,
        highlight: false,
        highlightColor: '#444444',
        highlightGray: 68,
    });

    const optionsRef = useRef(formattingOptions);
    useEffect(() => {
        optionsRef.current = formattingOptions;
    }, [formattingOptions]);

    const [appliedOptions, setAppliedOptions] = useState(formattingOptions);

    useEffect(() => {
        if (originalText.length > 0 && originalText.length <= 8000) {
            setAdaptedText(originalText);
            setAppliedOptions(formattingOptions);
            setPdfKey(prevKey => prevKey + 1);
            setIsUpdateRequired(false);
        } else {
            setAdaptedText('');
        }
    }, [originalText, formattingOptions]);

    useEffect(() => {
        if (originalText.length > 8000 && adaptedText.length > 0) {
            const hasOptionsChanged = JSON.stringify(formattingOptions) !== JSON.stringify(appliedOptions);
            if (hasOptionsChanged) {
                setIsUpdateRequired(true);
            }
        }
    }, [formattingOptions, appliedOptions, originalText, adaptedText]);

    const handleGeneratePdf = useCallback(() => {
        if (originalText.length > 8000) {
            setIsGenerating(true);
            setIsUpdateRequired(false);

            setTimeout(() => {
                setAppliedOptions(optionsRef.current);
                setAdaptedText(originalText);
                setPdfKey(prevKey => prevKey + 1);
            }, 50);
        }
    }, [originalText]);

    return (
        <div className="app-container">
            {isGenerating && <LoadingScreen message="Génération du PDF en cours..."/>}
            <Header/>

            <main className="app-content">

                <FormattingOptions
                    options={formattingOptions}
                    setOptions={setFormattingOptions}
                    isUpdateRequired={isUpdateRequired}
                    onUpdateClick={handleGeneratePdf}
                />
                <FileUpload setOriginalText={setOriginalText}/>

                <div className="text-display-container">
                    <OriginalInput
                        text={originalText}
                        setText={setOriginalText}
                    />
                    <AdaptedPreview
                        pdfKey={pdfKey}
                        originalText={originalText}
                        adaptedText={adaptedText}
                        options={appliedOptions}
                        onGenerateClick={handleGeneratePdf}
                        setIsGenerating={setIsGenerating}
                    />
                </div>
            </main>

            <footer className="app-footer">
                <img
                    src={ccIcon}
                    alt="Licence CC BY-NC-ND"
                    className="license-icon"
                />
            </footer>
        </div>
    );
}

export default App;