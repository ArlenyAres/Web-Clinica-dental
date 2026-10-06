import { useState } from 'react';
import type { ChangeEvent, FocusEvent, FormEventHandler } from 'react';

export type FormErrors<T>  = Partial<Record<keyof T, string>>;
export type FormTouched<T> = Partial<Record<keyof T, boolean>>;
export type Validator<T>   = (values: T) => FormErrors<T>;

export interface UseFormReturn<T extends Record<string, string>> {
  values:       T;
  errors:       FormErrors<T>;
  touched:      FormTouched<T>;
  isSubmitting: boolean;
  isSuccess:    boolean;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleBlur:   (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>)  => void;
  handleSubmit: (onSubmit: (values: T) => Promise<void>) => FormEventHandler<HTMLFormElement>;
  reset:        () => void;
}

/**
 * Minimal custom form hook — no external libraries.
 * Handles values, per-field validation on blur, full validation on submit,
 * loading + success states.
 */
export function useForm<T extends Record<string, string>>(
  initialValues: T,
  validate: Validator<T>,
): UseFormReturn<T> {
  const [values,      setValues]      = useState<T>(initialValues);
  const [errors,      setErrors]      = useState<FormErrors<T>>({});
  const [touched,     setTouched]     = useState<FormTouched<T>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess,   setIsSuccess]   = useState(false);

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value } as T));
  }

  function handleBlur(
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(validate(values));
  }

  function handleSubmit(
    onSubmit: (values: T) => Promise<void>,
  ): FormEventHandler<HTMLFormElement> {
    return (e) => {
      e.preventDefault();

      const allErrors = validate(values);
      const allTouched = Object.keys(values).reduce(
        (acc, key) => ({ ...acc, [key]: true }),
        {} as FormTouched<T>,
      );
      setTouched(allTouched);
      setErrors(allErrors);

      if (Object.keys(allErrors).length > 0) return;

      setIsSubmitting(true);
      void onSubmit(values)
        .then(() => {
          setIsSuccess(true);
          setValues(initialValues);
          setTouched({});
          setErrors({});
        })
        .catch(() => {
          // extend with an error state if a real API is wired up
        })
        .finally(() => setIsSubmitting(false));
    };
  }

  function reset() {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSuccess(false);
    setIsSubmitting(false);
  }

  return { values, errors, touched, isSubmitting, isSuccess, handleChange, handleBlur, handleSubmit, reset };
}
