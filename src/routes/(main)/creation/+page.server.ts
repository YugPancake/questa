import type { Actions, PageServerLoad } from './$types';
import prisma from '$lib/server/prisma';
import { fail, redirect } from '@sveltejs/kit';
import { createCharacterSchema } from '$lib/zod/schema';
import { superValidate, setError } from 'sveltekit-superforms/server';
import { baseHealth } from '$lib/utils/stats';

export const load: PageServerLoad = async ({ parent }) => {
  const data = await parent();

  if (data.user.stats) throw redirect(302, '/');

  return {
    classes: await prisma.characterClass.findMany(),
    avatars: await prisma.avatar.findMany(),
    form: await superValidate(createCharacterSchema),
  };
};

export const actions: Actions = {
  default: async ({ request, locals }) => {
    const session = await locals.auth.validate();
    if (!session) {
      throw redirect(302, '/login');
    }

    const form = await superValidate(request, createCharacterSchema);

    if (!form.valid) {
      return fail(400, { form });
    }

    const { characterClass, avatar } = form.data;

    try {
      await prisma.userStats.create({
        data: {
          health: baseHealth,
          user: {
            connect: {
              id: session.user.userId,
            },
          },
          class: {
            connect: {
              id: characterClass,
            },
          },
          avatar: {
            connect: {
              id: avatar,
            },
          },
        },
      });
    } catch (err) {
      console.error(err);

      const message = 'При создании персонажа возникла ошибка';

      return setError(form, message);
    }

    throw redirect(302, '/');
  },
};
