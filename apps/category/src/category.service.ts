import { Injectable, HttpService } from '@nestjs/common';
import { Prisma, Category } from '@prisma/client';
import { CategoryRepository } from '../../../prisma/repositories/category.repository';

@Injectable()
export class CategoryService {
  constructor(
    private httpService: HttpService,
    private categoryRepository: CategoryRepository,
  ) {}

  getCategory(categoryId: number): Promise<Category> {
    return this.categoryRepository.getCategory(categoryId);
  }

  getCategories(
    search: string,
    skip: number,
    take: number,
  ): Promise<Category[]> {
    return this.categoryRepository.getCategories(search, skip, take);
  }

  createCategory(category: Prisma.CategoryCreateInput) {
    return this.categoryRepository.createCategory(category);
  }

  updateCategory(categoryId: number, category: Prisma.CategoryUpdateInput) {
    return this.categoryRepository.updateCategory(categoryId, category);
  }

  deleteCategory(categoryId: number) {
    return this.categoryRepository.deleteCategory(categoryId);
  }
}
