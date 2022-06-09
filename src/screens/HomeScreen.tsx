import * as React from "react";
import {useMemo, useState} from "react";
import {Button, Pressable, StyleSheet, Text, View} from "react-native";
import {consonants, dependantVowels, filterByCharacters, independentVowels} from "../lib/telugu";
import random from "random";
import Word from "../components/Word";
import {useFocusEffect} from "@react-navigation/native";
import {getSettings} from "../lib/settings/settings";

export default function ({navigation}) {
    return (
        <View style={styles.root}>
            <Button title={"Go to Settings"} onPress={() => navigation.push('Settings')}/>
            <MainArea></MainArea>

        </View>)
}

function filterWords(form) {
    console.log("recomputing")
    if (!form) return null;
    return filterByCharacters(char => {
        const code = char.charCodeAt(0);
        if(code in consonants) return form.consonant;
        if(code in independentVowels) return form.independentVowels;
        if(code in dependantVowels) return form[`vowel-${code}`]
        return form.other;
    })
}

function MainArea() {
    const [formData, setFormData] = useState(null)
    const [hidden, setHidden] = useState(true)

    const [index, setIndex] = useState(0);

    // const [form] = useAsyncJson(defaultFormData);
    useFocusEffect( React.useCallback( () => {
        getSettings().then((data) => setFormData(data));
        console.log(formData);
    }, []))
    const matches = useMemo(() => filterWords(formData), [formData]);
    console.log(formData)
    // const matches = filterWords(formData);
    console.log(matches?.length)
    if (!matches) return null;
    if (matches.length == 0) return <Text>No words match criteria (check settings)</Text>
    if(index >=matches.length) setIndex(0);
    function handlePress() {
        if (hidden) {
            setHidden(false);
        } else {
            setHidden(true);
            setIndex(random.int(0, matches.length - 1));
        }
    }


    return <Pressable style={styles.other} onPress={handlePress}>
        <View style={styles.app}>
            <Text>{`#${index + 1}/${matches.length}`}</Text>
            <Word word={matches[index]} hidden={hidden}/>
        </View>
    </Pressable>
}

const styles = StyleSheet.create({

    root: {
        flex: 1,
        padding: 5
    },
    mainArea: {
        alignSelf: "center"
    },
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
