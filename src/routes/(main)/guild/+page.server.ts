import type { Actions, PageServerLoad } from './$types';
import { error, fail, redirect } from '@sveltejs/kit';
import prisma from '$lib/server/prisma';
import { chatSchema, guildSchema } from '$lib/zod/schema';
import { superValidate, setError } from 'sveltekit-superforms/server';
import { getHealth } from '$lib/utils/stats';

export const load: PageServerLoad = async ({ parent }) => {
  const data = await parent();

  const joinedGuild = await prisma.guild.findFirst({
    where: { users: { some: { id: data.session?.user.userId } } },
    include: {
      messages: { include: { user: true } },
      boss: true,
      logEntries: { include: { user: true } },
      users: {
        include: {
          stats: { include: { avatarBody: true, avatarEyes: true, avatarOutfit: true } },
        },
      },
    },
  });

  const getWeekNumber = (date: Date) => {
    const startDate = new Date(date.getFullYear(), 0, 1);
    const days = Math.floor((date - startDate) / (24 * 60 * 60 * 1000));

    const weekNumber = Math.ceil(days / 7);
    return weekNumber;
  };

  if (joinedGuild) {
    if (getWeekNumber(joinedGuild.updatedAt) < getWeekNumber(new Date())) {
      const maxBossId = (await prisma.boss.findFirst({ orderBy: { id: 'desc' } }))!.id;

      await prisma.guild.update({
        where: { id: joinedGuild.id },
        data: {
          bossId:
            joinedGuild.bossId + 1 > maxBossId
              ? (await prisma.boss.findFirst())!.id
              : joinedGuild.bossId + 1,
          bossHealth: getHealth(joinedGuild.level - 1),
        },
      });

      await prisma.logEntry.deleteMany({ where: { guildId: { equals: joinedGuild.id } } });

      await prisma.logEntry.create({
        data: { guildId: joinedGuild.id, userId: data.session!.user.userId, value: -1 },
      });
    }
  }

  const guildForm = await superValidate(guildSchema);
  const chatForm = await superValidate(chatSchema);
  return {
    guildForm,
    chatForm,
    guilds: await prisma.guild.findMany({ include: { users: true } }),
    joinedGuild,
  };
};

export const actions: Actions = {
  saveGuild: async ({ request, locals }) => {
    const session = await locals.auth.validate();
    if (!session) {
      throw redirect(302, '/login');
    }

    const form = await superValidate(request, guildSchema);

    if (!form.valid) {
      console.log(form);
      return fail(400, { form });
    }

    const guild = form.data;

    try {
      const record = await prisma.guild.findUniqueOrThrow({
        where: { id: guild.id },
      });
      if (record.leaderId !== session.user.userId) {
        throw error(403, 'Не авторизованы');
      }

      await prisma.guild.update({
        where: { id: guild.id },
        data: guild,
      });

      return { form };
    } catch (err) {
      console.error(err);
      return setError(form, '..........');
    }
  },

  sendMessage: async ({ request, locals }) => {
    const session = await locals.auth.validate();
    if (!session) {
      throw redirect(302, '/login');
    }

    const form = await superValidate(request, chatSchema);

    if (!form.valid) {
      console.log(form);
      return fail(400, { form });
    }

    const message = form.data;

    try {
      await prisma.chatMessage.create({
        data: {
          text: message.message,
          guildId: message.guildId,
          userId: session.user.userId,
        },
      });

      return { form };
    } catch (err) {
      console.error(err);
      return setError(form, '..........');
    }
  },
};
