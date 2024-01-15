import type { RequestHandler } from './$types';
import prisma from '$lib/server/prisma';
import { fail } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ locals }) => {
  const session = await locals.auth.validate();
  if (!session) return fail(401);

  try {
    const board = await prisma.taskBoard.create({
      data: {
        name: 'Доска',
        user: {
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
