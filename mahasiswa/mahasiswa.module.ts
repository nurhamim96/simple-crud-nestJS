import { Module } from '@nestjs/common';
import { MahasiswaService } from './service/mahasiswa.service';
import { MahasiswaController } from './controller/mahasiswa.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import MahasiswaEntity from 'src/models/mahasiswa.entity';

@Module({
  imports:[TypeOrmModule.forFeature([MahasiswaEntity])],
  providers: [MahasiswaService],
  controllers: [MahasiswaController]
})
export class MahasiswaModule {}
