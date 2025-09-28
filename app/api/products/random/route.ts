import { NextResponse } from "next/server";
import { PrismaClient } from "../../../generated/prisma";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const allProducts = await prisma.product.findMany({
      where: {
        stock: { gt: 0 },
      },
      include: {
        category: {
          select: {
            name: true,
          },
        },
        brand: {
          select: {
            name: true,
            logoUrl: true,
          },
        },
      },
    });

    const shuffled = allProducts.sort(() => 0.5 - Math.random());
    const randomProducts = shuffled.slice(0, 6).map((product) => ({
      ...product,
      price: parseFloat(product.price.toString()),
    }));

    return NextResponse.json({
      products: randomProducts,
    });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
