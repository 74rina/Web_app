import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.findOne(id);
  }

  @Post()
  create(@Body() body: { content: string; typeId: number }) {
    return this.postsService.create({
      content: body.content,
      typeId: Number(body.typeId),
    });
  }
}
