import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

import { Post, Prisma } from '@prisma/client';

@Injectable()
export class PostRepository {
  constructor(private prisma: PrismaService) {}

  getPost(postId: number): Promise<Post | null> {
    return this.prisma.post.findUnique({
      where: { id: postId },
      include: { author: true, categories: true },
    });
  }

  getPosts(search: string, skip = 0, take = 13): Promise<Post[]> {
    return this.prisma.post.findMany({
      skip: skip || 0,
      take: take || 13,
      where: {
        title: {
          contains: search,
        },
      },
    });
  }

  createPost(data: Prisma.PostCreateInput): Promise<Post> {
    return this.prisma.post.create({
      data,
    });
  }

  updatePost(postId: number, post: Prisma.PostUpdateInput): Promise<Post> {
    return this.prisma.post.update({
      where: { id: postId },
      data: post,
    });
  }

  async deletePost(postId: number): Promise<Post> {
    return this.prisma.post.delete({
      where: { id: postId },
    });
  }
}
