-- DropIndex
DROP INDEX "AvatarLayer_fileName_key";

-- CreateTable
CREATE TABLE "ItemType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "itemTypeId" INTEGER NOT NULL,
    CONSTRAINT "Item_itemTypeId_fkey" FOREIGN KEY ("itemTypeId") REFERENCES "ItemType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserStats" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT,
    "health" INTEGER NOT NULL DEFAULT 0,
    "experience" INTEGER NOT NULL DEFAULT 0,
    "coins" INTEGER NOT NULL DEFAULT 0,
    "classId" INTEGER NOT NULL,
    "avatarBodyId" INTEGER NOT NULL,
    "avatarEyesId" INTEGER NOT NULL,
    "avatarOutfitId" INTEGER NOT NULL,
    CONSTRAINT "UserStats_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "UserStats_classId_fkey" FOREIGN KEY ("classId") REFERENCES "CharacterClass" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserStats_avatarBodyId_fkey" FOREIGN KEY ("avatarBodyId") REFERENCES "AvatarLayer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserStats_avatarEyesId_fkey" FOREIGN KEY ("avatarEyesId") REFERENCES "AvatarLayer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserStats_avatarOutfitId_fkey" FOREIGN KEY ("avatarOutfitId") REFERENCES "AvatarLayer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UserStats" ("avatarBodyId", "avatarEyesId", "avatarOutfitId", "classId", "coins", "experience", "health", "id", "userId") SELECT "avatarBodyId", "avatarEyesId", "avatarOutfitId", "classId", "coins", "experience", "health", "id", "userId" FROM "UserStats";
DROP TABLE "UserStats";
ALTER TABLE "new_UserStats" RENAME TO "UserStats";
CREATE UNIQUE INDEX "UserStats_userId_key" ON "UserStats"("userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
