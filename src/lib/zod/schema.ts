import { z } from 'zod';

const customErrorMap: z.ZodErrorMap = (error, ctx) => {
  let message = ctx.defaultError;
  switch (error.code) {
    case z.ZodIssueCode.too_small:
      message = `Слишком короткое`;
      break;
    case z.ZodIssueCode.too_big:
      message = `Слишком длинное`;
      break;
    case z.ZodIssueCode.invalid_string:
      if (error.validation !== 'regex') {
        message = `Некорректный ${error.validation}`;
      }
      break;
  }

  return { message };
};

z.setErrorMap(customErrorMap);

export const loginSchema = z.object({
  email: z.string().trim().min(1).max(255).toLowerCase().email(),
  password: z.string().trim().min(1).max(255),
});

export const signupSchema = z.object({
  name: z.string().trim().min(1).max(255),
  email: z.string().trim().min(1).max(255).toLowerCase().email(),
  password: z.string().trim().min(1).max(255),
});

export const testRecordSchema = z.object({
  title: z.string().trim().min(1).max(255),
  content: z.string().trim().min(1).max(255),
});
