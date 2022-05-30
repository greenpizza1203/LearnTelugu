import * as React from 'react';
import {useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {useFonts} from 'expo-font';

import teluguDict from "./assets/data/telugu.json";
import {consonants, independentVowels} from "./lib/telugu";
import Word from "./src/word";
import random from "random";

function getDictionary(): { teluguWord: string }[] {
    return teluguDict
}

export function App() {
    const [hidden, setHidden] = useState(true)
    const [index, setIndex] = useState(0);
    const matches = getDictionary().filter(({teluguWord}) => {
        if(teluguWord.length < 2) return;
        for (let i = 0; i < teluguWord.length; i++) {
            const code = teluguWord.charCodeAt(i);
            if (!(code in independentVowels || code in consonants)) return false;
        }
        return true;
    })

    console.log(teluguDict.length)


    return <Pressable onPress={() => {
        if (hidden) {
            setHidden(false);
        } else {
            setHidden(true);
            setIndex(random.int(0, matches.length - 1));
        }
    }}>
        <View>
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
        backgroundColor: '#fff',
        alignItems: 'center',
        padding: 5,
        justifyContent: 'center',
        fontFamily: 'Nirmala'
    },
});
registerRootComponent(App);
