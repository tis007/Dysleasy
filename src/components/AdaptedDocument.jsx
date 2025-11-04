import React from 'react';
import {Document, Font, Page, StyleSheet, Text, View} from '@react-pdf/renderer';

/**
 * Fonction "traductrice" :
 * Convertit vos options d'état en styles CSS-in-JS que le PDF peut comprendre.
 */


Font.register({family: 'Arial', src: '/public/fonts/Arial.ttf'});
Font.register({family: 'Helvetica', src: '/public/fonts/Helvetica.ttf'});
Font.register({family: 'Lucida', src: '/public/fonts/lucida.ttf'});
Font.register({family: 'Tahoma', src: '/public/fonts/Tahoma.ttf'});


const mapOptionsToStyles = (options) => {

    // Traduction Espacement Caractères
    let letterSpacing = 0.5;
    switch (options.charSpacing) {
        case 'petit': letterSpacing = 1; break;
        case 'normal': letterSpacing = 2; break;
        case 'grand': letterSpacing = 3; break;
        case 'tres grand': letterSpacing = 4; break;
        default: letterSpacing = 0.5;
    }

    // Traduction Interligne
    let lineHeightValue = 1.5;
    switch (options.lineHeight) {
        case 'x1': lineHeightValue = 1; break;
        case 'x1.5': lineHeightValue = 1.5; break;
        case 'x2': lineHeightValue = 2; break;
        default: lineHeightValue = 1.5;
    }

    // Traduction Espacement Mots (en multiplicateur)
    let wordSpacingMultiplier = 1;
    switch (options.wordSpacing) {
        case 'petit': wordSpacingMultiplier = 2; break;
        case 'normal': wordSpacingMultiplier = 3; break;
        case 'grand': wordSpacingMultiplier = 4; break;
        case 'tres grand': wordSpacingMultiplier = 5; break;
        default: wordSpacingMultiplier = 1;
    }

    const fontFamily = options.font;

    return {
        styles: StyleSheet.create({
            page: {
                padding: 30,
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'flex-start',
            },
            text: {
                fontFamily: fontFamily,
                fontSize: options.size,
                letterSpacing: letterSpacing,
                lineHeight: lineHeightValue,
                marginRight: (letterSpacing || 16) * wordSpacingMultiplier * 4 ,
            },
        }),
    };
};
const RenderTextWithWords = ({ text, styles }) => {
    const segments = (text || '').split(/(\s+)/);

    return (
        <>
            {segments.map((segment, index) => {

                if (segment.includes('\n')) {
                    return <View key={index} style={{ width: '100%' }} />;
                }


                if (segment.trim() === '') {
                    return null;
                }

                return (
                    <Text key={index} style={styles.text}>
                        {segment}
                    </Text>
                );
            })}
        </>
    );
};

const AdaptedDocument = ({ text, options }) => {
    console.log("Options appliquées au PDF:", options);

    const { styles } = mapOptionsToStyles(options);

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <RenderTextWithWords
                    text={text}
                    styles={styles}
                />
            </Page>
        </Document>
    );
};

export default AdaptedDocument;