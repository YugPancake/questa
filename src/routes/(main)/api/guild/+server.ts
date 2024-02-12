import type { RequestHandler } from './$types';
import prisma from '$lib/server/prisma';
import { fail } from '@sveltejs/kit';
import { baseHealth } from '$lib/utils/stats';

export const POST: RequestHandler = async ({ locals }) => {
  const session = await locals.auth.validate();
  if (!session) return fail(401);

  try {
    const now = new Date();
    const guild = await prisma.guild.create({
      data: {
        name: `Гильдия ${now.toLocaleDateString('ru-RU')} ${now.toLocaleTimeString('ru-RU')}`,
        leader: {
          connect: {
            id: session.user.userId,
          },
        },
        users: {
          connect: {
            id: session.user.userId,
          },
        },
        bossHealth: baseHealth,
        boss: {
          connect: {
            id: (await prisma.boss.findFirst())!.id,
          },
        },
      },
    });
    return new Response(JSON.stringify(guild));
  } catch (error) {
    throw fail(404, { message: error });
  }
};
