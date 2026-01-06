// `src/components/AdaptedDocument.jsx`
import React from 'react';
import {Document, Font, Page, StyleSheet, Text, View} from '@react-pdf/renderer';

Font.register({ family: 'Arial',   src: new URL('../assets/fonts/Arial.ttf',   import.meta.url).href });
Font.register({ family: 'Helvetica', src: new URL('../assets/fonts/Helvetica.ttf', import.meta.url).href });
Font.register({ family: 'Lucida',  src: new URL('../assets/fonts/lucida.ttf',  import.meta.url).href });
Font.register({ family: 'Tahoma',  src: new URL('../assets/fonts/Tahoma.ttf',  import.meta.url).href });

const normalizeHex = (input) => {
    if (!input) return null;
    let v = input.trim().replace(/^#/, '');
    if (/^[0-9a-fA-F]{3}$/.test(v)) v = v.split('').map(c => c + c).join('');
    if (/^[0-9a-fA-F]{6}$/.test(v)) return `#${v.toLowerCase()}`;
    return null;
};

const mapOptionsToStyles = (options = {}) => {
    let textColor = '#000000';

    if (options.highlight) {
        const validHex = normalizeHex(options.highlightColor);
        if (validHex) {
            textColor = validHex;
        } else if (typeof options.highlightGray === 'number') {
            const hex = options.highlightGray.toString(16).padStart(2, '0');
            textColor = `#${hex}${hex}${hex}`;
        } else {
            textColor = '#444444';
        }
    } else {
        textColor = '#000000';
    }

    return {
        styles: StyleSheet.create({
            page: {
                padding: 30,
                flexDirection: 'column',
                borderWidth: 1,
                borderColor: '#ccc',
            },
            line: {
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'flex-end',
                marginBottom: 5,
            },
            text: {
                fontFamily: options.font,
                fontSize: options.size,
                letterSpacing: options.charSpacing,
                lineHeight: options.lineHeight,
                color: textColor,
                marginRight: (options.size || 16) * options.wordSpacing * 0.5 ,
            },
            highlightedLetter: {
                color: 'black',
            }
        }),
    };
};

const RenderTextWithWords = ({text, styles, options}) => {
    const lines = (text || '').split('\n');

    return (
        <>
            {lines.map((line, lineIndex) => (
                <View key={lineIndex} style={styles.line}>
                    {line.split(' ').map((word, wordIndex) => {
                        if (word.trim() === '') return null;

                        const isHighlightActive = options.highlight;
                        const wordLength = word.length;
                        const shouldHighlightFor5 = isHighlightActive && wordLength === 5;
                        const shouldHighlightFor6 = isHighlightActive && wordLength === 6;

                        if (shouldHighlightFor5) {
                            return (
                                <Text key={wordIndex} style={styles.text}>
                                    {word.substring(0, 1)}
                                    <Text style={styles.highlightedLetter}>{word.substring(1, 2)}</Text>
                                    {word.substring(2)}
                                </Text>
                            );
                        }

                        if (shouldHighlightFor6) {
                            return (
                                <Text key={wordIndex} style={styles.text}>
                                    {word.substring(0, 2)}
                                    <Text style={styles.highlightedLetter}>{word.substring(2, 3)}</Text>
                                    {word.substring(3)}
                                </Text>
                            );
                        }

                        return (
                            <Text key={wordIndex} style={styles.text}>
                                {word}
                            </Text>
                        );
                    })}
                </View>
            ))}
        </>
    );
};


const AdaptedDocument = ({text, options, onRender}) => {
    const {styles} = mapOptionsToStyles(options);

    return (
        <Document onRender={onRender}>
            <Page size="A4" style={styles.page}>
                <RenderTextWithWords
                    text={text}
                    styles={styles}
                    options={options}
                />
            </Page>
        </Document>
    );
};


export default AdaptedDocument;