import React, { useState } from 'react';
import './App.css';

import Header from './components/Header';
import FileUpload from './components/FileUpload';
import FormattingOptions from './components/FormattingOptions';
import OriginalInput from './components/OriginalInput';
import AdaptedPreview from './components/AdaptedPreview';
import Actions from './components/Actions';

function App() {

    const [originalText, setOriginalText] = useState('');

    const [formattingOptions, setFormattingOptions] = useState({
        font: 'Arial',
        size: 16,
        charSpacing: 'normal',
        wordSpacing: 'normal',
        lineHeight: 'x1.5',
        highlight: true,
    });


    return (
        <div className="app-container">
            <Header />

            <main className="app-content">
                <FileUpload
                    setOriginalText={setOriginalText}
                />

                <FormattingOptions
                    options={formattingOptions}
                    setOptions={setFormattingOptions}
                />

                <div className="text-display-container">
                    <OriginalInput
                        text={originalText}
                        setText={setOriginalText}
                    />
                    <AdaptedPreview
                        text={originalText}
                        options={formattingOptions}
                    />
                </div>

                {/*<Actions*/}
                {/*    originalText={originalText}*/}
                {/*    options={formattingOptions}*/}
                {/*/>*/}

            </main>
        </div>
    );
}

export default App;