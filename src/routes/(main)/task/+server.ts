import type { RequestHandler } from './$types';
import prisma from '$lib/server/prisma';
import { fail } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, locals }) => {
  const session = await locals.auth.validate();
  if (!session) return fail(401);

  const { boardId } = await request.json();
  try {
    const task = await prisma.task.create({
      data: {
        title: 'Задача',
        board: {
          connect: {
            id: boardId,
          },
        },
      },
    });
    return new Response(JSON.stringify(task));
  } catch (error) {
    throw fail(404, { message: error });
  }
};
