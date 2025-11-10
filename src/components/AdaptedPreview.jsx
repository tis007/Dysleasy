// src/components/AdaptedPreview.jsx
        import React from 'react';
        import {PDFViewer} from '@react-pdf/renderer';
        import AdaptedDocument from './AdaptedDocument';
        import './AdaptedPreview.css';

        const AdaptedPreview = ({pdfKey, originalText, adaptedText, options, onGenerateClick, setIsGenerating}) => {
            const needsManualGeneration = originalText && originalText.length > 8000;
            const showPdf = adaptedText && adaptedText.length > 0;

            const handlePdfRendered = () => {
                if (setIsGenerating) {
                    setIsGenerating(false);
                }
            };

            return (
                <div className="text-box adapted-preview">
                    <h4>Texte adapté</h4>

                    {needsManualGeneration && !showPdf && (
                        <div className="manual-generation-placeholder">
                            <p>Le texte est trop long pour une prévisualisation automatique.</p>
                            <button onClick={onGenerateClick} className="generate-pdf-button">
                                Générer le PDF
                            </button>
                        </div>
                    )}

                    {!needsManualGeneration && !showPdf && (
                        <p className="placeholder">Le texte adapté apparaîtra ici...</p>
                    )}

                    {showPdf && (
                        <div className="pdf-viewer-container">
                            <PDFViewer className="pdf-viewer" key={pdfKey}>
                                <AdaptedDocument
                                    text={adaptedText}
                                    options={options}
                                    onRender={handlePdfRendered}
                                />
                            </PDFViewer>
                        </div>
                    )}
                </div>
            );
        };

        export default React.memo(AdaptedPreview);