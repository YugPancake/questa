import type { Actions, PageServerLoad } from './$types';
import prisma from '$lib/server/prisma';
import { error, fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals, parent }) => {
  await parent();

  const session = await locals.auth.validate();
  if (!session) {
    throw redirect(302, '/login');
  }

  return {
    testRecords: await prisma.testRecord.findMany({ where: { userId: session.user.userId } }),
  };
};

export const actions: Actions = {
  createTestRecord: async ({ request, locals }) => {
    const session = await locals.auth.validate();
    if (!session) {
      throw redirect(302, '/login');
    }

    const { title, content } = Object.fromEntries(await request.formData()) as {
      title: string;
      content: string;
    };

    try {
      await prisma.testRecord.create({
        data: { title, content, user: { connect: { id: session.user.userId } } },
      });
    } catch (err) {
      console.error(err);
      return fail(500, { message: 'Не получилось создать...' });
    }

    return { status: 201 };
  },

  updateTestRecord: async ({ url, request, locals }) => {
    const session = await locals.auth.validate();
    if (!session) {
      throw redirect(302, '/login');
    }

    const id = url.searchParams.get('id');
    if (!id) {
      return fail(400, { message: 'Плохой реквест' });
    }

    const { content } = Object.fromEntries(await request.formData()) as {
      content: string;
    };

    try {
      const record = await prisma.testRecord.findUniqueOrThrow({ where: { id: Number(id) } });

      if (record.userId !== session.user.userId) {
        throw error(403, 'Не авторизованы');
      }

      await prisma.testRecord.update({ where: { id: Number(id) }, data: { content } });
    } catch (err) {
      console.error(err);
      return fail(500, { message: 'Не получилось обновить...' });
    }

    return { status: 200 };
  },

  deleteTestRecord: async ({ url, locals }) => {
    const session = await locals.auth.validate();
    if (!session) {
      throw redirect(302, '/login');
    }

    const id = url.searchParams.get('id');
    if (!id) {
      return fail(400, { message: 'Плохой реквест' });
    }

    try {
      const record = await prisma.testRecord.findUniqueOrThrow({ where: { id: Number(id) } });

      if (record.userId !== session.user.userId) {
        throw error(403, 'Не авторизованы');
      }

      await prisma.testRecord.delete({ where: { id: Number(id) } });
    } catch (err) {
      console.error(err);
      return fail(500, { message: 'Не получилось удалить...' });
    }

    return { status: 200 };
  },
};
