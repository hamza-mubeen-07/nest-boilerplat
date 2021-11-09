import {
  Get,
  Controller,
  Post as PostRequest,
  Body,
  Param,
  Query,
  Patch,
  Delete,
} from '@nestjs/common';
import { PostService } from './post.service';
import { Post } from '@prisma/client';
import { CreatePostDTO } from './post.dtos';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get(':postId')
  getPost(@Param('postId') postId: string) {
    return this.postService.getPost(Number(postId));
  }

  @Get()
  getPosts(
    @Query('search') search: string,
    @Query('skip') skip: number,
    @Query('take') take: number,
  ) {
    return this.postService.getPosts(search, Number(skip), Number(take));
  }

  @PostRequest()
  createPost(@Body() createPostDTO: CreatePostDTO): Promise<Post> {
    return this.postService.createPost(createPostDTO);
  }

  @Patch(':postId')
  updatePost(
    @Param('postId') postId: number,
    @Body() createPostDTO: CreatePostDTO,
  ): Promise<Post> {
    return this.postService.updatePost(Number(postId), createPostDTO);
  }

  @Delete(':postId')
  deletePost(@Param('postId') postId: number): Promise<Post> {
    return this.postService.deletePost(Number(postId));
  }
}
