/*
  Warnings:

  - You are about to drop the column `userId` on the `tweets` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "followers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "followerId" TEXT NOT NULL,
    "followeeId" TEXT NOT NULL,
    CONSTRAINT "followers_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "followers_followeeId_fkey" FOREIGN KEY ("followeeId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "feeds" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "feeds_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "feed_tweets" (
    "fk_id_tweet" TEXT NOT NULL,
    "fk_id_feed" TEXT NOT NULL,

    PRIMARY KEY ("fk_id_tweet", "fk_id_feed"),
    CONSTRAINT "feed_tweets_fk_id_tweet_fkey" FOREIGN KEY ("fk_id_tweet") REFERENCES "tweets" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "feed_tweets_fk_id_feed_fkey" FOREIGN KEY ("fk_id_feed") REFERENCES "feeds" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_tweets" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "content" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    CONSTRAINT "tweets_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_tweets" ("authorId", "content", "created_at", "id", "updated_at") SELECT "authorId", "content", "created_at", "id", "updated_at" FROM "tweets";
DROP TABLE "tweets";
ALTER TABLE "new_tweets" RENAME TO "tweets";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
