import * as z from 'zod';

export const FormSchema = z.object({
  fieldName: z.string().min(1, { message: 'Field name is required' }),
});

export const validateForm = (data: { fieldName: string }) => {
  try {
    FormSchema.parse(data);
    return [];
  } catch (e) {
    return (e as z.ZodError).errors.map((error) => ({ message: error.message }));
  }
};
