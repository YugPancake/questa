import { redirect, type Actions, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { auth } from '$lib/server/lucia';
import { signupSchema } from '$lib/zod/schema';
import { superValidate, setError } from 'sveltekit-superforms/server';
import { Prisma } from '@prisma/client';

export const load: PageServerLoad = async ({ locals }) => {
  const session = await locals.auth.validate();
  if (session) throw redirect(302, '/');

  const form = await superValidate(signupSchema);
  return { form };
};

export const actions: Actions = {
  default: async ({ request }) => {
    const form = await superValidate(request, signupSchema);

    if (!form.valid) {
      return fail(400, { form });
    }

    const { name, email, password } = form.data;

    try {
      await auth.createUser({
        key: { providerId: 'email', providerUserId: form.data.email, password },
        attributes: {
          name,
          email: email.toLowerCase(),
        },
      });
    } catch (err) {
      console.error(err);
      let message = 'При регистрации возникла ошибка';

      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          message = 'Пользователь с такой почтой уже существует';
        }
      }

      return setError(form, message);
    }

    throw redirect(302, '/login');
  },
};
