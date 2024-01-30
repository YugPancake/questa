import type { Actions, PageServerLoad } from './$types';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { boardSchema, taskSchema } from '$lib/zod/schema';
import prisma from '$lib/server/prisma';
import { error, fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ parent }) => {
  const data = await parent();

  const taskForm = await superValidate(taskSchema);
  const boardForm = await superValidate(boardSchema);
  return {
    taskForm,
    boardForm,
    boards: await prisma.taskBoard.findMany({
      where: { userId: data.user.id },
      include: { tasks: { include: { priority: true } } },
    }),
    priorityLevels: await prisma.priorityLevel.findMany({ orderBy: { level: 'asc' } }),
  };
};

export const actions: Actions = {
  saveTask: async ({ request, locals }) => {
    const session = await locals.auth.validate();
    if (!session) {
      throw redirect(302, '/login');
    }

    const form = await superValidate(request, taskSchema);

    if (!form.valid) {
      console.log(form);
      return fail(400, { form });
    }

    const task = form.data;

    console.log(task);

    try {
      const record = await prisma.task.findUniqueOrThrow({
        where: { id: task.id },
        include: { board: true },
      });
      if (record.board.userId !== session.user.userId) {
        throw error(403, 'Не авторизованы');
      }

      await prisma.task.update({
        where: { id: task.id },
        data: { ...task, start: new Date(task.start ?? 0), end: new Date(task.end ?? 0) },
      });

      return { form };
    } catch (err) {
      console.error(err);
      return setError(form, '..........');
    }
  },
  saveBoard: async ({ request, locals }) => {
    const session = await locals.auth.validate();
    if (!session) {
      throw redirect(302, '/login');
    }

    const form = await superValidate(request, boardSchema);

    if (!form.valid) {
      console.log(form);
      return fail(400, { form });
    }

    const board = form.data;

    try {
      const record = await prisma.taskBoard.findUniqueOrThrow({
        where: { id: board.id },
      });
      if (record.userId !== session.user.userId) {
        throw error(403, 'Не авторизованы');
      }

      await prisma.taskBoard.update({
        where: { id: board.id },
        data: board,
      });

      return { form };
    } catch (err) {
      console.error(err);
      return setError(form, '..........');
    }
  },
};
