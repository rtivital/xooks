import { useRef } from 'react';
import { nanoid } from 'nanoid';

export default function useId(propsId) {
  const generatedId = useRef(`xooks-${nanoid()}`);
  return propsId || generatedId;
}
