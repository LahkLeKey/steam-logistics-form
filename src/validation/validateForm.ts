import { z } from 'zod';
import { FormSchema } from './schemas';

export const validateForm = (data: { fieldName: string; description: string }) => {
    try {
      FormSchema.parse(data);
      return [];
    } catch (e) {
      return (e as z.ZodError).errors.map((error) => ({
        path: error.path,
        message: error.message,
      }));
    }
  };
