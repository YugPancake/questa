import type { RequestHandler } from './$types';
import prisma from '$lib/server/prisma';
import { fail, redirect } from '@sveltejs/kit';

export const PUT: RequestHandler = async ({ request, locals, params }) => {
  const session = await locals.auth.validate();
  if (!session) return fail(401);

  const { value } = await request.json();
  try {
    const task = await prisma.task.update({ where: { id: params.id }, data: value });
    return new Response(JSON.stringify(task));
  } catch (error) {
    throw fail(404, { message: error });
  }
};

export const PATCH: RequestHandler = async ({ request, locals, params }) => {
  const session = await locals.auth.validate();
  if (!session) return fail(401);

  const { value } = await request.json();
  try {
    await prisma.task.update({ where: { id: params.id }, data: { done: value } });
    return new Response();
  } catch (error) {
    throw fail(404, { message: error });
  }
};

export const GET: RequestHandler = async ({ locals, params }) => {
  const session = await locals.auth.validate();
  if (!session) return fail(401);

  try {
    const task = await prisma.task.findUnique({ where: { id: params.id } });
    return new Response(JSON.stringify(task));
  } catch (error) {
    throw fail(404, { message: error });
  }
};

export const DELETE: RequestHandler = async ({ locals, params }) => {
  const session = await locals.auth.validate();
  if (!session) return fail(401);

  try {
    await prisma.task.delete({ where: { id: params.id } });
  } catch (error) {
    throw fail(404, { message: error });
  }
  return new Response();
};
