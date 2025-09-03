import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma.module'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PetsModule } from './modules/pets/pets.module';
import { AdopterModule } from './modules/adopter/adopter.module';
import { DailyModule } from './modules/daily/daily.module';
import { MedicalHistoryModule } from './modules/medical-history/medical-history.module';
import { AdoptionModule } from './modules/adoption/adoption.module';

@Module({
  imports: [PrismaModule, PetsModule, AdopterModule, DailyModule, MedicalHistoryModule, AdoptionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
