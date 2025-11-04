import React from 'react';
// (On ajoutera @react-pdf/renderer ici plus tard)

const Actions = ({ onAdaptClick, originalText, options }) => {
    return (
        <div className="actions-container">
            <button onClick={onAdaptClick} className="action-button adapt-button">
                Adapter le texte
            </button>

            <button className="action-button download-button">
                Download to PDF
            </button>
        </div>
    );
};
export default Actions;