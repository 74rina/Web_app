import { Module } from '@nestjs/common';
import { PostTypesService } from './post-types.service';
import { PostTypesController } from './post-types.controller';

@Module({
  controllers: [PostTypesController],
  providers: [PostTypesService],
  exports: [PostTypesService],
})
export class PostTypesModule {}
