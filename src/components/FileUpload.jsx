import React, { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import './FileUpload.css'; // Importez le fichier CSS
import LoadingScreen from './LoadingScreen'; // Importer le composant de chargement
// Pour la compatibilité avec les bundlers comme Vite ou Webpack 5+
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const FileUpload = ({setOriginalText}) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleFile = async (file) => {
        if (!file) return;
        setIsLoading(true); // Activer l'écran de chargement

        if (file.type === 'application/pdf') {
            const reader = new FileReader();
            reader.onload = async (e) => {
                const typedarray = new Uint8Array(e.target.result);
                try {
                    const pdf = await pdfjsLib.getDocument(typedarray).promise;
                    let fullText = '';

                    for (let i = 1; i <= pdf.numPages; i++) {
                        const page = await pdf.getPage(i);
                        const textContent = await page.getTextContent();

                        if (textContent.items.length === 0) {
                            continue;
                        }

                        // Trier les éléments par position (Y puis X)
                        const items = textContent.items.slice().sort((a, b) => {
                            if (a.transform[5] !== b.transform[5]) {
                                return b.transform[5] - a.transform[5];
                            }
                            return a.transform[4] - a.transform[4];
                        });

                        let pageText = '';
                        let lastY = -1;
                        let lastX = -1;
                        let lastWidth = 0;
                        let lastHeight = 0;

                        items.forEach(item => {
                            if (!item.str.trim()) return; // Ignorer les éléments vides

                            const currentY = item.transform[5];
                            const currentX = item.transform[4];

                            // Détecter un saut de paragraphe basé sur un espacement vertical plus grand
                            if (lastY !== -1 && Math.abs(currentY - lastY) > lastHeight * 1.2) {
                                pageText += '\n\n';
                            } else if (lastY !== -1) {
                                // Si c'est une nouvelle ligne dans le même paragraphe, ajouter un espace
                                if (Math.abs(currentY - lastY) > 0) { // Changement de ligne
                                    pageText += ' ';
                                } else { // Même ligne
                                    // Ajouter un espace si l'élément n'est pas collé au précédent
                                    const spaceWidth = currentX - (lastX + lastWidth);
                                    if (spaceWidth > item.height * 0.2) {
                                        pageText += ' ';
                                    }
                                }
                            }

                            pageText += item.str;
                            lastY = currentY;
                            lastX = currentX;
                            lastWidth = item.width;
                            lastHeight = item.height;
                        });

                        fullText += pageText + '\n\n';
                    }
                    setOriginalText(fullText.replace(/\n{3,}/g, '\n\n').trim());
                } catch (error) {
                    console.error('Erreur lors de l\'analyse du PDF:', error);
                    alert('Impossible de lire le fichier PDF.');
                } finally {
                    setIsLoading(false); // Désactiver l'écran de chargement
                }
            };
            reader.readAsArrayBuffer(file);
        } else { // Gérer les fichiers texte simples
            const reader = new FileReader();
            reader.onload = (e) => {
                setOriginalText(e.target.result);
                setIsLoading(false); // Désactiver l'écran de chargement
            };
            reader.onerror = () => {
                setIsLoading(false); // Désactiver en cas d'erreur
                alert('Impossible de lire le fichier texte.');
            };
            reader.readAsText(file);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        handleFile(file);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const file = e.dataTransfer.files[0];
            handleFile(file);
            e.dataTransfer.clearData();
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    return (
        <div className="file-upload-section">
            {isLoading && <LoadingScreen />}
            <h3>Importer un fichier</h3>
            <div
                className="dropzone-placeholder"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => document.getElementById('fileInput').click()}
            >
                Glissez-déposez un fichier ici (PDF, TXT) ou cliquez pour parcourir
                <input
                    type="file"
                    id="fileInput"
                    style={{display: 'none'}}
                    onChange={handleFileChange}
                    accept=".pdf,.txt"
                />
            </div>
        </div>
    );
};

export default FileUpload;
