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
    "boardId" TEXT NOT NULL,
    CONSTRAINT "Task_priorityLevelId_fkey" FOREIGN KEY ("priorityLevelId") REFERENCES "PriorityLevel" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Task_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "TaskCategory" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Task_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "TaskBoard" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Task" ("boardId", "categoryId", "description", "done", "durationEnabled", "end", "id", "priorityLevelId", "start", "title") SELECT "boardId", "categoryId", "description", "done", "durationEnabled", "end", "id", "priorityLevelId", "start", "title" FROM "Task";
DROP TABLE "Task";
ALTER TABLE "new_Task" RENAME TO "Task";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
