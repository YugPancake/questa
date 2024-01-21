/*
  Warnings:

  - You are about to drop the `Avatar` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `avatarId` on the `UserStats` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Avatar_fileName_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Avatar";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "AvatarLayer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fileName" TEXT NOT NULL,
    "type" INTEGER NOT NULL
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
    "avatarBodyId" INTEGER NOT NULL DEFAULT 0,
    "avatarEyesId" INTEGER NOT NULL DEFAULT 0,
    "avatarOutfitId" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "UserStats_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "UserStats_classId_fkey" FOREIGN KEY ("classId") REFERENCES "CharacterClass" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserStats_avatarBodyId_fkey" FOREIGN KEY ("avatarBodyId") REFERENCES "AvatarLayer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserStats_avatarEyesId_fkey" FOREIGN KEY ("avatarEyesId") REFERENCES "AvatarLayer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserStats_avatarOutfitId_fkey" FOREIGN KEY ("avatarOutfitId") REFERENCES "AvatarLayer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UserStats" ("classId", "coins", "experience", "health", "id", "userId") SELECT "classId", "coins", "experience", "health", "id", "userId" FROM "UserStats";
DROP TABLE "UserStats";
ALTER TABLE "new_UserStats" RENAME TO "UserStats";
CREATE UNIQUE INDEX "UserStats_userId_key" ON "UserStats"("userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "AvatarLayer_fileName_key" ON "AvatarLayer"("fileName");
