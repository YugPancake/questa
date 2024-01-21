import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const classes = ['Класс 1', 'Класс 2'];
  for (let i = 0; i < classes.length; i++) {
    const className = classes[i];

    await prisma.characterClass.upsert({
      where: { name: className },
      update: {
        name: className,
      },
      create: {
        name: className,
      },
    });
  }

  const bodies = [
    'cat1.png',
    'cat2.png',
    'cat3.png',
    'dog1.png',
    'dog2.png',
    'dog3.png',
    'rabbit1.png',
    'rabbit2.png',
    'rabbit3.png',
  ];
  const eyes = [
    'eye1_blue.png',
    'eye1_brown.png',
    'eye1_green.png',
    'eye2_blue.png',
    'eye2_brown.png',
    'eye2_green.png',
  ];
  const outfits = [
    'outfit1_blue.png',
    'outfit1_green.png',
    'outfit1_pink.png',
    'outfit2_blue.png',
    'outfit2_green.png',
    'outfit2_pink.png',
    'outfit3_blue.png',
    'outfit3_green.png',
    'outfit3_pink.png',
  ];
  const avatarLayers = [
    ...bodies.map((a) => {
      return { fileName: a, type: 0 };
    }),
    ...eyes.map((a) => {
      return { fileName: a, type: 1 };
    }),
    ...outfits.map((a) => {
      return { fileName: a, type: 2 };
    }),
  ];

  for (let i = 0; i < avatarLayers.length; i++) {
    const avatarLayer = avatarLayers[i];

    await prisma.avatarLayer.upsert({
      where: { fileName: avatarLayer.fileName },
      update: avatarLayer,
      create: avatarLayer,
    });
  }

  const priorities = ['Низкий', 'Средний', 'Высокий'];
  for (let i = 0; i < priorities.length; i++) {
    const priority = priorities[i];

    await prisma.priorityLevel.upsert({
      where: { name: priority },
      update: {
        name: priority,
        level: i + 1,
      },
      create: {
        name: priority,
        level: i + 1,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
