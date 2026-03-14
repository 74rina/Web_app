import { Controller, Get } from '@nestjs/common';
import { PostTypesService } from './post-types.service';

@Controller('post-types')
export class PostTypesController {
  constructor(private readonly postTypesService: PostTypesService) {}

  @Get()
  findAll() {
    return this.postTypesService.findAll();
  }
}
