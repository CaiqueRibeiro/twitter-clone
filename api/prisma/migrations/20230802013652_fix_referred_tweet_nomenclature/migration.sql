/*
  Warnings:

  - You are about to drop the column `refered_tweet_id` on the `tweets` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_tweets" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "author_id" TEXT NOT NULL,
    "referred_tweet_id" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "tweets_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "tweets_referred_tweet_id_fkey" FOREIGN KEY ("referred_tweet_id") REFERENCES "tweets" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_tweets" ("active", "author_id", "content", "created_at", "id", "updated_at") SELECT "active", "author_id", "content", "created_at", "id", "updated_at" FROM "tweets";
DROP TABLE "tweets";
ALTER TABLE "new_tweets" RENAME TO "tweets";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
