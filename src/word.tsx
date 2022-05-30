import {StyleSheet, Text, View} from "react-native"

export default function ({word}) {
    return (<View style={styles.root}>
        <Text style={styles.teluguWord}>{word.teluguWord}</Text>
        <Text style={styles.romanization}>{word.romanization}</Text>
        <Text style={styles.partOfSpeech}>{word.partOfSpeech}</Text>
        {word.definitions}
        <Text style={styles.definition}>{word.definition}</Text>
    </View>)
}

const styles = StyleSheet.create({
    root: {},
    teluguWord: {
        fontSize: 40
    },
    romanization: {
        fontSize: 30
    },
    partOfSpeech: {
        color: 'gray',
        fontSize: 15
    },
    definition: {
        // color: 'gray',
        fontSize: 15
    }
})
