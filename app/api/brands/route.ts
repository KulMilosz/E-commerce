import { NextResponse } from "next/server";
import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const brands = await prisma.brand.findMany();

    const brandOrder = ['ROG', 'Logitech', 'JBL', 'AOC', 'Razer', 'Rexus'];
    const sortedBrands = brandOrder.map(name => 
      brands.find(brand => brand.name === name)
    ).filter(Boolean);

    return NextResponse.json({ brands: sortedBrands }, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
