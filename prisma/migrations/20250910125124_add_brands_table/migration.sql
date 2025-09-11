-- CreateTable
CREATE TABLE "public"."brands" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "logoUrl" TEXT NOT NULL,

    CONSTRAINT "brands_pkey" PRIMARY KEY ("id")
);

-- Create a default brand for existing products
INSERT INTO "public"."brands" ("id", "name", "logoUrl") VALUES ('default-brand', 'Default Brand', 'https://via.placeholder.com/100x100');

-- AlterTable
ALTER TABLE "public"."products" ADD COLUMN     "brandId" TEXT NOT NULL DEFAULT 'default-brand',
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "public"."products" ADD CONSTRAINT "products_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "public"."brands"("id") ON DELETE CASCADE ON UPDATE CASCADE;
