import { prisma } from './prisma';
import { Category } from '../generated/prisma';

export async function getCategories(): Promise<Category[]> {
  return await prisma.category.findMany({
    orderBy: { name: 'asc' }
  });
}
