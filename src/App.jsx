// src/App.jsx
import React, { useState, useEffect } from 'react';
import './App.css';

import Header from './components/Header';
import FileUpload from './components/FileUpload';
import FormattingOptions from './components/FormattingOptions';
import OriginalInput from './components/OriginalInput';
import AdaptedPreview from './components/AdaptedPreview';
import LoadingScreen from './components/LoadingScreen';

function App() {
    const [originalText, setOriginalText] = useState('');
    const [adaptedText, setAdaptedText] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [isUpdateRequired, setIsUpdateRequired] = useState(false);

    const [formattingOptions, setFormattingOptions] = useState({
        font: 'Arial',
        size: 16,
        charSpacing: 'normal',
        wordSpacing: 'normal',
        lineHeight: 'x1.5',
        highlight: true,
    });

    useEffect(() => {
        if (originalText.length > 0 && originalText.length <= 8000) {
            setAdaptedText(originalText);
            setIsUpdateRequired(false);
        } else {
            setAdaptedText('');
        }
    }, [originalText]);

    useEffect(() => {
        if (originalText.length > 8000 && adaptedText.length > 0) {
            setIsUpdateRequired(true);
        }
    }, [formattingOptions]);

    const handleGeneratePdf = () => {
        if (originalText.length > 8000) {
            // On active le chargement et on fournit le texte.
            // Le composant AdaptedPreview gérera l'arrêt du chargement.
            setIsGenerating(true);
            setIsUpdateRequired(false);
            setAdaptedText(originalText);
        }
    };

    return (
        <div className="app-container">
            {isGenerating && <LoadingScreen message="Génération du PDF en cours..." />}
            <Header />

            <main className="app-content">
                <FileUpload setOriginalText={setOriginalText} />

                <FormattingOptions
                    options={formattingOptions}
                    setOptions={setFormattingOptions}
                    isUpdateRequired={isUpdateRequired}
                    onUpdateClick={handleGeneratePdf}
                />

                <div className="text-display-container">
                    <OriginalInput
                        text={originalText}
                        setText={setOriginalText}
                    />
                    <AdaptedPreview
                        originalText={originalText}
                        adaptedText={adaptedText}
                        options={formattingOptions}
                        onGenerateClick={handleGeneratePdf}
                        setIsGenerating={setIsGenerating}
                    />
                </div>
            </main>
        </div>
    );
}

export default App;