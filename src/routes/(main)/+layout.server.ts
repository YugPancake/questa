import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import prisma from '$lib/server/prisma';

export const load: LayoutServerLoad = async ({ locals, url }) => {
  const session = await locals.auth.validate();
  if (!session) throw redirect(302, '/signup');

  const user = (await prisma.user.findUnique({
    where: { id: session.user.userId },
    include: {
      stats: { include: { class: true, avatarBody: true, avatarEyes: true, avatarOutfit: true } },
    },
  }))!;

  if (!user.stats && !url.href.includes('creation')) throw redirect(302, '/creation');

  return {
    sesstionUser: session.user,
    user,
  };
};
