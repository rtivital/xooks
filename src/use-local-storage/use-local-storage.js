import { useState, useRef } from 'react';

export default function useLocalStorage({ key, delay }) {
  const [saved, setSaved] = useState(true);
  const timeoutRef = useRef(null);

  const cancel = () => {
    global.clearTimeout(timeoutRef.current);
  };

  const save = (values) => {
    cancel();
    timeoutRef.current = setTimeout(() => {
      try {
        global.localStorage.setItem(key, JSON.stringify(values));
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

  const retrieve = () => {
    try {
      return JSON.parse(global.localStorage.getItem(key));
    } catch (e) {
      return null;
    }
  };

  const retrieveAndClean = () => {
    const value = retrieve();
    clean();
    return value;
  };

  return { saved, save, clean, cancel, retrieveAndClean, retrieve };
}
