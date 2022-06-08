import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {dependantVowels} from "../lib/telugu";

import Checkbox from 'expo-checkbox';
import useAsyncStorage from "../lib/settings/settings";

// const reverseDependantVowels = Object.entries(dependantVowels).map(([key, value]) => [value, key]);

export const defaultFormData = {
    "consonant": false,
    "vowel-3135": false,
    "vowel-3147": false,
    "vowel-3146": false,
    "vowel-3144": false,
    "vowel-3143": false,
    "vowel-3138": false,
    "vowel-3139": false,
    "vowel-3140": false,
    "vowel-3142": false,
    "vowel-3148": false,
    "vowel-3137": false,
    "vowel-3136": false,
    "vowel-3134": false,
    "independentVowels": false,
    "other": false
}
export function CheckboxWithText({value, onValueChange, children}) {
    return <Pressable style={styles.checkboxWithText} onPress={() => onValueChange(!value)}>
        <Checkbox style={styles.checkbox} value={value}/>
        <Text style={styles.paragraph}>{children}</Text>
    </Pressable>
}


export default function () {
    const [val, update] = useAsyncStorage('formData', defaultFormData);

    if (!val) return null;


    return (
        <View style={styles.container}>
            <Text style={styles.heading}> Enable Letters </Text>

            <View style={styles.section}>
                <View>
                    <CheckboxWithText value={val.consonant}
                                      onValueChange={v => update('consonant', v)}>Consonants</CheckboxWithText>
                    <CheckboxWithText value={val.independentVowels}
                                      onValueChange={v => update('independentVowels', v)}>Independent Vowels</CheckboxWithText>
                </View>
                <View style={styles.vowelsSection}>
                    {Object.entries(dependantVowels).map(([codePoint, english]) => {
                        const key = `vowel-${codePoint}`;
                        return <CheckboxWithText key={codePoint} value={!!val[key]}
                                                 onValueChange={v => update(key, v)}>{english}</CheckboxWithText>

                    })}

                </View>
                <View>

                    <CheckboxWithText value={val.other}
                                      onValueChange={v => update('other', v)}>Other</CheckboxWithText>
                </View>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 16,
        marginVertical: 16,
    },
    section: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between'
        // alignItems: 'center',
    },
    heading: {
        fontSize: 25,
        fontWeight: "bold",
        paddingBottom: 10,
    },
    paragraph: {
        fontSize: 15,
    },
    checkboxWithText: {
        // flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: "center"
        // width: '30%'
    },
    checkbox: {
        margin: 8,
    },
    vowelsSection: {
        flex: 1,
        flexDirection: "column",
        // flexWrap: "wrap",
        borderWidth: 2,
        borderColor: "gray"
    },
    checkboxBase: {
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderWidth: 2,
        borderColor: 'coral',
        backgroundColor: 'transparent',
    },

    checkboxChecked: {
        backgroundColor: 'coral',
    },

    appContainer: {
        flex: 1,
        alignItems: 'center',
    },

    appTitle: {
        marginVertical: 16,
        fontWeight: 'bold',
        fontSize: 24,
    },

    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    checkboxLabel: {
        marginLeft: 8,
        fontWeight: 500,
        fontSize: 18,
    },
});
