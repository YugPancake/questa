-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "start" DATETIME NOT NULL,
    "end" DATETIME NOT NULL,
    "allDay" BOOLEAN NOT NULL,
    "done" BOOLEAN NOT NULL,
    "priorityLevelId" INTEGER NOT NULL,
    "taskCategoryId" INTEGER NOT NULL,
    "taskBoardId" TEXT NOT NULL,
    CONSTRAINT "Task_priorityLevelId_fkey" FOREIGN KEY ("priorityLevelId") REFERENCES "PriorityLevel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Task_taskCategoryId_fkey" FOREIGN KEY ("taskCategoryId") REFERENCES "TaskCategory" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Task_taskBoardId_fkey" FOREIGN KEY ("taskBoardId") REFERENCES "TaskBoard" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PriorityLevel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "TaskCategory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "TaskBoard" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Task_id_key" ON "Task"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TaskBoard_id_key" ON "TaskBoard"("id");
