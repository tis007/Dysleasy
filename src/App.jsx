// src/App.jsx
    import React, {useCallback, useEffect, useState, useRef} from 'react';
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
        const [pdfKey, setPdfKey] = useState(0); // 1. Ajouter l'état pour la clé

        const [formattingOptions, setFormattingOptions] = useState({
            font: 'Arial',
            size: 16,
            charSpacing: 'normal',
            wordSpacing: 'normal',
            lineHeight: 'x1.5',
            highlight: false,
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
                setPdfKey(prevKey => prevKey + 1); // 2. Incrémenter la clé ici
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
                    <FileUpload setOriginalText={setOriginalText}/>

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
                            pdfKey={pdfKey} // 4. Passer la clé en prop
                            originalText={originalText}
                            adaptedText={adaptedText}
                            options={appliedOptions}
                            onGenerateClick={handleGeneratePdf}
                            setIsGenerating={setIsGenerating}
                        />
                    </div>
                </main>
            </div>
        );
    }

    export default App;