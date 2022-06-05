import { Module, CacheModule } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { PrismaService } from '../../../prisma/prisma.service';
import { CategoryRepository } from '../../../prisma/repositories/category.repository';
import {
  MAX_CACHE_ITEMS,
  MAX_CACHE_TIME_SEC,
  REDIS_PORT,
  REDIS_HOST,
} from './category.constants';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      host: REDIS_HOST,
      port: REDIS_PORT,
      max: MAX_CACHE_ITEMS,
      ttl: MAX_CACHE_TIME_SEC,
    }),
  ],
  controllers: [CategoryController],
  providers: [CategoryService, PrismaService, CategoryRepository],
  exports: [CategoryService],
})
export class CategoryModule {}
