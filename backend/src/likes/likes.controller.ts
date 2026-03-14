import { Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { LikesService } from './likes.service';

@Controller()
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post('posts/:id/likes')
  likePost(@Param('id', ParseIntPipe) id: number) {
    return this.likesService.likePost(id);
  }
}
