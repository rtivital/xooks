import { useEffect } from 'react';
import isBrowser from '../is-browser';

const DEFAULT_HANDLERS = ['mousedown', 'touchstart'];

export default function useClickOutside(ref, handler, handlers = DEFAULT_HANDLERS) {
  const browser = isBrowser();

  useEffect(() => {
    const listener = event => {
      if (ref.current && !ref.current.contains(event.target)) {
        handler(event);
      }
    };

    browser && handlers.forEach(fn => document.addEventListener(fn, listener));

    return () => {
      browser && handlers.forEach(fn => document.removeEventListener(fn, listener));
    };
  }, [ref, handler]);
}
