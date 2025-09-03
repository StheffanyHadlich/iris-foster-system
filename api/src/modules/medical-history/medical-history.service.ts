import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class MedicalHistoryService {
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.medicalHistory.create({ 
        data: {
        ...data,
        medicalDate: new Date(data.medicalDate),
        } 
    });
  }

  findAll() {
    return this.prisma.medicalHistory.findMany();
  }

  findOne(id: number) {
    return this.prisma.medicalHistory.findUnique({ where: { id } });
  }

  update(id: number, data: any) {
    return this.prisma.medicalHistory.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.medicalHistory.delete({ where: { id } });
  }
}
