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

  type Item = {
    name: string;
    fileName: string;
  };
  type ItemTypes = {
    name: string;
    items: Item[];
  };

  const itemTypes: ItemTypes[] = [
    {
      name: 'Оружие',
      items: [
        {
          name: 'Меч 1',
          fileName: 'sword1.png',
        },
        {
          name: 'Меч 2',
          fileName: 'sword2.png',
        },
        {
          name: 'Меч 3',
          fileName: 'sword3.png',
        },
        {
          name: 'Меч 4',
          fileName: 'sword4.png',
        },
        {
          name: 'Меч 5',
          fileName: 'sword5.png',
        },
        {
          name: 'Волшебная палочка',
          fileName: 'magic_wand.png',
        },
      ],
    },
    {
      name: 'Расходники',
      items: [
        {
          name: 'Подарок',
          fileName: 'gift.png',
        },
        {
          name: 'Оливье',
          fileName: 'olivye.png',
        },
        {
          name: 'Карамельная трость',
          fileName: 'sugar_candy.png',
        },
      ],
    },
    {
      name: 'Снаряжение',
      items: [
        {
          name: 'Носок',
          fileName: 'сhristmas_sock.png',
        },
        {
          name: 'Шарики',
          fileName: 'christmas_toys.png',
        },
        {
          name: 'Ёлка',
          fileName: 'christmas_tree.png',
        },
      ],
    },
  ];
  for (let i = 0; i < itemTypes.length; i++) {
    const itemType = itemTypes[i];

    const typeRecord = await prisma.itemType.upsert({
      where: { name: itemType.name },
      update: {
        name: itemType.name,
      },
      create: {
        name: itemType.name,
      },
    });

    for (let j = 0; j < itemTypes[i].items.length; j++) {
      const item = itemTypes[i].items[j];

      await prisma.item.upsert({
        where: { name: item.name },
        update: {
          name: item.name,
          fileName: item.fileName,
          itemTypeId: typeRecord.id,
          cost: 10,
          description:
            'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Asperiores totam maiores in omnis dignissimos commodi odio ipsam debitis sit nesciunt.',
        },
        create: {
          name: item.name,
          fileName: item.fileName,
          itemTypeId: typeRecord.id,
          cost: 10,
          description:
            'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Asperiores totam maiores in omnis dignissimos commodi odio ipsam debitis sit nesciunt.',
        },
      });
    }
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
