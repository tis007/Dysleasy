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