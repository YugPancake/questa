import { redirect, type Actions, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { auth } from '$lib/server/lucia';
import { superValidate, setError } from 'sveltekit-superforms/server';
import { loginSchema } from '$lib/zod/schema';
import { LuciaError } from 'lucia';

export const load: PageServerLoad = async ({ locals }) => {
  const session = await locals.auth.validate();
  if (session) throw redirect(302, '/');

  const form = await superValidate(loginSchema);
  return { form };
};

export const actions: Actions = {
  default: async ({ request, locals }) => {
    const form = await superValidate(request, loginSchema);

    if (!form.valid) {
      return fail(400, { form });
    }

    const { email, password } = form.data;

    try {
      const key = await auth.useKey('email', email, password);
      const session = await auth.createSession({
        userId: key.userId,
        attributes: {},
      });
      locals.auth.setSession(session);
    } catch (err) {
      console.error(err);

      let message = 'При входе возникла ошибка';

      if (err instanceof LuciaError) {
        if (err.message === 'AUTH_INVALID_KEY_ID' || err.message === 'AUTH_INVALID_PASSWORD') {
          message = 'Неверная почта или пароль';
        }
      }

      return setError(form, message);
    }

    throw redirect(302, '/');
  },
};
