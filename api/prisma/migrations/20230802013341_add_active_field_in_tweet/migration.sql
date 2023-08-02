/*
  Warnings:

  - Added the required column `active` to the `tweets` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_tweets" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "author_id" TEXT NOT NULL,
    "refered_tweet_id" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "tweets_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "tweets_refered_tweet_id_fkey" FOREIGN KEY ("refered_tweet_id") REFERENCES "tweets" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_tweets" ("author_id", "content", "created_at", "id", "refered_tweet_id", "updated_at") SELECT "author_id", "content", "created_at", "id", "refered_tweet_id", "updated_at" FROM "tweets";
DROP TABLE "tweets";
ALTER TABLE "new_tweets" RENAME TO "tweets";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
