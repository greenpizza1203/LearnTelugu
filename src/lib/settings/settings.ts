import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type Dict<T> = Record<string, T>
let key = 'formData';

export function useAsyncStorage<T, R extends Dict<T>>(defaultValue: R): [R, (newKey: string, newValue: T) => void] {
    const [state, setState] = useState<R>(null)


    async function pullFromStorage() {
        const fromStorage = await AsyncStorage.getItem(key)
        const storageValue = fromStorage ? JSON.parse(fromStorage) : defaultValue
        setState(storageValue);
    }

    async function updateStorage(dictKey: string, value: T) {
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
