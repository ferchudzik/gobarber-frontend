import { ValidationError } from 'yup';

interface IErrors {
  [key: string]: string;
}

const getValidationErrors = (error: ValidationError): IErrors => {
  const validationErrors: IErrors = {};

  error.inner.forEach(err => {
    validationErrors[err.path] = err.message;
  });

  return validationErrors;
};

export default getValidationErrors;
