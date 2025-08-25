/*
  Warnings:

  - You are about to drop the column `description` on the `Movie` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Comment" DROP CONSTRAINT "Comment_movieId_fkey";

-- AlterTable
ALTER TABLE "public"."Movie" DROP COLUMN "description",
ADD COLUMN     "genre" TEXT,
ADD COLUMN     "year" INTEGER;

-- AddForeignKey
ALTER TABLE "public"."Comment" ADD CONSTRAINT "Comment_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "public"."Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;
