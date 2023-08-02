/*
  Warnings:

  - You are about to drop the column `authorId` on the `tweets` table. All the data in the column will be lost.
  - The primary key for the `feed_tweets` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `fk_id_feed` on the `feed_tweets` table. All the data in the column will be lost.
  - You are about to drop the column `fk_id_tweet` on the `feed_tweets` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `feeds` table. All the data in the column will be lost.
  - The primary key for the `followers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `followeeId` on the `followers` table. All the data in the column will be lost.
  - You are about to drop the column `followerId` on the `followers` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `followers` table. All the data in the column will be lost.
  - Added the required column `author_id` to the `tweets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `feed_id` to the `feed_tweets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tweet_id` to the `feed_tweets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profile_image` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `feeds` table without a default value. This is not possible if the table is not empty.
  - Added the required column `followee_id` to the `followers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `follower_id` to the `followers` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "likes" (
    "tweet_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("tweet_id", "user_id"),
    CONSTRAINT "likes_tweet_id_fkey" FOREIGN KEY ("tweet_id") REFERENCES "tweets" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "likes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "replies" (
    "tweet_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "content" TEXT,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("tweet_id", "user_id"),
    CONSTRAINT "replies_tweet_id_fkey" FOREIGN KEY ("tweet_id") REFERENCES "tweets" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "replies_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_tweets" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT NOT NULL,
    "author_id" TEXT NOT NULL,
    "refered_tweet_id" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "tweets_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "tweets_refered_tweet_id_fkey" FOREIGN KEY ("refered_tweet_id") REFERENCES "tweets" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_tweets" ("content", "created_at", "id", "updated_at") SELECT "content", "created_at", "id", "updated_at" FROM "tweets";
DROP TABLE "tweets";
ALTER TABLE "new_tweets" RENAME TO "tweets";
CREATE TABLE "new_feed_tweets" (
    "tweet_id" TEXT NOT NULL,
    "feed_id" TEXT NOT NULL,

    PRIMARY KEY ("tweet_id", "feed_id"),
    CONSTRAINT "feed_tweets_tweet_id_fkey" FOREIGN KEY ("tweet_id") REFERENCES "tweets" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "feed_tweets_feed_id_fkey" FOREIGN KEY ("feed_id") REFERENCES "feeds" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
DROP TABLE "feed_tweets";
ALTER TABLE "new_feed_tweets" RENAME TO "feed_tweets";
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "profile_image" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_users" ("email", "id", "username") SELECT "email", "id", "username" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");
CREATE TABLE "new_feeds" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "feeds_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_feeds" ("id", "updated_at") SELECT "id", "updated_at" FROM "feeds";
DROP TABLE "feeds";
ALTER TABLE "new_feeds" RENAME TO "feeds";
CREATE TABLE "new_followers" (
    "follower_id" TEXT NOT NULL,
    "followee_id" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("follower_id", "followee_id"),
    CONSTRAINT "followers_follower_id_fkey" FOREIGN KEY ("follower_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "followers_followee_id_fkey" FOREIGN KEY ("followee_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
DROP TABLE "followers";
ALTER TABLE "new_followers" RENAME TO "followers";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
