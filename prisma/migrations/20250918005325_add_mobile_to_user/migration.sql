/*
  Warnings:

  - A unique constraint covering the columns `[mobile]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `mobile` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable - dodajemy kolumnę jako nullable
ALTER TABLE "public"."users" ADD COLUMN "mobile" TEXT;

-- Aktualizujemy istniejących użytkowników z wartościami domyślnymi
UPDATE "public"."users" SET "mobile" = '000000000' WHERE "mobile" IS NULL;

-- Teraz zmieniamy kolumnę na NOT NULL
ALTER TABLE "public"."users" ALTER COLUMN "mobile" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_mobile_key" ON "public"."users"("mobile");
