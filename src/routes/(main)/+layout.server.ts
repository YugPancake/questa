import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import prisma from '$lib/server/prisma';

export const load: LayoutServerLoad = async ({ locals, url }) => {
  const session = await locals.auth.validate();
  if (!session) throw redirect(302, '/login');

  const user = (await prisma.user.findUnique({
    where: { id: session.user.userId },
    include: { stats: { include: { class: true, avatar: true } } },
  }))!;

  if (!user.stats && !url.href.includes('creation'))
    throw redirect(302, '/creation');

  return {
    sesstionUser: session.user,
    user,
  };
};
