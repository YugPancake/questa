/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Boss` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[fileName]` on the table `Boss` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Boss_name_key" ON "Boss"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Boss_fileName_key" ON "Boss"("fileName");
