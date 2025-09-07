import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  exploreInfo: string;
  productCount: number;
}

export async function getCategories(): Promise<Category[]> {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: {
            products: true
          }
        }
      }
    });

    return categories.map(category => ({
      id: category.id,
      name: category.name,
      description: category.description,
      image: category.image,
      exploreInfo: category.exploreInfo,
      productCount: category._count.products
    }));
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw new Error('Failed to fetch categories');
  } finally {
    await prisma.$disconnect();
  }
}
