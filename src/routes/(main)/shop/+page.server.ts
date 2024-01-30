import type { Actions, PageServerLoad } from './$types';
import prisma from '$lib/server/prisma';
import { itemBuySchema } from '$lib/zod/schema';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { error, fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ parent }) => {
  await parent();

  return {
    items: await prisma.item.findMany(),
    itemTypes: await prisma.itemType.findMany(),
    itemBuyForm: await superValidate(itemBuySchema),
  };
};

export const actions: Actions = {
  buyItem: async ({ request, locals }) => {
    const session = await locals.auth.validate();
    if (!session) {
      throw redirect(302, '/login');
    }

    const form = await superValidate(request, itemBuySchema);

    if (!form.valid) {
      console.log(form);
      return fail(400, { form });
    }

    const item = form.data;

    try {
      const itemRecord = await prisma.item.findUnique({ where: { id: item.id } });

      const stats = (await prisma.userStats.findUnique({
        where: { userId: session.user.userId },
      }))!;
      const newCoins = stats.coins - itemRecord!.cost;

      if (newCoins < 0) {
        return setError(form, 'Не хватает денег...');
      }

      await prisma.userStats.update({
        where: { userId: session.user.userId },
        data: { coins: newCoins },
      });

      await prisma.usersItems.create({ data: { userId: session.user.userId, itemId: item.id } });

      return { form };
    } catch (err) {
      console.error(err);
      return setError(form, '..........');
    }
  },
};
