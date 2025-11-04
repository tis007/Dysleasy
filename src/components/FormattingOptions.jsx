import React from 'react';
// Importez le CSS pour ce composant (nous le créerons à l'étape 2)
import './FormattingOptions.css';

const FormattingOptions = ({options, setOptions}) => {

    /**
     * Gestionnaire générique pour tous les changements d'inputs.
     * Il identifie quel champ a changé grâce à `e.target.name`
     * et met à jour la bonne clé dans l'objet 'options'.
     */
    const handleChange = (e) => {
        const {name, type, value, checked} = e.target;

        let finalValue;
        if (type === 'checkbox') {
            finalValue = checked;
        } else if (type === 'number') {
            finalValue = parseFloat(value) || 0;
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
                    />
                </div>

                {/* === Espacement Caractères === */}
                <div className="form-group">
                    <label htmlFor="charSpacing">Espacement entre les caractères</label>
                    <select
                        id="charSpacing"
                        name="charSpacing"
                        value={options.charSpacing}
                        onChange={handleChange}
                        className="form-control"
                    >
                        <option value="default">Default</option>
                        <option value="petit">Petit</option>
                        <option value="normal">Normal</option>
                        <option value="grand">Grand</option>
                        <option value="tres grand">Très grand</option>
                    </select>
                </div>

                {/* === Espacement Mots === */}
                <div className="form-group">
                    <label htmlFor="wordSpacing">Espacement entre les mots</label>
                    <select
                        id="wordSpacing"
                        name="wordSpacing"
                        value={options.wordSpacing}
                        onChange={handleChange}
                        className="form-control"
                    >
                        <option value="default">Default</option>
                        <option value="petit">Petit</option>
                        <option value="normal">Normal</option>
                        <option value="grand">Grand</option>
                        <option value="tres grand">Très grand</option>
                    </select>
                </div>


                {/* === Espacement inter-lignes === */}
                <div className="form-group">
                    <label htmlFor="lineHeight">Espacement interligne</label>
                    <select
                        id="lineHeight"
                        name="lineHeight"
                        value={options.lineHeight}
                        onChange={handleChange}
                        className="form-control"
                    >
                        <option value="x1">x1</option>
                        <option value="x1.5">x1.5</option>
                        <option value="x2">x2</option>
                    </select>
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

        </div>
    );
};

export default FormattingOptions;