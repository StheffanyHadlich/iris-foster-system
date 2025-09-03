import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class AdopterService {
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.adopter.create({ data });
  }

  findAll() {
    return this.prisma.adopter.findMany();
  }

  findOne(id: number) {
    return this.prisma.adopter.findUnique({ where: { id } });
  }

  update(id: number, data: any) {
    return this.prisma.adopter.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.adopter.delete({ where: { id } });
  }
}
