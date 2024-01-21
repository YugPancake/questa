import type { Actions, PageServerLoad } from './$types';
import prisma from '$lib/server/prisma';
import { fail, redirect } from '@sveltejs/kit';
import { createCharacterSchema } from '$lib/zod/schema';
import { superValidate, setError } from 'sveltekit-superforms/server';
import { initUser } from '$lib/server/user';

export const load: PageServerLoad = async ({ parent }) => {
  const data = await parent();

  if (data.user.stats) throw redirect(302, '/');

  return {
    classes: await prisma.characterClass.findMany(),
    avatarBodies: await prisma.avatarLayer.findMany({ where: { type: 0 } }),
    avatarEyeSets: await prisma.avatarLayer.findMany({ where: { type: 1 } }),
    avatarOutfits: await prisma.avatarLayer.findMany({ where: { type: 2 } }),
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

    const { characterClass, avatarBody, avatarEyes, avatarOutfit } = form.data;

    try {
      await initUser({ characterClass, avatarBody, avatarEyes, avatarOutfit, session });
    } catch (err) {
      console.error(err);

      const message = 'При создании персонажа возникла ошибка';

      return setError(form, message);
    }

    throw redirect(302, '/');
  },
};
