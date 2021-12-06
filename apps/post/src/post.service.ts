import { Injectable } from '@nestjs/common';
import { Prisma, Post } from '@prisma/client';
import { PostRepository } from '../../../prisma/repositories/post.repository';

@Injectable()
export class PostService {
  constructor(private postRepository: PostRepository) {}

  getPost(postId: number): Promise<Post> {
    return this.postRepository.getPost(postId);
  }

  getPosts(search: string, skip: number, take: number): Promise<Post[]> {
    return this.postRepository.getPosts(search, skip, take);
  }

  createPost(post: Prisma.PostCreateInput) {
    return this.postRepository.createPost(post);
  }

  updatePost(postId: number, post: Prisma.PostUpdateInput) {
    return this.postRepository.updatePost(postId, post);
  }

  deletePost(postId: number) {
    return this.postRepository.deletePost(postId);
  }
}
