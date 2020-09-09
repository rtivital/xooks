import { useState } from 'react';

export default function useForm({ validationRules, initialValues }) {
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
    setField: (field, value) => setValues(currentValues => ({ ...currentValues, [field]: value })),
    invalidateField: field => setErrors(currentErrors => ({ ...currentErrors, [field]: false })),
    onSubmit: onSubmit => event => {
      event.preventDefault();
      validate() && onSubmit(values);
    },
  };
}
