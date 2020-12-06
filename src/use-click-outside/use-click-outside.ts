import React, { useEffect } from 'react';
import isBrowser from '../is-browser';

const DEFAULT_HANDLERS = ['mousedown', 'touchstart'];

export default function useClickOutside(
  ref: React.RefObject<HTMLElement>,
  handler: () => void,
  handlers = DEFAULT_HANDLERS
) {
  const browser = isBrowser();

  useEffect(() => {
    const listener = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handler();
      }
    };

    browser && handlers.forEach((fn) => document.addEventListener(fn, listener));

    return () => {
      browser && handlers.forEach((fn) => document.removeEventListener(fn, listener));
    };
  }, [ref, handler]);
}
