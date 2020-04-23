import { ValidationError } from "yup";

/**
 * A function that generalizes errors to the same form to simplify error-handling for the frontend
 * @param error A yup validation error holding at least one error (Produced by schema validation)
 * @returns An array holding information about what variable the error occured on and message as to what the error is.
 */
export const formatError = (error: ValidationError) => {
  const errors: Array<{ field: string; message: string }> = [];

  error.inner.forEach((internalError) => {
    errors.push({ field: internalError.path, message: internalError.message });
  });

  return errors;
};
