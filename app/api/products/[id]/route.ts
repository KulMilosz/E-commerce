import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '../../../generated/prisma';

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: {
          select: {
            id: true,
            name: true
          }
        },
        brand: {
          select: {
            id: true,
            name: true,
            logoUrl: true
          }
        }
      }
    });

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id: product.id,
      name: product.name,
      description: product.description,
      price: parseFloat(product.price.toString()),
      stock: product.stock,
      imageUrl: product.imageUrl,
      category: {
        id: product.category.id,
        name: product.category.name
      },
      brand: {
        id: product.brand.id,
        name: product.brand.name,
        logoUrl: product.brand.logoUrl
      },
      createdAt: product.createdAt
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
