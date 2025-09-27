import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, Prisma } from "../../generated/prisma";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(
      searchParams.get("limit") || searchParams.get("show") || "10",
      10
    );
    const category = searchParams.get("category");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const sortBy = searchParams.get("sortBy") || "latest";

    const where: Prisma.ProductWhereInput = {
      stock: { gt: 0 },
    };

    if (category && category !== "all") {
      where.categoryId = category;
    }

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = parseFloat(minPrice);
      if (maxPrice) where.price.lte = parseFloat(maxPrice);
    }

    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        select: {
          id: true,
          name: true,
          price: true,
          imageUrl: true,
          category: { select: { name: true } },
          brand: { select: { name: true, logoUrl: true } },
        },
        skip,
        take: limit,
        orderBy:
          sortBy === "latest"
            ? { createdAt: "desc" }
            : sortBy === "price-low"
            ? { price: "asc" }
            : sortBy === "price-high"
            ? { price: "desc" }
            : sortBy === "name"
            ? { name: "asc" }
            : { createdAt: "desc" },
      }),
      prisma.product.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    const formattedProducts = products.map((product) => ({
      id: product.id,
      name: product.name,
      price: parseFloat(product.price.toString()),
      imageUrl: product.imageUrl,
      category: { name: product.category.name },
      brand: { name: product.brand.name, logoUrl: product.brand.logoUrl },
    }));

    return NextResponse.json({
      products: formattedProducts,
      pagination: { page, limit, total, totalPages },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
