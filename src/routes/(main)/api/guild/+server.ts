import type { RequestHandler } from './$types';
import prisma from '$lib/server/prisma';
import { fail } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ locals }) => {
  const session = await locals.auth.validate();
  if (!session) return fail(401);

  try {
    const now = new Date();
    const board = await prisma.guild.create({
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
      },
    });
    return new Response(JSON.stringify(board));
  } catch (error) {
    throw fail(404, { message: error });
  }
};
