import React from 'react';

const OriginalInput = ({ text, setText }) => {
    return (
        <div className="text-box original-input">
            <h4>Texte original</h4>
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Saisissez votre texte ici..."
            />
        </div>
    );
};
export default OriginalInput;