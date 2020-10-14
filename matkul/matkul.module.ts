import { Module } from '@nestjs/common';
import { MatkulService } from './service/matkul.service';
import { MatkulController } from './controller/matkul.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import MatkulEntity from 'src/models/matkul.entity';

@Module({
  imports:[TypeOrmModule.forFeature([MatkulEntity])],
  providers: [MatkulService],
  controllers: [MatkulController]
})
export class MatkulModule {}
