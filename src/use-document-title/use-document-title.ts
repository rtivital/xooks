import { useLayoutEffect } from 'react';
import isBrowser from '../is-browser';

export default function useDocumentTitle(title: string) {
  useLayoutEffect(() => {
    if (isBrowser()) {
      document.title = title;
    }
  }, [title]);
}
