import { useRef } from 'react';
import { nanoid } from 'nanoid';

export default function useId(propsId: string) {
  const generatedId = useRef(`xooks-${nanoid()}`);
  return propsId || generatedId.current;
}
