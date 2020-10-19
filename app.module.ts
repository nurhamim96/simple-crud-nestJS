import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MahasiswaModule } from './mahasiswa/mahasiswa.module';
import { JurusanModule } from './jurusan/jurusan.module';
import { MatkulModule } from './matkul/matkul.module';
import MahasiswaEntity from './models/mahasiswa.entity';
import JurusanEntity from './models/jurusan.entity';
import MatkulEntity from './models/matkul.entity';
import ConfigModule from './config/config.module';
import DatabaseConnectionConfig from './config/database.config';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConnectionConfig,
    }),
    MahasiswaModule,
    JurusanModule,
    MatkulModule
  ],
})
export class AppModule {}
