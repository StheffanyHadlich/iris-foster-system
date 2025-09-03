import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateDailyDto } from './dto/create-daily.dto';

@Injectable()
export class DailyService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateDailyDto) {
    return this.prisma.daily.create({
      data: {
        ...data,
        dailyDate: new Date(data.dailyDate),
      },
    });
  }

  findAll() {
    return this.prisma.daily.findMany();
  }

  findOne(id: number) {
    return this.prisma.daily.findUnique({ where: { id } });
  }

  update(id: number, data: any) {
    return this.prisma.daily.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.daily.delete({ where: { id } });
  }
}
