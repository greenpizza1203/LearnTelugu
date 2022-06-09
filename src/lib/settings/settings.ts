import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

let key = 'formData';
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
export function useAsyncSettings(): [typeof defaultFormData, (newKey: string, newValue: boolean) => void] {
    const [state, setState] = useState(null)


    async function pullFromStorage() {
        const fromStorage = await AsyncStorage.getItem(key)
        const storageValue = fromStorage ? JSON.parse(fromStorage) : defaultFormData
        setState(storageValue);
    }

    async function updateStorage(dictKey: string, value: boolean) {
        const mergedValue = {...state, [dictKey]: value}
        setState(mergedValue);

        await AsyncStorage.setItem(key, JSON.stringify(mergedValue));
    }

    useEffect(() => void pullFromStorage(), []);

    return [state, updateStorage];
}


export async function getSettings() {
    const data = await AsyncStorage.getItem(key)
    return JSON.parse(data)
}
