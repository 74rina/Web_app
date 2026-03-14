import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class LikesService {
  constructor(private readonly prisma: PrismaService) {}

  async likePost(postId: number) {
    const post = await this.prisma.post.findUnique({ where: { id: postId } });
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    await this.prisma.like.create({
      data: { postId },
    });

    const count = await this.prisma.like.count({ where: { postId } });
    return { postId, likeCount: count };
  }
}
