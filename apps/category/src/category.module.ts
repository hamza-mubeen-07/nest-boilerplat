import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { PrismaService } from '../../../prisma/prisma.service';
import { CategoryRepository } from '../../../prisma/repositories/category.repository';

@Module({
  imports: [],
  controllers: [CategoryController],
  providers: [CategoryService, PrismaService, CategoryRepository],
  exports: [CategoryService],
})
export class CategoryModule {}
