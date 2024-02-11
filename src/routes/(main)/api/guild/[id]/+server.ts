import type { RequestHandler } from './$types';
import prisma from '$lib/server/prisma';
import { fail, redirect } from '@sveltejs/kit';

export const PUT: RequestHandler = async ({ request, locals, params }) => {
  const session = await locals.auth.validate();
  if (!session) return fail(401);

  const { value } = await request.json();
  try {
    const guild = await prisma.guild.update({ where: { id: params.id }, data: value });
    return new Response(JSON.stringify(guild));
  } catch (error) {
    throw fail(404, { message: error });
  }
};

export const GET: RequestHandler = async ({ locals, params }) => {
  const session = await locals.auth.validate();
  if (!session) return fail(401);

  try {
    const guild = await prisma.guild.findUnique({ where: { id: params.id } });
    return new Response(JSON.stringify(guild));
  } catch (error) {
    throw fail(404, { message: error });
  }
};

export const DELETE: RequestHandler = async ({ locals, params }) => {
  const session = await locals.auth.validate();
  if (!session) return fail(401);

  try {
    await prisma.guild.delete({ where: { id: params.id } });
  } catch (error) {
    throw fail(404, { message: error });
  }
  return new Response();
};

export const POST: RequestHandler = async ({ request, locals, params }) => {
  const session = await locals.auth.validate();
  if (!session) return fail(401);

  const { join, leave } = await request.json();
  try {
    if (join) {
      await prisma.guild.update({
        where: { id: params.id },
        data: { users: { connect: { id: session.user.userId } } },
      });
    }
    if (leave) {
      await prisma.guild.update({
        where: { id: params.id },
        data: { users: { disconnect: { id: session.user.userId } } },
      });
    }
    return new Response();
  } catch (error) {
    throw fail(404, { message: error });
  }
};
