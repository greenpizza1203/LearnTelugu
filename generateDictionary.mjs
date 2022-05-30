// @ts-nocheck
import * as readline from "readline"
import fs from "fs"
import got from "got";
import * as events from "events";
// {
//     "forms": [
//     {
//         "form": "āsti",
//         "tags": [
//             "romanization"
//         ]
//     },
//     {
//         "form": "ఆస్తులు",
//         "tags": [
//             "plural"
//         ]
//     }
// ],
//     "head_templates": [
//     {
//         "args": {
//             "tr": "āsti"
//         },
//         "expansion": "ఆస్తి (āsti) ? (plural ఆస్తులు)",
//         "name": "te-noun"
//     }
// ],
//     "lang": "Telugu",
//     "lang_code": "te",
//     "pos": "noun",
//     "senses": [
//     {
//         "categories": [],
//         "glosses": [
//             "property, estate, effect, wealth, riches."
//         ],
//         "id": "ఆస్తి-te-noun-zVVOcEW2",
//         "raw_glosses": [
//             "property, estate, effect, wealth, riches."
//         ]
//     }
// ],
//     "word": "ఆస్తి"
// }
function getRomanization(word) {
    if (!word['forms']) return;
    for (const {form, tags} of word['forms']) {
        if (tags.includes("romanization")) {
            return form;
        }
    }
    // console.error(word, word['forms'])
}

function getDefinitions(word) {
    return word?.['senses']?.flatMap(sense => sense['glosses']);
}

const url = "https://kaikki.org/dictionary/Telugu/kaikki.org-dictionary-Telugu.json"

async function main() {
    const rl = readline.createInterface({input: got.stream(url)});
    const output = []
    rl.on('line', line => {
        let word = JSON.parse(line);
        const teluguWord = word['word'];
        if (!teluguWord) return;
        const romanization = getRomanization(word)
        if (!romanization) return;
        // if (romanization !== 'amma') return;
        let definitions = getDefinitions(word);

        if(!definitions) return;
        const partOfSpeech = word['pos'];
        output.push({teluguWord, romanization, partOfSpeech, definitions})
    })
    await events.once(rl, 'close')

    fs.mkdirSync("assets/data", {recursive: true});
    fs.writeFileSync("assets/data/telugu.json", JSON.stringify(output))
    // output.write(']')
    // output.close()
    // await events.once(output, 'close')

    console.log('done')
}

main();
