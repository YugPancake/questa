-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_LogEntry" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "guildId" TEXT NOT NULL,
    CONSTRAINT "LogEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "LogEntry_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guild" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_LogEntry" ("createdAt", "guildId", "id", "userId", "value") SELECT "createdAt", "guildId", "id", "userId", coalesce("value", 0) AS "value" FROM "LogEntry";
DROP TABLE "LogEntry";
ALTER TABLE "new_LogEntry" RENAME TO "LogEntry";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
