import type { RequestHandler } from './$types';
import prisma from '$lib/server/prisma';
import { fail, redirect } from '@sveltejs/kit';

export const PUT: RequestHandler = async ({ request, locals, params }) => {
  const session = await locals.auth.validate();
  if (!session) return fail(401);

  const { value } = await request.json();
  try {
    const board = await prisma.taskBoard.update({ where: { id: params.id }, data: value });
    return new Response(JSON.stringify(board));
  } catch (error) {
    throw fail(404, { message: error });
  }
};

export const GET: RequestHandler = async ({ locals, params }) => {
  const session = await locals.auth.validate();
  if (!session) return fail(401);

  try {
    const board = await prisma.taskBoard.findUnique({ where: { id: params.id } });
    return new Response(JSON.stringify(board));
  } catch (error) {
    throw fail(404, { message: error });
  }
};

export const DELETE: RequestHandler = async ({ locals, params }) => {
  const session = await locals.auth.validate();
  if (!session) return fail(401);

  try {
    await prisma.taskBoard.delete({ where: { id: params.id } });
  } catch (error) {
    throw fail(404, { message: error });
  }
  return new Response();
};
