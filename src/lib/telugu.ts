import teluguDict from "../../assets/data/telugu.json";
import GraphemeSplitter from "grapheme-splitter";

export const consonants: Record<number, string> = {
    0xC15: "KA",
    0xC16: "KHA",
    0xC17: "GA",
    0xC18: "GHA",
    0xC19: "NGA",
    0xC1A: "CA",
    0xC1B: "CHA",
    0xC1C: "JA",
    0xC1D: "JHA",
    0xC1E: "NYA",
    0xC1F: "TTA",
    0xC20: "TTHA",
    0xC21: "DDA",
    0xC22: "DDHA",
    0xC23: "NNA",
    0xC24: "TA",
    0xC25: "THA",
    0xC26: "DA",
    0xC27: "DHA",
    0xC28: "NA",
    0xC2A: "PA",
    0xC2B: "PHA",
    0xC2C: "BA",
    0xC2D: "BHA",
    0xC2E: "MA",
    0xC2F: "YA",
    0xC30: "RA",
    0xC31: "RRA",
    0xC32: "LA",
    0xC33: "LLA",
    0xC34: "LLLA",
    0xC35: "VA",
    0xC36: "SHA",
    0xC37: "SSA",
    0xC38: "SA",
    0xC39: "HA",
}

export const independentVowels: Record<number, string> = {
    0xC05: "A",
    0xC06: "AA",
    0xC07: "I",
    0xC08: "II",
    0xC09: "U",
    0xC0A: "UU",
    0xC0B: "VOCALIC R",
    0xC0C: "VOCALIC L",
    0xC0E: "E",
    0xC0F: "EE",
    0xC10: "AI",
    // 0xC11: "",
    0xC12: "O",
    0xC13: "OO",
    0xC14: "AU",
}
export const dependantVowels: Record<number, string> = {
    0xC3E: "AA",
    0xC3F: "I",
    0xC40: "II",
    0xC41: "U",
    0xC42: "UU",
    0xC43: "VOCALIC R",
    0xC44: "VOCALIC RR",
    0xC46: "E",
    0xC47: "EE",
    0xC48: "AI",
    0xC4A: "O",
    0xC4B: "OO",
    0xC4C: "AU",
}

const allLetters = {
    ...independentVowels,
    ...dependantVowels,
    ...consonants
}


const reverse = Object.fromEntries(Object.entries(allLetters).map(([key, value]) => [value, +key]));

export function reverseMap(...letters: string[]) {
    return letters.map(letter => reverse[letter.toUpperCase()]);
}

interface Word {
    teluguWord: string,

}

export function filterByWord(filter: (word: string) => boolean): Word[] {
    return teluguDict.filter(({teluguWord}) => filter(teluguWord))
}

export function filterByCharacters(filter: (char: string) => boolean): Word[] {
    return teluguDict.filter(({teluguWord}) => {
        for (const char of teluguWord) if (!filter(char)) return false;
        return true;
    })

}

const splitter = new GraphemeSplitter();

export function countGraphemes(word: string) {
    return splitter.countGraphemes(word)
}

const ZWS = String.fromCharCode(0x200B);

export function splitGraphemes(word: string) {
    return splitter.splitGraphemes(word).map(grapheme => grapheme.split('').join(ZWS)).join(' ')
}
