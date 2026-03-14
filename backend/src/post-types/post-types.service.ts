import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PostTypesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.postType.findMany({ orderBy: { id: 'asc' } });
  }
}
