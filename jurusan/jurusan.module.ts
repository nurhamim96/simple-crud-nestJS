import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import JurusanEntity from 'src/models/jurusan.entity';
import { JurusanController } from './controller/jurusan.controller';
import { JurusanService } from './service/jurusan.service';

@Module({
  imports:[TypeOrmModule.forFeature([JurusanEntity])],
  providers: [JurusanService],
  controllers: [JurusanController]
})
export class JurusanModule {}
