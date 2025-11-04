import React from 'react';

const FileUpload = ({ setOriginalText }) => {
    return (
        <div className="file-upload-section">
            <h3>Importer un fichier</h3>
            <div className="dropzone-placeholder">
                Drag and drop file here (Limit 200MB) or Browse Files
            </div>
        </div>
    );
};
export default FileUpload;