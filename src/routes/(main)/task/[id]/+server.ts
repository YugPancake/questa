import type { RequestHandler } from './$types';
import prisma from '$lib/server/prisma';
import { fail } from '@sveltejs/kit';
import {
  experienceForPriority,
  healthPenaltyForPriority,
  experienceToLevel,
  getHealth,
  coinsForPriority,
} from '$lib/utils/stats';

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

    const task = await prisma.task.findUnique({
      where: { id: params.id },
      include: { priority: true },
    });

    if (task?.priority) {
      const stats = (await prisma.userStats.findUnique({
        where: { userId: session.user.userId },
      }))!;
      const healthDifference = getHealth(experienceToLevel(stats.experience)) - stats.health;
      const newExperience =
        stats.experience + experienceForPriority[task.priority.level - 1] * (value ? 1 : -1);
      const newHealth = getHealth(experienceToLevel(newExperience)) - healthDifference;
      const newCoins = stats.coins + coinsForPriority[task.priority.level - 1] * (value ? 1 : -1);

      await prisma.userStats.update({
        where: { userId: session.user.userId },
        data: { experience: newExperience, health: newHealth, coins: newCoins },
      });
    }

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
    // const task = await prisma.task.findUnique({
    //   where: { id: params.id },
    //   include: { priority: true },
    // });

    // if (task?.priority) {
    //   const stats = (await prisma.userStats.findUnique({
    //     where: { userId: session.user.userId },
    //   }))!;
    //   const healthPenalty = healthPenaltyForPriority[task.priority.level - 1];
    //   const newHealth = stats.health - healthPenalty;

    //   await prisma.userStats.update({
    //     where: { userId: session.user.userId },
    //     data: { health: newHealth < 0 ? 0 : newHealth },
    //   });
    // }

    await prisma.task.delete({ where: { id: params.id } });
  } catch (error) {
    throw fail(404, { message: error });
  }
  return new Response();
};