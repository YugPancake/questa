/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `PriorityLevel` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PriorityLevel_name_key" ON "PriorityLevel"("name");
