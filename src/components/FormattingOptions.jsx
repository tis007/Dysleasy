// `src/components/FormattingOptions.jsx`
import React from 'react';
import './FormattingOptions.css';

const FormattingOptions = ({options, setOptions, isUpdateRequired, onUpdateClick}) => {

    const normalizeHex = (input) => {
        if (!input) return null;
        let v = input.trim().replace(/^#/, '');
        if (!/^[0-9a-fA-F]{3}$|^[0-9a-fA-F]{6}$/.test(v)) return null;
        if (v.length === 3) v = v.split('').map(c => c + c).join('');
        return `#${v.toLowerCase()}`;
    };

    const handleChange = (e) => {
        const {name, type, value, checked} = e.target;

        // Checkbox
        if (type === 'checkbox') {
            setOptions(prev => ({...prev, [name]: checked}));
            return;
        }

        // Slider pour nuance de gris (0-255) : synchronise highlightGray et highlightColor
        if (name === 'highlightGray') {
            let parsed = parseInt(value, 10);
            if (isNaN(parsed)) parsed = 0;
            parsed = Math.max(0, Math.min(255, parsed));
            const hex = parsed.toString(16).padStart(2, '0');
            const color = `#${hex}${hex}${hex}`;
            setOptions(prev => ({...prev, highlightGray: parsed, highlightColor: color}));
            return;
        }

        // Champ hex éditable : normalise et synchronise highlightColor et highlightGray
        if (name === 'highlightColor') {
            const normalized = normalizeHex(value);
            if (normalized) {
                const gray = parseInt(normalized.slice(1, 3), 16);
                setOptions(prev => ({...prev, highlightColor: normalized, highlightGray: gray}));
            } else {
                // si invalide, stocke la saisie brute (permet édition) sans casser l'app
                setOptions(prev => ({...prev, highlightColor: value}));
            }
            return;
        }

        // Nombre / range pour les autres inputs
        if (type === 'number' || type === 'range') {
            let parsedValue = parseFloat(value);
            if (isNaN(parsedValue)) parsedValue = 0;

            if (name === 'size' && parsedValue > 72) {
                parsedValue = 72;
            }
            if (name === 'lineHeight' && parsedValue > 5) {
                parsedValue = 10;
            }

            setOptions(prevOptions => ({
                ...prevOptions,
                [name]: parsedValue
            }));
            return;
        }

        // Texte / select
        setOptions(prevOptions => ({
            ...prevOptions,
            [name]: value
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
                            min="1"
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
                            min="1"
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

            {/* Checkbox + slider nuance de gris + input hex */}
            <div className="form-group-checkbox highlight-controls">
                <div className="checkbox-row">
                    <input
                        type="checkbox"
                        id="highlight"
                        name="highlight"
                        checked={options.highlight}
                        onChange={handleChange}
                    />
                    <label htmlFor="highlight">Activer la surbrillance</label>
                </div>

                <div className="highlight-controls-row">
                    <input
                        type="range"
                        id="highlightGray"
                        name="highlightGray"
                        min="0"
                        max="255"
                        value={options.highlightGray}
                        onChange={handleChange}
                        className="slider gray-slider"
                        aria-label="Nuance de gris"
                    />
                    <input
                        type="text"
                        id="highlightColor"
                        name="highlightColor"
                        value={options.highlightColor}
                        onChange={handleChange}
                        className="hex-input"
                        maxLength="7"
                        aria-label="Couleur hex"
                    />
                </div>
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