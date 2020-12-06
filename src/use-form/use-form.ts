import React, { useState } from 'react';

type ValidationRule<T> = {
  readonly [P in keyof T]?: (value: T[P]) => boolean;
};

export default function useForm<T extends { [key: string]: any }>({
  initialValues,
  validationRules = {},
}: {
  validationRules?: ValidationRule<T>;
  initialValues: T;
}) {
  const initialErrors =
    validationRules instanceof Object
      ? Object.keys(validationRules).reduce((acc, field) => {
          acc[field] = false;
          return acc;
        }, {})
      : {};

  const [errors, setErrors] = useState(initialErrors);
  const [values, setValues] = useState(initialValues);

  const validate = () => {
    let isValid = true;

    const validationErrors = Object.keys(validationRules).reduce((acc, field) => {
      if (!validationRules[field](values[field])) {
        acc[field] = true;
        isValid = false;
      } else {
        acc[field] = false;
      }

      return acc;
    }, {});

    setErrors(validationErrors);
    return isValid;
  };

  return {
    values,
    errors,
    validate,
    setField: <K extends keyof T, U extends T[K]>(field: K, value: U) =>
      setValues((currentValues) => ({ ...currentValues, [field]: value })),
    invalidateField: (field: keyof T) =>
      setErrors((currentErrors) => ({ ...currentErrors, [field]: false })),
    onSubmit: (onSubmit: (values: T) => any) => (event: React.FormEvent) => {
      event.preventDefault();
      validate() && onSubmit(values);
    },
  };
}
