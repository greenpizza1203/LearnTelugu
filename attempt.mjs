// noinspection NonAsciiCharacters

import clipboardy from "clipboardy";
import {readFileSync} from "fs";

let data = ["యే త్వక్షరమనిర్దేశ్యమవ్యక్తం పర్యుపాసతే",
    "సర్వత్రగమచింత్యం చ కూటస్థమచలం ధ్రువమ్",
    "సన్నియమ్యేంద్రియగ్రామం సర్వత్ర సమబుద్దయః",
    "తే ప్రాప్నువంతి మామేవ సర్వభూతహితే రతాః"]

const contents = readFileSync("temp.html", 'utf-8').split('\n')


const direct = {
    ' ': ' ',
    'ం': 'ṁ',
    'ః': 'ḥ',
    'ఉ': 'u',
    'అ': 'a',
    'ర': 'ra',
    'జ': 'ja',
    'న': 'na',
    'వ': 'va',
    'చ': 'cha',
    'ఏ': 'ē',
    'స': 'sa',
    'త': 'ta',
    'య': 'ya',
    'క': 'ka',
    'భ': 'bha',
    'ప': 'pa',
    'ష': 'ṣha',
    'మ': 'ma',
    'గ': 'ga',
    'శ': 'śha',
    'ద': 'da',
    'ధ': 'dha',
    'ట': 'ṭa',
    'థ': 'tha',
    'ల': 'la',
    'బ': 'ba',
    'హ': 'ha'
}
const swallow = {
    '్': '',
    'ా': 'ā',
    'ి': 'i',
    'ే': 'e',
    'ో': 'o',
    'ు': 'u',
    'ూ': 'ū',


    'ీ': 'ī'

}


function convertLine(line) {
    let output = ""
    for (const char of line) {
        if (char in direct) {
            output += direct[char]
        } else if (char in swallow) {
            output = output.slice(0, -1) + swallow[char]
        } else {
            clipboardy.writeSync(char)
            console.error(char, char.charCodeAt(0), line, output);

            console.log(contents.find(item => item.includes(char.charCodeAt(0))));

            process.exit(0);
        }


    }
    return output
}

for (const line of data) {
    // console.log(1,line)
    console.log(line, convertLine(line))
}

