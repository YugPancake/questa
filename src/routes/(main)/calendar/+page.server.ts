import type { PageServerLoad } from './$types';
import prisma from '$lib/server/prisma';

export const load: PageServerLoad = async ({ parent }) => {
  const data = await parent();

  return {
    tasks: await prisma.task.findMany({
      where: { board: { userId: data.user.id }, durationEnabled: true },
      include: { board: true },
    }),
  };
};
