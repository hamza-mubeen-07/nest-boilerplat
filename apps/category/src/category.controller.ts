import {
  Get,
  Controller,
  Post,
  Body,
  Param,
  Query,
  Patch,
  Delete,
  CacheTTL,
  UseInterceptors,
  CacheInterceptor,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from '@prisma/client';
import { CreateCategoryDTO } from './category.dtos';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get(':categoryId')
  getCategory(@Param('categoryId') categoryId: string) {
    return this.categoryService.getCategory(Number(categoryId));
  }

  @CacheTTL(10)
  @UseInterceptors(CacheInterceptor)
  @Get()
  getCategories(
    @Query('search') search: string,
    @Query('skip') skip: number,
    @Query('take') take: number,
  ) {
    return this.categoryService.getCategories(
      search,
      Number(skip),
      Number(take),
    );
  }

  @Post()
  createCategory(
    @Body() createCategoryDTO: CreateCategoryDTO,
  ): Promise<Category> {
    return this.categoryService.createCategory(createCategoryDTO);
  }

  @Patch(':categoryId')
  updateCategory(
    @Param('categoryId') categoryId: number,
    @Body() createCategoryDTO: CreateCategoryDTO,
  ): Promise<Category> {
    return this.categoryService.updateCategory(
      Number(categoryId),
      createCategoryDTO,
    );
  }

  @Delete(':categoryId')
  deleteCategory(@Param('categoryId') categoryId: number): Promise<Category> {
    return this.categoryService.deleteCategory(Number(categoryId));
  }
}
