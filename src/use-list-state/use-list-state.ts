import { useState } from 'react';
import { bindHandlers } from './handlers';

export default function useListState<T>(initialValue: T[] = []) {
  const [state, setState] = useState(initialValue);
  return [state, bindHandlers<T, typeof setState>(setState)];
}
