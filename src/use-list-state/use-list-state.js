import { useState } from 'react';
import { bindHandlers } from './handlers';

export default function useListState(initialValue = []) {
  const [state, setState] = useState(initialValue);
  return [state, bindHandlers(setState)];
}
