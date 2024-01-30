import type { LayoutServerLoad } from './$types';
import prisma from '$lib/server/prisma';

export const load: LayoutServerLoad = async ({ locals }) => {
  const session = await locals.auth.validate();

  const stats = await prisma.userStats.findUnique({
    where: { userId: session?.user.userId },
  });

  return {
    session: session,
    stats: stats,
  };
};
