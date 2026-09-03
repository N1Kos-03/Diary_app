// hooks/use-localstorage.hook.js
import { useState } from 'react';

export function useLocalStorage(key, initialValue = []) {
  const [data, setData] = useState(() => {
    const stored = localStorage.getItem(key);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return parsed.map(i => ({ ...i, date: new Date(i.date) }));
      } catch (e) {
        console.error('Ошибка парсинга localStorage', e);
        return initialValue;
      }
    }
    return initialValue;
  });

  const saveData = (newData) => {
    try {
      localStorage.setItem(key, JSON.stringify(newData));
      setData(newData);
    } catch (e) {
      console.error('Ошибка записи в localStorage', e);
    }
  };

  return [data, saveData];
}
