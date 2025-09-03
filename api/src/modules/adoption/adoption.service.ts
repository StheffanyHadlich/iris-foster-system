import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class AdoptionService {
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.adoption.create({ 
        data : {
        ...data,
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : undefined,
        }
    });
  }

  findAll() {
    return this.prisma.adoption.findMany();
  }

  findOne(id: number) {
    return this.prisma.adoption.findUnique({ where: { id } });
  }

  update(id: number, data: any) {
    return this.prisma.adoption.update({ where: { id }, data: {
        ...data,
        endDate: data.endDate ? new Date(data.endDate) : undefined,
        }
    });
  }

  remove(id: number) {
    return this.prisma.adoption.delete({ where: { id } });
  }
}
