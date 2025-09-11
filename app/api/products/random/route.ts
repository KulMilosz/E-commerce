import { NextResponse } from "next/server";
import { PrismaClient } from "../../../generated/prisma";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const allProducts = await prisma.product.findMany({
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

    // Losowo sortuj i weź pierwsze 6 produktów
    const shuffled = allProducts.sort(() => 0.5 - Math.random());
    const randomProducts = shuffled.slice(0, 6).map((product) => ({
      ...product,
      price: parseFloat(product.price.toString()),
    }));

    return NextResponse.json({
      products: randomProducts,
    });
  } catch (error) {
    console.error("Random products fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
