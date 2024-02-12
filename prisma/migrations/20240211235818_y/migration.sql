-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Guild" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "leaderId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 1,
    "bossId" INTEGER NOT NULL DEFAULT 1,
    "bossHealth" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Guild_leaderId_fkey" FOREIGN KEY ("leaderId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Guild_bossId_fkey" FOREIGN KEY ("bossId") REFERENCES "Boss" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Guild" ("bossHealth", "bossId", "createdAt", "id", "leaderId", "level", "name", "updatedAt") SELECT "bossHealth", "bossId", "createdAt", "id", "leaderId", "level", "name", "updatedAt" FROM "Guild";
DROP TABLE "Guild";
ALTER TABLE "new_Guild" RENAME TO "Guild";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
