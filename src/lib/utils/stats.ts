const amountCoefficient = 0.25; // меньше = больше опыта требуется за уровень
const increaseCoefficient = 2; // больше = сильнее разница между уровнями

export const baseHealth = 100;
const healthIncreasePerLevel = 25;

export const experienceForPriority = [5, 10, 20]
export const healthPenaltyForPriority = [5, 10, 20]
export const coinsForPriority = [5, 10, 20]

export const levelToExperience = (level: number) => {
  return Math.floor(Math.pow(level / amountCoefficient, increaseCoefficient));
};

export const experienceToLevel = (experience: number = 0) => {
  return Math.floor(amountCoefficient * Math.pow(experience, 1 / increaseCoefficient));
};

export const getLevelProgress = (experience: number = 0) => {
  const level = experienceToLevel(experience);
  const currentLevelExperience = levelToExperience(level);
  const nextLevelExperience = levelToExperience(level + 1);

  const needed = nextLevelExperience - currentLevelExperience;
  const earned = experience - currentLevelExperience;
  return { needed, earned };
};

export const getHealth = (level: number) => {
  return baseHealth + healthIncreasePerLevel * level;
};
