import { useState, useEffect } from 'react';

export default function useSeesionStorage(key:any, initialValue:any) {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.sessionStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(error);
            return initialValue;
        }
    });

    const setValue = (value:any) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error(error);
        }
    };

    return [storedValue, setValue];
}
