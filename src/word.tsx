import {StyleSheet, Text, View} from "react-native"

export function WordForm({form, hidden}) {

    return <View>
        <Text style={styles.partOfSpeech}>{form.partOfSpeech}</Text>
        <Text style={[hidden&&{backgroundColor: 'black'}, styles.romanization]}>{form.romanization}</Text>
        {form.definitions.map((definition, index) => <Text key={index} style={styles.definition}>{definition}</Text>)}
    </View>

}


export default function ({word, hidden}) {
    return (<View style={styles.root}>
        <Text style={styles.teluguWord}>{word.teluguWord}</Text>
        {word.forms.map(form => <WordForm hidden={hidden} key={form.partOfSpeech} form={form}/>)}

    </View>)
}

const styles = StyleSheet.create({
    root: {},
    teluguWord: {
        fontSize: 40
    },

    romanization: {
        fontSize: 20,
        alignSelf: "flex-start",

    },
    partOfSpeech: {
        color: 'black',
        fontSize: 34
    },
    definition: {
        color: '#4e4e4e',
        fontSize: 15
    }
})
