import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

import { Category, Prisma } from '@prisma/client';

@Injectable()
export class CategoryRepository {
  constructor(private prisma: PrismaService) {}

  getCategory(categoryId: number): Promise<Category | null> {
    return this.prisma.category.findUnique({ where: { id: categoryId } });
  }

  getCategories(search: string, skip = 0, take = 13): Promise<Category[]> {
    return this.prisma.category.findMany({
      skip: skip || 0,
      take: take || 13,
      where: {
        name: {
          contains: search,
        },
      },
    });
  }

  createCategory(data: Prisma.CategoryCreateInput): Promise<Category> {
    return this.prisma.category.create({
      data,
    });
  }

  updateCategory(
    categoryId: number,
    category: Prisma.CategoryUpdateInput,
  ): Promise<Category> {
    return this.prisma.category.update({
      where: { id: categoryId },
      data: category,
    });
  }

  async deleteCategory(categoryId: number): Promise<Category> {
    return this.prisma.category.delete({
      where: { id: categoryId },
    });
  }
}
