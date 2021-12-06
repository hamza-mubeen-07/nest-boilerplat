import { Module, CacheModule } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { PrismaService } from '../../../prisma/prisma.service';
import { CategoryRepository } from '../../../prisma/repositories/category.repository';
import { MAX_CACHE_ITEMS, MAX_CACHE_TIME_SEC } from './category.constants';

@Module({
  imports: [CacheModule.register({
    ttl: MAX_CACHE_TIME_SEC,
    max: MAX_CACHE_ITEMS,
  })],
  controllers: [CategoryController],
  providers: [CategoryService, PrismaService, CategoryRepository],
  exports: [CategoryService],
})
export class CategoryModule {}
