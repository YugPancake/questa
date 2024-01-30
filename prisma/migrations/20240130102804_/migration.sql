/*
  Warnings:

  - You are about to drop the `_ItemToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_ItemToUser";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "UsersItems" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT,
    "itemId" INTEGER,
    CONSTRAINT "UsersItems_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "UsersItems_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "UsersItems_userId_itemId_idx" ON "UsersItems"("userId", "itemId");
