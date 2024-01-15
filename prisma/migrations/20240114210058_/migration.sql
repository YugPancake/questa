/*
  Warnings:

  - You are about to drop the column `taskBoardId` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `taskCategoryId` on the `Task` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Task" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "durationEnabled" BOOLEAN NOT NULL DEFAULT false,
    "start" DATETIME,
    "end" DATETIME,
    "done" BOOLEAN NOT NULL DEFAULT false,
    "priorityLevelId" INTEGER,
    "categoryId" INTEGER,
    "boardId" TEXT NOT NULL DEFAULT '',
    CONSTRAINT "Task_priorityLevelId_fkey" FOREIGN KEY ("priorityLevelId") REFERENCES "PriorityLevel" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Task_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "TaskCategory" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Task_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "TaskBoard" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Task" ("description", "done", "durationEnabled", "end", "id", "priorityLevelId", "start", "title") SELECT "description", "done", "durationEnabled", "end", "id", "priorityLevelId", "start", "title" FROM "Task";
DROP TABLE "Task";
ALTER TABLE "new_Task" RENAME TO "Task";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
