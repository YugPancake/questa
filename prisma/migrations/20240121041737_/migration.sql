-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PriorityLevel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 1
);
INSERT INTO "new_PriorityLevel" ("id", "name") SELECT "id", "name" FROM "PriorityLevel";
DROP TABLE "PriorityLevel";
ALTER TABLE "new_PriorityLevel" RENAME TO "PriorityLevel";
CREATE UNIQUE INDEX "PriorityLevel_name_key" ON "PriorityLevel"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
