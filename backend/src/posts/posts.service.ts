import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

interface CreatePostInput {
  content: string;
  typeId: number;
}

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const posts = await this.prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        type: true,
        _count: { select: { likes: true } },
      },
    });

    return posts.map((post) => ({
      id: post.id,
      content: post.content,
      type: post.type,
      likeCount: post._count.likes,
      createdAt: post.createdAt,
    }));
  }

  async create(input: CreatePostInput) {
    const post = await this.prisma.post.create({
      data: {
        content: input.content,
        typeId: input.typeId,
      },
      include: {
        type: true,
        _count: { select: { likes: true } },
      },
    });

    return {
      id: post.id,
      content: post.content,
      type: post.type,
      likeCount: post._count.likes,
      createdAt: post.createdAt,
    };
  }

  async findOne(postId: number) {
    const post = await this.prisma.post.findUnique({
      where: { id: postId },
      include: {
        type: true,
        _count: { select: { likes: true } },
      },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return {
      id: post.id,
      content: post.content,
      type: post.type,
      likeCount: post._count.likes,
      createdAt: post.createdAt,
    };
  }
}
