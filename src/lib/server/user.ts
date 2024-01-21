import prisma from '$lib/server/prisma';
import { baseHealth } from '$lib/utils/stats';
import type { Session } from 'lucia';

type InitUserData = {
  characterClass: number;
  avatarBody: number;
  avatarEyes: number;
  avatarOutfit: number;
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
      avatarBody: {
        connect: {
          id: userData.avatarBody,
        },
      },
      avatarEyes: {
        connect: {
          id: userData.avatarEyes,
        },
      },
      avatarOutfit: {
        connect: {
          id: userData.avatarOutfit,
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
