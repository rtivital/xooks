import { useState, useEffect } from 'react';

export default function useIntermediateValue<T>({
  value,
  onChange,
  rule,
  format = (f) => f,
}: {
  value: T;
  onChange: (value: T) => any;
  rule: (value: T) => boolean;
  format: (value: T) => T;
}) {
  const [valid, setValid] = useState(true);
  const [intermediateValue, setIntermediateValue] = useState(value);

  useEffect(() => {
    setIntermediateValue(value);
  }, [value]);

  const handleChange = (val: T) => {
    const isValid = rule(val);
    setIntermediateValue(val);
    setValid(isValid);
    isValid && onChange(format(val));
  };

  const handleSubmit = (val: T) => {
    const isValid = rule(val);
    setValid(true);

    if (isValid) {
      setIntermediateValue(val);
    } else {
      setIntermediateValue(value);
    }
  };

  return {
    valid,
    intermediateValue,
    handleChange,
    handleSubmit,
  };
}
