import { ValidationError } from "yup";

export const formatError = (error: ValidationError) => {
  const errors: Array<{ field: string; message: string }> = [];

  console.log(error);
};
