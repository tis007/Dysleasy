import React, {useEffect, useRef} from 'react';
import {PDFViewer} from '@react-pdf/renderer';
import AdaptedDocument from './AdaptedDocument';

import './AdaptedPreview.css';

const AdaptedPreview = ({text, options}) => {
    const isEmpty = !text || !options;
    const count = useRef(0);


    useEffect(() => {
        count.current++;
    }, [text, options]);

    return (
        <div className="text-box adapted-preview">
            <h4>Texte adapté</h4>

            {!isEmpty ? (
                <div style={{border: '1px solid black', width: '100%', height: '100vh'}}>
                    <PDFViewer className="pdf-viewer" key={count.current}>
                        <AdaptedDocument text={text} options={options}/>
                    </PDFViewer>
                </div>
            ) : (
                <p className="placeholder">Le texte adapté apparaîtra ici...</p>
            )}
        </div>
    );
};

export default AdaptedPreview;