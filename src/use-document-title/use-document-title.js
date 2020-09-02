import { useLayoutEffect } from 'react';
import isBrowser from '../is-browser';

export default function useDocumentTitle(title) {
  useLayoutEffect(() => {
    if (isBrowser()) {
      document.title = title;
    }
  }, [title]);
}
