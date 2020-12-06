import { useState, useRef } from 'react';

export default function useLocalStorage<T>({ key, delay = 500 }: { key: string; delay?: number }) {
  const [saved, setSaved] = useState(true);
  const timeoutRef = useRef<number>();

  const cancel = () => {
    clearTimeout(timeoutRef.current);
  };

  const save = (values: T) => {
    cancel();
    timeoutRef.current = window.setTimeout(() => {
      try {
        localStorage.setItem(key, JSON.stringify(values));
        setSaved(true);
      } catch (e) {
        setSaved(false);
      }
    }, delay);
  };

  const clean = () => {
    cancel();
    localStorage.removeItem(key);
  };

  const retrieve = (): T => {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (e) {
      return null;
    }
  };

  const retrieveAndClean = (): T => {
    const value = retrieve();
    clean();
    return value;
  };

  return { saved, save, clean, cancel, retrieveAndClean, retrieve };
}
