import prisma from '$lib/server/prisma';
import { baseHealth } from '$lib/utils/stats';
import type { Session } from 'lucia';

type InitUserData = {
  characterClass: number;
  avatar: number;
  session: Session;
};

export const initUser = async (userData: InitUserData) => {
  await prisma.userStats.create({
    data: {
      health: baseHealth,
      user: {
        connect: {
          id: userData.session.user.userId,
        },
      },
      class: {
        connect: {
          id: userData.characterClass,
        },
      },
      avatar: {
        connect: {
          id: userData.avatar,
        },
      },
    },
  });

  // await prisma.taskBoard.create({
  //   data: {
  //     name: 'Задачи',
  //     user: {
  //       connect: {
  //         id: userData.session.user.userId,
  //       },
  //     },
  //   },
  // });
};
