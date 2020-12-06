import { useState, useEffect } from 'react';

const media = window.matchMedia('(prefers-color-scheme: dark)');

export default function useColorScheme() {
  const [scheme, setScheme] = useState<'dark' | 'light'>(media.matches ? 'dark' : 'light');
  const handleSchemeChange = (query: { matches: boolean }) =>
    setScheme(query.matches ? 'dark' : 'light');

  useEffect(() => {
    media.addEventListener('change', handleSchemeChange);
    return () => media.removeEventListener('change', handleSchemeChange);
  }, []);

  return scheme;
}
