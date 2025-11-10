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

            const [formattingOptions, setFormattingOptions] = useState({
                font: 'Arial',
                size: 16,
                charSpacing: 'normal',
                wordSpacing: 'normal',
                lineHeight: 'x1.5',
                highlight: false,
            });

            // Réf pour accéder aux options les plus récentes sans recréer le callback
            const optionsRef = useRef(formattingOptions);
            useEffect(() => {
                optionsRef.current = formattingOptions;
            }, [formattingOptions]);

            const [appliedOptions, setAppliedOptions] = useState(formattingOptions);

            useEffect(() => {
                if (originalText.length > 0 && originalText.length <= 8000) {
                    setAdaptedText(originalText);
                    setAppliedOptions(formattingOptions);
                    setIsUpdateRequired(false);
                }
            }, [originalText, formattingOptions]);

            useEffect(() => {
                if (originalText.length <= 8000) {
                    setAdaptedText('');
                }
            }, [originalText]);

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
                    // Utilise la référence pour obtenir les options actuelles
                    setAppliedOptions(optionsRef.current);
                    setAdaptedText(originalText);
                }
            }, [originalText]); // Dépend uniquement de originalText maintenant

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