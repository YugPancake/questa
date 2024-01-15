/*
  Warnings:

  - Added the required column `userId` to the `TaskBoard` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TaskBoard" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "TaskBoard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TaskBoard" ("id", "name") SELECT "id", "name" FROM "TaskBoard";
DROP TABLE "TaskBoard";
ALTER TABLE "new_TaskBoard" RENAME TO "TaskBoard";
CREATE UNIQUE INDEX "TaskBoard_id_key" ON "TaskBoard"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
