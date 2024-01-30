import type { PageServerLoad } from './$types';
import prisma from '$lib/server/prisma';

export const load: PageServerLoad = async ({ parent }) => {
  const data = await parent();

  return {
    usersItems: await prisma.usersItems.findMany({
      where: { userId: data.session?.user.userId },
      include: { item: true },
    }),
    itemTypes: await prisma.itemType.findMany(),
  };
};
