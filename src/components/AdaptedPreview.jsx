import React from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import AdaptedDocument from './AdaptedDocument';

import './AdaptedPreview.css';

const AdaptedPreview = ({ text, options }) => {
    return (
        <div className="text-box adapted-preview">
            <h4>Texte adapté</h4>
            {options && text ? (
                <PDFViewer className="pdf-viewer">
                    <AdaptedDocument text={text} options={options} />
                </PDFViewer>
            ) : (
                <p className="placeholder">Le texte adapté apparaîtra ici...</p>
            )}
        </div>
    );
};

export default AdaptedPreview;