import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma.module';
import { PostTypesModule } from './post-types/post-types.module';
import { PostsModule } from './posts/posts.module';
import { LikesModule } from './likes/likes.module';

@Module({
  imports: [PrismaModule, PostTypesModule, PostsModule, LikesModule],
})
export class AppModule {}
