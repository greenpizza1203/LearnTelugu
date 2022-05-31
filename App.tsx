import * as React from 'react';
import {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useFonts} from 'expo-font';

import {consonants, countGraphemes, filteredWords, independentVowels, reverseMap} from "./lib/telugu";
import Word from "./src/word";
import random from "random";


export function App() {
    const [hidden, setHidden] = useState(true)
    const [index, setIndex] = useState(0);
    const validAccents = reverseMap("i", "u", "vocalic r", "e", "ai", "o", "au")
    const matches = filteredWords(word => {
        const graphemeCount = countGraphemes(word);
        if (graphemeCount < 2) return;

        for (let i = 0; i < word.length; i++) {
            const code = word.charCodeAt(i);
            if (code in independentVowels || code in consonants) continue;
            if (validAccents.includes(code)) continue;
            // if (code in dependantVowels) continue;
            return false;
        }
        return true;
    })

    return <Pressable style={styles.other} onPress={() => {
        if (hidden) {
            setHidden(false);
        } else {
            setHidden(true);
            setIndex(random.int(0, matches.length - 1));
        }
    }}>
        <View style={styles.app}>
            <Text>{`#${index + 1}/${matches.length}`}</Text>
            <Word word={matches[index]} hidden={hidden}/>
        </View>
    </Pressable>


}


export default function AppContainer() {
    const [loaded] = useFonts({Nirmala: require('./assets/fonts/Nirmala.ttf'),});
    if (!loaded) return null;
    return (
        <View style={styles.container}>
            <App/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

        // backgroundColor: '#fff',
        alignSelf: 'stretch',
        // padding: 5,
        fontFamily: 'Nirmala'
    },
    app: {
        marginHorizontal: 10,
        paddingStart: 10,
        alignSelf: "flex-start"
    },

    other: {
        alignSelf: 'stretch',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

        // backgroundColor: 'blue'

    }

});

