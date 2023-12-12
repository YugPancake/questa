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

  const avatars = [
    { fileName: 'quefir.png', alt: 'Описание картинки' },
    { fileName: 'test.png', alt: 'Описание картинки' },
    { fileName: 'noooo.gif', alt: 'Описание картинки' },
  ];
  for (let i = 0; i < avatars.length; i++) {
    const avatar = avatars[i];

    await prisma.avatar.upsert({
      where: { fileName: avatar.fileName },
      update: {
        fileName: avatar.fileName,
        alt: avatar.alt,
      },
      create: {
        fileName: avatar.fileName,
        alt: avatar.alt,
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
