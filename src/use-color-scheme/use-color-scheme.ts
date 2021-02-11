import { useState, useRef, useEffect } from 'react';

export default function useColorScheme() {
  const media = useRef<MediaQueryList>();
  const [scheme, setScheme] = useState<'dark' | 'light'>(media.current.matches ? 'dark' : 'light');
  const handleSchemeChange = (query: { matches: boolean }) =>
    setScheme(query.matches ? 'dark' : 'light');

  useEffect(() => {
    media.current = window.matchMedia('(prefers-color-scheme: dark)');
    media.current.addEventListener('change', handleSchemeChange);
    return () => media.current.removeEventListener('change', handleSchemeChange);
  }, []);

  return scheme;
}
