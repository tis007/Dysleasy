// src/components/FormattingOptions.jsx
import React from 'react';
import './FormattingOptions.css';

const FormattingOptions = ({options, setOptions, isUpdateRequired, onUpdateClick}) => {

    const handleChange = (e) => {
        const {name, type, value, checked} = e.target;

        let finalValue;
        if (type === 'checkbox') {
            finalValue = checked;
        } else if (type === 'number' || type === 'range') {
            let parsedValue = parseFloat(value);

            if (isNaN(parsedValue)) {
                parsedValue = 0;
            }

            // Ajout des validations pour les valeurs maximales
            if (name === 'size' && parsedValue > 72) {
                parsedValue = 72;
            }
            if (name === 'lineHeight' && parsedValue > 5) {
                parsedValue = 5gi;
            }

            finalValue = parsedValue;
        } else {
            finalValue = value;
        }

        setOptions(prevOptions => ({
            ...prevOptions,
            [name]: finalValue
        }));
    };

    return (
        <div className="formatting-options-section">
            <h3>
                <span role="img" aria-label="options">⚙️</span> Options de mise en forme
            </h3>

            <div className="options-grid-container">
                {/* === Police === */}
                <div className="form-group">
                    <label htmlFor="font">Police</label>
                    <select
                        id="font"
                        name="font"
                        value={options.font}
                        onChange={handleChange}
                        className="form-control"
                    >
                        <option value="Arial">Arial</option>
                        <option value="Helvetica">Helvetica</option>
                        <option value="Lucida">Lucida</option>
                        <option value="Tahoma">Tahoma</option>
                    </select>
                </div>

                {/* === Taille de la police === */}
                <div className="form-group">
                    <label htmlFor="size">Taille de la police</label>
                    <input
                        type="number"
                        id="size"
                        name="size"
                        value={options.size}
                        onChange={handleChange}
                        className="form-control"
                        min="1"
                        max="72"
                    />
                </div>

                {/* === Espacement Caractères === */}
                <div className="form-group">
                    <label htmlFor="charSpacing">Espacement entre les caractères</label>
                    <div className="slider-input-group">
                        <input
                            type="number"
                            name="charSpacing"
                            min="0"
                            max="5"
                            step="0.1"
                            value={options.charSpacing}
                            onChange={handleChange}
                            className="form-control number-input"
                        />
                        <input
                            type="range"
                            id="charSpacing"
                            name="charSpacing"
                            min="0"
                            max="5"
                            step="0.1"
                            value={options.charSpacing}
                            onChange={handleChange}
                            className="slider"
                        />
                    </div>
                </div>

                {/* === Espacement Mots === */}
                <div className="form-group">
                    <label htmlFor="wordSpacing">Espacement entre les mots</label>
                    <div className="slider-input-group">
                        <input
                            type="number"
                            name="wordSpacing"
                            min="0"
                            max="5"
                            step="0.1"
                            value={options.wordSpacing}
                            onChange={handleChange}
                            className="form-control number-input"
                        />
                        <input
                            type="range"
                            id="wordSpacing"
                            name="wordSpacing"
                            min="0"
                            max="5"
                            step="0.1"
                            value={options.wordSpacing}
                            onChange={handleChange}
                            className="slider"
                        />
                    </div>
                </div>


                {/* === Espacement inter-lignes === */}
                <div className="form-group">
                    <label htmlFor="lineHeight">Espacement interligne</label>
                    <div className="slider-input-group">
                        <input
                            type="number"
                            name="lineHeight"
                            min="1"
                            max="5"
                            step="0.1"
                            value={options.lineHeight}
                            onChange={handleChange}
                            className="form-control number-input"
                        />
                        <input
                            type="range"
                            id="lineHeight"
                            name="lineHeight"
                            min="1"
                            max="3"
                            step="0.1"
                            value={options.lineHeight}
                            onChange={handleChange}
                            className="slider"
                        />
                    </div>
                </div>
            </div>
            {/* === Checkbox Surbrillance === */}
            <div className="form-group-checkbox">
                <input
                    type="checkbox"
                    id="highlight"
                    name="highlight"
                    checked={options.highlight}
                    onChange={handleChange}
                />
                <label htmlFor="highlight">Activer la surbrillance</label>
            </div>

            {/*Bouton de mise à jour */}
            {isUpdateRequired && (
                <div className="update-button-container">
                    <button onClick={onUpdateClick} className="update-pdf-button">
                        Mettre à jour le PDF avec les nouvelles options
                    </button>
                </div>
            )}
        </div>
    );
};

export default FormattingOptions;