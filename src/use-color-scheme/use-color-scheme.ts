import { useState, useRef, useEffect } from 'react';

function attachMediaListener(query: MediaQueryList, callback: ({ matches: boolean }) => void) {
  try {
    query.addEventListener('change', callback);
    return () => query.removeEventListener('change', callback);
  } catch (e) {
    query.addListener(callback);
    return () => query.removeListener(callback);
  }
}

export default function useColorScheme() {
  const media = useRef<MediaQueryList>();
  const [scheme, setScheme] = useState<'dark' | 'light'>('light');
  const handleSchemeChange = (query: { matches: boolean }) =>
    setScheme(query.matches ? 'dark' : 'light');

  useEffect(() => {
    media.current = window.matchMedia('(prefers-color-scheme: dark)');
    handleSchemeChange(media.current);
    return attachMediaListener(media.current, handleSchemeChange);
  }, []);

  return scheme;
}
