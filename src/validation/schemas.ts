import * as z from 'zod';

export const fieldNameSchema = z.string().min(1, { message: 'Field name is required' });
export const descriptionSchema = z.string().min(10, { message: 'Description must be at least 10 characters long' });

export const FormSchema = z.object({
  fieldName: fieldNameSchema,
  description: descriptionSchema,
});