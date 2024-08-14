-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Debt" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "date" DATETIME NOT NULL,
    "numeroParcelas" INTEGER NOT NULL DEFAULT 1,
    "parcelaAtual" INTEGER NOT NULL DEFAULT 1,
    "cardId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Debt_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Debt" ("amount", "cardId", "createdAt", "date", "id", "name", "updatedAt") SELECT "amount", "cardId", "createdAt", "date", "id", "name", "updatedAt" FROM "Debt";
DROP TABLE "Debt";
ALTER TABLE "new_Debt" RENAME TO "Debt";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
