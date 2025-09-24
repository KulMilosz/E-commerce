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

    return NextResponse.json({ brands: sortedBrands });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
