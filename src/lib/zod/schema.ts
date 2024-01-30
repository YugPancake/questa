import { z } from 'zod';

const customErrorMap: z.ZodErrorMap = (error, ctx) => {
  let message = ctx.defaultError;
  switch (error.code) {
    case z.ZodIssueCode.too_small:
      message = `Поле должно быть заполнено`;
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

export const createCharacterSchema = z.object({
  characterClass: z.number().int().nonnegative().default(-1),
  avatarBody: z.number().int().nonnegative().default(-1),
  avatarEyes: z.number().int().nonnegative().default(-1),
  avatarOutfit: z.number().int().nonnegative().default(-1),
});

export const testRecordSchema = z.object({
  title: z.string().trim().min(1).max(255),
  content: z.string().trim().min(1).max(255),
});

export const taskSchema = z.object({
  id: z.string().optional(),
  title: z.string().trim().min(1),
  description: z.string().nullable().optional(),
  start: z.string().optional(),
  end: z.string().optional(),
  durationEnabled: z.boolean().optional(),
  priorityLevelId: z.number().int().nullable().optional(),
  // categoryId: z.number().int().optional(),
  boardId: z.string(),
});

export const boardSchema = z.object({
  id: z.string().optional(),
  name: z.string().trim().min(1),
  // userId: z.string(),
});

export const itemBuySchema = z.object({
  id: z.number().int().nonnegative().default(-1),
});